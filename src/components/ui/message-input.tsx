import * as React from "react"
import { Send } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface MessageInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  onValueChange?: (value: string) => void
  onSend?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  maxLength?: number
  autoFocus?: boolean
  spellCheck?: boolean
  showSendButton?: boolean
  sendButtonAriaLabel?: string
}

/**
 * MessageInput - Campo de mensagem com contentEditable
 * 
 * Componente otimizado para input de mensagens em chat.
 * Features: auto-resize, paste sem formatação, botão de envio integrado.
 * 
 * @example
 * ```tsx
 * <MessageInput
 *   value={message}
 *   onValueChange={setMessage}
 *   onSend={handleSend}
 *   placeholder="Digite sua mensagem..."
 *   maxLength={1000}
 * />
 * ```
 */
const MessageInput = React.forwardRef<HTMLDivElement, MessageInputProps>(
  ({ 
    className, 
    value = '',
    onValueChange,
    onSend,
    placeholder,
    disabled = false,
    readOnly = false,
    maxLength,
    autoFocus = false,
    spellCheck = true,
    showSendButton = true,
    sendButtonAriaLabel = "Enviar mensagem",
    onKeyDown,
    onInput,
    onPaste,
    ...props 
  }, ref) => {
    const innerRef = React.useRef<HTMLDivElement>(null)
    const isComposingRef = React.useRef(false)

    // Combinar refs (externa e interna)
    React.useImperativeHandle(ref, () => innerRef.current!)

    // Auto-focus
    React.useEffect(() => {
      if (autoFocus && innerRef.current) {
        innerRef.current.focus()
      }
    }, [autoFocus])

    // Sincronizar value prop com conteúdo do contentEditable
    React.useEffect(() => {
      if (innerRef.current && !isComposingRef.current) {
        const currentText = innerRef.current.textContent || ''
        if (currentText !== value) {
          innerRef.current.textContent = value
        }
      }
    }, [value])

    // Handler de envio
    const handleSend = React.useCallback(() => {
      const text = (value || '').trim()
      if (!text || disabled || readOnly) return
      
      onSend?.(text)
    }, [value, disabled, readOnly, onSend])

    // Handler de input
    const handleInput = React.useCallback((e: React.FormEvent<HTMLDivElement>) => {
      if (isComposingRef.current) return

      const target = e.currentTarget
      const text = target.textContent || ''

      // Respeitar maxLength
      if (maxLength && text.length > maxLength) {
        const truncated = text.slice(0, maxLength)
        target.textContent = truncated
        
        // Mover cursor para o final
        const range = document.createRange()
        const sel = window.getSelection()
        range.selectNodeContents(target)
        range.collapse(false)
        sel?.removeAllRanges()
        sel?.addRange(range)
        
        onValueChange?.(truncated)
      } else {
        onValueChange?.(text)
      }

      onInput?.(e)
    }, [maxLength, onValueChange, onInput])

    // Handler de paste (remover formatação)
    const handlePaste = React.useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault()
      
      // Extrair texto puro do clipboard
      const text = e.clipboardData.getData('text/plain')
      
      // Inserir texto sem formatação usando Selection API
      const selection = window.getSelection()
      if (!selection || !selection.rangeCount) return
      
      const range = selection.getRangeAt(0)
      range.deleteContents()
      
      const textNode = document.createTextNode(text)
      range.insertNode(textNode)
      
      // Mover cursor para depois do texto inserido
      range.setStartAfter(textNode)
      range.setEndAfter(textNode)
      selection.removeAllRanges()
      selection.addRange(range)
      
      // Trigger input event manualmente
      e.currentTarget.dispatchEvent(new Event('input', { bubbles: true }))
      
      onPaste?.(e)
    }, [onPaste])

    // Handler de teclas
    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      // Enter sem Shift = enviar
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
        return
      }

      onKeyDown?.(e)
    }, [handleSend, onKeyDown])

    // Gerenciar composição (IME - Input Method Editor)
    const handleCompositionStart = React.useCallback(() => {
      isComposingRef.current = true
    }, [])

    const handleCompositionEnd = React.useCallback((e: React.CompositionEvent<HTMLDivElement>) => {
      isComposingRef.current = false
      handleInput(e as any)
    }, [handleInput])

    // Estados visuais
    const isEmpty = !value || value.length === 0
    const showPlaceholder = isEmpty && placeholder && !disabled && !readOnly
    const canSend = !isEmpty && !disabled && !readOnly
    const isEditable = !disabled && !readOnly

    return (
      <div className={cn("relative", className)}>
        <ScrollArea className="min-h-[52px] max-h-[200px] w-full rounded-2xl border border-input bg-background">
          <div
            ref={innerRef}
            contentEditable={isEditable}
            role="textbox"
            aria-multiline="true"
            aria-placeholder={placeholder}
            aria-disabled={disabled}
            aria-readonly={readOnly}
            spellCheck={spellCheck}
            suppressContentEditableWarning
            className={cn(
              "min-h-[52px] w-full px-4 py-3 pr-12",
              "text-sm ring-offset-background",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "whitespace-pre-wrap break-words break-all",
              "text-md/6",
              readOnly && "cursor-default"
            )}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            {...props}
          >
            <p className="m-0 p-0 outline-none" />
          </div>
        </ScrollArea>
        
        {/* Placeholder customizado */}
        {showPlaceholder && (
          <div 
            className="absolute top-4 left-4 text-sm text-muted-foreground pointer-events-none select-none"
            aria-hidden="true"
          >
            {placeholder}
          </div>
        )}

        {/* Botão de envio circular (inferior direita) */}
        {showSendButton && (
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            aria-label={sendButtonAriaLabel}
            className={cn(
              "absolute bottom-3 right-2",
              "w-8 h-8 rounded-full",
              "flex items-center justify-center",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              canSend
                ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }
)
MessageInput.displayName = "MessageInput"

export { MessageInput }

