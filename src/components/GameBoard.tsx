// src/components/GameBoard.tsx
import { Board } from '@/game/types'
import { Tile } from './Tile'
import { cn } from '@/lib/utils'

interface GameBoardProps {
  board: Board
  currentGuess: string | string[] // Suportar tanto string quanto array
  currentRow: number
  maxAttempts: number
  highContrast?: boolean
  cursorPosition?: number
  shouldShake?: boolean
  onTileClick?: (position: number) => void
  revealingRow?: number // Índice da linha que está sendo revelada (para animação flip)
  lastTypedIndex?: number // Índice do tile que acabou de receber letra (para animação ontype)
  happyRow?: number // Índice da linha vitoriosa (para animação happy jump)
}

export function GameBoard({
  board,
  currentGuess,
  currentRow,
  maxAttempts,
  highContrast = false,
  cursorPosition = 0,
  shouldShake = false,
  onTileClick,
  revealingRow = -1,
  lastTypedIndex = -1,
  happyRow = -1,
}: GameBoardProps) {
  const rows = []

  // Linhas com palpites já feitos
  for (let i = 0; i < board.guesses.length; i++) {
    const guess = board.guesses[i]
    const isRevealing = i === revealingRow
    const isHappyJump = i === happyRow
    
    rows.push(
      <div 
        key={i} 
        className="flex gap-1 justify-center relative"
        style={{ zIndex: isHappyJump ? 100 : 'auto' }}
      >
        {guess.tiles.map((tile, j) => (
          <Tile
            key={j}
            letter={tile.letter}
            state={tile.state}
            highContrast={highContrast}
            animationDelay={j * 100}
            isFlipping={isRevealing}
            isHappy={isHappyJump}
          />
        ))}
      </div>
    )
  }

  // Linha atual (se ainda não acabou)
  if (currentRow < maxAttempts && !board.isComplete) {
    const currentTiles = []
    for (let i = 0; i < 5; i++) {
      // currentGuess agora é um array
      const letter = Array.isArray(currentGuess) ? (currentGuess[i] || '') : ''
      currentTiles.push(
        <Tile
          key={i}
          letter={letter}
          state={letter ? 'filled' : 'empty'}
          highContrast={highContrast}
          isEditing={cursorPosition === i}
          onClick={onTileClick ? () => onTileClick(i) : undefined}
          isTyping={i === lastTypedIndex && letter !== ''}
        />
      )
    }
    rows.push(
      <div 
        key={currentRow} 
        className={cn(
          "flex gap-1 justify-center",
          shouldShake && "animate-shake"
        )}
      >
        {currentTiles}
      </div>
    )
  }

  // Linhas vazias restantes
  const remainingRows = maxAttempts - rows.length
  for (let i = 0; i < remainingRows; i++) {
    rows.push(
      <div key={board.guesses.length + i + 1} className="flex gap-1 justify-center">
        {Array(5)
          .fill(0)
          .map((_, j) => (
            <Tile key={j} letter="" state="empty" highContrast={highContrast} />
          ))}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-1', board.isComplete && 'opacity-90')}>
      {rows}
    </div>
  )
}

