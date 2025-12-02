// src/game/storage.ts
import { GameState, Settings, Stats } from './types'

const STORAGE_PREFIX = 'termo'

export const storage = {
  getSettings(): Settings {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}:settings`)
      if (data) {
        return JSON.parse(data)
      }
    } catch (e) {
      console.error('Error reading settings:', e)
    }
    return {
      highContrast: false,
      hardMode: false,
      soundEnabled: true,
    }
  },

  saveSettings(settings: Settings): void {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}:settings`, JSON.stringify(settings))
    } catch (e) {
      console.error('Error saving settings:', e)
    }
  },

  getStats(mode: string): Stats {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}:stats:${mode}`)
      if (data) {
        return JSON.parse(data)
      }
    } catch (e) {
      console.error('Error reading stats:', e)
    }
    const maxAttempts = mode === 'termo' ? 6 : mode === 'dueto' ? 7 : 9
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: Array(maxAttempts + 1).fill(0),
    }
  },

  saveStats(mode: string, stats: Stats): void {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}:stats:${mode}`, JSON.stringify(stats))
    } catch (e) {
      console.error('Error saving stats:', e)
    }
  },

  getGameState(mode: string, dateKey: string): GameState | null {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}:state:${mode}:${dateKey}`)
      if (data) {
        return JSON.parse(data)
      }
    } catch (e) {
      console.error('Error reading game state:', e)
    }
    return null
  },

  saveGameState(mode: string, dateKey: string, state: GameState): void {
    try {
      localStorage.setItem(
        `${STORAGE_PREFIX}:state:${mode}:${dateKey}`,
        JSON.stringify(state)
      )
    } catch (e) {
      console.error('Error saving game state:', e)
    }
  },
}

