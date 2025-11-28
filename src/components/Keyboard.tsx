// src/components/Keyboard.tsx
import { KeyState } from '@/game/types'
import { cn } from '@/lib/utils'
import { Delete } from 'lucide-react'

interface KeyboardProps {
  keyStates: Record<string, KeyState>
  onKeyPress: (key: string) => void
  highContrast?: boolean
  disabled?: boolean
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
]

export function Keyboard({ keyStates, onKeyPress, highContrast = false, disabled = false }: KeyboardProps) {
  const getKeyColor = (key: string): string => {
    // keyStates usa letras minúsculas (normalizadas)
    const state = keyStates[key.toLowerCase()]
    
    if (state === 'correct') {
      return highContrast
        ? 'bg-orange-500 hover:bg-orange-600 text-white'
        : 'bg-green-600 hover:bg-green-700 text-white'
    }
    if (state === 'present') {
      return highContrast
        ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
        : 'bg-yellow-500 hover:bg-yellow-600 text-white'
    }
    if (state === 'absent') {
      return 'bg-gray-700 hover:bg-gray-600 text-gray-400'
    }
    
    return 'bg-gray-500 hover:bg-gray-400 text-white'
  }

  const handleClick = (key: string) => {
    if (disabled) return
    // Passar a tecla exatamente como está (MAIÚSCULA para letras)
    // O App.tsx vai converter para minúscula quando adicionar ao currentGuess
    onKeyPress(key)
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 justify-center my-1">
          {row.map((key) => {
            const isSpecial = key === 'ENTER' || key === 'BACKSPACE'
            
            return (
              <button
                key={key}
                onClick={() => handleClick(key)}
                disabled={disabled}
                className={cn(
                  'font-bold rounded text-sm md:text-base py-3 px-2 transition-colors',
                  isSpecial ? 'px-4 md:px-6' : 'min-w-[32px] md:min-w-[40px]',
                  getKeyColor(key),
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
                aria-label={key}
              >
                {key === 'BACKSPACE' ? (
                  <Delete className="w-5 h-5" />
                ) : key === 'ENTER' ? (
                  <span className="text-xs md:text-sm">ENTER</span>
                ) : (
                  key
                )}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

