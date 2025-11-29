import { ReactNode } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { cn } from '@/lib/utils'

interface DialogShellProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  borderColor: string
  titleGradientClassName: string
  children: ReactNode
}

export function DialogShell({
  open,
  onOpenChange,
  title,
  description,
  borderColor,
  titleGradientClassName,
  children
}: DialogShellProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'max-w-md bg-gradient-to-b from-gray-900 to-gray-800 text-white border-2 max-h-[85vh] p-0',
          borderColor
        )}
      >
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className={cn('text-2xl font-bold text-center bg-clip-text text-transparent', titleGradientClassName)}>
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  )
}
