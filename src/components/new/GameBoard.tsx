import { Board } from '@/game/types'
import { Tile } from './Tile'
import { cn } from '@/lib/utils'

interface GameBoardProps {
  className?: string
  board: Board
  currentGuess: string | string[]
  currentRow: number
  maxAttempts: number
  gameMode: 'uno' | 'duo' | 'quadra'
  highContrast?: boolean
  cursorPosition?: number
  shouldShake?: boolean
  onTileClick?: (position: number) => void
  revealingRow?: number
  lastTypedIndex?: number
  happyRow?: number
}

export function GameBoard({
  className,
  board,
  currentGuess,
  currentRow,
  maxAttempts,
  gameMode,
  highContrast = false,
  cursorPosition = 0,
  shouldShake = false,
  onTileClick,
  revealingRow = -1,
  lastTypedIndex = -1,
  happyRow = -1,
}: GameBoardProps) {
  const rows = []

  // Gap entre tiles baseado no modo
  const getGapClasses = () => {
    return 'gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2';
  };

  // 1. Linhas com palpites já feitos
  for (let i = 0; i < board.guesses.length; i++) {
    const guess = board.guesses[i]
    const isRevealing = i === revealingRow
    const isHappyJump = i === happyRow
    
    rows.push(
      <div 
        key={i} 
        className={cn('flex justify-center relative', getGapClasses())}
        style={{ zIndex: isHappyJump ? 100 : 'auto' }}
      >
        {guess.tiles.map((tile, j) => (
          <Tile
            key={j}
            letter={tile.letter}
            state={tile.state}
            gameMode={gameMode}
            isHighContrast={highContrast}
            animationDelay={j * 100}
            isFlipping={isRevealing}
            isHappy={isHappyJump}
          />
        ))}
      </div>
    )
  }

  // 2. Linha atual (se ainda não acabou)
  if (currentRow < maxAttempts && !board.isComplete) {
    const currentTiles = []
    for (let i = 0; i < 5; i++) {
      // currentGuess é um array
      const letter = Array.isArray(currentGuess) ? (currentGuess[i] || '') : ''
      currentTiles.push(
        <Tile
          key={i}
          letter={letter}
          state={letter ? 'filled' : 'empty'}
          gameMode={gameMode}
          isHighContrast={highContrast}
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
          'flex justify-center',
          getGapClasses(),
          shouldShake && 'animate-shake'
        )}
      >
        {currentTiles}
      </div>
    )
  }

  // 3. Linhas vazias restantes
  const remainingRows = maxAttempts - rows.length
  for (let i = 0; i < remainingRows; i++) {
    rows.push(
      <div key={board.guesses.length + i + 1} className={cn('flex justify-center', getGapClasses())}>
        {Array(5)
          .fill(0)
          .map((_, j) => (
            <Tile key={j} letter="" state="empty" gameMode={gameMode} isHighContrast={highContrast} />
          ))}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col', getGapClasses(), className, board.isComplete && 'opacity-90')}>
      {rows}
    </div>
  )
}
