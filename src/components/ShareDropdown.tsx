// src/components/ShareDropdown.tsx

import { useState } from 'react'
import { Button } from './ui/button'
import { Share2, Type, Image, Check, Loader2 } from 'lucide-react'
import { useTemporaryState } from '@/hooks/useTemporaryState'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface ShareDropdownProps {
  /** Função para compartilhar como texto (funcionalidade atual) */
  onShareText: () => Promise<void> | void
  /** Função para compartilhar como imagem */
  onShareImage: () => Promise<void> | void
  /** Estado de loading durante compartilhamento */
  loading?: boolean
  /** Estado de sucesso (copiado) */
  copied?: boolean
  /** Desabilitar dropdown */
  disabled?: boolean
}

/**
 * Dropdown de compartilhamento com opções de texto e imagem
 * 
 * Menu expansível usando Radix UI Dropdown Menu (shadcn/ui).
 * Oferece duas formas de compartilhamento:
 * - Como texto (copia para clipboard)
 * - Como imagem (gera PNG e compartilha/baixa)
 */
export function ShareDropdown({
  onShareText,
  onShareImage,
  loading = false,
  copied = false,
  disabled = false,
}: ShareDropdownProps) {
  const [shareType, setShareType] = useState<'text' | 'image' | null>(null)
  const [localCopied, setLocalCopiedTemporary] = useTemporaryState()

  const handleShareText = async () => {
    setShareType('text')
    await onShareText()
    setLocalCopiedTemporary(2000)
    setShareType(null)
  }

  const handleShareImage = async () => {
    setShareType('image')
    await onShareImage()
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
              {shareType === 'image' ? 'Gerando...' : 'Copiando...'}
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
        className="bg-gray-800 border-gray-700"
      >
        <DropdownMenuItem
          onClick={handleShareImage}
          disabled={isLoading}
          className="cursor-pointer text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white"
        >
          <Image className="w-4 h-4 mr-2" />
          Compartilhar como Imagem
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-gray-700" />
        
        <DropdownMenuItem
          onClick={handleShareText}
          disabled={isLoading}
          className="cursor-pointer text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white"
        >
          <Type className="w-4 h-4 mr-2" />
          Compartilhar como Texto
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

