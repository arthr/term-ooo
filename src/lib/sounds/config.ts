// src/lib/sounds/config.ts

import { SoundConfig, SoundEvent } from './types'

export const SOUNDS_CONFIG: SoundConfig[] = [
  // Eventos principais (precarregados)
  {
    event: 'share',
    file: '/assets/sounds/share.mp3', // TODO: Criar sample de áudio
    volume: 0.7,
    preload: false
  },
  {
    event: 'waiting',
    file: '/assets/sounds/os_cara_no_teto.mp3', // Odemetro: Ó os cara no teto!
    volume: 0.5,
    preload: true
  },
  {
    event: 'lastAttempt',
    file: '/assets/sounds/eu_e_vc_gostoso.mp3', // SMzin: agora sou eu e você, meu gostoso!
    volume: 0.5,
    preload: true
  },
  {
    event: 'gameOver',
    file: '/assets/sounds/game-over.mp3', // TODO: Criar sample de áudio
    volume: 0.8,
    preload: false
  },
  {
    event: 'firstTryWin',
    file: '/assets/sounds/first-try-win.mp3', // TODO: Criar sample de áudio
    volume: 0.9,
    preload: false
  },
  
  // Eventos secundários (lazy load)
  {
    event: 'win',
    file: '/assets/sounds/win.mp3', // TODO: Criar sample de áudio
    volume: 0.7,
    preload: false
  },
  {
    event: 'wrongWord',
    file: '/assets/sounds/wrong-word.mp3', // TODO: Criar sample de áudio
    volume: 0.5,
    preload: false
  },
]

// Helper para pegar config de um evento
export function getSoundConfig(event: SoundEvent): SoundConfig | undefined {
  return SOUNDS_CONFIG.find(config => config.event === event)
}

