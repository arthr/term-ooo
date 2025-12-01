// src/hooks/useChatMessages.ts
// Hook para gerenciar mensagens do chat

import { useState, useCallback } from 'react'
import { ChatMessage } from '@/game/chat-types'
import { CHAT_CONFIG } from '@/lib/chat-config'
import { getFriendlyErrorMessage } from '@/lib/chat-utils'

interface MessagesState {
  messages: ChatMessage[]
  onlineCount: number
  error: string | null
}

interface UseChatMessagesProps {
  maxMessages?: number
  currentUserId?: string
  onMessage?: (message: ChatMessage) => void
  onUserJoined?: (nickname: string) => void
  onUserLeft?: (nickname: string) => void
  onError?: (error: string) => void
}

export function useChatMessages({
  maxMessages = CHAT_CONFIG.MAX_STORED_MESSAGES,
  currentUserId,
  onMessage,
  onUserJoined,
  onUserLeft,
  onError,
}: UseChatMessagesProps = {}) {
  const [state, setState] = useState<MessagesState>({
    messages: [],
    onlineCount: 0,
    error: null,
  })
  
  const [unreadCount, setUnreadCount] = useState(0)

  const addMessage = useCallback((message: ChatMessage) => {
    setState(prev => {
      const newMessages = [...prev.messages, message]
      
      if (newMessages.length > maxMessages) {
        newMessages.shift()
      }
      
      return { ...prev, messages: newMessages }
    })
    
    // Incrementar não lidas se é mensagem de chat e não é mensagem própria
    if (message.type === 'chat-message' && message.userId !== currentUserId) {
      setUnreadCount(prev => prev + 1)
    }
    
    onMessage?.(message)
  }, [maxMessages, onMessage, currentUserId])

  const setOnlineCount = useCallback((count: number) => {
    setState(prev => ({ ...prev, onlineCount: count }))
  }, [])

  const setError = useCallback((error: string) => {
    const friendlyError = getFriendlyErrorMessage(error)
    setState(prev => ({ ...prev, error: friendlyError }))
    onError?.(friendlyError)
    
    setTimeout(() => {
      setState(prev => ({ ...prev, error: null }))
    }, 5000)
  }, [onError])

  const clearMessages = useCallback(() => {
    setState(prev => ({ ...prev, messages: [] }))
  }, [])
  
  const markAsRead = useCallback(() => {
    setUnreadCount(0)
  }, [])

  const processServerMessage = useCallback((data: ChatMessage) => {
    switch (data.type) {
      case 'chat-message':
        addMessage(data)
        if (data.uniqueUsers) setOnlineCount(data.uniqueUsers)
        break

      case 'user-joined':
        if (CHAT_CONFIG.SHOW_JOIN_LEAVE_NOTIFICATIONS) {
          addMessage({
            ...data,
            type: 'system',
            text: data.message || `${data.nickname} entrou no chat`,
          })
        }
        if (data.uniqueUsers) setOnlineCount(data.uniqueUsers)
        onUserJoined?.(data.nickname || '')
        break

      case 'user-left':
        if (CHAT_CONFIG.SHOW_JOIN_LEAVE_NOTIFICATIONS) {
          addMessage({
            ...data,
            type: 'system',
            text: data.message || `${data.nickname} saiu do chat`,
          })
        }
        if (data.uniqueUsers) setOnlineCount(data.uniqueUsers)
        onUserLeft?.(data.nickname || '')
        break

      case 'session-replaced':
        if (CHAT_CONFIG.SHOW_SYSTEM_MESSAGES) {
          addMessage({
            ...data,
            type: 'system',
            text: data.message || 'Sua sessão foi substituída por uma nova conexão',
          })
        }
        break

      case 'stats':
        if (data.uniqueUsers) setOnlineCount(data.uniqueUsers)
        break

      case 'error':
        setError(data.message || 'Erro desconhecido')
        break
    }
  }, [addMessage, setOnlineCount, setError, onUserJoined, onUserLeft])

  return {
    ...state,
    unreadCount,
    addMessage,
    setOnlineCount,
    setError,
    clearMessages,
    markAsRead,
    processServerMessage,
  }
}

