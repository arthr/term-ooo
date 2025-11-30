// src/lib/chat-utils.ts
// Utilitários para o sistema de chat

import { CHAT_CONFIG } from './chat-config'

/**
 * Sanitiza e valida nickname do usuário
 * Remove caracteres perigosos e limita tamanho
 */
export function sanitizeNickname(nickname: string): string {
  return nickname
    .trim()
    .slice(0, CHAT_CONFIG.MAX_NICKNAME_LENGTH)
    .replace(/[<>'"]/g, '') // Remove caracteres potencialmente perigosos
    .replace(/\s+/g, ' ') // Normaliza espaços múltiplos
}

/**
 * Valida se nickname está dentro das regras
 */
export function isValidNickname(nickname: string): boolean {
  const cleaned = sanitizeNickname(nickname)
  return (
    cleaned.length >= CHAT_CONFIG.MIN_NICKNAME_LENGTH &&
    cleaned.length <= CHAT_CONFIG.MAX_NICKNAME_LENGTH
  )
}

/**
 * Sanitiza mensagem do usuário
 * Remove HTML/scripts mas mantém conteúdo útil
 */
export function sanitizeMessage(text: string): string {
  return text
    .trim()
    .slice(0, CHAT_CONFIG.MAX_MESSAGE_LENGTH)
    .replace(/[<>]/g, '') // Previne injeção de HTML
}

/**
 * Valida se mensagem é válida para envio
 */
export function isValidMessage(text: string): boolean {
  const cleaned = sanitizeMessage(text)
  return cleaned.length > 0 && cleaned.length <= CHAT_CONFIG.MAX_MESSAGE_LENGTH
}

/**
 * Formata timestamp do servidor para exibição
 * Exemplo: "14:30" ou "Ontem às 14:30"
 */
export function formatChatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const time = `${hours}:${minutes}`
    
    // Hoje - apenas hora
    if (messageDate.getTime() === today.getTime()) {
      return time
    }
    
    // Ontem
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (messageDate.getTime() === yesterday.getTime()) {
      return `Ontem ${time}`
    }
    
    // Mais antigo - data completa
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${day}/${month} ${time}`
  } catch {
    return ''
  }
}

/**
 * Formata latência para exibição
 * Exemplo: "42ms" ou "1.2s"
 */
export function formatLatency(latency: number | null): string {
  if (latency === null) return '---'
  
  if (latency < 1000) {
    return `${Math.round(latency)}ms`
  }
  
  return `${(latency / 1000).toFixed(1)}s`
}

/**
 * Obtém cor baseada na latência
 * Verde: < 100ms, Amarelo: 100-300ms, Vermelho: > 300ms
 */
export function getLatencyColor(latency: number | null): string {
  if (latency === null) return 'text-gray-500'
  
  if (latency < 100) return 'text-green-500'
  if (latency < 300) return 'text-yellow-500'
  return 'text-red-500'
}

/**
 * Persiste nickname no localStorage
 */
export function saveNickname(nickname: string): void {
  try {
    localStorage.setItem(CHAT_CONFIG.STORAGE_KEY_NICKNAME, nickname)
  } catch (error) {
    console.warn('[Chat] Falha ao salvar nickname:', error)
  }
}

/**
 * Recupera nickname salvo do localStorage
 */
export function loadNickname(): string | null {
  try {
    return localStorage.getItem(CHAT_CONFIG.STORAGE_KEY_NICKNAME)
  } catch (error) {
    console.warn('[Chat] Falha ao carregar nickname:', error)
    return null
  }
}

/**
 * Remove nickname do localStorage
 */
export function clearNickname(): void {
  try {
    localStorage.removeItem(CHAT_CONFIG.STORAGE_KEY_NICKNAME)
  } catch (error) {
    console.warn('[Chat] Falha ao limpar nickname:', error)
  }
}

/**
 * Persiste estado do chat (aberto/minimizado)
 */
export function saveChatMinimized(minimized: boolean): void {
  try {
    localStorage.setItem(CHAT_CONFIG.STORAGE_KEY_CHAT_MINIMIZED, String(minimized))
  } catch (error) {
    console.warn('[Chat] Falha ao salvar estado:', error)
  }
}

/**
 * Recupera estado do chat
 */
export function loadChatMinimized(): boolean {
  try {
    const value = localStorage.getItem(CHAT_CONFIG.STORAGE_KEY_CHAT_MINIMIZED)
    return value === 'true'
  } catch (error) {
    return true // Padrão: minimizado
  }
}

/**
 * Gera mensagem de erro amigável baseada no tipo
 */
export function getFriendlyErrorMessage(errorMessage: string): string {
  if (errorMessage.includes('já está em uso')) {
    return 'Este nickname já está sendo usado. Tente outro!'
  }
  
  if (errorMessage.includes('caracteres')) {
    return 'Nickname deve ter entre 2 e 20 caracteres'
  }
  
  if (errorMessage.includes('autenticado') || errorMessage.includes('nickname')) {
    return 'Você precisa definir um nickname primeiro'
  }
  
  return errorMessage
}

/**
 * Trunca texto longo para preview
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

