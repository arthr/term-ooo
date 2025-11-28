// src/components/DevModeDialog.tsx
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'
import { Button } from './ui/button'
import { Trash2, Eye, SkipForward, Trophy } from 'lucide-react'
import { GameState } from '@/game/types'

interface DevModeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  gameState: GameState
  onResetLocalStorage: () => void
  onSkipToWin: () => void
}

export function DevModeDialog({
  open,
  onOpenChange,
  gameState,
  onResetLocalStorage,
  onSkipToWin,
}: DevModeDialogProps) {
  const [confirmReset, setConfirmReset] = useState(false)

  const handleResetClick = () => {
    if (!confirmReset) {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 3000)
    } else {
      onResetLocalStorage()
      setConfirmReset(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gray-900 text-white border-red-700 border-2">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-red-500">
            🔓 Dev Mode
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            Ferramentas de desenvolvimento
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {/* Mostrar Soluções */}
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">Soluções</span>
              </div>
            </div>
            <div className="text-sm text-gray-400 mb-3">
              Palavras de hoje:
            </div>
            <div className="flex flex-wrap gap-2">
              {gameState.boards.map((board, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-600 rounded text-white font-bold uppercase"
                >
                  {board.solution}
                </span>
              ))}
            </div>
          </div>

          {/* Vitória Instantânea */}
          <Button
            onClick={onSkipToWin}
            disabled={gameState.isGameOver}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <Trophy className="w-4 h-4 mr-2" />
            {gameState.isGameOver ? 'Jogo Já Finalizado' : 'Vitória Instantânea'}
          </Button>

          {/* Skip Palavra */}
          <Button
            onClick={() => {
              window.location.reload()
            }}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Recarregar Página
          </Button>

          {/* Reset LocalStorage */}
          <Button
            onClick={handleResetClick}
            className={`w-full ${
              confirmReset
                ? 'bg-red-700 hover:bg-red-800 animate-pulse'
                : 'bg-red-600 hover:bg-red-700'
            } text-white`}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {confirmReset ? '⚠️ Clique Novamente para Confirmar' : 'Limpar LocalStorage'}
          </Button>

          <p className="text-xs text-center text-gray-500 pt-2">
            Use com cuidado! Essas ações podem afetar seu progresso.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

