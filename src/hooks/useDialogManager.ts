/**
 * useDialogManager.ts
 * 
 * Hook para gerenciar estado de dialogs da aplicação.
 * Consolida 6 estados booleanos em um único enum, prevenindo
 * que múltiplos dialogs sejam abertos simultaneamente.
 * 
 * @example
 * ```tsx
 * const dialogManager = useDialogManager()
 * 
 * // Verificar estado
 * dialogManager.dialogs.help.open  // boolean
 * dialogManager.hasOpenDialog      // boolean
 * 
 * // Abrir/fechar dialogs
 * dialogManager.dialogs.help.onOpen()
 * dialogManager.dialogs.help.onClose()
 * dialogManager.closeDialog()
 * 
 * // Passar para componentes
 * <HelpDialog 
 *   open={dialogManager.dialogs.help.open} 
 *   onOpenChange={(open) => !open && dialogManager.closeDialog()}
 * />
 * ```
 */

import { useState, useCallback, useMemo } from 'react'

/**
 * Tipos possíveis de dialogs na aplicação
 */
export type DialogType = 
  | 'help' 
  | 'stats' 
  | 'settings' 
  | 'dev' 
  | 'about' 
  | 'archive'
  | 'chat'
  | null

/**
 * Interface para helpers de cada dialog individual
 */
interface DialogHelper {
  open: boolean
  onOpen: () => void
  onClose: () => void
}

/**
 * Interface do retorno do hook
 */
interface DialogManager {
  /** Dialog atualmente ativo */
  activeDialog: DialogType
  /** Indica se há algum dialog aberto */
  hasOpenDialog: boolean
  /** Abre um dialog específico (fecha outros) */
  openDialog: (dialog: DialogType) => void
  /** Fecha o dialog ativo */
  closeDialog: () => void
  /** Verifica se um dialog específico está aberto */
  isOpen: (dialog: DialogType) => boolean
  /** Helpers para cada dialog */
  dialogs: {
    help: DialogHelper
    stats: DialogHelper
    settings: DialogHelper
    dev: DialogHelper
    about: DialogHelper
    archive: DialogHelper
    chat: DialogHelper
  }
}

/**
 * Hook para gerenciar dialogs da aplicação
 * 
 * Garante que apenas um dialog pode estar aberto por vez,
 * simplificando o gerenciamento de estado e prevenindo bugs.
 * 
 * @param initialDialog - Dialog inicial (padrão: null)
 * @returns Objeto com métodos e estado dos dialogs
 */
export function useDialogManager(initialDialog: DialogType = null): DialogManager {
  const [activeDialog, setActiveDialog] = useState<DialogType>(initialDialog)

  const openDialog = useCallback((dialog: DialogType) => {
    setActiveDialog(dialog)
  }, [])

  const closeDialog = useCallback(() => {
    setActiveDialog(null)
  }, [])

  const isOpen = useCallback((dialog: DialogType) => {
    return activeDialog === dialog
  }, [activeDialog])

  // Criar helpers para cada dialog (memoizado)
  const dialogs = useMemo(() => ({
    help: {
      open: isOpen('help'),
      onOpen: () => openDialog('help'),
      onClose: closeDialog,
    },
    stats: {
      open: isOpen('stats'),
      onOpen: () => openDialog('stats'),
      onClose: closeDialog,
    },
    settings: {
      open: isOpen('settings'),
      onOpen: () => openDialog('settings'),
      onClose: closeDialog,
    },
    dev: {
      open: isOpen('dev'),
      onOpen: () => openDialog('dev'),
      onClose: closeDialog,
    },
    about: {
      open: isOpen('about'),
      onOpen: () => openDialog('about'),
      onClose: closeDialog,
    },
    archive: {
      open: isOpen('archive'),
      onOpen: () => openDialog('archive'),
      onClose: closeDialog,
    },
    chat: {
      open: isOpen('chat'),
      onOpen: () => openDialog('chat'),
      onClose: closeDialog,
    },
  }), [isOpen, openDialog, closeDialog])

  const hasOpenDialog = activeDialog !== null

  return {
    activeDialog,
    hasOpenDialog,
    openDialog,
    closeDialog,
    isOpen,
    dialogs,
  }
}

