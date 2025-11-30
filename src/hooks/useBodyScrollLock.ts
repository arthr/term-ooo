// src/hooks/useBodyScrollLock.ts
// Hook para gerenciar scroll do body de forma coordenada

import { useEffect } from 'react'

/**
 * Hook para bloquear/desbloquear scroll do body
 * 
 * Gerencia `document.body.style.overflow` de forma segura,
 * restaurando o valor original ao desmontar ou desabilitar.
 * 
 * @param isLocked - Se true, bloqueia scroll do body
 * 
 * @example
 * ```tsx
 * function Modal({ open }) {
 *   useBodyScrollLock(open)
 *   return <div>...</div>
 * }
 * ```
 */
export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return

    // Salvar valor original
    const originalOverflow = document.body.style.overflow
    
    // Bloquear scroll
    document.body.style.overflow = 'hidden'
    
    // Restaurar ao desmontar
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isLocked])
}

