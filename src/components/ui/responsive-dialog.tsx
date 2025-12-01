// src/components/ui/responsive-dialog.tsx
// Componente que automaticamente usa Dialog (desktop) ou Sheet (mobile)

import * as React from 'react'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface ResponsiveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

// Context para compartilhar se está em desktop ou mobile
const ResponsiveDialogContext = React.createContext<{ isDesktop: boolean }>({ isDesktop: true })

export function ResponsiveDialog({ open, onOpenChange, children }: ResponsiveDialogProps) {
  const isDesktop = useIsDesktop()

  if (isDesktop) {
    return (
      <ResponsiveDialogContext.Provider value={{ isDesktop: true }}>
        <Dialog open={open} onOpenChange={onOpenChange}>
          {children}
        </Dialog>
      </ResponsiveDialogContext.Provider>
    )
  }

  return (
    <ResponsiveDialogContext.Provider value={{ isDesktop: false }}>
      <Sheet open={open} onOpenChange={onOpenChange}>
        {children}
      </Sheet>
    </ResponsiveDialogContext.Provider>
  )
}

interface ResponsiveDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  desktopClassName?: string
  mobileClassName?: string
  className?: string
}

export function ResponsiveDialogContent({
  children,
  desktopClassName,
  mobileClassName,
  className,
  ...props
}: ResponsiveDialogContentProps) {
  const { isDesktop } = React.useContext(ResponsiveDialogContext)

  if (isDesktop) {
    return (
      <DialogContent className={cn(desktopClassName, className)} {...props}>
        {children}
      </DialogContent>
    )
  }

  // Mobile: sempre right + h-dvh
  return (
    <SheetContent 
      side="right"
      className={cn('h-dvh', mobileClassName, className)} 
      {...props}
    >
      {children}
    </SheetContent>
  )
}

interface ResponsiveDialogHeaderProps {
  children: React.ReactNode
  desktopClassName?: string
  mobileClassName?: string
  className?: string
}

export function ResponsiveDialogHeader({ children, desktopClassName, mobileClassName, className }: ResponsiveDialogHeaderProps) {
  const { isDesktop } = React.useContext(ResponsiveDialogContext)

  if (isDesktop) {
    return <DialogHeader className={cn(desktopClassName, className)}>{children}</DialogHeader>
  }

  return <SheetHeader className={cn(mobileClassName, className)}>{children}</SheetHeader>
}

interface ResponsiveDialogTitleProps {
  children: React.ReactNode
  desktopClassName?: string
  mobileClassName?: string
  className?: string
}

export function ResponsiveDialogTitle({ children, desktopClassName, mobileClassName, className }: ResponsiveDialogTitleProps) {
  const { isDesktop } = React.useContext(ResponsiveDialogContext)

  if (isDesktop) {
    return <DialogTitle className={cn(desktopClassName, className)}>{children}</DialogTitle>
  }

  return <SheetTitle className={cn(mobileClassName, className)}>{children}</SheetTitle>
}

interface ResponsiveDialogDescriptionProps {
  children: React.ReactNode
  desktopClassName?: string
  mobileClassName?: string
  className?: string
}

export function ResponsiveDialogDescription({ children, desktopClassName, mobileClassName, className }: ResponsiveDialogDescriptionProps) {
  const { isDesktop } = React.useContext(ResponsiveDialogContext)

  if (isDesktop) {
    return <DialogDescription className={cn(desktopClassName, className)}>{children}</DialogDescription>
  }

  return <SheetDescription className={cn(mobileClassName, className)}>{children}</SheetDescription>
}

// Hook para saber se está em desktop ou mobile dentro do dialog
export function useResponsiveDialog() {
  return React.useContext(ResponsiveDialogContext)
}

