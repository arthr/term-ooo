import { Dispatch, SetStateAction, useEffect } from 'react'
import { GameMode, GameState, Stats } from '@/game/types'
import { storage } from '@/game/storage'

interface UseStatsTrackerOptions {
  gameState: GameState | null
  mode: GameMode
  customDayNumber: number | null
  setStats: Dispatch<SetStateAction<Stats | null>>
}

export function useStatsTracker({ gameState, mode, customDayNumber, setStats }: UseStatsTrackerOptions) {
  useEffect(() => {
    if (!gameState || !gameState.isGameOver || gameState.currentRow <= 0) {
      return
    }

    if (gameState.mode !== mode) {
      return
    }

    if (customDayNumber !== null) {
      return
    }

    const currentStats = storage.getStats(mode)

    if (currentStats.lastGame?.dateKey === gameState.dateKey) {
      return
    }

    const newStats: Stats = {
      gamesPlayed: currentStats.gamesPlayed + 1,
      gamesWon: currentStats.gamesWon + (gameState.isWin ? 1 : 0),
      currentStreak: gameState.isWin ? currentStats.currentStreak + 1 : 0,
      maxStreak: gameState.isWin
        ? Math.max(currentStats.currentStreak + 1, currentStats.maxStreak)
        : currentStats.maxStreak,
      guessDistribution: [...currentStats.guessDistribution],
      lastGame: {
        won: gameState.isWin,
        attempts: gameState.currentRow,
        dateKey: gameState.dateKey,
      },
    }

    const attemptIndex = gameState.isWin ? gameState.currentRow - 1 : newStats.guessDistribution.length - 1
    newStats.guessDistribution[attemptIndex]++

    storage.saveStats(mode, newStats)
    setStats(newStats)
  }, [customDayNumber, gameState, mode, setStats])
}
