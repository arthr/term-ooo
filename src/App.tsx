// src/App.tsx
import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { GameMode, GameState, Settings, Stats } from './game/types'
import { getTodayDateKey } from './lib/utils'
import {
  createInitialGameState,
  getDayNumber,
  processGuess,
} from './game/engine'
import { storage } from './game/storage'
import { Header } from './components/Header'
import { TopTabs } from './components/TopTabs'
import { GameLayout } from './components/GameLayout'
import { Keyboard } from './components/Keyboard'
import { HelpDialog } from './components/HelpDialog'
import { StatsDialog } from './components/StatsDialog'
import { SettingsDialog } from './components/SettingsDialog'
import { DevModeDialog } from './components/DevModeDialog'

function Game() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [mode, setMode] = useState<GameMode>('termo')
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [settings, setSettings] = useState<Settings>(storage.getSettings())
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string>('')
  const [cursorPosition, setCursorPosition] = useState<number>(0)
  const [shouldShake, setShouldShake] = useState<boolean>(false)
  const [revealingRow, setRevealingRow] = useState<number>(-1)
  const [lastTypedIndex, setLastTypedIndex] = useState<number>(-1)
  const [happyRow, setHappyRow] = useState<number>(-1)
  const [happyBoards, setHappyBoards] = useState<number[]>([])
  
  const [helpOpen, setHelpOpen] = useState(false)
  const [statsOpen, setStatsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [devModeOpen, setDevModeOpen] = useState(false)

  // Determinar modo pela URL
  useEffect(() => {
    const path = location.pathname
    let newMode: GameMode = 'termo'
    
    if (path === '/2' || path === '/dueto') {
      newMode = 'dueto'
    } else if (path === '/4' || path === '/quarteto') {
      newMode = 'quarteto'
    }
    
    if (newMode !== mode) {
      setMode(newMode)
    }
  }, [location.pathname])

  // Carregar ou criar estado do jogo
  useEffect(() => {
    const dateKey = getTodayDateKey()
    const dayNumber = getDayNumber()
    
    const savedState = storage.getGameState(mode, dateKey)
    
    if (savedState && savedState.dateKey === dateKey) {
      setGameState(savedState)
      // Encontrar primeira posição vazia no array
      const firstEmpty = savedState.currentGuess.findIndex(c => c === '')
      setCursorPosition(firstEmpty === -1 ? 5 : firstEmpty)
      
      // Não abrir stats automaticamente ao carregar
      // Stats só abre após completar uma tentativa
    } else {
      const newState = createInitialGameState(mode, dayNumber, dateKey)
      setGameState(newState)
      storage.saveGameState(mode, dateKey, newState)
      setCursorPosition(0)
    }
    
    // IMPORTANTE: Sempre recarregar stats do modo atual
    const currentModeStats = storage.getStats(mode)
    setStats(currentModeStats)
  }, [mode])

  // Salvar configurações
  useEffect(() => {
    storage.saveSettings(settings)
  }, [settings])

  // Atualizar stats quando o jogo termina
  useEffect(() => {
    if (gameState && gameState.isGameOver && gameState.currentRow > 0) {
      // IMPORTANTE: Verificar se o modo do gameState corresponde ao modo atual
      // para evitar salvar stats no modo errado
      if (gameState.mode !== mode) {
        return
      }
      
      const currentStats = storage.getStats(mode)
      
      // Evitar atualizar estatísticas múltiplas vezes
      if (currentStats.lastGame?.dateKey === gameState.dateKey) {
        return
      }
      
      const newStats: Stats = {
        gamesPlayed: currentStats.gamesPlayed + 1,
        gamesWon: currentStats.gamesWon + (gameState.isWin ? 1 : 0),
        currentStreak: gameState.isWin ? currentStats.currentStreak + 1 : 0,
        maxStreak: gameState.isWin
          ? Math.max(currentStats.currentStreak + 1, currentStats.maxStreak)
          : currentStats.maxStreak,
        guessDistribution: [...currentStats.guessDistribution],
        lastGame: {
          won: gameState.isWin,
          attempts: gameState.currentRow,
          dateKey: gameState.dateKey,
        },
      }
      
      const attemptIndex = gameState.isWin ? gameState.currentRow - 1 : newStats.guessDistribution.length - 1
      newStats.guessDistribution[attemptIndex]++
      
      storage.saveStats(mode, newStats)
      setStats(newStats)
    }
  }, [gameState?.isGameOver, gameState?.mode, mode])

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
      setStatsOpen(true)
      setDevModeOpen(false)
    }, 500)
  }

  const handleTileClick = useCallback((position: number) => {
    if (!gameState || gameState.isGameOver) return
    setCursorPosition(position)
  }, [gameState])

  const handleKeyPress = useCallback((key: string) => {
    if (!gameState || gameState.isGameOver) return
    
    setError('')
    
    if (key === 'ENTER') {
      const result = processGuess(gameState, settings)
      
      if (result.error) {
        setError(result.error)
        setShouldShake(true)
        setTimeout(() => {
          setError('')
          setShouldShake(false)
        }, 500)
      } else {
        // Ativar animação de flip para a linha que acabou de ser submetida
        const submittedRow = gameState.currentRow
        setRevealingRow(submittedRow)
        
        // Resetar revealingRow após a animação (450ms + 100ms * 4 delays = 850ms)
        setTimeout(() => {
          setRevealingRow(-1)
        }, 900)
        
        // Detectar QUAIS boards foram completados NESTA jogada
        const newlyCompletedBoardIndices: number[] = []
        result.newState.boards.forEach((board, idx) => {
          if (board.isComplete && !gameState.boards[idx].isComplete) {
            newlyCompletedBoardIndices.push(idx)
          }
        })
        
        setGameState(result.newState)
        storage.saveGameState(mode, gameState.dateKey, result.newState)
        setCursorPosition(0)
        
        // Se algum board foi completado, ativar animação happy jump
        if (newlyCompletedBoardIndices.length > 0) {
          setTimeout(() => {
            setHappyRow(submittedRow)
            setHappyBoards(newlyCompletedBoardIndices)
            setTimeout(() => {
              setHappyRow(-1)
              setHappyBoards([])
            }, 1000)
          }, 1000) // Após o flip completar
        }
        
        if (result.newState.isGameOver) {
          setTimeout(() => setStatsOpen(true), newlyCompletedBoardIndices.length > 0 ? 2200 : 1200)
        }
      }
    } else if (key === 'BACKSPACE') {
      // Comportamento igual ao original:
      // Se posição atual tem letra: limpa ela
      // Se posição atual vazia: move cursor para trás e limpa
      let targetPos = cursorPosition
      
      if (gameState.currentGuess[cursorPosition] === '') {
        // Posição atual vazia, move para trás
        if (cursorPosition > 0) {
          targetPos = cursorPosition - 1
          setCursorPosition(targetPos)
        } else {
          return // Já no início e vazio, nada a fazer
        }
      }
      
      // Limpar a posição alvo
      const newGuess = [...gameState.currentGuess]
      newGuess[targetPos] = ''
      
      setGameState({
        ...gameState,
        currentGuess: newGuess,
      })
    } else if (key === 'ARROWLEFT') {
      setCursorPosition(Math.max(0, cursorPosition - 1))
    } else if (key === 'ARROWRIGHT') {
      setCursorPosition(Math.min(4, cursorPosition + 1))
    } else if (key === ' ') {
      // Buscar próxima posição vazia (space = moveEditToNext)
      let nextEmpty = -1
      for (let i = 1; i < 5; i++) {
        const pos = (cursorPosition + i) % 5
        if (gameState.currentGuess[pos] === '') {
          nextEmpty = pos
          break
        }
      }
      
      if (nextEmpty !== -1) {
        setCursorPosition(nextEmpty)
      } else {
        // Todas posições cheias, move para posição 5 (fora)
        setCursorPosition(5)
      }
    } else {
      // Digitar letra: SUBSTITUI na posição do cursor (não insere!)
      if (/^[A-Z]$/.test(key) && cursorPosition < 5) {
        const newGuess = [...gameState.currentGuess]
        newGuess[cursorPosition] = key.toLowerCase()
        
        // Ativar animação de digitação
        setLastTypedIndex(cursorPosition)
        setTimeout(() => setLastTypedIndex(-1), 150)
        
        setGameState({
          ...gameState,
          currentGuess: newGuess,
        })
        
        // Mover para próxima posição vazia (moveEditToNext)
        let nextEmpty = -1
        for (let i = 1; i < 5; i++) {
          const pos = (cursorPosition + i) % 5
          if (newGuess[pos] === '') {
            nextEmpty = pos
            break
          }
        }
        
        if (nextEmpty !== -1) {
          setCursorPosition(nextEmpty)
        } else {
          // Todas posições cheias, move para posição 5 (fora)
          setCursorPosition(5)
        }
      }
    }
  }, [gameState, settings, mode, cursorPosition])

  // Teclado físico
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (helpOpen || statsOpen || settingsOpen) return
      
      const key = e.key.toUpperCase()
      
      if (key === 'ENTER') {
        handleKeyPress('ENTER')
      } else if (key === 'BACKSPACE') {
        handleKeyPress('BACKSPACE')
      } else if (key === 'ARROWLEFT' || key === 'ARROWRIGHT') {
        e.preventDefault()
        handleKeyPress(key)
      } else if (key === ' ') {
        e.preventDefault()
        handleKeyPress(' ')
      } else if (/^[A-Z]$/.test(key)) {
        // Passar a tecla em maiúscula, será convertida para minúscula no handler
        handleKeyPress(key)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyPress, helpOpen, statsOpen, settingsOpen])

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
          setDevModeOpen(true)
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKonamiCode)
    return () => window.removeEventListener('keydown', handleKonamiCode)
  }, [])

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  const modeTitle = mode === 'termo' ? 'TERMO' : mode === 'dueto' ? 'DUETO' : 'QUARTETO'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col">
      <Header
        title={modeTitle}
        onHelp={() => setHelpOpen(true)}
        onStats={() => setStatsOpen(true)}
        onSettings={() => setSettingsOpen(true)}
      />
      
      <TopTabs currentMode={mode} onModeChange={handleModeChange} />
      
      <main className="flex-1 container mx-auto px-4 flex flex-col">
        {error && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
            {error}
          </div>
        )}
        
            <div className="flex-1 flex flex-col justify-between py-4 max-w-7xl mx-auto w-full">
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
          
          <div className="pb-4">
            <Keyboard
              keyStates={gameState.keyStates}
              onKeyPress={handleKeyPress}
              highContrast={settings.highContrast}
              disabled={gameState.isGameOver}
            />
          </div>
        </div>
      </main>
      
      <HelpDialog open={helpOpen} onOpenChange={setHelpOpen} />
      
      <StatsDialog
        open={statsOpen}
        onOpenChange={setStatsOpen}
        stats={stats}
        gameState={gameState}
      />
      
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={settings}
        onSettingsChange={setSettings}
        onOpenStats={() => {
          setSettingsOpen(false)
          setStatsOpen(true)
        }}
      />

      <DevModeDialog
        open={devModeOpen}
        onOpenChange={setDevModeOpen}
        gameState={gameState}
        onResetLocalStorage={handleResetLocalStorage}
        onSkipToWin={handleSkipToWin}
      />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter
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

