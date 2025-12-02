/**
 * useShareImage.ts
 * 
 * Hook para compartilhar elementos DOM como imagem.
 * Converte HTML/CSS em PNG usando html-to-image e compartilha via Web Share API
 * com fallback para download no desktop.
 * 
 * @example
 * ```tsx
 * const shareRef = useRef(null)
 * const { shareAsImage, loading } = useShareImage()
 * 
 * const handleShare = async () => {
 *   await shareAsImage(shareRef, {
 *     fileName: 'resultado.png',
 *     onSuccess: () => console.log('Compartilhado!'),
 *     onError: (err) => console.error(err)
 *   })
 * }
 * ```
 */

import { useState, useCallback } from 'react'
import { toBlob } from 'html-to-image'

interface ShareImageOptions {
  /** Nome do arquivo para download/compartilhamento */
  fileName?: string
  /** Callback de sucesso */
  onSuccess?: () => void
  /** Callback de erro */
  onError?: (error: Error) => void
  /** Título para compartilhamento */
  title?: string
  /** Texto para compartilhamento */
  text?: string
}

interface UseShareImageReturn {
  /** Função para compartilhar elemento como imagem */
  shareAsImage: (
    ref: React.RefObject<HTMLElement>,
    options?: ShareImageOptions
  ) => Promise<void>
  /** Estado de loading durante geração */
  loading: boolean
  /** Último erro ocorrido */
  error: Error | null
}

/**
 * Hook para compartilhar elementos DOM como imagem
 * 
 * Utiliza html-to-image para converter DOM em Blob PNG e
 * tenta usar Web Share API Level 2 (mobile), com fallback
 * para download no desktop.
 * 
 * @returns Objeto com função shareAsImage, loading e error
 */
export function useShareImage(): UseShareImageReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const shareAsImage = useCallback(
    async (
      ref: React.RefObject<HTMLElement>,
      options: ShareImageOptions = {}
    ) => {
      const {
        fileName = 'termo-resultado.png',
        onSuccess,
        onError,
        title = 'Meu resultado no Termo',
        text = 'Veja como me saí no Termo!',
      } = options

      // Validar ref
      if (!ref.current) {
        const err = new Error('Elemento não encontrado para captura')
        setError(err)
        onError?.(err)
        return
      }

      setLoading(true)
      setError(null)

      try {
        // 1. Gerar Blob da imagem a partir do elemento DOM
        const blob = await toBlob(ref.current, {
          cacheBust: true,
          pixelRatio: 2, // Melhor qualidade para telas retina
          style: {
            // Garantir que o fundo seja renderizado
            backgroundColor: '#0f172a',
          },
        })

        if (!blob) {
          throw new Error('Falha ao gerar imagem')
        }

        // 2. Criar arquivo para compartilhamento
        const file = new File([blob], fileName, { type: 'image/png' })

        // 3. Tentar Web Share API (mobile nativo)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          const shareData = {
            files: [file],
            title,
            text,
          }

          await navigator.share(shareData)
          onSuccess?.()
        } else {
          // 4. Fallback para Desktop: Baixar a imagem
          const link = document.createElement('a')
          link.download = fileName
          link.href = URL.createObjectURL(blob)
          link.click()

          // Limpar URL object após uso
          setTimeout(() => URL.revokeObjectURL(link.href), 100)
          
          onSuccess?.()
        }
      } catch (err) {
        // Ignorar erro de cancelamento do usuário
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('Compartilhamento cancelado pelo usuário')
        } else {
          const error = err instanceof Error ? err : new Error('Erro ao compartilhar')
          console.error('Erro ao compartilhar imagem:', error)
          setError(error)
          onError?.(error)
        }
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    shareAsImage,
    loading,
    error,
  }
}

