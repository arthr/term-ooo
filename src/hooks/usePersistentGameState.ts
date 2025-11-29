import { useEffect, useState } from 'react'
import { GameMode, GameState, Stats } from '@/game/types'
import { createInitialGameState, getDayNumber } from '@/game/engine'
import { getTodayDateKey } from '@/lib/utils'
import { storage } from '@/game/storage'

interface UsePersistentGameStateOptions {
  mode: GameMode
  customDayNumber: number | null
  animActions: { setCursorPosition: (position: number) => void }
  onCompletedGameLoad?: () => void
}

interface UsePersistentGameStateResult {
  gameState: GameState | null
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>
  stats: Stats | null
  setStats: React.Dispatch<React.SetStateAction<Stats | null>>
}

export function usePersistentGameState({
  mode,
  customDayNumber,
  animActions,
  onCompletedGameLoad
}: UsePersistentGameStateOptions): UsePersistentGameStateResult {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const actualDayNumber = customDayNumber || getDayNumber()
    const isArchive = customDayNumber !== null
    const dateKey = isArchive ? `archive-${actualDayNumber}` : getTodayDateKey()

    const savedState = storage.getGameState(mode, dateKey)
    const isValidState =
      savedState &&
      savedState.dateKey === dateKey &&
      savedState.dayNumber === actualDayNumber

    if (isValidState) {
      setGameState(savedState)
      const firstEmpty = savedState.currentGuess.findIndex((c) => c === '')
      animActions.setCursorPosition(firstEmpty === -1 ? 5 : firstEmpty)

      if (savedState.isGameOver) {
        onCompletedGameLoad?.()
      }
    } else {
      const newState = createInitialGameState(mode, actualDayNumber, dateKey)
      setGameState(newState)
      storage.saveGameState(mode, dateKey, newState)
      animActions.setCursorPosition(0)
    }

    const currentModeStats = storage.getStats(mode)
    setStats(currentModeStats)
  }, [mode, customDayNumber, animActions, onCompletedGameLoad])

  return { gameState, setGameState, stats, setStats }
}
