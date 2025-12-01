// src/components/HelpDialog.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { Tile } from '../components/new/Tile'
import { useDialogAnimations } from '@/hooks/useDialogAnimations'
import { DialogShell } from './DialogShell'
import { ResponsiveScrollArea } from './ui/responsive-scroll-area'

interface HelpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  const { containerVariants, itemVariants } = useDialogAnimations({
    staggerDelay: 0.1,
    childrenDelay: 0.05,
    itemDuration: 0.4,
  })

  return (
    <DialogShell
      open={open}
      onOpenChange={onOpenChange}
      title="Como Jogar"
      description="Instruções sobre como jogar Termo, Dueto e Quarteto"
      borderColor="border-blue-600"
      titleGradientClassName="bg-gradient-to-r from-blue-400 to-cyan-500"
    >
      <ResponsiveScrollArea 
        desktopClassName="max-h-[calc(85vh-80px)] px-6"
        mobileClassName="h-[calc(100dvh-10rem)] px-4"
      >
          <AnimatePresence>
            {open && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4 text-sm py-4 pr-4"
              >
                <motion.p variants={itemVariants}>
                  Descubra a palavra certa em 6 tentativas (Termo), 7 tentativas (Dueto) ou 9 tentativas (Quarteto).
                </motion.p>
                
                <motion.p variants={itemVariants}>
                  Depois de cada tentativa, as peças mostram o quão perto você está da solução.
                </motion.p>
                
                <motion.div variants={itemVariants} className="space-y-3 py-2">
                  <div>
                    <p className="font-semibold mb-2">Exemplos:</p>
              <div className="flex gap-1 mb-2">
                <Tile letter="T" state="correct" gameMode="uno" />
                <Tile letter="E" state="empty" gameMode="uno" />
                <Tile letter="R" state="empty" gameMode="uno" />
                <Tile letter="M" state="empty" gameMode="uno" />
                <Tile letter="O" state="empty" gameMode="uno" />
              </div>
              <p className="text-xs text-gray-300">
                A letra <strong>T</strong> faz parte da palavra e está na posição correta.
              </p>
            </div>
            
            <div>
              <div className="flex gap-1 mb-2">
                <Tile letter="P" state="empty" gameMode="uno" />
                <Tile letter="I" state="present" gameMode="uno" />
                <Tile letter="L" state="empty" gameMode="uno" />
                <Tile letter="H" state="empty" gameMode="uno" />
                <Tile letter="A" state="empty" gameMode="uno" />
              </div>
              <p className="text-xs text-gray-300">
                A letra <strong>I</strong> faz parte da palavra, mas está na posição errada.
              </p>
            </div>
            
            <div>
              <div className="flex gap-1 mb-2">
                <Tile letter="F" state="empty" gameMode="uno" />
                <Tile letter="U" state="empty" gameMode="uno" />
                <Tile letter="N" state="absent" gameMode="uno" />
                <Tile letter="D" state="empty" gameMode="uno" />
                <Tile letter="O" state="empty" gameMode="uno" />
              </div>
                    <p className="text-xs text-gray-300">
                      A letra <strong>N</strong> não faz parte da palavra.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="border-t border-gray-700 pt-3 space-y-2 text-xs text-gray-300">
                  <p>
                    • Os acentos são preenchidos automaticamente, e não são considerados nas dicas.
                  </p>
                  <p>
                    • As palavras podem possuir letras repetidas.
                  </p>
                  <p>
                    • Uma palavra nova aparece a cada dia.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
      </ResponsiveScrollArea>
    </DialogShell>
  )
}

