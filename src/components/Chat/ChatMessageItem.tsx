// src/components/Chat/ChatMessageItem.tsx
// Componente individual de mensagem do chat

import { ChatMessage } from '@/game/chat-types'
import { formatChatTimestamp } from '@/lib/chat-utils'
import { cn } from '@/lib/utils'

interface ChatMessageItemProps {
  message: ChatMessage
  isOwnMessage: boolean
  variant?: 'system' | 'user'
  className?: string
}

/**
 * ChatMessageItem - Renderiza uma mensagem individual do chat
 * 
 * Variantes:
 * - system: Mensagens do sistema (entrou/saiu)
 * - user: Mensagens de usuários (padrão)
 * 
 * Arquitetado para expansões futuras:
 * @see .docs/chat/FUTURE_FEATURES_2024_11_30.md
 * 
 * Features planejadas:
 * - Avatares
 * - Reactions
 * - Status de leitura
 * - Edição/exclusão
 * - Responder (reply)
 * - Markdown
 */
export function ChatMessageItem({
  message,
  isOwnMessage,
  variant = 'user',
  className,
}: ChatMessageItemProps) {
  
  // Mensagens de sistema (centralizadas)
  if (variant === 'system') {
    return (
      <div className={cn("flex justify-center", className)}>
        <div className="px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400">
          {message.text || message.message}
        </div>
      </div>
    )
  }

  // Mensagens de usuário (chat)
  return (
    <div
      className={cn(
        "flex",
        isOwnMessage ? 'justify-end' : 'justify-start',
        className
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-3 py-2 rounded-lg",
          "transition-colors duration-200",
          isOwnMessage 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-700 text-gray-100'
        )}
      >
        {/* Nickname (apenas para mensagens de outros) */}
        {!isOwnMessage && message.nickname && (
          <div className="text-xs font-semibold mb-1 text-blue-300">
            {message.nickname}
          </div>
        )}
        
        {/* Texto da mensagem */}
        <div className="text-sm break-words whitespace-pre-wrap break-all">
          {message.text}
        </div>
        
        {/* Timestamp */}
        <div 
          className={cn(
            "text-xs mt-1",
            isOwnMessage ? 'text-blue-200' : 'text-gray-400'
          )}
        >
          {formatChatTimestamp(message.timestamp)}
        </div>
      </div>
    </div>
  )
}

