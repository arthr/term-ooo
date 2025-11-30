import { cn } from '@/lib/utils'
import { TileState } from '@/game/types'

interface TileProps {
  letter: string;
  state: TileState;
  gameMode: "uno" | "duo" | "quadra";
  isHighContrast?: boolean;
  animationDelay?: number;
  isEditing?: boolean;
  onClick?: () => void;
  isFlipping?: boolean;
  isTyping?: boolean;
  isHappy?: boolean;
}

export function Tile({
  letter,
  state,
  gameMode,
  isHighContrast = false,
  animationDelay = 0,
  isEditing = false,
  onClick,
  isFlipping = false,
  isTyping = false,
  isHappy = false,
}: TileProps) {
  // Tamanhos responsivos baseados no modo (mantidos do original)
  const getSizeClasses = () => {
    switch (gameMode) {
      case "uno":
        return "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16";
      case "duo":
        return "w-6 h-6 sm:w-9 sm:h-9 md:w-16 md:h-16 lg:w-16 lg:h-16";
      case "quadra":
        return "w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11";
      default:
        return "w-12 h-12";
    }
  };

  // Tamanhos de fonte proporcionais (mantidos do original)
  const getFontSizeClasses = () => {
    switch (gameMode) {
      case "uno":
        return "text-xl sm:text-2xl md:text-3xl lg:text-3xl";
      case "duo":
        return "text-[10px] sm:text-sm md:text-3xl lg:text-3xl";
      case "quadra":
        return "text-xs sm:text-sm md:text-base lg:text-lg";
      default:
        return "text-xl";
    }
  };

  // Estados de cores - normal e alto contraste
  const stateClasses = {
    empty: 'bg-transparent border-gray-700',
    filled: 'bg-transparent border-gray-500',
    correct: isHighContrast
      ? 'bg-orange-500 border-orange-500 text-white'
      : 'bg-green-600 border-green-600 text-white',
    present: isHighContrast
      ? 'bg-cyan-500 border-cyan-500 text-white'
      : 'bg-yellow-500 border-yellow-500 text-white',
    absent: 'bg-gray-800 border-gray-800 text-white',
  }

  // Determinar a cor final para a animação flip (CSS variable)
  const getTileColor = () => {
    if (state === 'correct') return isHighContrast ? '#f97316' : '#16a34a'
    if (state === 'present') return isHighContrast ? '#06b6d4' : '#eab308'
    if (state === 'absent') return '#1f2937'
    return 'transparent'
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        // Tamanhos (mantidos do original)
        getSizeClasses(),
        
        // Base
        'flex items-center justify-center font-extrabold rounded-md border-2',
        
        // Estados (aplicar apenas se NÃO estiver flipping)
        !isFlipping && stateClasses[state],
        
        // Editing state
        isEditing && 'border-b-4 !border-b-gray-400',
        
        // Interatividade
        onClick && 'cursor-pointer hover:scale-105',
        
        // Animações
        isFlipping && 'animate-flip text-white',
        isTyping && 'animate-type',
        isHappy && 'animate-happy'
      )}
      style={{
        animationDelay: (isFlipping || isHappy) ? `${animationDelay}ms` : undefined,
        '--tile-color': getTileColor(),
      } as React.CSSProperties}
    >
      <span className={cn('text-white uppercase font-extrabold', getFontSizeClasses())}>
        {letter.toUpperCase()}
      </span>
    </div>
  );
}