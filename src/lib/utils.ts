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

// DEPRECATED: Usar src/lib/dates.ts para todas as operações de data
// Mantido apenas para compatibilidade temporária
export { getTodayDateKey, getTimeUntilMidnight } from './dates'

