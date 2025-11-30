// src/game/chat-types.ts
// Tipos TypeScript para o sistema de chat WebSocket

export type ChatMessageType = 
  | 'chat-message' 
  | 'user-joined' 
  | 'user-left' 
  | 'system'
  | 'request-nickname'
  | 'nickname-accepted'
  | 'error'
  | 'pong'
  | 'connections-count'

export interface ChatMessage {
  type: ChatMessageType
  text?: string
  nickname?: string
  userId?: string
  timestamp: string
  connections?: number
  message?: string
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

