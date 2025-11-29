/**
 * useTemporaryState.ts
 * 
 * Hook genérico para estados temporários com timeout automático.
 * Útil para feedback visual de curta duração (ex: "Copiado!", "Confirmar").
 * 
 * @example
 * ```tsx
 * // Uso simples
 * const [copied, setCopiedTemporary] = useTemporaryState()
 * 
 * const handleCopy = async () => {
 *   await navigator.clipboard.writeText(text)
 *   setCopiedTemporary(2000) // Ativa por 2 segundos
 * }
 * 
 * return <Button>{copied ? 'Copiado!' : 'Copiar'}</Button>
 * 
 * // Com controle manual
 * const [active, setActiveTemporary, setActiveManual] = useTemporaryState(false)
 * setActiveManual(true) // Define valor sem timeout
 * ```
 */

import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * Hook para gerenciar estados temporários com timeout automático
 * 
 * Facilita implementação de estados que devem voltar automaticamente
 * ao valor padrão após um período de tempo.
 * 
 * @param defaultValue - Valor inicial do estado (padrão: false)
 * @returns Tupla com [valor, setTemporary, setManual]
 */
export function useTemporaryState(
  defaultValue: boolean = false
): [boolean, (duration: number) => void, (value: boolean) => void] {
  const [value, setValue] = useState(defaultValue)
  const timeoutRef = useRef<NodeJS.Timeout>()

  /**
   * Define o estado como true por uma duração específica
   * 
   * @param duration - Duração em milissegundos
   */
  const setTemporary = useCallback((duration: number) => {
    setValue(true)
    
    // Limpar timeout anterior se existir
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Criar novo timeout
    timeoutRef.current = setTimeout(() => {
      setValue(false)
    }, duration)
  }, [])

  /**
   * Define o estado manualmente (sem timeout)
   * 
   * @param newValue - Novo valor do estado
   */
  const setManual = useCallback((newValue: boolean) => {
    // Limpar timeout pendente
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setValue(newValue)
  }, [])

  // Cleanup ao desmontar componente
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return [value, setTemporary, setManual]
}

