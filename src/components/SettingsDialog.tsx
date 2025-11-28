// src/components/SettingsDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Configurações</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between py-3 border-b border-gray-700">
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
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-700">
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
          </div>
          
          <div className="py-3 border-b border-gray-700">
            <button
              onClick={() => {
                onOpenChange(false)
                onOpenStats()
              }}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Ver Estatísticas
            </button>
          </div>
          
          <div className="text-xs text-gray-400 text-center py-2">
            <p>Jogo inspirado em Term.ooo / Wordle</p>
            <p className="mt-1">Clone educativo sem fins comerciais</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

