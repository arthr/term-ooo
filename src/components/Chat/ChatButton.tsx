// src/components/Chat/ChatButton.tsx
// Botão flutuante para abrir o chat

import { MessageCircle } from 'lucide-react'
import { Z_INDEX } from '@/lib/z-index'

interface ChatButtonProps {
  onClick: () => void
  onlineCount: number
  hasNewMessages?: boolean
  connected: boolean
}

export function ChatButton({ 
  onClick, 
  onlineCount, 
  hasNewMessages = false,
  connected 
}: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-4 right-4
        w-14 h-14 rounded-full
        bg-gradient-to-br from-blue-600 to-blue-800
        hover:from-blue-500 hover:to-blue-700
        text-white shadow-lg
        flex items-center justify-center
        transition-all duration-200
        hover:scale-110 active:scale-95
        ${hasNewMessages ? 'animate-pulse' : ''}
        ${!connected ? 'opacity-50' : ''}
      `}
      style={{ zIndex: Z_INDEX.CHAT_BUTTON }}
      aria-label="Abrir chat"
      title={connected ? `${onlineCount} usuários online` : 'Chat desconectado'}
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Badge com contador de usuários online */}
      {connected && onlineCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-900">
          {onlineCount > 99 ? '99+' : onlineCount}
        </span>
      )}
      
      {/* Indicador de desconexão */}
      {!connected && (
        <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full border-2 border-gray-900 animate-pulse" />
      )}
    </button>
  )
}

