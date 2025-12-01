import { motion } from "framer-motion";
import { cn } from '@/lib/utils'
import { TileState } from '@/game/types'
import { GlowingEffect } from "../ui/glowing-effect";

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
  // Tamanhos responsivos baseados no modo
  const getSizeClasses = () => {
    switch (gameMode) {
      case "uno":
        return "size-12 sm:size-14 md:size-16 lg:size-16";
      case "duo":
        // Mobile maior (vertical agora), desktop lado a lado
        return "size-7 sm:size-12 md:size-14 lg:size-16";
      case "quadra":
        return "size-5 sm:size-7 md:size-10 lg:size-11";
      default:
        return "size-12";
    }
  };

  // Tamanhos de fonte proporcionais ao tamanho do tile
  const getFontSizeClasses = () => {
    switch (gameMode) {
      case "uno":
        // Tiles grandes: fonte proporcional
        return "text-xl sm:text-2xl md:text-3xl lg:text-3xl";
      case "duo":
        // Mobile agora tem tiles maiores (vertical)
        return "text-sm sm:text-xl md:text-2xl lg:text-3xl";
      case "quadra":
        // Tiles pequenos: fonte bem reduzida
        return "text-xs sm:text-sm md:text-base lg:text-lg";
      default:
        return "text-xl";
    }
  };

  // Estados de cores - normal e alto contraste
  const getStateStyles = () => {
    // Estado de edição é tratado separadamente via isEditing prop
    if (isEditing) {
      return "bg-transparent border-slate-400 ring-1 ring-slate-300";
    }
    
    switch (state) {
      case "correct":
        return isHighContrast
          ? "bg-orange-500 border-orange-500"
          : "bg-green-600 border-green-600";
      case "present":
        return isHighContrast
          ? "bg-cyan-500 border-cyan-500"
          : "bg-yellow-500 border-yellow-500";
      case "absent":
        return "bg-slate-700 border-slate-700";
      case "filled":
        return "bg-transparent border-slate-400";
      case "empty":
      default:
        return "bg-transparent border-slate-600";
    }
  };

  // Determinar a cor final para a animação flip (CSS variable)
  const getTileColor = () => {
    if (state === 'correct') return isHighContrast ? '#f97316' : '#16a34a'
    if (state === 'present') return isHighContrast ? '#06b6d4' : '#eab308'
    if (state === 'absent') return '#334155'
    return 'transparent'
  }

  // Animação de Pop ao digitar
  const shouldPop = isTyping;

  return (
    <motion.div
      initial={false}
      animate={shouldPop ? { scale: [1, 1.3, 1] } : {scale: 1}}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={cn(
        getSizeClasses(),
        !isFlipping && getStateStyles(),
        'border-2 rounded-sm',
        'flex items-center justify-center relative',
        'transition-colors duration-300',
        onClick && 'cursor-pointer hover:scale-105',
        isFlipping && 'animate-flip text-white',
        isHappy && 'animate-happy'
      )}
      style={{
        animationDelay: (isFlipping || isHappy) ? `${animationDelay}ms` : undefined,
        '--tile-color': getTileColor(),
      } as React.CSSProperties}
    >
      <GlowingEffect
          spread={80}
          glow={true}
          disabled={false}
          borderWidth={2}
          proximity={94}
          inactiveZone={0.01}
        />
      <span
        className={cn('text-white uppercase font-extrabold', getFontSizeClasses())}
      >
        {letter}
      </span>
      {isEditing && !letter && (
        <div
          className={cn(
            'absolute bottom-0.5 sm:bottom-1 h-0.5 bg-slate-300',
            gameMode === "uno" && "w-6 sm:w-8",
            gameMode === "duo" && "w-5 sm:w-6 md:w-7",
            gameMode === "quadra" && "w-3 sm:w-4"
          )}
        />
      )}
    </motion.div>
  );
}
