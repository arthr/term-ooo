// src/game/engine.ts
import { normalizeString } from '@/lib/utils'
import {
  getDayNumber as getDayNumberFromDates,
  getDateFromDayNumber as getDateFromDayNumberDates,
  getDayNumberFromDate as getDayNumberFromDateDates
} from '@/lib/dates'
import { GameMode, GameState, Board, Guess, Tile, KeyState, Settings } from './types'
import { termoSolutions, termoAllowed, accentMap } from './words-termo'
import { duetoSolutions, duetoAllowed } from './words-dueto'
import { quartetoSolutions, quartetoAllowed } from './words-quarteto'

function getWordsForMode(mode: GameMode) {
  switch (mode) {
    case 'termo':
      return { solutions: termoSolutions, allowed: termoAllowed }
    case 'dueto':
      return { solutions: duetoSolutions, allowed: duetoAllowed }
    case 'quarteto':
      return { solutions: quartetoSolutions, allowed: quartetoAllowed }
  }
}

function getMaxAttempts(mode: GameMode): number {
  switch (mode) {
    case 'termo':
      return 6
    case 'dueto':
      return 7
    case 'quarteto':
      return 9
  }
}

function getNumBoards(mode: GameMode): number {
  switch (mode) {
    case 'termo':
      return 1
    case 'dueto':
      return 2
    case 'quarteto':
      return 4
  }
}

export function getDailyWords(mode: GameMode, dayNumber: number): string[] {
  const { solutions } = getWordsForMode(mode)
  const numBoards = getNumBoards(mode)
  const words: string[] = []

  for (let i = 0; i < numBoards; i++) {
    const index = (dayNumber + i) % solutions.length
    // Normalizar a solução para comparação (soluções vêm com acentos)
    words.push(normalizeString(solutions[index]))
  }

  return words
}

// Re-exportar funções centralizadas de datas
export const getDayNumber = getDayNumberFromDates
export const getDateFromDayNumber = getDateFromDayNumberDates
export const getDayNumberFromDate = getDayNumberFromDateDates

// Busca palavra com acentos no mapa, se existir
export function getAccentedWord(normalized: string): string | undefined {
  return accentMap[normalized]
}

export function isValidWord(word: string, mode: GameMode): boolean {
  const { allowed } = getWordsForMode(mode)
  const normalized = normalizeString(word)

  // Como 'allowed' já contém palavras NORMALIZADAS, fazemos comparação direta O(n)
  // Isso segue exatamente a lógica original: !Rf.has(a) && void 0 === Yf[a]
  const isInDictionary = allowed.includes(normalized)

  // Também aceita se tem mapeamento de acento (como o original faz - linha 19305)
  const hasAccentMapping = normalized in accentMap

  return isInDictionary || hasAccentMapping
}

export function evaluateGuess(guess: string, target: string): Tile[] {
  const normalizedGuess = normalizeString(guess)
  const normalizedTarget = normalizeString(target)
  const tiles: Tile[] = Array(5).fill(null).map(() => ({ letter: '', state: 'absent' }))
  const targetLetters = normalizedTarget.split('')
  const available: Record<string, number> = {}

  for (let i = 0; i < targetLetters.length; i++) {
    available[targetLetters[i]] = (available[targetLetters[i]] || 0) + 1
  }

  // Primeira passagem: marcar verdes
  for (let i = 0; i < 5; i++) {
    tiles[i].letter = normalizedGuess[i]
    if (normalizedGuess[i] === normalizedTarget[i]) {
      tiles[i].state = 'correct'
      available[normalizedGuess[i]]--
    }
  }

  // Segunda passagem: marcar amarelos
  for (let i = 0; i < 5; i++) {
    if (tiles[i].state !== 'correct') {
      const letter = normalizedGuess[i]
      if (available[letter] && available[letter] > 0) {
        tiles[i].state = 'present'
        available[letter]--
      } else {
        tiles[i].state = 'absent'
      }
    }
  }

  return tiles
}

export function checkHardModeCompliance(
  guess: string,
  previousGuesses: Guess[]
): { valid: boolean; message?: string } {
  if (previousGuesses.length === 0) return { valid: true }

  const normalizedGuess = normalizeString(guess)
  const correctLetters: Map<number, string> = new Map()
  const presentLetters: Set<string> = new Set()

  // Coletar restrições das tentativas anteriores
  for (const prevGuess of previousGuesses) {
    for (let i = 0; i < 5; i++) {
      const tile = prevGuess.tiles[i]
      if (tile.state === 'correct') {
        correctLetters.set(i, tile.letter)
      } else if (tile.state === 'present') {
        presentLetters.add(tile.letter)
      }
    }
  }

  // Verificar letras verdes
  for (const [pos, letter] of correctLetters.entries()) {
    if (normalizedGuess[pos] !== letter) {
      return {
        valid: false,
        message: `A letra ${letter.toUpperCase()} deve estar na posição ${pos + 1}`,
      }
    }
  }

  // Verificar letras amarelas (presente em outra posição)
  for (const letter of presentLetters) {
    if (!normalizedGuess.includes(letter)) {
      return {
        valid: false,
        message: `O palpite deve conter a letra ${letter.toUpperCase()}`,
      }
    }
  }

  return { valid: true }
}

export function updateKeyStates(boards: Board[]): Record<string, KeyState[]> {
  const keyStates: Record<string, KeyState[]> = {}

  // Para cada board, calcular os estados das teclas
  for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
    const board = boards[boardIndex]

    for (const guess of board.guesses) {
      for (const tile of guess.tiles) {
        const letter = tile.letter

        if (!keyStates[letter]) {
          keyStates[letter] = new Array(boards.length).fill('unused') as KeyState[]
        }

        const currentState = keyStates[letter][boardIndex]

        // Prioridade: correct > present > absent > unused
        if (tile.state === 'correct') {
          keyStates[letter][boardIndex] = 'correct'
        } else if (tile.state === 'present' && currentState !== 'correct') {
          keyStates[letter][boardIndex] = 'present'
        } else if (tile.state === 'absent' && currentState === 'unused') {
          keyStates[letter][boardIndex] = 'absent'
        }
      }
    }
  }

  return keyStates
}

export function createInitialGameState(mode: GameMode, dayNumber: number, dateKey: string): GameState {
  const solutions = getDailyWords(mode, dayNumber)
  const maxAttempts = getMaxAttempts(mode)

  const boards: Board[] = solutions.map(solution => ({
    guesses: [],
    solution,
    isComplete: false,
  }))

  return {
    mode,
    boards,
    currentGuess: ['', '', '', '', ''], // Array fixo de 5 posições
    currentRow: 0,
    maxAttempts,
    isGameOver: false,
    isWin: false,
    keyStates: {},
    dateKey,
    dayNumber,
  }
}

export function processGuess(
  state: GameState,
  settings: Settings
): { newState: GameState; error?: string } {
  const { currentGuess, boards, currentRow, maxAttempts, mode } = state

  // Converter array para string (remover posições vazias)
  const guessWord = currentGuess.join('')

  if (guessWord.length !== 5) {
    return { newState: state, error: 'Palavra incompleta' }
  }

  if (!isValidWord(guessWord, mode)) {
    return { newState: state, error: 'Palavra desconhecida' }
  }

  // Verificar modo difícil
  if (settings.hardMode) {
    for (let i = 0; i < boards.length; i++) {
      if (!boards[i].isComplete) {
        const compliance = checkHardModeCompliance(guessWord, boards[i].guesses)
        if (!compliance.valid) {
          return { newState: state, error: compliance.message || 'Respeite as dicas!' }
        }
      }
    }
  }

  // Processar palpite para cada tabuleiro
  const newBoards: Board[] = boards.map(board => {
    if (board.isComplete) return board

    const tiles = evaluateGuess(guessWord, board.solution)
    const guess: Guess = {
      word: guessWord,
      tiles,
    }

    const isCorrect = tiles.every(t => t.state === 'correct')

    return {
      ...board,
      guesses: [...board.guesses, guess],
      isComplete: isCorrect,
    }
  })

  const allComplete = newBoards.every(b => b.isComplete)
  const newRow = currentRow + 1
  const isGameOver = allComplete || newRow >= maxAttempts

  const newState: GameState = {
    ...state,
    boards: newBoards,
    currentGuess: ['', '', '', '', ''], // Reset para array vazio
    currentRow: newRow,
    isGameOver,
    isWin: allComplete,
    keyStates: updateKeyStates(newBoards),
  }

  return { newState }
}

export function getResultMessage(state: GameState): string {
  if (!state.isGameOver) return ''

  const minAttemps = () => {
    switch (state.mode) {
      case 'termo':
        return {
          first: 1,
          second: 2,
          third: 3,
        }
      case 'dueto':
        return {
          first: 2,
          second: 3,
          third: 4,
        }
      case 'quarteto':
        return {
          first: 4,
          second: 5,
          third: 6,
        }
      default:
        return {
          first: 1,
          second: 2,
          third: 3,
        }
    }
  }

  if (state.isWin) {
    const attempts = state.currentRow
    if (attempts <= minAttemps().first) return '🥇 Fenomenal!'
    if (attempts <= minAttemps().second) return '🥈 Excelente!'
    if (attempts <= minAttemps().third) return '🥉 Bom!'
    return '🎉 Conseguiu!'
  }

  return '💀 Tente novamente amanhã!'
}

export function generateShareText(state: GameState, isArchive: boolean = false): string {
  const { mode, currentRow, maxAttempts, isWin, dayNumber, boards } = state

  const modeText = mode === 'termo' ? 'Termo' : mode === 'dueto' ? 'Dueto' : 'Quarteto'
  const result = isWin ? `${currentRow}/${maxAttempts}` : 'X/' + maxAttempts
  const archiveTag = isArchive ? ' (Arquivo)' : ''

  let text = `Modo: ${modeText} - Dia: #${dayNumber}${archiveTag} - Tentativas: ${result}\n\n`
  let subtitles = `🟩 - Letra correta na posição correta\n🟨 - Letra correta na posição errada\n⬛ - Letra não existe na palavra\n🔳 - Tile não utilizado`
  text += subtitles + '\n\n'

  if (mode === 'termo') {
    // Uma coluna
    for (const guess of boards[0].guesses) {
      for (const tile of guess.tiles) {
        text += tile.state === 'correct' ? '🟩' : tile.state === 'present' ? '🟨' : '⬛'
      }
      text += '\n'
    }
  } else if (mode === 'dueto') {
    // Duas colunas lado a lado
    const maxRows = Math.max(boards[0].guesses.length, boards[1].guesses.length)
    for (let i = 0; i < maxRows; i++) {
      const guess0 = boards[0].guesses[i]
      const guess1 = boards[1].guesses[i]

      if (guess0) {
        for (const tile of guess0.tiles) {
          text += tile.state === 'correct' ? '🟩' : tile.state === 'present' ? '🟨' : '⬛'
        }
      } else {
        text += '🔳🔳🔳🔳🔳'
      }

      text += ' '

      if (guess1) {
        for (const tile of guess1.tiles) {
          text += tile.state === 'correct' ? '🟩' : tile.state === 'present' ? '🟨' : '⬛'
        }
      } else {
        text += '🔳🔳🔳🔳🔳'
      }

      text += '\n'
    }
  } else {
    // Quarteto: 2x2
    const maxRows = Math.max(...boards.map(b => b.guesses.length))

    for (let i = 0; i < maxRows; i++) {
      // Linha superior (tabuleiros 0 e 1)
      const guess0 = boards[0].guesses[i]
      const guess1 = boards[1].guesses[i]

      if (guess0) {
        for (const tile of guess0.tiles) {
          text += tile.state === 'correct' ? '🟩' : tile.state === 'present' ? '🟨' : '⬛'
        }
      } else {
        text += '🔳🔳🔳🔳🔳'
      }

      text += ' '

      if (guess1) {
        for (const tile of guess1.tiles) {
          text += tile.state === 'correct' ? '🟩' : tile.state === 'present' ? '🟨' : '⬛'
        }
      } else {
        text += '🔳🔳🔳🔳🔳'
      }

      text += '\n'
    }

    text += '\n'

    for (let i = 0; i < maxRows; i++) {
      // Linha inferior (tabuleiros 2 e 3)
      const guess2 = boards[2].guesses[i]
      const guess3 = boards[3].guesses[i]

      if (guess2) {
        for (const tile of guess2.tiles) {
          text += tile.state === 'correct' ? '🟩' : tile.state === 'present' ? '🟨' : '⬛'
        }
      } else {
        text += '🔳🔳🔳🔳🔳'
      }

      text += ' '

      if (guess3) {
        for (const tile of guess3.tiles) {
          text += tile.state === 'correct' ? '🟩' : tile.state === 'present' ? '🟨' : '⬛'
        }
      } else {
        text += '🔳🔳🔳🔳🔳'
      }

      text += '\n'
    }
  }

  return text
}

