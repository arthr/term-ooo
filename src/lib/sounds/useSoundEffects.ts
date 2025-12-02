// src/lib/sounds/useSoundEffects.ts

import { useCallback, useEffect, useRef } from 'react'
import { SoundEvent } from './types'
import { SOUNDS_CONFIG, getSoundConfig } from './config'
import type { Settings } from '@/game/types'

interface UseSoundEffectsOptions {
  settings: Settings
  enabled?: boolean // Override global (útil para testes)
}

export function useSoundEffects({ settings, enabled = true }: UseSoundEffectsOptions) {
  // Cache de Audio objects
  const audioCache = useRef<Map<SoundEvent, HTMLAudioElement>>(new Map())
  
  // Preload de sons marcados como preload: true
  useEffect(() => {
    if (!settings.soundEnabled || !enabled) return
    
    const preloadSounds = SOUNDS_CONFIG.filter(config => config.preload)
    
    preloadSounds.forEach(config => {
      const audio = new Audio(config.file)
      audio.volume = config.volume ?? 1
      audio.preload = 'auto'
      audioCache.current.set(config.event, audio)
    })
    
    // Cleanup
    return () => {
      audioCache.current.forEach(audio => {
        audio.pause()
        audio.src = ''
      })
      audioCache.current.clear()
    }
  }, [settings.soundEnabled, enabled])
  
  // Função principal para tocar sons
  const play = useCallback((event: SoundEvent) => {
    // Verificar se som está habilitado
    if (!settings.soundEnabled || !enabled) return
    
    const config = getSoundConfig(event)
    if (!config) {
      console.warn(`Sound event "${event}" not configured`)
      return
    }
    
    // Pegar do cache ou criar novo
    let audio = audioCache.current.get(event)
    
    if (!audio) {
      audio = new Audio(config.file)
      audio.volume = config.volume ?? 1
      audioCache.current.set(event, audio)
    }
    
    // Reset e play (permite tocar o mesmo som múltiplas vezes)
    audio.currentTime = 0
    audio.play().catch(err => {
      // Ignorar erros de autoplay (navegador pode bloquear)
      console.debug(`Could not play sound "${event}":`, err)
    })
  }, [settings.soundEnabled, enabled])
  
  // Função para mutar todos os sons
  const mute = useCallback(() => {
    audioCache.current.forEach(audio => {
      audio.pause()
    })
  }, [])
  
  return { play, mute }
}

