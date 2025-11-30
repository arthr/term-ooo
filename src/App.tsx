// src/App.tsx
import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { GameMode, Settings } from './game/types'
import { processGuess } from './game/engine'
import { storage } from './game/storage'
import { Header } from './components/Header'
import { TopTabs } from './components/TopTabs'
import { GameLayout } from './components/GameLayout'
import { Keyboard } from './components/Keyboard'
import { HelpDialog } from './components/HelpDialog'
import { StatsDialog } from './components/StatsDialog'
import { SettingsDialog } from './components/SettingsDialog'
import { DevModeDialog } from './components/DevModeDialog'
import { AboutDialog } from './components/AboutDialog'
import { ArchiveDialog } from './components/ArchiveDialog'
import { ChatButton } from './components/Chat/ChatButton'
import { ChatPanel } from './components/Chat/ChatPanel'
import { useDialogManager } from './hooks/useDialogManager'
import { useGameAnimations } from './hooks/useGameAnimations'
import { useKeyboardInput } from './hooks/useKeyboardInput'
import { useGameMode } from './hooks/useGameMode'
import { usePersistentGameState } from './hooks/usePersistentGameState'
import { useStatsTracker } from './hooks/useStatsTracker'
import { useChatWebSocket } from './hooks/useChatWebSocket'
import { CHAT_CONFIG } from './lib/chat-config'

function Game() {
  const navigate = useNavigate()
  const location = useLocation()

  const [settings, setSettings] = useState<Settings>(storage.getSettings())
  const [error, setError] = useState<string>('')
  const [tabsVisible, setTabsVisible] = useState(false)

  const { mode, customDayNumber } = useGameMode({ location, navigate })

  // Gerenciamento unificado de dialogs (incluindo chat)
  const dialogManager = useDialogManager()

  // WebSocket Chat (apenas se habilitado)
  const chat = useChatWebSocket({
    autoConnect: CHAT_CONFIG.ENABLED,
  })

  // Estado do chat integrado ao dialogManager
  const chatOpen = dialogManager.isOpen('chat')

  // Gerenciamento unificado de animações
  const {
    cursorPosition,
    shouldShake,
    revealingRow,
    lastTypedIndex,
    happyRow,
    happyBoards,
    actions: animActions
  } = useGameAnimations()

  const { gameState, setGameState, stats, setStats } = usePersistentGameState({
    mode,
    customDayNumber,
    animActions,
    onCompletedGameLoad: useCallback(() => setTabsVisible(true), [])
  })

  useStatsTracker({ gameState, mode, customDayNumber, setStats })

  // Salvar configurações
  useEffect(() => {
    storage.saveSettings(settings)
  }, [settings])


  const handleModeChange = (newMode: GameMode) => {
    if (newMode === 'termo') {
      navigate('/')
    } else if (newMode === 'dueto') {
      navigate('/2')
    } else {
      navigate('/4')
    }
  }

  // Dev Mode handlers
  const handleResetLocalStorage = () => {
    localStorage.clear()
    window.location.reload()
  }

  const handleSkipToWin = () => {
    if (!gameState || gameState.isGameOver) return

    // Criar guess perfeito para todas as boards
    const perfectGuesses = gameState.boards.map(board => board.solution)

    // Simular guesses perfeitas até a vitória
    let currentState = gameState
    for (const solution of perfectGuesses) {
      // Preencher currentGuess com a solução
      const solutionArray = solution.split('').map(c => c.toLowerCase())
      currentState = { ...currentState, currentGuess: solutionArray }

      // Processar a guess
      const result = processGuess(currentState, settings)
      if (!result.error) {
        currentState = result.newState
      }
    }

    // Atualizar estado
    setGameState(currentState)
    storage.saveGameState(mode, currentState.dateKey, currentState)

    // Abrir stats após vitória
    setTimeout(() => {
      dialogManager.dialogs.stats.onOpen()
    }, 500)
  }

  const handleTileClick = useCallback((position: number) => {
    if (!gameState || gameState.isGameOver) return
    animActions.setCursorPosition(position)
  }, [gameState, animActions])

  // Handler para atualizar currentGuess
  const handleGuessChange = useCallback((newGuess: string[]) => {
    setGameState(prevState => {
      if (!prevState) return prevState

      return {
        ...prevState,
        currentGuess: newGuess,
      }
    })
  }, [])

  // Handler para submeter guess (ENTER)
  const handleSubmitGuess = useCallback(() => {
    if (!gameState) return

    const result = processGuess(gameState, settings)

    if (result.error) {
      setError(result.error)
      animActions.triggerShake()
      setTimeout(() => {
        setError('')
      }, 500)
    } else {
      // Ativar animação de flip para a linha que acabou de ser submetida
      const submittedRow = gameState.currentRow
      animActions.triggerFlip(submittedRow)

      // Detectar QUAIS boards foram completados NESTA jogada
      const newlyCompletedBoardIndices: number[] = []
      result.newState.boards.forEach((board, idx) => {
        if (board.isComplete && !gameState.boards[idx].isComplete) {
          newlyCompletedBoardIndices.push(idx)
        }
      })

      setGameState(result.newState)
      storage.saveGameState(mode, gameState.dateKey, result.newState)
      animActions.setCursorPosition(0)

      // Se algum board foi completado, ativar animação happy jump
      if (newlyCompletedBoardIndices.length > 0) {
        setTimeout(() => {
          animActions.triggerHappy(submittedRow, newlyCompletedBoardIndices)
        }, 1000) // Após o flip completar
      }

      if (result.newState.isGameOver) {
        setTimeout(() => dialogManager.dialogs.stats.onOpen(), newlyCompletedBoardIndices.length > 0 ? 2200 : 1200)
      }
    }
  }, [gameState, settings, mode, animActions, dialogManager])

  // Hook de keyboard input
  const { handleKey } = useKeyboardInput({
    gameState,
    onGuessChange: handleGuessChange,
    onSubmitGuess: handleSubmitGuess,
    onCursorMove: animActions.setCursorPosition,
    onTyping: animActions.triggerTyping,
    cursorPosition,
    disabled: dialogManager.hasOpenDialog
  })


  // Konami Code listener (↑ ↑ ↓ ↓ ← → ← → B A)
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'B', 'A']
    let konamiIndex = 0

    const handleKonamiCode = (e: KeyboardEvent) => {
      const key = e.key === 'b' || e.key === 'B' ? 'B' : e.key === 'a' || e.key === 'A' ? 'A' : e.key

      if (key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          // Konami Code completo!
          dialogManager.dialogs.dev.onOpen()
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKonamiCode)
    return () => window.removeEventListener('keydown', handleKonamiCode)
  }, [dialogManager.dialogs.dev])

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  const modeTitle = mode === 'termo' ? 'TERMO' : mode === 'dueto' ? 'DUETO' : 'QUARTETO'

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col">

      <TopTabs currentMode={mode} onModeChange={handleModeChange} isVisible={tabsVisible} />

      <Header
        title={modeTitle}
        onHelp={dialogManager.dialogs.help.onOpen}
        onStats={dialogManager.dialogs.stats.onOpen}
        onSettings={dialogManager.dialogs.settings.onOpen}
        onAbout={dialogManager.dialogs.about.onOpen}
        onArchive={dialogManager.dialogs.archive.onOpen}
        onToggleTabs={() => setTabsVisible(!tabsVisible)}
        tabsVisible={tabsVisible}
        isArchive={customDayNumber !== null}
        archiveDayNumber={customDayNumber || undefined}
      />

      <main className="flex-1 flex flex-col container mx-auto px-2">
        {error && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
            {error}
          </div>
        )}

        <div className="flex-1 flex flex-col justify-between mx-auto w-full">
          <GameLayout
            gameState={gameState}
            highContrast={settings.highContrast}
            cursorPosition={cursorPosition}
            shouldShake={shouldShake}
            onTileClick={handleTileClick}
            revealingRow={revealingRow}
            lastTypedIndex={lastTypedIndex}
            happyRow={happyRow}
            happyBoards={happyBoards}
          />

          <Keyboard
            keyStates={gameState.keyStates}
            onKeyPress={handleKey}
            highContrast={settings.highContrast}
            disabled={gameState.isGameOver}
          />
        </div>
      </main>

      <HelpDialog 
        open={dialogManager.dialogs.help.open} 
        onOpenChange={(open) => !open && dialogManager.closeDialog()} 
      />

      <StatsDialog
        open={dialogManager.dialogs.stats.open}
        onOpenChange={(open) => {
          if (!open) {
            dialogManager.closeDialog()
            // Quando fecha o StatsDialog após jogo concluído, mostrar TopTabs
            if (gameState.isGameOver) {
              setTabsVisible(true)
            }
          }
        }}
        stats={stats}
        gameState={gameState}
      />

      <SettingsDialog
        open={dialogManager.dialogs.settings.open}
        onOpenChange={(open) => !open && dialogManager.closeDialog()}
        settings={settings}
        onSettingsChange={setSettings}
        onOpenStats={() => {
          dialogManager.dialogs.stats.onOpen()
        }}
      />

      <DevModeDialog
        open={dialogManager.dialogs.dev.open}
        onOpenChange={(open) => !open && dialogManager.closeDialog()}
        gameState={gameState}
        onResetLocalStorage={handleResetLocalStorage}
        onSkipToWin={handleSkipToWin}
      />

      <AboutDialog
        open={dialogManager.dialogs.about.open}
        onOpenChange={(open) => !open && dialogManager.closeDialog()}
      />

      <ArchiveDialog
        open={dialogManager.dialogs.archive.open}
        onOpenChange={(open) => !open && dialogManager.closeDialog()}
        currentMode={mode}
      />

      {/* Chat WebSocket (apenas se habilitado) */}
      {CHAT_CONFIG.ENABLED && (
        <>
          <ChatButton
            onClick={dialogManager.dialogs.chat.onOpen}
            onlineCount={chat.onlineCount}
            connected={chat.connected}
          />

          <ChatPanel
            open={chatOpen}
            onClose={dialogManager.dialogs.chat.onClose}
            connected={chat.connected}
            authenticated={chat.authenticated}
            userId={chat.userId}
            nickname={chat.nickname}
            messages={chat.messages}
            onlineCount={chat.onlineCount}
            error={chat.error}
            latency={chat.latency}
            isConnecting={chat.isConnecting}
            onSetNickname={chat.setNickname}
            onSendMessage={chat.sendMessage}
          />
        </>
      )}
    </div>
  )
}

function App() {
  // Detectar se está em produção (GitHub Pages)
  const basename = import.meta.env.BASE_URL

  return (
    <BrowserRouter
      basename={basename}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/2" element={<Game />} />
        <Route path="/dueto" element={<Game />} />
        <Route path="/4" element={<Game />} />
        <Route path="/quarteto" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

