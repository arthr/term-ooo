import { ScrollArea } from './scroll-area'
import { useResponsiveDialog } from './responsive-dialog'
import { cn } from '@/lib/utils'

interface ResponsiveScrollAreaProps {
  desktopClassName?: string
  mobileClassName?: string
  className?: string
  children: React.ReactNode
}

export function ResponsiveScrollArea({ 
  desktopClassName, 
  mobileClassName, 
  className,
  children 
}: ResponsiveScrollAreaProps) {
  const { isDesktop } = useResponsiveDialog()
  
  return (
    <ScrollArea 
      className={cn(
        isDesktop ? desktopClassName : mobileClassName,
        className
      )}
    >
      {children}
    </ScrollArea>
  )
}

