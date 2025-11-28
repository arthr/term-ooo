// src/components/Keyboard.tsx
import { KeyState } from '@/game/types'
import { cn } from '@/lib/utils'
import { Delete } from 'lucide-react'

interface KeyboardProps {
  keyStates: Record<string, KeyState[]>
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
  const getKeyStyles = (key: string): { bg: string; styles?: React.CSSProperties } => {
    const states = keyStates[key.toLowerCase()]
    
    // Se não há estados ou não é um array, usar cor padrão
    if (!states || !Array.isArray(states) || states.length === 0 || states.every(s => s === 'unused')) {
      return { bg: 'bg-gray-500 hover:bg-gray-400 text-white' }
    }
    
    // Se todos os estados são iguais, usar cor sólida
    const uniqueStates = [...new Set(states)]
    if (uniqueStates.length === 1) {
      const state = uniqueStates[0]
      if (state === 'correct') {
        return { bg: highContrast ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white' }
      }
      if (state === 'present') {
        return { bg: highContrast ? 'bg-cyan-500 hover:bg-cyan-600 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white' }
      }
      if (state === 'absent') {
        return { bg: 'bg-gray-700 hover:bg-gray-600 text-gray-400' }
      }
    }
    
    // Estados diferentes: criar gradiente apropriado
    const getColor = (state: KeyState): string => {
      if (state === 'correct') return highContrast ? '#f97316' : '#16a34a' // orange-500 : green-600
      if (state === 'present') return highContrast ? '#06b6d4' : '#eab308' // cyan-500 : yellow-500
      if (state === 'absent') return '#374151' // gray-700
      return '#6b7280' // gray-500
    }
    
    // Se todos são "wrong" (absent/unused), usar cor única
    if (states.every(s => s === 'absent' || s === 'unused')) {
      return { bg: 'bg-gray-700 hover:bg-gray-600 text-gray-400' }
    }
    
    const colors = states.map(getColor)
    
    // Dueto (2 boards): linear-gradient 50/50 (metade esquerda/direita)
    if (states.length === 2) {
      const gradient = `${colors[0]} 50%, ${colors[1]} 50%`
      return {
        bg: 'text-white',
        styles: {
          background: `linear-gradient(to right, ${gradient})`
        }
      }
    }
    
    // Quarteto (4 boards): conic-gradient tipo pizza (4 fatias de 90°)
    if (states.length === 4) {
      // Ordem: board[1] (0-90°), board[3] (90-180°), board[2] (180-270°), board[0] (270-360°)
      const gradient = [
        `${colors[1]} 90deg`,          // Board 1: quadrante superior direito
        `${colors[3]} 90deg 180deg`,   // Board 3: quadrante inferior direito
        `${colors[2]} 180deg 270deg`,  // Board 2: quadrante inferior esquerdo
        `${colors[0]} 270deg`,         // Board 0: quadrante superior esquerdo
      ].join(', ')
      
      return {
        bg: 'text-white',
        styles: {
          background: `conic-gradient(${gradient})`
        }
      }
    }
    
    // Fallback para outros casos
    return { bg: 'bg-gray-500 hover:bg-gray-400 text-white' }
  }

  const handleClick = (key: string) => {
    if (disabled) return
    onKeyPress(key)
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5 justify-center my-2">
          {row.map((key) => {
            const isSpecial = key === 'ENTER' || key === 'BACKSPACE'
            
            const keyStyles = getKeyStyles(key)
            
            return (
              <button
                key={key}
                onClick={() => handleClick(key)}
                disabled={disabled}
                className={cn(
                  'font-bold rounded text-sm md:text-base py-2 md:py-4 px-2 md:px-4 transition-colors',
                  isSpecial ? 'px-4 md:px-6' : 'min-w-[32px] md:min-w-[40px]',
                  keyStyles.bg,
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
                style={keyStyles.styles}
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

