import { useEffect, useState } from 'react'
import { NavigateFunction, Location } from 'react-router-dom'
import { GameMode } from '@/game/types'
import { getDayNumber } from '@/game/engine'

interface UseGameModeOptions {
  location: Location
  navigate: NavigateFunction
}

interface UseGameModeResult {
  mode: GameMode
  customDayNumber: number | null
}

export function useGameMode({ location, navigate }: UseGameModeOptions): UseGameModeResult {
  const [mode, setMode] = useState<GameMode>('termo')
  const [customDayNumber, setCustomDayNumber] = useState<number | null>(null)

  useEffect(() => {
    const path = location.pathname
    const searchParams = new URLSearchParams(location.search)
    const diaParam = searchParams.get('dia')

    let newMode: GameMode = 'termo'

    if (path === '/2' || path === '/dueto') {
      newMode = 'dueto'
    } else if (path === '/4' || path === '/quarteto') {
      newMode = 'quarteto'
    }

    if (newMode !== mode) {
      setMode(newMode)
    }

    if (diaParam) {
      const dayNum = parseInt(diaParam, 10)
      const currentDay = getDayNumber()

      if (!isNaN(dayNum) && dayNum > 0) {
        if (dayNum > currentDay) {
          const cleanPath = path || '/'
          navigate(cleanPath, { replace: true })
          setCustomDayNumber(null)
        } else {
          setCustomDayNumber(dayNum)
        }
      } else {
        setCustomDayNumber(null)
      }
    } else {
      setCustomDayNumber(null)
    }
  }, [location.pathname, location.search, navigate, mode])

  return { mode, customDayNumber }
}
