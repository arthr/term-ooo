// src/components/ShareDropdown.tsx

import { useState, useEffect, useCallback } from 'react'
import { Button } from './ui/button'
import { 
  Share2, 
  Type, 
  Image as ImageIcon, 
  Check, 
  Loader2, 
  MessageCircle, 
  MoreHorizontal, 
  Instagram 
} from 'lucide-react'
import { useTemporaryState } from '@/hooks/useTemporaryState'
import { generateShareText } from '@/game/engine'
import { GameState } from '@/game/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

// Ícone do X/Twitter
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

interface ShareDropdownProps {
  gameState: GameState
  /** Compartilha texto (Clipboard) */
  onShareText: () => Promise<void> | void
  /** * Compartilha Imagem. 
   * Graças ao seu hook useShareImage, isso já aciona o Menu Nativo (Instagram) no mobile.
   */
  onShareImage: () => Promise<void> | void
  onShare?: () => void
  loading?: boolean
  copied?: boolean
  disabled?: boolean
}

export function ShareDropdown({
  gameState,
  onShareText,
  onShareImage,
  onShare,
  loading = false,
  copied = false,
  disabled = false,
}: ShareDropdownProps) {
  const [isPending, setIsPending] = useState(false)
  const [localCopied, setLocalCopied] = useTemporaryState()
  
  // Estado para controlar capacidades do dispositivo
  const [capabilities, setCapabilities] = useState({
    canShareNative: false, // Pode abrir o menu nativo geral
    canShareFiles: false   // Pode compartilhar arquivos (Crucial para Instagram)
  })

  useEffect(() => {
    // 1. Verificação básica de ambiente
    if (typeof navigator === 'undefined' || !navigator.share) return

    let canFiles = false
    let canNative = true // Assume true se navigator.share existe (browsers antigos)

    // 2. Verificação robusta usando canShare
    if (navigator.canShare) {
      // Testa suporte a texto
      canNative = navigator.canShare({ title: 'T', text: 'T' })

      // Testa suporte a arquivos (necessário para Instagram)
      // Criamos um blob fake leve para validar
      try {
        const file = new File([new Blob(['t'])], 'test.png', { type: 'image/png' })
        canFiles = navigator.canShare({ files: [file] })
      } catch (e) {
        console.warn('Erro ao verificar suporte a arquivos:', e)
      }
    }

    setCapabilities({
      canShareNative: canNative,
      canShareFiles: canFiles
    })
  }, [])

  const getShareData = useCallback(() => {
    const isArchive = gameState.dateKey.startsWith('archive-')
    const text = generateShareText(gameState, isArchive)
    return { text, title: 'Meu resultado no Jogo.Work' }
  }, [gameState])

  // Wrapper para executar ações com loading state
  const executeShareAction = async (action: () => Promise<void> | void) => {
    try {
      setIsPending(true)
      await action()
      onShare?.()
    } finally {
      setIsPending(false)
    }
  }

  // --- AÇÕES ---

  // 1. WhatsApp (Deep Link)
  const handleWhatsApp = () => executeShareAction(() => {
    const { text } = getShareData()
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  })

  // 2. Twitter (Deep Link)
  const handleTwitter = () => executeShareAction(() => {
    const { text } = getShareData()
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
  })

  // 3. Nativo Texto (Menu do Sistema Genérico)
  const handleNativeShareText = () => executeShareAction(async () => {
    const { text, title } = getShareData()
    // Defensiva extra
    if (navigator.canShare && !navigator.canShare({ title, text })) return
    
    try {
      await navigator.share({ title, text })
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') console.error(err)
    }
  })

  // 4. Copiar Texto
  const handleCopyText = () => executeShareAction(async () => {
    await onShareText()
    setLocalCopied(2000)
  })

  const isLoading = (loading || isPending)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-green-600 hover:bg-green-700 transition-colors"
          disabled={disabled || isLoading}
        >
          {copied || localCopied ? (
            <>
              <Check className="w-4 h-4 mr-2" /> Copiado!
            </>
          ) : isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processando...
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 mr-2" /> Compartilhar
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-60 bg-gray-900 border-gray-800 text-gray-100">
        
        {/* Redes Sociais de Texto (Links Diretos) */}
        <DropdownMenuItem onClick={handleWhatsApp} disabled={isLoading} className="cursor-pointer focus:bg-gray-800 focus:text-white py-2.5">
          <MessageCircle className="w-4 h-4 mr-3 text-green-500" />
          WhatsApp
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleTwitter} disabled={isLoading} className="cursor-pointer focus:bg-gray-800 focus:text-white py-2.5">
          <XIcon className="w-4 h-4 mr-3 text-white" />
          X / Twitter
        </DropdownMenuItem>
        
        {/* Instagram / Stories */}
        {/* Só aparece se o navegador suportar envio de arquivos (Mobile) */}
        {capabilities.canShareFiles && (
          <DropdownMenuItem 
            onClick={() => executeShareAction(onShareImage)} 
            disabled={isLoading} 
            className="cursor-pointer focus:bg-gray-800 focus:text-white py-2.5"
          >
            <Instagram className="w-4 h-4 mr-3 text-pink-500" />
            Instagram
          </DropdownMenuItem>
        )}

        {/* Menu Nativo Genérico (Texto) */}
        {capabilities.canShareNative && (
          <DropdownMenuItem onClick={handleNativeShareText} disabled={isLoading} className="cursor-pointer focus:bg-gray-800 focus:text-white py-2.5">
            <MoreHorizontal className="w-4 h-4 mr-3 text-yellow-500" />
            Mais opções...
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator className="bg-gray-800 my-1" />
        
        {/* Ações de Arquivo e Clipboard */}
        <DropdownMenuItem onClick={() => executeShareAction(onShareImage)} disabled={isLoading} className="cursor-pointer focus:bg-gray-800 focus:text-white py-2.5">
          <ImageIcon className="w-4 h-4 mr-3 text-purple-400" />
          {capabilities.canShareFiles ? 'Baixar/Outros' : 'Baixar Imagem'}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleCopyText} disabled={isLoading} className="cursor-pointer focus:bg-gray-800 focus:text-white py-2.5">
          <Type className="w-4 h-4 mr-3 text-gray-400" />
          Copiar Texto
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}