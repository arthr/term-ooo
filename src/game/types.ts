// src/game/types.ts
export type GameMode = 'termo' | 'dueto' | 'quarteto'

export type TileState = 'empty' | 'filled' | 'correct' | 'present' | 'absent'

export type KeyState = 'unused' | 'correct' | 'present' | 'absent'

export interface Tile {
  letter: string
  state: TileState
}

export interface Guess {
  word: string
  tiles: Tile[]
}

export interface Board {
  guesses: Guess[]
  solution: string
  isComplete: boolean
}

export interface GameState {
  mode: GameMode
  boards: Board[]
  currentGuess: string[] // Array fixo de 5 posições (pode ter strings vazias)
  currentRow: number
  maxAttempts: number
  isGameOver: boolean
  isWin: boolean
  keyStates: Record<string, KeyState>
  dateKey: string
  dayNumber: number
}

export interface Settings {
  highContrast: boolean
  hardMode: boolean
}

export interface Stats {
  gamesPlayed: number
  gamesWon: number
  currentStreak: number
  maxStreak: number
  guessDistribution: number[]
  lastGame?: {
    won: boolean
    attempts: number
    dateKey: string
  }
}

