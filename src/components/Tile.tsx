// src/components/Tile.tsx
import { cn } from '@/lib/utils'
import { TileState } from '@/game/types'

interface TileProps {
  letter: string
  state: TileState
  highContrast?: boolean
  animationDelay?: number
  isEditing?: boolean
  onClick?: () => void
  isFlipping?: boolean
}

export function Tile({ 
  letter, 
  state, 
  highContrast = false, 
  animationDelay = 0,
  isEditing = false,
  onClick,
  isFlipping = false
}: TileProps) {
  const stateClasses = {
    empty: 'bg-transparent border-2 border-gray-700',
    filled: 'bg-transparent border-2 border-gray-500 animate-pop',
    correct: highContrast
      ? 'bg-orange-500 border-orange-500 text-white'
      : 'bg-green-600 border-green-600 text-white',
    present: highContrast
      ? 'bg-cyan-500 border-cyan-500 text-white'
      : 'bg-yellow-500 border-yellow-500 text-white',
    absent: 'bg-gray-800 border-gray-800 text-white',
  }

  // Determinar a cor final para a animação (CSS variable)
  const getTileColor = () => {
    if (state === 'correct') return highContrast ? '#f97316' : '#16a34a'
    if (state === 'present') return highContrast ? '#06b6d4' : '#eab308'
    if (state === 'absent') return '#1f2937'
    return 'transparent'
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'size-10 md:size-12 flex items-center justify-center text-2xl font-bold rounded-md',
        !isFlipping && stateClasses[state],
        isEditing && 'border-b-4 !border-b-gray-400',
        onClick && 'cursor-pointer hover:scale-105',
        isFlipping && 'animate-flip text-white'
      )}
      style={{
        animationDelay: isFlipping ? `${animationDelay}ms` : undefined,
        '--tile-color': getTileColor(),
      } as React.CSSProperties}
    >
      {letter.toUpperCase()}
    </div>
  )
}

