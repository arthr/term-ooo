// src/hooks/useChatAuth.ts
// Hook para gerenciar autenticação do chat

import { useState, useCallback, useEffect } from 'react'
import { 
  saveNickname, 
  loadNickname, 
  generateUserId, 
  saveUserId, 
  loadUserId 
} from '@/lib/chat-utils'

interface AuthState {
  authenticated: boolean
  userId: string
  connectionId: string | null
  nickname: string | null
}

interface UseChatAuthProps {
  onAuthenticated?: (nickname: string, userId: string) => void
}

/**
 * Hook de autenticação para WebSocket Chat API
 */
export function useChatAuth({ onAuthenticated }: UseChatAuthProps = {}) {
  const [state, setState] = useState<AuthState>(() => {
    const userId = loadUserId() || generateUserId()
    
    if (!loadUserId()) {
      saveUserId(userId)
    }
    
    return {
      authenticated: false,
      userId,
      connectionId: null,
      nickname: null,
    }
  })

  useEffect(() => {
    if (state.userId && !loadUserId()) {
      saveUserId(state.userId)
    }
  }, [state.userId])

  const setConnectionId = useCallback((connectionId: string) => {
    setState(prev => ({ ...prev, connectionId }))
  }, [])

  // Autenticar com nickname (após auth-accepted)
  const authenticate = useCallback((nickname: string) => {
    setState(prev => ({
      ...prev,
      authenticated: true,
      nickname,
    }))
    
    saveNickname(nickname)
    onAuthenticated?.(nickname, state.userId)
  }, [onAuthenticated, state.userId])

  // Desautenticar (mantém userId e connectionId)
  const deauthenticate = useCallback(() => {
    setState(prev => ({
      ...prev,
      authenticated: false,
      nickname: null,
    }))
  }, [])

  // Obter nickname salvo
  const getSavedNickname = useCallback(() => {
    return loadNickname()
  }, [])

  // Regenerar userId (útil para debug/reset)
  const regenerateUserId = useCallback(() => {
    const newUserId = generateUserId()
    setState(prev => ({ ...prev, userId: newUserId }))
    saveUserId(newUserId)
    return newUserId
  }, [])

  return {
    ...state,
    setConnectionId,
    authenticate,
    deauthenticate,
    getSavedNickname,
    regenerateUserId,
  }
}

