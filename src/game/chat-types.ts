// src/game/chat-types.ts
// Tipos TypeScript para o sistema de chat WebSocket

/**
 * Tipos de mensagens do WebSocket Chat API v1.5
 */
export type ChatMessageType = 
  // Mensagens de chat
  | 'chat-message' 
  | 'user-joined' 
  | 'user-left' 
  | 'system'
  // Autenticação
  | 'request-auth'
  | 'auth'
  | 'auth-accepted'
  | 'session-replaced'
  // Estatísticas e controle
  | 'stats'
  | 'ping'
  | 'pong'
  | 'error'

export interface ChatMessage {
  type: ChatMessageType
  
  // Conteúdo da mensagem
  text?: string
  message?: string
  
  // Identificação
  nickname?: string
  userId?: string
  connectionId?: string
  
  // Contadores
  uniqueUsers?: number
  totalConnections?: number
  
  // Controle
  timestamp: string
  time?: number
}

export interface ChatUser {
  userId: string
  nickname: string
}

export interface ChatState {
  connected: boolean
  authenticated: boolean
  userId: string | null
  nickname: string | null
  messages: ChatMessage[]
  onlineCount: number
  error: string | null
  latency: number | null
}

export interface ChatWebSocketConfig {
  url: string
  autoConnect?: boolean
  maxStoredMessages?: number
  maxReconnectAttempts?: number
  reconnectDelayBase?: number
  heartbeatInterval?: number
}

export interface ChatCallbacks {
  onConnected?: () => void
  onDisconnected?: () => void
  onAuthenticated?: (nickname: string) => void
  onMessage?: (message: ChatMessage) => void
  onError?: (error: string) => void
  onUserJoined?: (nickname: string) => void
  onUserLeft?: (nickname: string) => void
}

