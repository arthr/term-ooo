// src/components/StatsDialog.tsx
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'
import { Button } from './ui/button'
import { Stats, GameState } from '@/game/types'
import { getTimeUntilMidnight } from '@/lib/utils'
import { getResultMessage, generateShareText } from '@/game/engine'
import { Share2, Check } from 'lucide-react'

interface StatsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  stats: Stats | null
  gameState: GameState
}

export function StatsDialog({ open, onOpenChange, stats, gameState }: StatsDialogProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight())
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight())
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  
  // Se stats é null, usar valores padrão
  if (!stats) {
    return null
  }

  const winPercentage = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0

  const handleShare = async () => {
    const text = generateShareText(gameState)
    
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  const maxValue = Math.max(...stats.guessDistribution, 1)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Estatísticas</DialogTitle>
          <DialogDescription className="sr-only">
            Estatísticas do jogo, distribuição de tentativas e próxima palavra
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {gameState.isGameOver && (
            <div className="text-center py-3 bg-gray-800 rounded-lg">
              <p className="text-lg font-semibold">{getResultMessage(gameState)}</p>
            </div>
          )}
          
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-2xl font-bold">{stats.gamesPlayed}</div>
              <div className="text-xs text-gray-400">Jogadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{winPercentage}</div>
              <div className="text-xs text-gray-400">% Vitórias</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.currentStreak}</div>
              <div className="text-xs text-gray-400">Sequência</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.maxStreak}</div>
              <div className="text-xs text-gray-400">Melhor</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-2">Distribuição de Tentativas</h3>
            <div className="space-y-1">
              {stats.guessDistribution.map((count, index) => {
                const isCurrentAttempt = gameState.isGameOver && gameState.isWin && gameState.currentRow - 1 === index
                const percentage = maxValue > 0 ? (count / maxValue) * 100 : 0
                
                return (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div className="w-4 text-right">{index === stats.guessDistribution.length - 1 ? 'X' : index + 1}</div>
                    <div className="flex-1 bg-gray-800 h-5 rounded overflow-hidden">
                      <div
                        className={`h-full flex items-center justify-end px-2 transition-all ${
                          isCurrentAttempt ? 'bg-green-600' : 'bg-gray-600'
                        }`}
                        style={{ width: `${Math.max(percentage, count > 0 ? 8 : 0)}%` }}
                      >
                        {count > 0 && <span className="font-semibold">{count}</span>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {gameState.isGameOver && (
            <div className="border-t border-gray-700 pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xs text-gray-400">Próxima Palavra</div>
                  <div className="text-lg font-bold font-mono">{timeLeft}</div>
                </div>
                <Button
                  onClick={handleShare}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={copied}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

