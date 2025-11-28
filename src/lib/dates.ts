// src/lib/dates.ts
// 🕐 MÓDULO CENTRAL DE DATAS
// Todas as operações de data/hora da aplicação devem usar estas funções

// Data inicial do Term.ooo: 1 de janeiro de 2022 às 00:00 (horário de São Paulo)
// Corrigido após análise dos logs: START_DAY = 1 (não 2)
const START_YEAR = 2022
const START_MONTH = 0 // Janeiro (0-indexed)
const START_DAY = 1

/**
 * Obtém a data de HOJE normalizada (00:00:00 local)
 * Esta é a ÚNICA função que deve criar "hoje" em toda a aplicação
 */
export function getTodayNormalized(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

/**
 * Obtém a data de início normalizada (00:00:00)
 */
export function getStartDate(): Date {
  return new Date(START_YEAR, START_MONTH, START_DAY)
}

/**
 * Calcula o número de dias desde o início (dayNumber)
 * Dia 1 = 02/01/2022
 */
export function getDayNumber(): number {
  const today = getTodayNormalized()
  const start = getStartDate()
  const diffTime = today.getTime() - start.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays + 1 // +1 porque o primeiro dia é 1, não 0
}

/**
 * Converte um dayNumber em uma Date
 * dayNumber 1 = 02/01/2022
 */
export function getDateFromDayNumber(dayNumber: number): Date {
  const start = getStartDate()
  const date = new Date(start)
  date.setDate(date.getDate() + dayNumber - 1)
  return date
}

/**
 * Converte uma Date em dayNumber
 */
export function getDayNumberFromDate(date: Date): number {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const start = getStartDate()
  const diffTime = normalized.getTime() - start.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays + 1
}

/**
 * Retorna a data de hoje como string no formato YYYY-MM-DD
 * Usado como chave no localStorage
 */
export function getTodayDateKey(): string {
  const today = getTodayNormalized()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Retorna o tempo até meia-noite no formato HH:MM:SS
 */
export function getTimeUntilMidnight(): string {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)
  
  const diff = midnight.getTime() - now.getTime()
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

