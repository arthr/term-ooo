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

  if (mode === 'termo') {
    return (
      <div className="w-full flex justify-center py-4 px-2">
        <GameBoard
          className="w-11/12 md:max-w-xs"
          board={boards[0]}
          currentGuess={currentGuess}
          currentRow={currentRow}
          maxAttempts={maxAttempts}
          highContrast={highContrast}
          cursorPosition={cursorPosition}
          shouldShake={shouldShake}
          onTileClick={onTileClick}
          revealingRow={revealingRow}
          lastTypedIndex={lastTypedIndex}
          happyRow={happyBoards.includes(0) ? happyRow : -1}
        />
      </div>
    )
  }

  if (mode === 'dueto') {
    return (
      <div className="flex justify-center py-4 space-x-3 md:space-x-8">
        <GameBoard
          board={boards[0]}
          currentGuess={currentGuess}
          currentRow={currentRow}
          maxAttempts={maxAttempts}
          highContrast={highContrast}
          cursorPosition={cursorPosition}
          shouldShake={shouldShake}
          onTileClick={onTileClick}
          revealingRow={revealingRow}
          lastTypedIndex={lastTypedIndex}
          happyRow={happyBoards.includes(0) ? happyRow : -1}
        />
        <GameBoard
          board={boards[1]}
          currentGuess={currentGuess}
          currentRow={currentRow}
          maxAttempts={maxAttempts}
          highContrast={highContrast}
          cursorPosition={cursorPosition}
          shouldShake={shouldShake}
          onTileClick={onTileClick}
          revealingRow={revealingRow}
          lastTypedIndex={lastTypedIndex}
          happyRow={happyBoards.includes(1) ? happyRow : -1}
        />
      </div>
    )
  }

  // Quarteto
  return (
      <div className="grid grid-cols-2 md:flex md:w-11/12 w-10/12 pt-4 justify-between items-center gap-x-4 gap-y-2 mx-auto">
      <GameBoard
        board={boards[0]}
        currentGuess={currentGuess}
        currentRow={currentRow}
        maxAttempts={maxAttempts}
        highContrast={highContrast}
        cursorPosition={cursorPosition}
        shouldShake={shouldShake}
        onTileClick={onTileClick}
        revealingRow={revealingRow}
        lastTypedIndex={lastTypedIndex}
        happyRow={happyBoards.includes(0) ? happyRow : -1}
      />
      <GameBoard
        board={boards[1]}
        currentGuess={currentGuess}
        currentRow={currentRow}
        maxAttempts={maxAttempts}
        highContrast={highContrast}
        cursorPosition={cursorPosition}
        shouldShake={shouldShake}
        onTileClick={onTileClick}
        revealingRow={revealingRow}
        lastTypedIndex={lastTypedIndex}
        happyRow={happyBoards.includes(1) ? happyRow : -1}
      />
      <GameBoard
        board={boards[2]}
        currentGuess={currentGuess}
        currentRow={currentRow}
        maxAttempts={maxAttempts}
        highContrast={highContrast}
        cursorPosition={cursorPosition}
        shouldShake={shouldShake}
        onTileClick={onTileClick}
        revealingRow={revealingRow}
        lastTypedIndex={lastTypedIndex}
        happyRow={happyBoards.includes(2) ? happyRow : -1}
      />
      <GameBoard
        board={boards[3]}
        currentGuess={currentGuess}
        currentRow={currentRow}
        maxAttempts={maxAttempts}
        highContrast={highContrast}
        cursorPosition={cursorPosition}
        shouldShake={shouldShake}
        onTileClick={onTileClick}
        revealingRow={revealingRow}
        lastTypedIndex={lastTypedIndex}
        happyRow={happyBoards.includes(3) ? happyRow : -1}
      />
      </div>
  )
}

