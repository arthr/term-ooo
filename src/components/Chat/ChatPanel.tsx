// src/components/Chat/ChatPanel.tsx
// Painel lateral do chat

import { useEffect } from 'react'
import { X, Users, Wifi, WifiOff } from 'lucide-react'
import { ChatMessageList } from './ChatMessageList'
import { ChatMessageInput } from './ChatMessageInput'
import { ChatNicknameForm } from './ChatNicknameForm'
import { formatLatency, getLatencyColor } from '@/lib/chat-utils'

interface ChatPanelProps {
  open: boolean
  onClose: () => void
  connected: boolean
  authenticated: boolean
  userId: string | null
  nickname: string | null
  messages: any[]
  onlineCount: number
  error: string | null
  latency: number | null
  isConnecting: boolean
  onSetNickname: (nickname: string) => void
  onSendMessage: (text: string) => void
}

export function ChatPanel({
  open,
  onClose,
  connected,
  authenticated,
  userId,
  nickname,
  messages,
  onlineCount,
  error,
  latency,
  isConnecting,
  onSetNickname,
  onSendMessage,
}: ChatPanelProps) {
  // Prevenir scroll do body quando chat está aberto (mobile)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      {/* Overlay (escurece fundo) */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Painel */}
      <div
        className={`
          fixed right-0 top-0 h-full w-full md:w-[360px] 
          bg-gray-900 shadow-2xl z-50
          flex flex-col
          animate-in slide-in-from-right duration-300
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {connected ? (
                <Wifi className="w-5 h-5 text-green-500" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-500 animate-pulse" />
              )}
              <h2 className="text-lg font-bold text-white">Chat Global</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Fechar chat"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Info bar (usuários online + latência) */}
        {connected && (
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700 text-sm">
            <div className="flex items-center space-x-2 text-gray-400">
              <Users className="w-4 h-4" />
              <span>
                {onlineCount} {onlineCount === 1 ? 'usuário' : 'usuários'}
              </span>
            </div>
            
            {latency !== null && (
              <div className={`text-xs ${getLatencyColor(latency)}`}>
                {formatLatency(latency)}
              </div>
            )}
          </div>
        )}

        {/* Erro (se houver) */}
        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Conteúdo principal */}
        {!connected ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center space-y-3">
              <WifiOff className="w-12 h-12 text-gray-600 mx-auto animate-pulse" />
              <p className="text-gray-400">Conectando ao servidor...</p>
              {isConnecting && (
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          </div>
        ) : !authenticated ? (
          <ChatNicknameForm
            onSubmit={onSetNickname}
            error={error}
            isConnecting={isConnecting}
          />
        ) : (
          <>
            {/* Lista de mensagens */}
            <ChatMessageList
              messages={messages}
              currentUserId={userId}
            />

            {/* Input de mensagem */}
            <ChatMessageInput
              onSend={onSendMessage}
              disabled={!connected || !authenticated}
            />
          </>
        )}

        {/* Footer (nickname atual se autenticado) */}
        {authenticated && nickname && (
          <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 text-xs text-gray-500">
            Logado como <span className="text-blue-400 font-medium">{nickname}</span>
          </div>
        )}
      </div>
    </>
  )
}

