// src/components/ShareCard.tsx

import { forwardRef } from 'react'
import { GameState, Stats } from '@/game/types'
import { getResultMessage, getMinAttempts, getModeDisplayName } from '@/game/engine'
import { SHARE_CONFIG } from '@/lib/share-config'

interface ShareCardProps {
  gameState: GameState
  stats: Stats | null
}

/**
 * Card visual das estatísticas para compartilhamento
 * 
 * Este componente é convertido em imagem PNG para compartilhamento.
 * Design otimizado para redes sociais (aspect ratio 4:5 ou 1:1).
 */
export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ gameState, stats }, ref) => {
    // Calcular estatísticas
    const safeStats = stats ?? {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: Array(gameState.maxAttempts + 1).fill(0),
    }

    const winPercentage = safeStats.gamesPlayed > 0
      ? Math.round((safeStats.gamesWon / safeStats.gamesPlayed) * 100)
      : 0

    const maxValue = Math.max(...safeStats.guessDistribution, 1)

    // Usar função centralizada do mode-config
    const minAttempts = getMinAttempts(gameState.mode)

    // Obter label (medalha ou número)
    const getLabel = (idx: number) => {
      if (idx === safeStats.guessDistribution.length - 1) return '💀'

      const attemptNumber = idx + 1

      if (attemptNumber === minAttempts.first) return '🥇'
      if (attemptNumber === minAttempts.second) return '🥈'
      if (attemptNumber === minAttempts.third) return '🥉'
      return `${attemptNumber}`
    }

    const modeTitle = getModeDisplayName(gameState.mode).toUpperCase()

    const resultMessage = getResultMessage(gameState)

    return (
      <div
        ref={ref}
        className="relative"
        style={{
          width: `${SHARE_CONFIG.IMAGE_WIDTH}px`,
          minHeight: `${SHARE_CONFIG.IMAGE_MIN_HEIGHT}px`,
          backgroundColor: SHARE_CONFIG.IMAGE_BG_COLOR,
        }}
      >
        <div className="p-12 flex flex-col justify-center min-h-full">
          {/* Logo / Marca D'água */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent tracking-wider">
              {SHARE_CONFIG.BRANDING_TEXT}
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              {SHARE_CONFIG.BRANDING_SUBTITLE}
            </p>
          </div>

          {/* Modo do Jogo */}
          <div className="bg-slate-800 rounded-xl p-8 mb-6 border border-slate-700">
            <h2 className="text-3xl font-bold text-center text-white mb-4">
              {modeTitle}
            </h2>

            {/* Badge de Resultado */}
            {gameState.isGameOver && (
              <div className="flex justify-center mb-6">
                <div className="bg-slate-700 text-green-300 px-6 py-2 rounded-full text-lg font-semibold">
                  {resultMessage}
                </div>
              </div>
            )}

            {/* Grid de Estatísticas Principais */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{safeStats.gamesPlayed}</div>
                <div className="text-xs text-gray-400 mt-1">Jogadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{winPercentage}</div>
                <div className="text-xs text-gray-400 mt-1">% Vitórias</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{safeStats.currentStreak}</div>
                <div className="text-xs text-gray-400 mt-1">Sequência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{safeStats.maxStreak}</div>
                <div className="text-xs text-gray-400 mt-1">Melhor</div>
              </div>
            </div>

            {/* Gráfico de Distribuição de Tentativas */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">
                Distribuição de Tentativas
              </h3>
              {safeStats.guessDistribution.map((count, index) => {
                const minPossibleAttempt = minAttempts.first
                const attemptNumber = index + 1

                // Não renderizar tentativas impossíveis
                if (attemptNumber < minPossibleAttempt) return null

                const isCurrentAttempt =
                  gameState.isGameOver &&
                  gameState.isWin &&
                  gameState.currentRow - 1 === index

                const percentage = maxValue > 0 ? (count / maxValue) * 100 : 0

                return (
                  <div key={index} className="flex items-center gap-3 text-base">
                    <div className="w-8 text-center text-lg">
                      {getLabel(index)}
                    </div>
                    <div className="flex-1 bg-gray-700 h-7 rounded overflow-hidden">
                      <div
                        className={`h-full flex items-center justify-end px-3 transition-all ${
                          isCurrentAttempt ? 'bg-green-600' : 'bg-gray-600'
                        }`}
                        style={{
                          width: `${Math.max(percentage, count > 0 ? 10 : 0)}%`,
                        }}
                      >
                        {count > 0 && (
                          <span className="font-bold text-base text-white">
                            {count}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Número do Dia */}
          <div className="text-center text-gray-500 text-base font-mono">
            Dia #{gameState.dayNumber}
          </div>
        </div>
      </div>
    )
  }
)

ShareCard.displayName = 'ShareCard'

