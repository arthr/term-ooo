// src/components/Chat/ChatButton.tsx
// Botão flutuante para abrir o chat com animações do shadcn.io

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { IconButton } from '@/components/ui/shadcn-io/icon-button'
import { Z_INDEX } from '@/lib/z-index'
import { cn } from '@/lib/utils'

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
  const [animationKey, setAnimationKey] = useState(0)

  // Re-animar a cada 5 segundos enquanto houver mensagens não lidas
  useEffect(() => {
    if (!hasNewMessages) return

    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [hasNewMessages])

  return (
    <div className="fixed bottom-40 right-4 md:bottom-4" style={{ zIndex: Z_INDEX.CHAT_BUTTON }}>
      <IconButton
        key={animationKey} // Força re-montagem da animação
        icon={MessageCircle}
        active={hasNewMessages}
        animate={true}
        size="lg"
        color={!hasNewMessages ? [37, 99, 235] : [251, 191, 36]} // blue-600 / amber-400
        onClick={onClick}
        className={cn(
          'bg-gradient-to-br from-blue-600 to-blue-800',
          'hover:from-blue-500 hover:to-blue-700',
          'shadow-lg transition-opacity',
          !connected && 'opacity-50'
        )}
        aria-label="Abrir chat"
        title={connected ? `${onlineCount} usuários online${hasNewMessages ? ' (novas mensagens)' : ''}` : 'Chat desconectado'}
      />
      
      {/* Badge com contador de usuários online */}
      {connected && onlineCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[11px] md:text-sm font-bold rounded-full size-5 md:size-6 flex items-center justify-center border-2 border-gray-900">
          {onlineCount > 99 ? '99+' : onlineCount}
        </span>
      )}
      
      {/* Indicador de desconexão */}
      {!connected && (
        <span className="absolute -top-1 -right-1 bg-red-500 size-3 md:size-4 rounded-full border-2 border-gray-900 animate-pulse" />
      )}
    </div>
  )
}
