// src/lib/chat-config.ts
// Configurações centralizadas do sistema de chat

export const CHAT_CONFIG = {
  // URL do WebSocket (variável de ambiente com fallback)
  WS_URL: import.meta.env.VITE_CHAT_WS_URL || 'wss://term-ooo-chat.arthurtuio.workers.dev',
  
  // Feature flag - habilitar/desabilitar chat
  ENABLED: import.meta.env.VITE_CHAT_ENABLED !== 'false',
  
  // Limites de validação
  MAX_MESSAGE_LENGTH: 1000,
  MAX_NICKNAME_LENGTH: 20,
  MIN_NICKNAME_LENGTH: 2,
  MAX_STORED_MESSAGES: 100,
  
  // Configurações de reconexão
  MAX_RECONNECT_ATTEMPTS: 5,
  RECONNECT_DELAY_BASE: 1000,
  
  // Heartbeat
  HEARTBEAT_INTERVAL: 30000,
  
  // Chaves de persistência no localStorage
  STORAGE_KEY_USER_ID: 'term-ooo-chat-user-id',
  STORAGE_KEY_NICKNAME: 'term-ooo-chat-nickname',
  STORAGE_KEY_CHAT_ENABLED: 'term-ooo-chat-enabled',
  STORAGE_KEY_CHAT_MINIMIZED: 'term-ooo-chat-minimized',
  
  // UI/UX
  AUTO_SCROLL_THRESHOLD: 100,
  MESSAGE_ANIMATION_DURATION: 200,
  TYPING_INDICATOR_TIMEOUT: 3000,
  
  // Notificações
  SHOW_JOIN_LEAVE_NOTIFICATIONS: true,
  SHOW_SYSTEM_MESSAGES: true,
} as const

if (import.meta.env.DEV) {
  if (!CHAT_CONFIG.WS_URL.startsWith('ws://') && !CHAT_CONFIG.WS_URL.startsWith('wss://')) {
    console.warn('[Chat] URL do WebSocket inválida:', CHAT_CONFIG.WS_URL)
  }
  
  console.info('[Chat] Configuração carregada:', {
    enabled: CHAT_CONFIG.ENABLED,
    url: CHAT_CONFIG.WS_URL,
    maxMessages: CHAT_CONFIG.MAX_STORED_MESSAGES,
  })
}

