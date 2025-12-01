import { ReactNode } from 'react'
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from './ui/responsive-dialog'
import { cn } from '@/lib/utils'

interface DialogShellProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  borderColor: string
  titleGradientClassName: string
  children: ReactNode
  maxWidth?: 'md' | '2xl'
  maxHeight?: '85vh' | '90vh' | 'none'
  showDescription?: boolean
}

export function DialogShell({
  open,
  onOpenChange,
  title,
  description,
  borderColor,
  titleGradientClassName,
  children,
  maxWidth = 'md',
  maxHeight = '85vh',
  showDescription = false
}: DialogShellProps) {
  const maxWidthClass = maxWidth === '2xl' ? 'max-w-2xl' : 'max-w-md'
  const maxHeightClass = maxHeight === 'none' ? '' : `max-h-[${maxHeight}]`
  
  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent
        desktopClassName={cn(
          maxWidthClass,
          maxHeightClass,
          'bg-gradient-to-b from-gray-900 to-gray-800 text-white border-2 p-0'
        )}
        mobileClassName="max-w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white border-l-2 p-0"
        className={borderColor}
      >
        <ResponsiveDialogHeader 
          desktopClassName="px-6 pt-6 pb-2"
          mobileClassName="px-4 pt-6 pb-2 flex-shrink-0"
        >
          <ResponsiveDialogTitle 
            desktopClassName="text-2xl"
            mobileClassName="text-xl"
            className={cn('font-bold text-center bg-clip-text text-transparent', titleGradientClassName)}
          >
            {title}
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription 
            desktopClassName={showDescription ? "" : "sr-only"}
            mobileClassName={showDescription ? "text-center text-gray-400 text-xs pt-2" : "sr-only"}
          >
            {description}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        {children}
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  )
}
