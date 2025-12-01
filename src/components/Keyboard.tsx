// src/components/Keyboard.tsx
import { KeyState } from '@/game/types'
import { Delete, CornerDownLeft } from 'lucide-react'

type FigmaKeyState = "default" | "correct" | "present" | "absent";

interface KeyProps {
  letter: string;
  state?: FigmaKeyState;
  states?: FigmaKeyState[]; // Para gradientes em Duo/Quadra
  wide?: boolean;
  onClick?: () => void;
  gameMode?: "uno" | "duo" | "quadra";
  isHighContrast?: boolean;
  disabled?: boolean;
}

function Key({
  letter,
  state = "default",
  states,
  wide = false,
  onClick,
  gameMode = "uno",
  isHighContrast = false,
  disabled = false,
}: KeyProps) {
  // Se tem múltiplos estados (Duo/Quadra), usa gradiente
  const hasGradient = states && states.length > 1;

  const getStateColor = (s: FigmaKeyState) => {
    switch (s) {
      case "correct":
        return isHighContrast
          ? "bg-orange-500"
          : "bg-green-600";
      case "present":
        return isHighContrast ? "bg-cyan-500" : "bg-yellow-500";
      case "absent":
        return "bg-slate-700";
      default:
        return "bg-slate-500";
    }
  };

  const getGradientClass = () => {
    if (!states) return "";

    if (gameMode === "duo" && states.length === 2) {
      // Mapeamento estático para Tailwind JIT
      const color1 = getStateColor(states[0]);
      const color2 = getStateColor(states[1]);
      
      // Todas as combinações possíveis
      const gradientMap: Record<string, string> = {
        'bg-green-600_bg-green-600': 'bg-gradient-to-r from-green-600 from-50% to-green-600 to-50%',
        'bg-green-600_bg-yellow-500': 'bg-gradient-to-r from-green-600 from-50% to-yellow-500 to-50%',
        'bg-green-600_bg-orange-500': 'bg-gradient-to-r from-green-600 from-50% to-orange-500 to-50%',
        'bg-green-600_bg-cyan-500': 'bg-gradient-to-r from-green-600 from-50% to-cyan-500 to-50%',
        'bg-green-600_bg-slate-700': 'bg-gradient-to-r from-green-600 from-50% to-slate-700 to-50%',
        'bg-green-600_bg-slate-500': 'bg-gradient-to-r from-green-600 from-50% to-slate-500 to-50%',
        'bg-yellow-500_bg-green-600': 'bg-gradient-to-r from-yellow-500 from-50% to-green-600 to-50%',
        'bg-yellow-500_bg-yellow-500': 'bg-gradient-to-r from-yellow-500 from-50% to-yellow-500 to-50%',
        'bg-yellow-500_bg-orange-500': 'bg-gradient-to-r from-yellow-500 from-50% to-orange-500 to-50%',
        'bg-yellow-500_bg-cyan-500': 'bg-gradient-to-r from-yellow-500 from-50% to-cyan-500 to-50%',
        'bg-yellow-500_bg-slate-700': 'bg-gradient-to-r from-yellow-500 from-50% to-slate-700 to-50%',
        'bg-yellow-500_bg-slate-500': 'bg-gradient-to-r from-yellow-500 from-50% to-slate-500 to-50%',
        'bg-orange-500_bg-green-600': 'bg-gradient-to-r from-orange-500 from-50% to-green-600 to-50%',
        'bg-orange-500_bg-yellow-500': 'bg-gradient-to-r from-orange-500 from-50% to-yellow-500 to-50%',
        'bg-orange-500_bg-orange-500': 'bg-gradient-to-r from-orange-500 from-50% to-orange-500 to-50%',
        'bg-orange-500_bg-cyan-500': 'bg-gradient-to-r from-orange-500 from-50% to-cyan-500 to-50%',
        'bg-orange-500_bg-slate-700': 'bg-gradient-to-r from-orange-500 from-50% to-slate-700 to-50%',
        'bg-orange-500_bg-slate-500': 'bg-gradient-to-r from-orange-500 from-50% to-slate-500 to-50%',
        'bg-cyan-500_bg-green-600': 'bg-gradient-to-r from-cyan-500 from-50% to-green-600 to-50%',
        'bg-cyan-500_bg-yellow-500': 'bg-gradient-to-r from-cyan-500 from-50% to-yellow-500 to-50%',
        'bg-cyan-500_bg-orange-500': 'bg-gradient-to-r from-cyan-500 from-50% to-orange-500 to-50%',
        'bg-cyan-500_bg-cyan-500': 'bg-gradient-to-r from-cyan-500 from-50% to-cyan-500 to-50%',
        'bg-cyan-500_bg-slate-700': 'bg-gradient-to-r from-cyan-500 from-50% to-slate-700 to-50%',
        'bg-cyan-500_bg-slate-500': 'bg-gradient-to-r from-cyan-500 from-50% to-slate-500 to-50%',
        'bg-slate-700_bg-green-600': 'bg-gradient-to-r from-slate-700 from-50% to-green-600 to-50%',
        'bg-slate-700_bg-yellow-500': 'bg-gradient-to-r from-slate-700 from-50% to-yellow-500 to-50%',
        'bg-slate-700_bg-orange-500': 'bg-gradient-to-r from-slate-700 from-50% to-orange-500 to-50%',
        'bg-slate-700_bg-cyan-500': 'bg-gradient-to-r from-slate-700 from-50% to-cyan-500 to-50%',
        'bg-slate-700_bg-slate-700': 'bg-gradient-to-r from-slate-700 from-50% to-slate-700 to-50%',
        'bg-slate-700_bg-slate-500': 'bg-gradient-to-r from-slate-700 from-50% to-slate-500 to-50%',
        'bg-slate-500_bg-green-600': 'bg-gradient-to-r from-slate-500 from-50% to-green-600 to-50%',
        'bg-slate-500_bg-yellow-500': 'bg-gradient-to-r from-slate-500 from-50% to-yellow-500 to-50%',
        'bg-slate-500_bg-orange-500': 'bg-gradient-to-r from-slate-500 from-50% to-orange-500 to-50%',
        'bg-slate-500_bg-cyan-500': 'bg-gradient-to-r from-slate-500 from-50% to-cyan-500 to-50%',
        'bg-slate-500_bg-slate-700': 'bg-gradient-to-r from-slate-500 from-50% to-slate-700 to-50%',
        'bg-slate-500_bg-slate-500': 'bg-gradient-to-r from-slate-500 from-50% to-slate-500 to-50%',
      };
      
      const key = `${color1}_${color2}`;
      return gradientMap[key] || color1; // Fallback para cor única
    }

    if (gameMode === "quadra" && states.length === 4) {
      // Gradiente em "pizza" (4 fatias)
      // Simplificado: usamos gradiente cônico via style inline
      return "keyboard-quadra-gradient";
    }

    return "";
  };

  const getBackgroundStyle = () => {
    if (
      gameMode === "quadra" &&
      states &&
      states.length === 4
    ) {
      const colors = states.map((s) => {
        switch (s) {
          case "correct":
            return isHighContrast ? "#f97316" : "#16a34a";
          case "present":
            return isHighContrast ? "#06b6d4" : "#eab308";
          case "absent":
            return "#334155";
          default:
            return "#64748b";
        }
      });
      // Mapeamento visual dos quadrantes (sentido horário a partir do topo-direita):
      // Board 1 (0-90°): quadrante superior direito
      // Board 3 (90-180°): quadrante inferior direito  
      // Board 2 (180-270°): quadrante inferior esquerdo
      // Board 0 (270-360°): quadrante superior esquerdo
      return {
        background: `conic-gradient(from 0deg, ${colors[1]} 0deg 90deg, ${colors[3]} 90deg 180deg, ${colors[2]} 180deg 270deg, ${colors[0]} 270deg 360deg)`,
      };
    }
    return {};
  };

  const stateClass = hasGradient
    ? getGradientClass()
    : getStateColor(state);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={getBackgroundStyle()}
      className={`
        ${wide ? "px-4 sm:px-6 md:px-7" : "px-2 sm:px-3 md:px-4"} 
        py-2 sm:py-3.5 md:py-4
        rounded 
        transition-all duration-200
        flex items-center justify-center
        min-w-[28px] sm:min-w-[36px] md:min-w-[44px]
        text-xs sm:text-base md:text-lg
        text-white font-bold
        hover:brightness-110 active:scale-95
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${!hasGradient || gameMode !== "quadra" ? stateClass : ""}
      `}
    >
      {letter === "BACKSPACE" ? (
        <Delete className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      ) : letter === "ENTER" ? (
        <CornerDownLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      ) : (
        <span className="uppercase">{letter}</span>
      )}
    </button>
  );
}

interface KeyboardProps {
  keyStates: Record<string, KeyState[]>
  onKeyPress: (key: string) => void
  highContrast?: boolean
  disabled?: boolean
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'BACKSPACE'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'],
]

export function Keyboard({ 
  keyStates, 
  onKeyPress, 
  highContrast = false, 
  disabled = false 
}: KeyboardProps) {
  // Mapear modos para o sistema do Figma
  const boardCount = Object.keys(keyStates).length > 0 
    ? keyStates[Object.keys(keyStates)[0]]?.length || 1 
    : 1;
  
  const gameMode: "uno" | "duo" | "quadra" = 
    boardCount === 1 ? "uno" : boardCount === 2 ? "duo" : "quadra";

  // Converter KeyState[] para FigmaKeyState[]
  const convertToFigmaState = (state: KeyState): FigmaKeyState => {
    if (state === 'unused') return 'default';
    return state as FigmaKeyState;
  };

  const getFigmaKeyStates = (key: string): FigmaKeyState | FigmaKeyState[] | undefined => {
    const states = keyStates[key.toLowerCase()];
    
    if (!states || !Array.isArray(states) || states.length === 0) {
      return undefined;
    }

    const figmaStates = states.map(convertToFigmaState);
    
    // Se todos são iguais, retornar único
    const uniqueStates = [...new Set(figmaStates)];
    if (uniqueStates.length === 1) {
      return uniqueStates[0];
    }

    // Se tem estados diferentes, retornar array para gradiente
    return figmaStates;
  };

  return (
    <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 z-10">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-1.5 sm:gap-1.5 md:gap-2 justify-center"
        >
          {row.map((letter) => {
            const keyState = getFigmaKeyStates(letter);
            const isArray = Array.isArray(keyState);

            return (
              <Key
                key={letter}
                letter={letter}
                state={
                  isArray
                    ? "default"
                    : (keyState as FigmaKeyState) || "default"
                }
                states={
                  isArray ? (keyState as FigmaKeyState[]) : undefined
                }
                wide={letter === "ENTER" || letter === "BACKSPACE"}
                gameMode={gameMode}
                isHighContrast={highContrast}
                onClick={() => onKeyPress(letter)}
                disabled={disabled}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
