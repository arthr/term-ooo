// src/components/Chat/ChatMessageList.tsx
// Lista de mensagens do chat com scroll automático

import { useEffect, useRef } from 'react'
import { ChatMessage } from '@/game/chat-types'
import { formatChatTimestamp } from '@/lib/chat-utils'

interface ChatMessageListProps {
  messages: ChatMessage[]
  currentUserId: string | null
}

export function ChatMessageList({ messages, currentUserId }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll para última mensagem
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-2">
          <p className="text-gray-400">Nenhuma mensagem ainda</p>
          <p className="text-gray-500 text-sm">Seja o primeiro a conversar!</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-3"
    >
      {messages.map((message, index) => {
        const isOwnMessage = message.userId === currentUserId
        const isSystem = message.type === 'system' || 
                        message.type === 'user-joined' || 
                        message.type === 'user-left'

        if (isSystem) {
          return (
            <div key={index} className="flex justify-center">
              <div className="px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400">
                {message.text || message.message}
              </div>
            </div>
          )
        }

        return (
          <div
            key={index}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[80%] px-3 py-2 rounded-lg
                ${isOwnMessage 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-100'
                }
              `}
            >
              {/* Nickname (apenas para mensagens de outros) */}
              {!isOwnMessage && (
                <div className="text-xs font-semibold mb-1 text-blue-300">
                  {message.nickname}
                </div>
              )}
              
              {/* Texto da mensagem */}
              <div className="text-sm break-words whitespace-pre-wrap">
                {message.text}
              </div>
              
              {/* Timestamp */}
              <div 
                className={`text-xs mt-1 ${isOwnMessage ? 'text-blue-200' : 'text-gray-400'}`}
              >
                {formatChatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        )
      })}
      
      {/* Elemento invisível para scroll automático */}
      <div ref={bottomRef} />
    </div>
  )
}

