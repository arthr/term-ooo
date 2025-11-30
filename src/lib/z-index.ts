// src/lib/z-index.ts
// Centralização de z-indexes da aplicação

/**
 * Z-indexes padronizados para toda aplicação
 * Garante hierarquia consistente de camadas
 */
export const Z_INDEX = {
  /** Camada base (0) */
  BASE: 0,
  
  /** Elementos do jogo */
  GAME_BOARD: 1,
  KEYBOARD: 10,
  
  /** Header e navegação */
  HEADER: 20,
  TOP_TABS: 25,
  
  /** Botões flutuantes */
  CHAT_BUTTON: 40,
  
  /** Overlays de dialogs */
  DIALOG_OVERLAY: 50,
  DIALOG_CONTENT: 51,
  
  /** Chat (acima de dialogs) */
  CHAT_OVERLAY: 52,
  CHAT_PANEL: 53,
  
  /** Notificações e toasts */
  TOAST: 100,
} as const

export type ZIndexKey = keyof typeof Z_INDEX

