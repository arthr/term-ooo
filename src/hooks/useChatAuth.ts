// src/hooks/useChatAuth.ts
// Hook para gerenciar autenticação do chat (WebSocket API v1.3)

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
  userId: string                    // v1.3: Nunca null (gerado no cliente)
  connectionId: string | null       // v1.3: ID da conexão específica
  nickname: string | null
}

interface UseChatAuthProps {
  onAuthenticated?: (nickname: string, userId: string) => void
}

/**
 * Hook de autenticação para WebSocket Chat API v1.3
 * 
 * Mudanças principais:
 * - userId gerado pelo cliente (crypto.randomUUID)
 * - userId persiste entre sessões
 * - connectionId recebido do servidor (identifica conexão específica)
 * - Suporta múltiplas conexões do mesmo userId
 * 
 * @see .docs/chat/API_MIGRATION_GUIDE_2024_11_30.md
 */
export function useChatAuth({ onAuthenticated }: UseChatAuthProps = {}) {
  // Inicializar estado com userId já gerado
  const [state, setState] = useState<AuthState>(() => {
    const userId = loadUserId() || generateUserId()
    
    // Persistir imediatamente se foi gerado
    if (!loadUserId()) {
      saveUserId(userId)
    }
    
    return {
      authenticated: false,
      userId,                    // ✅ Sempre disponível
      connectionId: null,
      nickname: null,
    }
  })

  // Garantir que userId está sempre salvo (backup)
  useEffect(() => {
    if (state.userId && !loadUserId()) {
      saveUserId(state.userId)
    }
  }, [state.userId])

  // v1.3: Servidor envia connectionId ao conectar
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

