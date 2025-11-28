// src/components/Tile.tsx
import { cn } from '@/lib/utils'
import { TileState } from '@/game/types'

interface TileProps {
  letter: string
  state: TileState
  highContrast?: boolean
  animationDelay?: number
  isEditing?: boolean
}

export function Tile({ 
  letter, 
  state, 
  highContrast = false, 
  animationDelay = 0,
  isEditing = false 
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

  return (
    <div
      className={cn(
        'size-10 md:size-12 flex items-center justify-center text-2xl font-bold rounded-md transition-all duration-200',
        stateClasses[state],
        isEditing && 'border-b-4 !border-b-gray-400'
      )}
      style={{
        animationDelay: state === 'filled' || state === 'correct' || state === 'present' || state === 'absent'
          ? `${animationDelay}ms`
          : undefined,
      }}
    >
      {letter.toUpperCase()}
    </div>
  )
}

