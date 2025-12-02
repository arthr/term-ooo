// src/game/storage.ts
import { GameMode, GameState, Settings, Stats } from './types'
import { getMaxAttempts } from './mode-config'

const STORAGE_PREFIX = 'termo'

export const storage = {
  getSettings(): Settings {
    const defaults: Settings = {
      highContrast: false,
      hardMode: false,
      soundEnabled: true,
    }

    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}:settings`)
      if (data) {
        const saved = JSON.parse(data)
        // Merge: campos salvos sobrescrevem, mas novos campos pegam o default
        return { ...defaults, ...saved }
      }
    } catch (e) {
      console.error('Error reading settings:', e)
    }
    return defaults
  },

  saveSettings(settings: Settings): void {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}:settings`, JSON.stringify(settings))
    } catch (e) {
      console.error('Error saving settings:', e)
    }
  },

  getStats(mode: GameMode): Stats {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}:stats:${mode}`)
      if (data) {
        return JSON.parse(data)
      }
    } catch (e) {
      console.error('Error reading stats:', e)
    }
    // Usar função centralizada do mode-config
    const maxAttempts = getMaxAttempts(mode)
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: Array(maxAttempts + 1).fill(0),
    }
  },

  saveStats(mode: GameMode, stats: Stats): void {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}:stats:${mode}`, JSON.stringify(stats))
    } catch (e) {
      console.error('Error saving stats:', e)
    }
  },

  getGameState(mode: GameMode, dateKey: string): GameState | null {
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

  saveGameState(mode: GameMode, dateKey: string, state: GameState): void {
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

