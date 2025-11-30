// src/components/Chat/ChatNicknameForm.tsx
// Formulário para definir nickname

import { useState } from 'react'
import { sanitizeNickname, isValidNickname } from '@/lib/chat-utils'
import { CHAT_CONFIG } from '@/lib/chat-config'

interface ChatNicknameFormProps {
  onSubmit: (nickname: string) => void
  error: string | null
  isConnecting: boolean
}

export function ChatNicknameForm({ onSubmit, error, isConnecting }: ChatNicknameFormProps) {
  const [nickname, setNickname] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const cleaned = sanitizeNickname(nickname)
    
    if (!isValidNickname(cleaned)) {
      setLocalError(`Nickname deve ter entre ${CHAT_CONFIG.MIN_NICKNAME_LENGTH} e ${CHAT_CONFIG.MAX_NICKNAME_LENGTH} caracteres`)
      return
    }
    
    setLocalError(null)
    onSubmit(cleaned)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNickname(value)
    setLocalError(null)
  }

  const displayError = error || localError

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-white">Bem-vindo ao Chat!</h3>
        <p className="text-gray-400 text-sm">
          Escolha um nickname para começar a conversar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <input
            type="text"
            value={nickname}
            onChange={handleChange}
            placeholder="Seu nickname"
            maxLength={CHAT_CONFIG.MAX_NICKNAME_LENGTH}
            disabled={isConnecting}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
            autoFocus
          />
          <div className="mt-1 text-xs text-gray-500 text-right">
            {nickname.length}/{CHAT_CONFIG.MAX_NICKNAME_LENGTH}
          </div>
        </div>

        {displayError && (
          <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-sm text-red-200">
            {displayError}
          </div>
        )}

        <button
          type="submit"
          disabled={!nickname.trim() || isConnecting}
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {isConnecting ? 'Entrando...' : 'Entrar no Chat'}
        </button>
      </form>

      <div className="text-xs text-gray-500 text-center">
        <p>Seu nickname será visível para todos</p>
        <p>Seja respeitoso e divirta-se!</p>
      </div>
    </div>
  )
}

