// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Normaliza string exatamente como o Term.ooo original (função fh)
// Remove acentos e mantém MINÚSCULAS (não converte para maiúsculas)
export function normalizeString(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[^\w]/g, '') // Regex original: remove tudo que não é palavra
    .toLowerCase() // Importante: manter minúsculas como o original
}

export function getTodayDateKey(): string {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
}

export function getDaysSinceStart(startDate: Date): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  startDate.setHours(0, 0, 0, 0)
  return Math.floor((today.getTime() - startDate.getTime()) / 86400000)
}

export function getTimeUntilMidnight(): string {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  
  const diff = midnight.getTime() - now.getTime()
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

