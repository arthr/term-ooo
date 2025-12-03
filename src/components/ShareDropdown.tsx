// src/components/ShareDropdown.tsx

import { useState } from 'react'
import { Button } from './ui/button'
import { Share2, Type, Image, Check, Loader2, MessageCircle } from 'lucide-react'
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

// Ícone do X/Twitter (SVG inline)
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

interface ShareDropdownProps {
  /** Estado do jogo para gerar texto de compartilhamento */
  gameState: GameState
  /** Função para compartilhar como texto (funcionalidade atual) */
  onShareText: () => Promise<void> | void
  /** Função para compartilhar como imagem */
  onShareImage: () => Promise<void> | void
  /** Callback após compartilhar (para tocar som, analytics, etc) */
  onShare?: () => void
  /** Estado de loading durante compartilhamento */
  loading?: boolean
  /** Estado de sucesso (copiado) */
  copied?: boolean
  /** Desabilitar dropdown */
  disabled?: boolean
}

/**
 * Dropdown de compartilhamento com múltiplas opções
 * 
 * Menu expansível usando Radix UI Dropdown Menu (shadcn/ui).
 * Oferece várias formas de compartilhamento:
 * - Como imagem (PNG via Web Share API ou download)
 * - Como texto (copia para clipboard)
 * - Direto no WhatsApp
 * - Direto no Twitter/X
 */
export function ShareDropdown({
  gameState,
  onShareText,
  onShareImage,
  onShare,
  loading = false,
  copied = false,
  disabled = false,
}: ShareDropdownProps) {
  const [shareType, setShareType] = useState<'text' | 'image' | 'whatsapp' | 'twitter' | null>(null)
  const [localCopied, setLocalCopiedTemporary] = useTemporaryState()

  const handleShareText = async () => {
    setShareType('text')
    await onShareText()
    setLocalCopiedTemporary(2000)
    onShare?.()
    setShareType(null)
  }

  const handleShareImage = async () => {
    setShareType('image')
    await onShareImage()
    onShare?.()
    setShareType(null)
  }

  const handleShareWhatsApp = () => {
    setShareType('whatsapp')
    
    // Detectar se é arquivo
    const isArchive = gameState.dateKey.startsWith('archive-')
    const text = generateShareText(gameState, isArchive)
    const encodedText = encodeURIComponent(text)
    
    // Abrir WhatsApp com texto pré-preenchido
    window.open(`https://wa.me/?text=${encodedText}`, '_blank')
    
    onShare?.()
    setShareType(null)
  }

  const handleShareTwitter = () => {
    setShareType('twitter')
    
    // Detectar se é arquivo
    const isArchive = gameState.dateKey.startsWith('archive-')
    const text = generateShareText(gameState, isArchive)
    const encodedText = encodeURIComponent(text)
    
    // Abrir Twitter com texto pré-preenchido
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank')
    
    onShare?.()
    setShareType(null)
  }

  const isLoading = loading && shareType !== null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-green-600 hover:bg-green-700"
          disabled={disabled || isLoading}
        >
          {copied || localCopied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copiado!
            </>
          ) : isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {shareType === 'image' ? 'Gerando...' : 'Compartilhando...'}
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end"
        className="bg-gray-800 border-gray-700 w-56"
      >
        {/* Compartilhamento Direto */}
        <DropdownMenuItem
          onClick={handleShareWhatsApp}
          disabled={isLoading}
          className="cursor-pointer text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white"
        >
          <MessageCircle className="w-4 h-4 mr-2 text-green-400" />
          <span>Compartilhar no WhatsApp</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={handleShareTwitter}
          disabled={isLoading}
          className="cursor-pointer text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white"
        >
          <XIcon className="w-4 h-4 mr-2 text-blue-400" />
          <span>Compartilhar no X/Twitter</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-gray-700" />
        
        {/* Compartilhamento Manual */}
        <DropdownMenuItem
          onClick={handleShareImage}
          disabled={isLoading}
          className="cursor-pointer text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white"
        >
          <Image className="w-4 h-4 mr-2" />
          <span>Compartilhar como Imagem</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={handleShareText}
          disabled={isLoading}
          className="cursor-pointer text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white"
        >
          <Type className="w-4 h-4 mr-2" />
          <span>Copiar como Texto</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
