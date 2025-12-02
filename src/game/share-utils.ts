// src/game/share-utils.ts

/**
 * Utilitários para compartilhamento de resultados do jogo.
 * 
 * Este arquivo centraliza a lógica de renderização de emojis
 * e textos de compartilhamento, eliminando duplicação no engine.ts.
 * 
 * @example
 * ```ts
 * import { tileToEmoji, renderGuessEmojis, SHARE_LEGEND } from '@/game/share-utils'
 * 
 * const emoji = tileToEmoji('correct') // '🟩'
 * const row = renderGuessEmojis(guess) // '🟩🟨⬛🟩🟩'
 * ```
 */

import { TileState, Guess, Board } from './types'

/**
 * Mapeamento de estados de tile para emojis
 */
export const TILE_EMOJI: Record<TileState | 'empty', string> = {
  correct: '🟩',
  present: '🟨',
  absent: '⬛',
  empty: '🔳',
  filled: '🔳', // Estado intermediário, usa mesmo emoji de vazio
} as const

/**
 * Legenda padrão para compartilhamento de resultados
 */
export const SHARE_LEGEND = `🟩 - Letra correta na posição correta
🟨 - Letra correta na posição errada
⬛ - Letra não existe na palavra
🔳 - Tile não utilizado`

/**
 * Tiles vazios para uma linha sem guess (5 tiles)
 */
export const EMPTY_ROW_EMOJI = '🔳🔳🔳🔳🔳'

/**
 * Converte um estado de tile para seu emoji correspondente
 * 
 * @param state - Estado do tile
 * @returns Emoji correspondente
 */
export function tileToEmoji(state: TileState): string {
  return TILE_EMOJI[state] ?? TILE_EMOJI.absent
}

/**
 * Renderiza uma guess completa como string de emojis
 * 
 * @param guess - Guess a ser renderizada (ou undefined para linha vazia)
 * @returns String de 5 emojis representando a guess
 */
export function renderGuessEmojis(guess: Guess | undefined): string {
  if (!guess) return EMPTY_ROW_EMOJI
  return guess.tiles.map(tile => tileToEmoji(tile.state)).join('')
}

/**
 * Renderiza um par de boards lado a lado para compartilhamento
 * 
 * @param boards - Array de boards do jogo
 * @param board1Index - Índice do primeiro board
 * @param board2Index - Índice do segundo board
 * @param maxRows - Número máximo de linhas a renderizar
 * @returns String com as linhas renderizadas
 */
export function renderBoardPair(
  boards: Board[],
  board1Index: number,
  board2Index: number,
  maxRows: number
): string {
  let text = ''
  
  for (let i = 0; i < maxRows; i++) {
    const guess1 = boards[board1Index]?.guesses[i]
    const guess2 = boards[board2Index]?.guesses[i]
    
    text += renderGuessEmojis(guess1)
    text += ' '
    text += renderGuessEmojis(guess2)
    text += '\n'
  }
  
  return text
}

/**
 * Renderiza um único board para compartilhamento
 * 
 * @param board - Board a ser renderizado
 * @param maxRows - Número máximo de linhas a renderizar
 * @returns String com as linhas renderizadas
 */
export function renderSingleBoard(board: Board, maxRows: number): string {
  let text = ''
  
  for (let i = 0; i < maxRows; i++) {
    const guess = board.guesses[i]
    text += renderGuessEmojis(guess)
    text += '\n'
  }
  
  return text
}

