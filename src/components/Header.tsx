// src/components/Header.tsx
import { useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { HelpCircle, Settings, BarChart3, Info, ChevronDown, Calendar, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

interface HeaderProps {
  title: string
  onHelp: () => void
  onStats: () => void
  onSettings: () => void
  onAbout: () => void
  onArchive: () => void
  onToggleTabs: () => void
  tabsVisible: boolean
  isArchive: boolean
  archiveDayNumber?: number
}

export function Header({ 
  title, 
  onHelp, 
  onStats, 
  onSettings, 
  onAbout, 
  onArchive, 
  onToggleTabs, 
  tabsVisible, 
  isArchive, 
  archiveDayNumber 
}: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleBodaoClick = () => {
    // Evitar sobreposição e múltiplos disparos
    if (isPlaying || !audioRef.current) return

    setIsPlaying(true)
    audioRef.current.currentTime = 0 // Reset para o início
    audioRef.current.play()
      .catch((error) => {
        console.error('Erro ao tocar áudio:', error)
        setIsPlaying(false)
      })
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const handleBackToToday = () => {
    // Remover query param e voltar para o dia atual
    const path = location.pathname
    navigate(path)
  }

  return (
    <header className="w-full border-b border-gray-700 bg-gray-900">
      {/* Áudio do Bodão (oculto) */}
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}assets/mp3/bodao.mp3`}
        onEnded={handleAudioEnded}
        preload="auto"
      />

      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTabs}
            aria-label="Alternar modos de jogo"
            className={`text-gray-300 hover:text-white transition-colors ${tabsVisible ? 'text-green-400' : ''}`}
          >
            <motion.div
              animate={{ rotate: tabsVisible ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onHelp}
            aria-label="Ajuda"
            className="text-gray-300 hover:text-white"
          >
            <HelpCircle className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBodaoClick}
            aria-label="Bodão! Béééééé!"
            disabled={isPlaying}
            className={`text-2xl hover:scale-110 transition-transform ${isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-125'}`}
          >
            🐐
          </Button>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
            {title}
          </h1>
          {isArchive && archiveDayNumber && (
            <div className="text-xs bg-yellow-600 text-white px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
              🕰️ Arquivo - Dia #{archiveDayNumber}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {isArchive ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToToday}
              aria-label="Voltar para Hoje"
              className="text-green-400 hover:text-green-300"
            >
              <Home className="w-6 h-6" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={onArchive}
              aria-label="Arquivo de Dias Anteriores"
              className="text-gray-300 hover:text-white"
            >
              <Calendar className="w-6 h-6" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onAbout}
            aria-label="Sobre"
            className="text-gray-300 hover:text-white"
          >
            <Info className="w-6 h-6" />
          </Button>
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

