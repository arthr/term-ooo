// src/lib/chat-utils.ts
// Utilitários para o sistema de chat

import { CHAT_CONFIG } from './chat-config'

/**
 * Gera um novo userId único usando crypto.randomUUID()
 */
export function generateUserId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function saveUserId(userId: string): void {
  try {
    localStorage.setItem(CHAT_CONFIG.STORAGE_KEY_USER_ID, userId)
  } catch (error) {
    console.warn('[Chat] Falha ao salvar userId:', error)
  }
}

export function loadUserId(): string | null {
  try {
    return localStorage.getItem(CHAT_CONFIG.STORAGE_KEY_USER_ID)
  } catch (error) {
    console.warn('[Chat] Falha ao carregar userId:', error)
    return null
  }
}

export function clearUserId(): void {
  try {
    localStorage.removeItem(CHAT_CONFIG.STORAGE_KEY_USER_ID)
  } catch (error) {
    console.warn('[Chat] Falha ao limpar userId:', error)
  }
}

export function sanitizeNickname(nickname: string): string {
  return nickname
    .trim()
    .slice(0, CHAT_CONFIG.MAX_NICKNAME_LENGTH)
    .replace(/[<>'"]/g, '')
    .replace(/\s+/g, ' ')
}
export function isValidNickname(nickname: string): boolean {
  const cleaned = sanitizeNickname(nickname)
  return (
    cleaned.length >= CHAT_CONFIG.MIN_NICKNAME_LENGTH &&
    cleaned.length <= CHAT_CONFIG.MAX_NICKNAME_LENGTH
  )
}

export function sanitizeMessage(text: string): string {
  return text
    .trim()
    .slice(0, CHAT_CONFIG.MAX_MESSAGE_LENGTH)
    .replace(/[<>]/g, '')
}
export function isValidMessage(text: string): boolean {
  const cleaned = sanitizeMessage(text)
  return cleaned.length > 0 && cleaned.length <= CHAT_CONFIG.MAX_MESSAGE_LENGTH
}

export function formatChatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const time = `${hours}:${minutes}`
    
    if (messageDate.getTime() === today.getTime()) {
      return time
    }
    
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (messageDate.getTime() === yesterday.getTime()) {
      return `Ontem ${time}`
    }
    
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${day}/${month} ${time}`
  } catch {
    return ''
  }
}

export function formatLatency(latency: number | null): string {
  if (latency === null) return '---'
  
  if (latency < 1000) {
    return `${Math.round(latency)}ms`
  }
  
  return `${(latency / 1000).toFixed(1)}s`
}

export function getLatencyColor(latency: number | null): string {
  if (latency === null) return 'text-gray-500'
  
  if (latency < 100) return 'text-green-500'
  if (latency < 300) return 'text-yellow-500'
  return 'text-red-500'
}

export function saveNickname(nickname: string): void {
  try {
    localStorage.setItem(CHAT_CONFIG.STORAGE_KEY_NICKNAME, nickname)
  } catch (error) {
    console.warn('[Chat] Falha ao salvar nickname:', error)
  }
}

export function loadNickname(): string | null {
  try {
    return localStorage.getItem(CHAT_CONFIG.STORAGE_KEY_NICKNAME)
  } catch (error) {
    console.warn('[Chat] Falha ao carregar nickname:', error)
    return null
  }
}

export function clearNickname(): void {
  try {
    localStorage.removeItem(CHAT_CONFIG.STORAGE_KEY_NICKNAME)
  } catch (error) {
    console.warn('[Chat] Falha ao limpar nickname:', error)
  }
}

export function saveChatMinimized(minimized: boolean): void {
  try {
    localStorage.setItem(CHAT_CONFIG.STORAGE_KEY_CHAT_MINIMIZED, String(minimized))
  } catch (error) {
    console.warn('[Chat] Falha ao salvar estado:', error)
  }
}

export function loadChatMinimized(): boolean {
  try {
    const value = localStorage.getItem(CHAT_CONFIG.STORAGE_KEY_CHAT_MINIMIZED)
    return value === 'true'
  } catch (error) {
    return true
  }
}

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

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}


