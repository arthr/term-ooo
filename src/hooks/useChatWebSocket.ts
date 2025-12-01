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
  
  const auth = useChatAuth({
    onAuthenticated: callbacks?.onAuthenticated,
  })
  
  const messages = useChatMessages({
    maxMessages: maxStoredMessages,
    currentUserId: auth.userId,
    onMessage: callbacks?.onMessage,
    onUserJoined: callbacks?.onUserJoined,
    onUserLeft: callbacks?.onUserLeft,
    onError: callbacks?.onError,
  })

  const connection = useChatConnection({
    url,
    autoConnect,
    maxReconnectAttempts,
    reconnectDelayBase,
    heartbeatInterval,
    onMessage: (data: ChatMessage) => {
      switch (data.type) {
        case 'request-auth':
          if (data.connectionId) {
            connection.setConnectionId(data.connectionId)
            auth.setConnectionId(data.connectionId)
          }
          
          const savedNickname = auth.getSavedNickname()
          if (savedNickname && connection.connected) {
            setTimeout(() => {
              connection.send({
                type: 'auth',
                userId: auth.userId,
                nickname: savedNickname
              })
            }, 100)
          }
          break

        case 'auth-accepted':
          auth.authenticate(data.nickname || '')
          if (data.uniqueUsers) messages.setOnlineCount(data.uniqueUsers)
          break

        case 'chat-message':
        case 'user-joined':
        case 'user-left':
        case 'session-replaced':
        case 'stats':
        case 'error':
          messages.processServerMessage(data)
          break

        case 'pong':
          if (data.uniqueUsers) messages.setOnlineCount(data.uniqueUsers)
          break
      }
    },
    onConnected: callbacks?.onConnected,
    onDisconnected: () => {
      auth.deauthenticate()
      callbacks?.onDisconnected?.()
    },
  })

  const setNickname = useCallback((nickname: string) => {
    if (!connection.connected) {
      messages.setError('Não conectado ao servidor')
      return false
    }

    return connection.send({
      type: 'auth',
      userId: auth.userId,
      nickname
    })
  }, [connection, messages, auth.userId])

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

  const getStats = useCallback(() => {
    connection.send({ type: 'get-stats' })
  }, [connection])

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
    connectionId: connection.connectionId,
    nickname: auth.nickname,
    messages: messages.messages,
    onlineCount: messages.onlineCount,
    unreadCount: messages.unreadCount,
    error: messages.error,
    latency: connection.latency,
    isConnecting: connection.isConnecting,
    
    // Ações
    connect: connection.connect,
    disconnect: connection.disconnect,
    setNickname,
    sendMessage,
    getStats,
    ping,
    markAsRead: messages.markAsRead,
    
    canSendMessages: connection.connected && auth.authenticated,
  }
}
