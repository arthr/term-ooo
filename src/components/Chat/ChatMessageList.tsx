// src/components/Chat/ChatMessageList.tsx
// Lista de mensagens do chat com scroll automático

import { useEffect, useRef } from 'react'
import { ChatMessage } from '@/game/chat-types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatMessageItem } from './ChatMessageItem'

interface ChatMessageListProps {
  messages: ChatMessage[]
  currentUserId: string | null
}

export function ChatMessageList({ messages, currentUserId }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

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
    <ScrollArea className="flex-1">
      <div ref={viewportRef} className="space-y-3 p-4">
        {messages.map((message, index) => {
          const isOwnMessage = message.userId === currentUserId
          const isSystemMessage = 
            message.type === 'system' || 
            message.type === 'user-joined' || 
            message.type === 'user-left'

          return (
            <ChatMessageItem
              key={index}
              message={message}
              isOwnMessage={isOwnMessage}
              variant={isSystemMessage ? 'system' : 'user'}
            />
          )
        })}
        
        {/* Elemento invisível para scroll automático */}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}

