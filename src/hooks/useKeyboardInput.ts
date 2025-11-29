/**
 * useKeyboardInput.ts
 * 
 * Hook para gerenciar input de teclado (físico e virtual) do jogo.
 * Extrai 120+ linhas de lógica do App.tsx, tornando-a testável e isolada.
 * 
 * @example
 * ```tsx
 * const { handleKey } = useKeyboardInput({
 *   gameState,
 *   settings,
 *   onGuessSubmit: (result) => { //processar resultado },
 *   onCursorMove: (pos) => { //atualizar cursor },
 *   onTyping: (idx) => { //animação },
 *   onError: (msg) => { //mostrar erro },
 *   disabled: dialogManager.hasOpenDialog
 * })
 * 
 * // Passar para teclado virtual
 * <Keyboard onKeyPress={handleKey} />
 * ```
 */

import { useCallback, useEffect } from 'react'
import { GameState } from '@/game/types'

/**
 * Opções de configuração do hook
 */
export interface KeyboardInputOptions {
  /** Estado atual do jogo */
  gameState: GameState | null
  /** Callback quando o gameState.currentGuess precisa ser atualizado */
  onGuessChange: (newGuess: string[]) => void
  /** Callback quando um guess é submetido com ENTER */
  onSubmitGuess: () => void
  /** Callback quando o cursor é movido */
  onCursorMove: (position: number) => void
  /** Callback quando uma letra é digitada */
  onTyping: (index: number) => void
  /** Posição atual do cursor (controlada externamente) */
  cursorPosition: number
  /** Se o input deve estar desabilitado */
  disabled?: boolean
}

/**
 * Hook para gerenciar input de teclado
 * 
 * Encapsula toda a lógica de processamento de teclas:
 * - ENTER: submeter guess
 * - BACKSPACE: apagar letra
 * - ARROWLEFT/RIGHT: mover cursor
 * - SPACE: pular para próxima posição vazia
 * - A-Z: digitar letra
 * 
 * @param options - Configuração do hook
 * @returns Objeto com handler de teclas
 */
export function useKeyboardInput({
  gameState,
  onGuessChange,
  onSubmitGuess,
  onCursorMove,
  onTyping,
  cursorPosition,
  disabled = false
}: KeyboardInputOptions) {

  /**
   * Handler principal de teclas
   */
  const handleKey = useCallback((key: string) => {
    if (!gameState || gameState.isGameOver) return

    if (key === 'ENTER') {
      onSubmitGuess()
    } 
    else if (key === 'BACKSPACE') {
      // Comportamento igual ao original:
      // Se posição atual tem letra: limpa ela
      // Se posição atual vazia: move cursor para trás e limpa
      let targetPos = cursorPosition

      if (gameState.currentGuess[cursorPosition] === '') {
        // Posição atual vazia, move para trás
        if (cursorPosition > 0) {
          targetPos = cursorPosition - 1
          onCursorMove(targetPos)
        } else {
          return // Já no início e vazio, nada a fazer
        }
      }

      // Limpar a posição alvo
      const newGuess = [...gameState.currentGuess]
      newGuess[targetPos] = ''
      
      // Notificar mudança
      onGuessChange(newGuess)
    } 
    else if (key === 'ARROWLEFT') {
      onCursorMove(Math.max(0, cursorPosition - 1))
    } 
    else if (key === 'ARROWRIGHT') {
      onCursorMove(Math.min(4, cursorPosition + 1))
    } 
    else if (key === ' ') {
      // Buscar próxima posição vazia (space = moveEditToNext)
      let nextEmpty = -1
      for (let i = 1; i < 5; i++) {
        const pos = (cursorPosition + i) % 5
        if (gameState.currentGuess[pos] === '') {
          nextEmpty = pos
          break
        }
      }

      if (nextEmpty !== -1) {
        onCursorMove(nextEmpty)
      } else {
        // Todas posições cheias, move para posição 5 (fora)
        onCursorMove(5)
      }
    } 
    else if (/^[A-Z]$/.test(key)) {
      // Digitar letra: SUBSTITUI na posição do cursor (não insere!)
      if (cursorPosition < 5) {
        const newGuess = [...gameState.currentGuess]
        newGuess[cursorPosition] = key.toLowerCase()

        // Ativar animação de digitação
        onTyping(cursorPosition)

        // Atualizar currentGuess
        onGuessChange(newGuess)

        // Mover para próxima posição vazia (moveEditToNext)
        let nextEmpty = -1
        for (let i = 1; i < 5; i++) {
          const pos = (cursorPosition + i) % 5
          if (newGuess[pos] === '') {
            nextEmpty = pos
            break
          }
        }

        if (nextEmpty !== -1) {
          onCursorMove(nextEmpty)
        } else {
          // Todas posições cheias, move para posição 5 (fora)
          onCursorMove(5)
        }
      }
    }
  }, [gameState, cursorPosition, onGuessChange, onSubmitGuess, onCursorMove, onTyping])

  /**
   * Listener de teclado físico
   */
  useEffect(() => {
    if (disabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()

      if (key === 'ENTER') {
        handleKey('ENTER')
      } else if (key === 'BACKSPACE') {
        handleKey('BACKSPACE')
      } else if (key === 'ARROWLEFT' || key === 'ARROWRIGHT') {
        e.preventDefault()
        handleKey(key)
      } else if (key === ' ') {
        e.preventDefault()
        handleKey(' ')
      } else if (/^[A-Z]$/.test(key)) {
        // Passar a tecla em maiúscula, será convertida para minúscula no handler
        handleKey(key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKey, disabled])

  return {
    handleKey,
  }
}

