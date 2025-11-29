// src/components/DevModeDialog.tsx
import { motion, AnimatePresence } from 'framer-motion'
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
import { useDialogAnimations } from '@/hooks/useDialogAnimations'
import { useTemporaryState } from '@/hooks/useTemporaryState'

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
  const [confirmReset, setConfirmTemporary] = useTemporaryState()

  const handleResetClick = () => {
    if (!confirmReset) {
      setConfirmTemporary(3000)
    } else {
      onResetLocalStorage()
      onOpenChange(false)
    }
  }

  const { containerVariants, itemVariants } = useDialogAnimations({
    staggerDelay: 0.1,
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gradient-to-b from-gray-900 to-gray-800 text-white border-2 border-red-500 p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            🔓 Dev Mode
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400 text-sm">
            Ferramentas de desenvolvimento
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          <AnimatePresence>
            {open && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3 py-4 pr-4"
              >
                {/* Mostrar Soluções */}
                <motion.div variants={itemVariants} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
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
                </motion.div>

                {/* Vitória Instantânea */}
                <motion.div variants={itemVariants}>
                  <Button
                    onClick={onSkipToWin}
                    disabled={gameState.isGameOver}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    {gameState.isGameOver ? 'Jogo Já Finalizado' : 'Vitória Instantânea'}
                  </Button>
                </motion.div>

                {/* Skip Palavra */}
                <motion.div variants={itemVariants}>
                  <Button
                    onClick={() => {
                      window.location.reload()
                    }}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    <SkipForward className="w-4 h-4 mr-2" />
                    Recarregar Página
                  </Button>
                </motion.div>

                {/* Reset LocalStorage */}
                <motion.div variants={itemVariants}>
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
                </motion.div>

                <motion.p variants={itemVariants} className="text-xs text-center text-gray-500 pt-2">
                  Use com cuidado! Essas ações podem afetar seu progresso.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

