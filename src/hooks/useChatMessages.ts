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
  onMessage?: (message: ChatMessage) => void
  onUserJoined?: (nickname: string) => void
  onUserLeft?: (nickname: string) => void
  onError?: (error: string) => void
}

export function useChatMessages({
  maxMessages = CHAT_CONFIG.MAX_STORED_MESSAGES,
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

  // Adicionar mensagem
  const addMessage = useCallback((message: ChatMessage) => {
    setState(prev => {
      const newMessages = [...prev.messages, message]
      
      // Limitar quantidade
      if (newMessages.length > maxMessages) {
        newMessages.shift()
      }
      
      return { ...prev, messages: newMessages }
    })
    
    onMessage?.(message)
  }, [maxMessages, onMessage])

  // Atualizar contador de usuários
  const setOnlineCount = useCallback((count: number) => {
    setState(prev => ({ ...prev, onlineCount: count }))
  }, [])

  // Definir erro
  const setError = useCallback((error: string) => {
    const friendlyError = getFriendlyErrorMessage(error)
    setState(prev => ({ ...prev, error: friendlyError }))
    onError?.(friendlyError)
    
    // Limpar erro após 5s
    setTimeout(() => {
      setState(prev => ({ ...prev, error: null }))
    }, 5000)
  }, [onError])

  // Limpar mensagens
  const clearMessages = useCallback(() => {
    setState(prev => ({ ...prev, messages: [] }))
  }, [])

  // Processar mensagem do servidor (v1.3)
  const processServerMessage = useCallback((data: ChatMessage) => {
    switch (data.type) {
      case 'chat-message':
        addMessage(data)
        if (data.uniqueUsers) setOnlineCount(data.uniqueUsers)  // v1.3: connections → uniqueUsers
        break

      case 'user-joined':
        if (CHAT_CONFIG.SHOW_JOIN_LEAVE_NOTIFICATIONS) {
          addMessage({
            ...data,
            type: 'system',
            text: data.message || `${data.nickname} entrou no chat`,
          })
        }
        if (data.uniqueUsers) setOnlineCount(data.uniqueUsers)  // v1.3: connections → uniqueUsers
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
        if (data.uniqueUsers) setOnlineCount(data.uniqueUsers)  // v1.3: connections → uniqueUsers
        onUserLeft?.(data.nickname || '')
        break

      // v1.3: Nova conexão do mesmo userId (múltiplas abas)
      case 'new-connection':
        if (CHAT_CONFIG.SHOW_SYSTEM_MESSAGES) {
          addMessage({
            ...data,
            type: 'system',
            text: data.message || `Nova aba/dispositivo conectado (${data.totalUserConnections} ativas)`,
          })
        }
        break

      // v1.3: Conexão do mesmo userId fechou
      case 'connection-closed':
        if (CHAT_CONFIG.SHOW_SYSTEM_MESSAGES) {
          addMessage({
            ...data,
            type: 'system',
            text: data.message || `Aba/dispositivo desconectado (${data.totalUserConnections} restantes)`,
          })
        }
        break

      // v1.3: stats (substitui connections-count)
      case 'stats':
        if (data.uniqueUsers) setOnlineCount(data.uniqueUsers)
        // data.myConnections disponível para uso futuro
        break

      case 'error':
        setError(data.message || 'Erro desconhecido')
        break
    }
  }, [addMessage, setOnlineCount, setError, onUserJoined, onUserLeft])

  return {
    ...state,
    addMessage,
    setOnlineCount,
    setError,
    clearMessages,
    processServerMessage,
  }
}

