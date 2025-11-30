// src/hooks/useChatConnection.ts
// Hook para gerenciar conexão WebSocket, reconexão e heartbeat (v1.3)

import { useState, useEffect, useCallback, useRef } from 'react'
import { CHAT_CONFIG } from '@/lib/chat-config'

interface ConnectionState {
  connected: boolean
  isConnecting: boolean
  latency: number | null
  connectionId: string | null  // v1.3: ID da conexão específica
}

interface UseChatConnectionProps {
  url: string
  autoConnect?: boolean
  maxReconnectAttempts?: number
  reconnectDelayBase?: number
  heartbeatInterval?: number
  onMessage?: (data: any) => void
  onConnected?: () => void
  onDisconnected?: () => void
}

export function useChatConnection({
  url,
  autoConnect = true,
  maxReconnectAttempts = CHAT_CONFIG.MAX_RECONNECT_ATTEMPTS,
  reconnectDelayBase = CHAT_CONFIG.RECONNECT_DELAY_BASE,
  heartbeatInterval = CHAT_CONFIG.HEARTBEAT_INTERVAL,
  onMessage,
  onConnected,
  onDisconnected,
}: UseChatConnectionProps) {
  const [state, setState] = useState<ConnectionState>({
    connected: false,
    isConnecting: false,
    latency: null,
    connectionId: null,
  })

  const wsRef = useRef<WebSocket | null>(null)
  const reconnectAttemptsRef = useRef(0)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastPingTimeRef = useRef<number | null>(null)
  const isIntentionalCloseRef = useRef(false)
  const hasErrorRef = useRef(false)  // Detectar erro para interromper reconexão

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

  // Iniciar heartbeat
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

  // Conectar
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN || 
        wsRef.current?.readyState === WebSocket.CONNECTING) {
      return
    }

    setState(prev => ({ ...prev, isConnecting: true }))

    try {
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        reconnectAttemptsRef.current = 0
        hasErrorRef.current = false
        setState(prev => ({ ...prev, connected: true, isConnecting: false, latency: null }))
        startHeartbeat()
        onConnected?.()
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          
          // Processar pong localmente
          if (data.type === 'pong' && lastPingTimeRef.current) {
            const latency = Date.now() - lastPingTimeRef.current
            setState(prev => ({ ...prev, latency }))
            lastPingTimeRef.current = null
          }
          
          onMessage?.(data)
        } catch (error) {
          console.error('[ChatConnection] Erro ao parsear mensagem:', error)
        }
      }

      ws.onerror = () => {
        hasErrorRef.current = true
        setState(prev => ({ ...prev, isConnecting: false }))
      }

      ws.onclose = () => {
        clearTimers()
        setState(prev => ({ ...prev, connected: false, isConnecting: false, latency: null }))
        onDisconnected?.()

        // Reconectar apenas se não foi intencional, não houve erro e está dentro do limite
        const shouldReconnect = 
          !isIntentionalCloseRef.current && 
          !hasErrorRef.current &&
          reconnectAttemptsRef.current < maxReconnectAttempts

        if (shouldReconnect) {
          const delay = reconnectDelayBase * Math.pow(2, reconnectAttemptsRef.current)
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current++
            connect()
          }, delay)
        }
      }
    } catch (error) {
      console.error('[ChatConnection] Erro ao criar WebSocket:', error)
      setState(prev => ({ ...prev, isConnecting: false }))
    }
  }, [url, maxReconnectAttempts, reconnectDelayBase, onMessage, onConnected, onDisconnected, startHeartbeat, clearTimers])

  // Desconectar
  const disconnect = useCallback(() => {
    isIntentionalCloseRef.current = true
    hasErrorRef.current = false
    clearTimers()
    
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    
    setState(prev => ({ ...prev, connected: false, isConnecting: false, latency: null }))
  }, [clearTimers])

  // Enviar mensagem
  const send = useCallback((data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data))
      return true
    }
    return false
  }, [])

  // v1.3: Salvar connectionId recebido do servidor
  const setConnectionId = useCallback((connectionId: string) => {
    setState(prev => ({ ...prev, connectionId }))
  }, [])

  // Auto-conectar
  useEffect(() => {
    if (autoConnect) {
      isIntentionalCloseRef.current = false
      hasErrorRef.current = false
      connect()
    }

    return () => {
      isIntentionalCloseRef.current = true
      disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoConnect])

  return {
    ...state,
    wsRef,
    connect,
    disconnect,
    send,
    setConnectionId,  // v1.3: Expor método
  }
}

