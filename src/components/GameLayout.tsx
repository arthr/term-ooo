// src/components/GameLayout.tsx
import { GameState } from '@/game/types'
import { GameBoard } from './GameBoard'

interface GameLayoutProps {
  gameState: GameState
  highContrast?: boolean
  cursorPosition?: number
  shouldShake?: boolean
  onTileClick?: (position: number) => void
  revealingRow?: number
  lastTypedIndex?: number
  happyRow?: number
  happyBoards?: number[]
}

export function GameLayout({
  gameState,
  highContrast = false,
  cursorPosition = 0,
  shouldShake = false,
  onTileClick,
  revealingRow = -1,
  lastTypedIndex = -1,
  happyRow = -1,
  happyBoards = []
}: GameLayoutProps) {
  const { mode, boards, currentGuess, currentRow, maxAttempts } = gameState

  const containerClassName =
    mode === 'termo'
      ? 'w-full flex justify-center py-4 px-2'
      : mode === 'dueto'
        ? 'flex justify-center py-4 space-x-3 md:space-x-8'
        : 'grid grid-cols-2 md:flex md:w-11/12 w-10/12 pt-4 justify-between items-center gap-x-4 gap-y-2 mx-auto'

  const boardClassName = mode === 'termo' ? 'w-11/12 md:max-w-xs' : undefined

  return (
    <div className={containerClassName}>
      {boards.map((board, index) => (
        <GameBoard
          key={`${board.solution}-${index}`}
          className={boardClassName}
          board={board}
          currentGuess={currentGuess}
          currentRow={currentRow}
          maxAttempts={maxAttempts}
          highContrast={highContrast}
          cursorPosition={cursorPosition}
          shouldShake={shouldShake}
          onTileClick={onTileClick}
          revealingRow={revealingRow}
          lastTypedIndex={lastTypedIndex}
          happyRow={happyBoards.includes(index) ? happyRow : -1}
        />
      ))}
    </div>
  )
}

