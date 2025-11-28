// src/components/SettingsDialog.tsx
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'
import { Switch } from './ui/switch'
import { Settings } from '@/game/types'

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  settings: Settings
  onSettingsChange: (settings: Settings) => void
  onOpenStats: () => void
}

export function SettingsDialog({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
  onOpenStats,
}: SettingsDialogProps) {
  const handleHighContrastChange = (checked: boolean) => {
    onSettingsChange({ ...settings, highContrast: checked })
  }

  const handleHardModeChange = (checked: boolean) => {
    onSettingsChange({ ...settings, hardMode: checked })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gradient-to-b from-gray-900 to-gray-800 text-white border-2 border-purple-600 p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Configurações
          </DialogTitle>
          <DialogDescription className="sr-only">
            Configurações do jogo incluindo modo difícil e alto contraste
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 pb-6">
          <AnimatePresence>
            {open && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6 py-4 pr-4"
              >
                <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-700">
                  <div className="flex-1">
                    <div className="font-semibold">Contraste Alto</div>
                    <div className="text-xs text-gray-400">
                      Para melhor distinção de cores
                    </div>
                  </div>
                  <Switch
                    checked={settings.highContrast}
                    onCheckedChange={handleHighContrastChange}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-center justify-between py-3 border-b border-gray-700">
                  <div className="flex-1">
                    <div className="font-semibold">Modo Difícil</div>
                    <div className="text-xs text-gray-400">
                      Todas as dicas devem ser usadas
                    </div>
                  </div>
                  <Switch
                    checked={settings.hardMode}
                    onCheckedChange={handleHardModeChange}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="py-3 border-b border-gray-700">
                  <button
                    onClick={() => {
                      onOpenChange(false)
                      onOpenStats()
                    }}
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                  >
                    Ver Estatísticas
                  </button>
                </motion.div>
                
                <motion.div variants={itemVariants} className="text-xs text-gray-400 text-center py-2 space-y-2">
                  <p>Jogo inspirado em Term.ooo / Wordle</p>
                  <p>Clone educativo sem fins comerciais</p>
                  
                  {/* Konami Code Hint */}
                  <div className="pt-2 border-t border-gray-800">
                    <p className="text-[10px] text-gray-600 flex items-center justify-center gap-1">
                      <span className="text-gray-500">🎮</span>
                      <span>Dev:</span>
                      <code className="bg-gray-800 px-1 rounded text-gray-500">↑↑↓↓←→←→BA</code>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

