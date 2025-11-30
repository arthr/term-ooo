// src/hooks/useChatAuth.ts
// Hook para gerenciar autenticação do chat

import { useState, useCallback } from 'react'
import { saveNickname, loadNickname } from '@/lib/chat-utils'

interface AuthState {
  authenticated: boolean
  userId: string | null
  nickname: string | null
}

interface UseChatAuthProps {
  onAuthenticated?: (nickname: string) => void
}

export function useChatAuth({ onAuthenticated }: UseChatAuthProps = {}) {
  const [state, setState] = useState<AuthState>({
    authenticated: false,
    userId: null,
    nickname: null,
  })

  // Definir userId
  const setUserId = useCallback((userId: string) => {
    setState(prev => ({ ...prev, userId }))
  }, [])

  // Autenticar com nickname
  const authenticate = useCallback((nickname: string) => {
    setState(prev => ({
      ...prev,
      authenticated: true,
      nickname,
    }))
    
    saveNickname(nickname)
    onAuthenticated?.(nickname)
  }, [onAuthenticated])

  // Desautenticar
  const deauthenticate = useCallback(() => {
    setState({
      authenticated: false,
      userId: null,
      nickname: null,
    })
  }, [])

  // Obter nickname salvo
  const getSavedNickname = useCallback(() => {
    return loadNickname()
  }, [])

  return {
    ...state,
    setUserId,
    authenticate,
    deauthenticate,
    getSavedNickname,
  }
}

