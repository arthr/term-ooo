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
 * Hook compositor para gerenciar chat WebSocket
 * 
 * Combina 3 hooks especializados:
 * - useChatConnection: WebSocket, reconexão, heartbeat
 * - useChatAuth: Autenticação e persistência
 * - useChatMessages: Histórico de mensagens
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

  // Processar mensagem recebida
  const handleMessage = useCallback((data: ChatMessage) => {
    switch (data.type) {
      case 'request-nickname':
        auth.setUserId(data.userId || '')
        
        // Tentar autenticar com nickname salvo
        const savedNickname = auth.getSavedNickname()
        if (savedNickname && connection.connected) {
          setTimeout(() => {
            connection.send({
              type: 'set-nickname',
              nickname: savedNickname
            })
          }, 100)
        }
        break

      case 'nickname-accepted':
        auth.authenticate(data.nickname || '')
        if (data.connections) messages.setOnlineCount(data.connections)
        break

      case 'chat-message':
      case 'user-joined':
      case 'user-left':
      case 'connections-count':
      case 'error':
        messages.processServerMessage(data)
        break

      case 'pong':
        // Processado internamente no useChatConnection
        if (data.connections) messages.setOnlineCount(data.connections)
        break
    }
  }, [auth, messages])

  // Hook de conexão
  const connection = useChatConnection({
    url,
    autoConnect,
    maxReconnectAttempts,
    reconnectDelayBase,
    heartbeatInterval,
    onMessage: handleMessage,
    onConnected: callbacks?.onConnected,
    onDisconnected: () => {
      auth.deauthenticate()
      callbacks?.onDisconnected?.()
    },
  })

  // Definir nickname
  const setNickname = useCallback((nickname: string) => {
    if (!connection.connected) {
      messages.setError('Não conectado ao servidor')
      return false
    }

    return connection.send({
      type: 'set-nickname',
      nickname
    })
  }, [connection, messages])

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

  // Obter contagem de conexões
  const getConnectionsCount = useCallback(() => {
    connection.send({ type: 'get-connections' })
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
    userId: auth.userId,
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
    getConnectionsCount,
    ping,
    
    // Informações de status
    canSendMessages: connection.connected && auth.authenticated,
  }
}
