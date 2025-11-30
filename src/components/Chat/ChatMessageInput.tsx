// src/components/Chat/ChatMessageInput.tsx
// Input para enviar mensagens

import { useState, useRef, KeyboardEvent } from 'react'
import { MessageInput } from '@/components/ui/message-input'
import { sanitizeMessage, isValidMessage } from '@/lib/chat-utils'
import { CHAT_CONFIG } from '@/lib/chat-config'

interface ChatMessageInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatMessageInput({ onSend, disabled = false }: ChatMessageInputProps) {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLDivElement>(null)

  const handleSend = (message: string) => {
    const cleaned = sanitizeMessage(message)
    
    if (!isValidMessage(cleaned)) {
      return
    }
    
    onSend(cleaned)
    setText('')
    
    // Manter foco após enviar
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // ESC para limpar
    if (e.key === 'Escape') {
      setText('')
    }
  }

  return (
    <div className="p-4 border-t border-gray-700 bg-gray-800/50">
      <MessageInput
        ref={inputRef}
        value={text}
        onValueChange={setText}
        onSend={handleSend}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua mensagem..."
        disabled={disabled}
        maxLength={CHAT_CONFIG.MAX_MESSAGE_LENGTH}
        autoFocus
        className="border-gray-600 text-white placeholder:text-gray-400"
      />
      
      <div className="mt-2 text-xs text-gray-500">
        <span className="font-medium">Enter</span> para enviar • <span className="font-medium">Shift+Enter</span> para nova linha
      </div>
    </div>
  )
}

