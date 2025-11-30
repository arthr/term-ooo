// src/hooks/useEscapeKey.ts
// Hook para gerenciar tecla ESC

import { useEffect } from 'react'

/**
 * Hook para executar callback quando ESC é pressionado
 * 
 * @param onEscape - Função a executar quando ESC for pressionado
 * @param enabled - Se o listener está ativo
 * 
 * @example
 * ```tsx
 * function Panel({ open, onClose }) {
 *   useEscapeKey(onClose, open)
 *   return <div>...</div>
 * }
 * ```
 */
export function useEscapeKey(
  onEscape: () => void,
  enabled: boolean
): void {
  useEffect(() => {
    if (!enabled) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onEscape, enabled])
}

