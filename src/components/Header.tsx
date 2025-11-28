// src/components/Header.tsx
import { HelpCircle, Settings, BarChart3 } from 'lucide-react'
import { Button } from './ui/button'

interface HeaderProps {
  title: string
  onHelp: () => void
  onStats: () => void
  onSettings: () => void
}

export function Header({ title, onHelp, onStats, onSettings }: HeaderProps) {
  return (
    <header className="w-full border-b border-gray-700 bg-gray-900">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onHelp}
            aria-label="Ajuda"
            className="text-gray-300 hover:text-white"
          >
            <HelpCircle className="w-6 h-6" />
          </Button>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
          {title}
        </h1>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onStats}
            aria-label="Estatísticas"
            className="text-gray-300 hover:text-white"
          >
            <BarChart3 className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettings}
            aria-label="Configurações"
            className="text-gray-300 hover:text-white"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}

