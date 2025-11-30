// src/hooks/useChatWebSocket.ts
// Hook customizado para gerenciar conexão WebSocket do chat

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChatState, ChatMessage, ChatWebSocketConfig, ChatCallbacks } from '@/game/chat-types'
import { CHAT_CONFIG } from '@/lib/chat-config'
import { 
  saveNickname, 
  loadNickname, 
  getFriendlyErrorMessage 
} from '@/lib/chat-utils'

interface UseChatWebSocketProps extends Partial<ChatWebSocketConfig> {
  callbacks?: ChatCallbacks
}

export function useChatWebSocket({ 
  url = CHAT_CONFIG.WS_URL,
  autoConnect = true,
  maxStoredMessages = CHAT_CONFIG.MAX_STORED_MESSAGES,
  maxReconnectAttempts = CHAT_CONFIG.MAX_RECONNECT_ATTEMPTS,
  reconnectDelayBase = CHAT_CONFIG.RECONNECT_DELAY_BASE,
  heartbeatInterval = CHAT_CONFIG.HEARTBEAT_INTERVAL,
  callbacks
}: UseChatWebSocketProps = {}) {
  
  // Estado do chat
  const [state, setState] = useState<ChatState>({
    connected: false,
    authenticated: false,
    userId: null,
    nickname: null,
    messages: [],
    onlineCount: 0,
    error: null,
    latency: null,
  })

  // Refs para gerenciar conexão
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectAttemptsRef = useRef(0)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastPingTimeRef = useRef<number | null>(null)
  const isIntentionalCloseRef = useRef(false)

  // Limpar timers
  const clearTimers = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current)
      heartbeatIntervalRef.current = null
    }
  }, [])

  // Adicionar mensagem ao histórico (limitado)
  const addMessage = useCallback((message: ChatMessage) => {
    setState(prev => {
      const newMessages = [...prev.messages, message]
      
      // Limitar número de mensagens em memória
      if (newMessages.length > maxStoredMessages) {
        newMessages.shift()
      }
      
      return { ...prev, messages: newMessages }
    })
  }, [maxStoredMessages])

  // Processar mensagem recebida
  const handleMessage = useCallback((data: ChatMessage) => {
    switch (data.type) {
      case 'request-nickname':
        setState(prev => ({
          ...prev,
          userId: data.userId || null,
          connected: true,
        }))
        
        // Tentar autenticar com nickname salvo
        const savedNickname = loadNickname()
        if (savedNickname) {
          // Aguardar um pouco antes de enviar (garantir que WS está pronto)
          setTimeout(() => {
            if (wsRef.current?.readyState === WebSocket.OPEN) {
              wsRef.current.send(JSON.stringify({
                type: 'set-nickname',
                nickname: savedNickname
              }))
            }
          }, 100)
        }
        break

      case 'nickname-accepted':
        setState(prev => ({
          ...prev,
          authenticated: true,
          nickname: data.nickname || null,
          onlineCount: data.connections || 0,
          error: null,
        }))
        
        // Salvar nickname
        if (data.nickname) {
          saveNickname(data.nickname)
        }
        
        callbacks?.onAuthenticated?.(data.nickname || '')
        break

      case 'chat-message':
        addMessage(data)
        setState(prev => ({
          ...prev,
          onlineCount: data.connections || prev.onlineCount,
        }))
        callbacks?.onMessage?.(data)
        break

      case 'user-joined':
        if (CHAT_CONFIG.SHOW_JOIN_LEAVE_NOTIFICATIONS) {
          addMessage({
            ...data,
            type: 'system',
            text: data.message || `${data.nickname} entrou no chat`,
          })
        }
        setState(prev => ({
          ...prev,
          onlineCount: data.connections || prev.onlineCount,
        }))
        callbacks?.onUserJoined?.(data.nickname || '')
        break

      case 'user-left':
        if (CHAT_CONFIG.SHOW_JOIN_LEAVE_NOTIFICATIONS) {
          addMessage({
            ...data,
            type: 'system',
            text: data.message || `${data.nickname} saiu do chat`,
          })
        }
        setState(prev => ({
          ...prev,
          onlineCount: data.connections || prev.onlineCount,
        }))
        callbacks?.onUserLeft?.(data.nickname || '')
        break

      case 'pong':
        // Calcular latência
        if (lastPingTimeRef.current) {
          const latency = Date.now() - lastPingTimeRef.current
          setState(prev => ({ ...prev, latency }))
          lastPingTimeRef.current = null
        }
        setState(prev => ({
          ...prev,
          onlineCount: data.connections || prev.onlineCount,
        }))
        break

      case 'connections-count':
        setState(prev => ({
          ...prev,
          onlineCount: data.connections || 0,
        }))
        break

      case 'error':
        const friendlyError = getFriendlyErrorMessage(data.message || 'Erro desconhecido')
        setState(prev => ({
          ...prev,
          error: friendlyError,
        }))
        callbacks?.onError?.(friendlyError)
        
        // Limpar erro após 5 segundos
        setTimeout(() => {
          setState(prev => ({ ...prev, error: null }))
        }, 5000)
        break
    }
  }, [addMessage, callbacks])

  // Iniciar heartbeat (ping periódico)
  const startHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current)
    }

    heartbeatIntervalRef.current = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        lastPingTimeRef.current = Date.now()
        wsRef.current.send(JSON.stringify({
          type: 'ping',
          time: lastPingTimeRef.current
        }))
      }
    }, heartbeatInterval)
  }, [heartbeatInterval])

  // Conectar ao WebSocket
  const connect = useCallback(() => {
    // Evitar múltiplas conexões
    if (wsRef.current?.readyState === WebSocket.OPEN || 
        wsRef.current?.readyState === WebSocket.CONNECTING) {
      return
    }

    try {
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        console.log('[Chat] Conectado ao servidor')
        reconnectAttemptsRef.current = 0
        setState(prev => ({ 
          ...prev, 
          connected: true,
          error: null,
        }))
        startHeartbeat()
        callbacks?.onConnected?.()
      }

      ws.onmessage = (event) => {
        try {
          const data: ChatMessage = JSON.parse(event.data)
          handleMessage(data)
        } catch (error) {
          console.error('[Chat] Erro ao parsear mensagem:', error)
        }
      }

      ws.onerror = (error) => {
        console.error('[Chat] Erro na conexão:', error)
      }

      ws.onclose = () => {
        console.log('[Chat] Desconectado')
        clearTimers()
        
        setState(prev => ({
          ...prev,
          connected: false,
          authenticated: false,
        }))
        
        callbacks?.onDisconnected?.()

        // Tentar reconectar se não foi intencional
        if (!isIntentionalCloseRef.current && 
            reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = reconnectDelayBase * Math.pow(2, reconnectAttemptsRef.current)
          console.log(`[Chat] Reconectando em ${delay}ms (tentativa ${reconnectAttemptsRef.current + 1}/${maxReconnectAttempts})`)
          
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current++
            connect()
          }, delay)
        } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
          setState(prev => ({
            ...prev,
            error: 'Falha ao conectar. Tente novamente mais tarde.',
          }))
        }
      }
    } catch (error) {
      console.error('[Chat] Erro ao criar WebSocket:', error)
      setState(prev => ({
        ...prev,
        error: 'Erro ao conectar ao servidor de chat',
      }))
    }
  }, [url, maxReconnectAttempts, reconnectDelayBase, callbacks, handleMessage, startHeartbeat, clearTimers])

  // Desconectar
  const disconnect = useCallback(() => {
    isIntentionalCloseRef.current = true
    clearTimers()
    
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    
    setState(prev => ({
      ...prev,
      connected: false,
      authenticated: false,
    }))
  }, [clearTimers])

  // Definir nickname
  const setNickname = useCallback((nickname: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setState(prev => ({
        ...prev,
        error: 'Não conectado ao servidor',
      }))
      return false
    }

    try {
      wsRef.current.send(JSON.stringify({
        type: 'set-nickname',
        nickname: nickname
      }))
      return true
    } catch (error) {
      console.error('[Chat] Erro ao enviar nickname:', error)
      return false
    }
  }, [])

  // Enviar mensagem
  const sendMessage = useCallback((text: string) => {
    if (!state.authenticated) {
      setState(prev => ({
        ...prev,
        error: 'Você precisa estar autenticado',
      }))
      return false
    }

    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setState(prev => ({
        ...prev,
        error: 'Não conectado ao servidor',
      }))
      return false
    }

    try {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        text: text
      }))
      return true
    } catch (error) {
      console.error('[Chat] Erro ao enviar mensagem:', error)
      return false
    }
  }, [state.authenticated])

  // Obter contagem de conexões
  const getConnectionsCount = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'get-connections'
      }))
    }
  }, [])

  // Enviar ping manual
  const ping = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      lastPingTimeRef.current = Date.now()
      wsRef.current.send(JSON.stringify({
        type: 'ping',
        time: lastPingTimeRef.current
      }))
    }
  }, [])

  // Auto-conectar se habilitado
  useEffect(() => {
    if (autoConnect && CHAT_CONFIG.ENABLED) {
      isIntentionalCloseRef.current = false
      connect()
    }

    return () => {
      isIntentionalCloseRef.current = true
      disconnect()
    }
  }, [autoConnect, connect, disconnect])

  return {
    // Estado
    ...state,
    
    // Ações
    connect,
    disconnect,
    setNickname,
    sendMessage,
    getConnectionsCount,
    ping,
    
    // Informações de status
    isConnecting: wsRef.current?.readyState === WebSocket.CONNECTING,
    canSendMessages: state.connected && state.authenticated,
  }
}

