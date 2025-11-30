// src/components/GameLayout.tsx
import { GameState } from '@/game/types'
import { GameBoard as NewGameBoard } from './new/GameBoard'

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
  
  // Mapear modos para o sistema do Figma
  const gameMode = mode === 'termo' ? 'uno' : mode === 'dueto' ? 'duo' : 'quadra'
  const boardCount = boards.length

  // Determina o layout do grid baseado no modo e número de boards
  const getGridLayout = () => {
    if (boardCount === 1) {
      return "grid-cols-1";
    } else if (boardCount === 2) {
      // Duo: vertical em mobile (aproveita altura), horizontal em desktop (aproveita largura)
      return "grid-cols-1 md:grid-cols-2";
    } else if (boardCount === 4) {
      // Quadra: 2x2 em mobile, 4 horizontal em desktop
      return "grid-cols-2 md:grid-cols-4";
    }
    return "grid-cols-1";
  };

  // Define gaps responsivos baseado no modo
  const getGapClasses = () => {
    if (gameMode === "quadra") {
      // Quadra: sem gap horizontal mobile, gaps menores verticalmente
      return "gap-x-0 gap-y-3 sm:gap-3 md:gap-4 lg:gap-6";
    }
    // Uno e Duo: gaps padrão
    return "gap-1.5 gap-y-5 sm:gap-3 md:gap-4 lg:gap-6";
  };

  // Ajusta alinhamento dos boards em mobile (empurra para o centro no modo quadra)
  const getBoardAdjustMobile = (index: number) => {
    if (gameMode !== "quadra") {
      return "justify-center";
    }

    // Quadra mobile: alterna alinhamento para aproximar do centro
    const jusDir =
      index % 2 === 1
        ? "justify-start pl-3"  // Ímpares: empurra da direita
        : "justify-end pr-3";    // Pares: empurra da esquerda

    return `${jusDir} md:justify-center md:p-0`;
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center min-h-0">
      <div
        className={`grid ${getGridLayout()} ${getGapClasses()} w-full`}
      >
        {boards.map((board, index) => (
          <div 
            key={index} 
            className={`flex ${getBoardAdjustMobile(index)}`}
          >
            <NewGameBoard
              board={board}
              currentGuess={currentGuess}
              currentRow={currentRow}
              maxAttempts={maxAttempts}
              gameMode={gameMode}
              highContrast={highContrast}
              cursorPosition={cursorPosition}
              shouldShake={shouldShake}
              onTileClick={onTileClick}
              revealingRow={revealingRow}
              lastTypedIndex={lastTypedIndex}
              happyRow={happyBoards.includes(index) ? happyRow : -1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
