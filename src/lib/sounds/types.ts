// src/lib/sounds/types.ts

export type SoundEvent = 
  | 'share'              // Compartilhar resultado
  | 'lastAttempt'        // Última tentativa (modo específico)
  | 'gameOver'           // Perdeu o jogo
  | 'firstTryWin'        // Ganhou na primeira tentativa
  | 'win'                // Ganhou (geral)
  | 'wrongWord'          // Palavra inválida
  | 'keyPress'           // Tecla pressionada (opcional)
  | 'waiting'            // Aguardando resposta

export interface SoundConfig {
  event: SoundEvent
  file: string
  volume?: number  // 0-1, default 1
  preload?: boolean // Precarregar na inicialização
}

