/**
 * useGameAnimations.ts
 * 
 * Hook para gerenciar estados de animação do jogo.
 * Consolida 6 estados de animação e seus timers inline em um único hook testável.
 * 
 * @example
 * ```tsx
 * const {
 *   cursorPosition,
 *   setCursorPosition,
 *   shouldShake,
 *   revealingRow,
 *   lastTypedIndex,
 *   happyRow,
 *   happyBoards,
 *   actions
 * } = useGameAnimations()
 * 
 * // Usar animações
 * actions.triggerShake()
 * actions.triggerFlip(submittedRow)
 * actions.triggerTyping(index)
 * actions.triggerHappy(row, boardIndices)
 * actions.resetAnimations()
 * ```
 */

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'

/**
 * Estado das animações do jogo
 */
export interface GameAnimations {
  shouldShake: boolean
  revealingRow: number
  lastTypedIndex: number
  happyRow: number
  happyBoards: number[]
  cursorPosition: number
}

/**
 * Ações disponíveis para controlar animações
 */
export interface GameAnimationActions {
  setCursorPosition: (pos: number) => void
  triggerShake: () => void
  triggerFlip: (row: number) => void
  triggerTyping: (index: number) => void
  triggerHappy: (row: number, boards: number[]) => void
  resetAnimations: () => void
}

/**
 * Retorno do hook useGameAnimations
 */
export interface UseGameAnimationsReturn extends GameAnimations {
  actions: GameAnimationActions
}

/**
 * Hook para gerenciar animações do jogo
 * 
 * Encapsula todos os estados de animação e seus timers,
 * garantindo cleanup automático e facilitando testes.
 * 
 * @returns Objeto com estados de animação e ações
 */
export function useGameAnimations(): UseGameAnimationsReturn {
  const [cursorPosition, setCursorPosition] = useState(0)
  const [shouldShake, setShouldShake] = useState(false)
  const [revealingRow, setRevealingRow] = useState(-1)
  const [lastTypedIndex, setLastTypedIndex] = useState(-1)
  const [happyRow, setHappyRow] = useState(-1)
  const [happyBoards, setHappyBoards] = useState<number[]>([])

  // Refs para armazenar IDs dos timers para cleanup
  const timersRef = useRef<NodeJS.Timeout[]>([])

  // Cleanup de todos os timers ao desmontar
  useEffect(() => {
    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer))
      timersRef.current = []
    }
  }, [])

  /**
   * Ativa animação de shake (erro)
   * Duração: 500ms
   */
  const triggerShake = useCallback(() => {
    setShouldShake(true)
    const timer = setTimeout(() => {
      setShouldShake(false)
    }, 500)
    timersRef.current.push(timer)
  }, [])

  /**
   * Ativa animação de flip para uma linha
   * Duração: 900ms
   */
  const triggerFlip = useCallback((row: number) => {
    setRevealingRow(row)
    const timer = setTimeout(() => {
      setRevealingRow(-1)
    }, 900)
    timersRef.current.push(timer)
  }, [])

  /**
   * Ativa animação de digitação para um tile
   * Duração: 150ms
   */
  const triggerTyping = useCallback((index: number) => {
    setLastTypedIndex(index)
    const timer = setTimeout(() => {
      setLastTypedIndex(-1)
    }, 150)
    timersRef.current.push(timer)
  }, [])

  /**
   * Ativa animação de felicidade (happy jump) para boards completados
   * Duração: 1000ms
   */
  const triggerHappy = useCallback((row: number, boards: number[]) => {
    setHappyRow(row)
    setHappyBoards(boards)
    const timer = setTimeout(() => {
      setHappyRow(-1)
      setHappyBoards([])
    }, 1000)
    timersRef.current.push(timer)
  }, [])

  /**
   * Reseta todas as animações para o estado inicial
   */
  const resetAnimations = useCallback(() => {
    // Limpar todos os timers pendentes
    timersRef.current.forEach(timer => clearTimeout(timer))
    timersRef.current = []

    // Resetar estados
    setShouldShake(false)
    setRevealingRow(-1)
    setLastTypedIndex(-1)
    setHappyRow(-1)
    setHappyBoards([])
  }, [])

  const actions = useMemo(() => ({
    setCursorPosition,
    triggerShake,
    triggerFlip,
    triggerTyping,
    triggerHappy,
    resetAnimations,
  }), [setCursorPosition, triggerShake, triggerFlip, triggerTyping, triggerHappy, resetAnimations])

  return {
    cursorPosition,
    shouldShake,
    revealingRow,
    lastTypedIndex,
    happyRow,
    happyBoards,
    actions,
  }
}

