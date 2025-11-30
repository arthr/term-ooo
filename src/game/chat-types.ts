// src/game/chat-types.ts
// Tipos TypeScript para o sistema de chat WebSocket

/**
 * Tipos de mensagens do WebSocket Chat API v1.3
 * @see .docs/chat/WEBSOCKET_INTEGRATION.md
 */
export type ChatMessageType = 
  // Mensagens de chat
  | 'chat-message' 
  | 'user-joined' 
  | 'user-left' 
  | 'system'
  // Autenticação (v1.3)
  | 'request-auth'       // Server solicita autenticação
  | 'auth'               // Cliente envia credenciais
  | 'auth-accepted'      // Server confirma autenticação
  // Multi-conexão (v1.3)
  | 'new-connection'     // Nova aba/dispositivo do mesmo usuário
  | 'connection-closed'  // Aba/dispositivo desconectou
  // Estatísticas e controle
  | 'stats'              // Estatísticas detalhadas
  | 'ping'               // Cliente → Server (heartbeat)
  | 'pong'               // Server → Cliente (heartbeat response)
  | 'error'              // Erro do servidor

export interface ChatMessage {
  type: ChatMessageType
  
  // Conteúdo da mensagem
  text?: string
  message?: string
  
  // Identificação
  nickname?: string
  userId?: string           // UUID do usuário (gerado pelo cliente)
  connectionId?: string     // ID da conexão específica (gerado pelo servidor)
  
  // Contadores (v1.3)
  uniqueUsers?: number           // Usuários únicos por userId
  totalConnections?: number      // Total de conexões WebSocket
  totalUserConnections?: number  // Conexões do mesmo userId
  myConnections?: number         // Suas conexões (em stats)
  
  // Controle
  timestamp: string
  time?: number                  // Timestamp para ping/pong
  isNewConnection?: boolean      // Se é nova conexão do mesmo userId
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

