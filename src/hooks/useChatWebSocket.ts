// src/hooks/useChatWebSocket.ts
// Hook compositor para gerenciar chat WebSocket

import { useCallback } from 'react'
import { ChatMessage, ChatWebSocketConfig, ChatCallbacks } from '@/game/chat-types'
import { CHAT_CONFIG } from '@/lib/chat-config'
import { useChatConnection } from './useChatConnection'
import { useChatAuth } from './useChatAuth'
import { useChatMessages } from './useChatMessages'

interface UseChatWebSocketProps extends Partial<ChatWebSocketConfig> {
  callbacks?: ChatCallbacks
}

/**
 * Hook compositor para gerenciar chat WebSocket (v1.3)
 * 
 * Combina 3 hooks especializados:
 * - useChatConnection: WebSocket, reconexão, heartbeat
 * - useChatAuth: Autenticação e persistência
 * - useChatMessages: Histórico de mensagens
 * 
 * Mudanças v1.3:
 * - userId gerado pelo cliente (crypto.randomUUID)
 * - Suporte a múltiplas conexões/dispositivos
 * - Contadores mais precisos (uniqueUsers vs totalConnections)
 * 
 * @see .docs/chat/API_MIGRATION_GUIDE_2024_11_30.md
 * 
 * @example
 * ```tsx
 * const chat = useChatWebSocket({ autoConnect: true })
 * 
 * // Estado
 * chat.connected, chat.authenticated, chat.messages
 * 
 * // Ações
 * chat.setNickname('João')
 * chat.sendMessage('Olá!')
 * ```
 */
export function useChatWebSocket({ 
  url = CHAT_CONFIG.WS_URL,
  autoConnect = true,
  maxStoredMessages = CHAT_CONFIG.MAX_STORED_MESSAGES,
  maxReconnectAttempts = CHAT_CONFIG.MAX_RECONNECT_ATTEMPTS,
  reconnectDelayBase = CHAT_CONFIG.RECONNECT_DELAY_BASE,
  heartbeatInterval = CHAT_CONFIG.HEARTBEAT_INTERVAL,
  callbacks
}: UseChatWebSocketProps = {}) {
  
  // Hook de mensagens
  const messages = useChatMessages({
    maxMessages: maxStoredMessages,
    onMessage: callbacks?.onMessage,
    onUserJoined: callbacks?.onUserJoined,
    onUserLeft: callbacks?.onUserLeft,
    onError: callbacks?.onError,
  })

  // Hook de autenticação
  const auth = useChatAuth({
    onAuthenticated: callbacks?.onAuthenticated,
  })

  // Hook de conexão (declarado antes do handleMessage para evitar referência circular)
  const connection = useChatConnection({
    url,
    autoConnect,
    maxReconnectAttempts,
    reconnectDelayBase,
    heartbeatInterval,
    onMessage: (data: ChatMessage) => {
      // Processar mensagem recebida (v1.3)
      switch (data.type) {
        case 'request-auth':  // v1.3: era request-nickname
          // Salvar connectionId recebido do servidor
          if (data.connectionId) {
            connection.setConnectionId(data.connectionId)
            auth.setConnectionId(data.connectionId)
          }
          
          // Tentar autenticar com nickname salvo
          const savedNickname = auth.getSavedNickname()
          if (savedNickname && connection.connected) {
            setTimeout(() => {
              connection.send({
                type: 'auth',              // v1.3: era set-nickname
                userId: auth.userId,       // v1.3: cliente envia userId
                nickname: savedNickname
              })
            }, 100)
          }
          break

        case 'auth-accepted':  // v1.3: era nickname-accepted
          auth.authenticate(data.nickname || '')
          if (data.uniqueUsers) messages.setOnlineCount(data.uniqueUsers)  // v1.3: connections → uniqueUsers
          break

        case 'chat-message':
        case 'user-joined':
        case 'user-left':
        case 'new-connection':     // v1.3: Novo evento
        case 'connection-closed':  // v1.3: Novo evento
        case 'stats':              // v1.3: era connections-count
        case 'error':
          messages.processServerMessage(data)
          break

        case 'pong':
          // Processado internamente no useChatConnection
          if (data.uniqueUsers) messages.setOnlineCount(data.uniqueUsers)  // v1.3: connections → uniqueUsers
          break
      }
    },
    onConnected: callbacks?.onConnected,
    onDisconnected: () => {
      auth.deauthenticate()
      callbacks?.onDisconnected?.()
    },
  })

  // Definir nickname (v1.3)
  const setNickname = useCallback((nickname: string) => {
    if (!connection.connected) {
      messages.setError('Não conectado ao servidor')
      return false
    }

    return connection.send({
      type: 'auth',           // v1.3: era set-nickname
      userId: auth.userId,    // v1.3: cliente envia userId
      nickname
    })
  }, [connection, messages, auth.userId])

  // Enviar mensagem
  const sendMessage = useCallback((text: string) => {
    if (!auth.authenticated) {
      messages.setError('Você precisa estar autenticado')
      return false
    }

    if (!connection.connected) {
      messages.setError('Não conectado ao servidor')
      return false
    }

    return connection.send({
      type: 'message',
      text
    })
  }, [connection, auth.authenticated, messages])

  // Obter estatísticas (v1.3: era getConnectionsCount)
  const getStats = useCallback(() => {
    connection.send({ type: 'get-stats' })  // v1.3: era get-connections
  }, [connection])

  // Ping manual
  const ping = useCallback(() => {
    connection.send({
      type: 'ping',
      time: Date.now()
    })
  }, [connection])

  return {
    // Estado
    connected: connection.connected,
    authenticated: auth.authenticated,
    userId: auth.userId,               // v1.3: Sempre disponível (gerado no cliente)
    connectionId: connection.connectionId,  // v1.3: ID da conexão específica
    nickname: auth.nickname,
    messages: messages.messages,
    onlineCount: messages.onlineCount,
    error: messages.error,
    latency: connection.latency,
    isConnecting: connection.isConnecting,
    
    // Ações
    connect: connection.connect,
    disconnect: connection.disconnect,
    setNickname,
    sendMessage,
    getStats,                          // v1.3: era getConnectionsCount
    ping,
    
    // Informações de status
    canSendMessages: connection.connected && auth.authenticated,
  }
}
