// src/components/Chat/ChatMessageInput.tsx
// Input para enviar mensagens

import { useState, useRef, KeyboardEvent } from 'react'
import { Send } from 'lucide-react'
import { sanitizeMessage, isValidMessage } from '@/lib/chat-utils'
import { CHAT_CONFIG } from '@/lib/chat-config'

interface ChatMessageInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatMessageInput({ onSend, disabled = false }: ChatMessageInputProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    const cleaned = sanitizeMessage(text)
    
    if (!isValidMessage(cleaned)) {
      return
    }
    
    onSend(cleaned)
    setText('')
    
    // Reset altura do textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter para enviar, Shift+Enter para nova linha
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    
    // Limitar tamanho
    if (value.length <= CHAT_CONFIG.MAX_MESSAGE_LENGTH) {
      setText(value)
      
      // Auto-resize (max 3 linhas ~96px)
      const textarea = e.target
      textarea.style.height = 'auto'
      const newHeight = Math.min(textarea.scrollHeight, 96)
      textarea.style.height = `${newHeight}px`
    }
  }

  const canSend = text.trim().length > 0 && !disabled

  return (
    <div className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            disabled={disabled}
            rows={1}
            className="w-full px-3 py-2 pr-16 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none disabled:opacity-50"
            style={{ minHeight: '40px', maxHeight: '96px' }}
          />
          
          {/* Contador de caracteres */}
          <div className="absolute bottom-1 right-2 text-xs text-gray-500 pointer-events-none">
            {text.length}/{CHAT_CONFIG.MAX_MESSAGE_LENGTH}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSend}
          className="px-4 py-2 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center"
          title="Enviar mensagem (Enter)"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        <span className="font-medium">Enter</span> para enviar • <span className="font-medium">Shift+Enter</span> para nova linha
      </div>
    </div>
  )
}

