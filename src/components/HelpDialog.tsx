// src/components/HelpDialog.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollArea } from './ui/scroll-area'
import { Tile } from './Tile'
import { useDialogAnimations } from '@/hooks/useDialogAnimations'
import { DialogShell } from './DialogShell'

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
      <ScrollArea className="max-h-[calc(85vh-80px)] px-6">
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
                <Tile letter="T" state="correct" />
                <Tile letter="E" state="empty" />
                <Tile letter="R" state="empty" />
                <Tile letter="M" state="empty" />
                <Tile letter="O" state="empty" />
              </div>
              <p className="text-xs text-gray-300">
                A letra <strong>T</strong> faz parte da palavra e está na posição correta.
              </p>
            </div>
            
            <div>
              <div className="flex gap-1 mb-2">
                <Tile letter="P" state="empty" />
                <Tile letter="I" state="present" />
                <Tile letter="L" state="empty" />
                <Tile letter="H" state="empty" />
                <Tile letter="A" state="empty" />
              </div>
              <p className="text-xs text-gray-300">
                A letra <strong>I</strong> faz parte da palavra, mas está na posição errada.
              </p>
            </div>
            
            <div>
              <div className="flex gap-1 mb-2">
                <Tile letter="F" state="empty" />
                <Tile letter="U" state="empty" />
                <Tile letter="N" state="absent" />
                <Tile letter="D" state="empty" />
                <Tile letter="O" state="empty" />
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
      </ScrollArea>
    </DialogShell>
  )
}

