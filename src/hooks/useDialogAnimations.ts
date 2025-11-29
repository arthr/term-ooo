/**
 * useDialogAnimations.ts
 * 
 * Hook reutilizável para animações de dialogs usando Framer Motion.
 * Elimina duplicação de código entre os 6 dialogs da aplicação.
 * 
 * @example
 * ```tsx
 * // Uso padrão
 * const { containerVariants, itemVariants } = useDialogAnimations()
 * 
 * // Customizado
 * const { containerVariants, itemVariants } = useDialogAnimations({
 *   staggerDelay: 0.15,
 *   itemDuration: 0.5,
 *   itemDirection: 'x',
 *   itemDistance: -10
 * })
 * ```
 */

import { useMemo } from 'react'

interface AnimationConfig {
  /**
   * Delay entre animações de itens filhos (em segundos)
   * @default 0.08
   */
  staggerDelay?: number
  
  /**
   * Delay antes de iniciar animações dos filhos (em segundos)
   * @default 0.05
   */
  childrenDelay?: number
  
  /**
   * Duração da animação de cada item (em segundos)
   * @default 0.3
   */
  itemDuration?: number
  
  /**
   * Direção do movimento do item (horizontal ou vertical)
   * @default 'y'
   */
  itemDirection?: 'y' | 'x'
  
  /**
   * Distância do movimento em pixels
   * @default 10
   */
  itemDistance?: number
}

interface AnimationVariants {
  containerVariants: {
    hidden: { opacity: number }
    visible: {
      opacity: number
      transition: {
        staggerChildren: number
        delayChildren: number
      }
    }
  }
  itemVariants: {
    hidden: { opacity: number; x?: number; y?: number }
    visible: {
      opacity: number
      x?: number
      y?: number
      transition: { duration: number }
    }
  }
}

/**
 * Hook para gerar variants de animação para dialogs
 * 
 * Cria containerVariants e itemVariants parametrizáveis para
 * animações consistentes em todos os dialogs da aplicação.
 * 
 * @param config - Configuração opcional das animações
 * @returns Objeto com containerVariants e itemVariants
 */
export function useDialogAnimations(config: AnimationConfig = {}): AnimationVariants {
  const {
    staggerDelay = 0.08,
    childrenDelay = 0.05,
    itemDuration = 0.3,
    itemDirection = 'y',
    itemDistance = 10,
  } = config

  // Usar useMemo para evitar recriação dos variants em cada render
  const variants = useMemo(() => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: childrenDelay,
        },
      },
    }

    const itemVariants = {
      hidden: { 
        opacity: 0, 
        [itemDirection]: itemDistance 
      },
      visible: {
        opacity: 1,
        [itemDirection]: 0,
        transition: { duration: itemDuration },
      },
    }

    return { containerVariants, itemVariants }
  }, [staggerDelay, childrenDelay, itemDuration, itemDirection, itemDistance])

  return variants
}

