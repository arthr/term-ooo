// src/lib/share-config.ts

/**
 * Configurações para compartilhamento de imagem das estatísticas
 * 
 * Centraliza constantes relacionadas à geração de imagem
 * para facilitar personalização futura.
 */

export const SHARE_CONFIG = {
  /** Texto principal da marca d'água */
  BRANDING_TEXT: 'Jogo.Work',
  
  /** Subtítulo da marca d'água */
  BRANDING_SUBTITLE: 'Jogue em jogo.work',
  
  /** Largura da imagem gerada (px) */
  IMAGE_WIDTH: 600,
  
  /** Altura mínima da imagem gerada (px) */
  IMAGE_MIN_HEIGHT: 800,
  
  /** Cor de fundo da imagem (hex) */
  IMAGE_BG_COLOR: '#0f172a',
  
  /** Nome do arquivo ao fazer download */
  getFileName: (mode: string, dayNumber: number) => {
    return `${mode}-dia-${dayNumber}.png`
  },
} as const

