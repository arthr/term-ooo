// src/components/HelpDialog.tsx
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import { Tile } from './Tile'

interface HelpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gradient-to-b from-gray-900 to-gray-800 text-white border-2 border-blue-600 max-h-[85vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            Como Jogar
          </DialogTitle>
          <DialogDescription className="sr-only">
            Instruções sobre como jogar Termo, Dueto e Quarteto
          </DialogDescription>
        </DialogHeader>
        
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
      </DialogContent>
    </Dialog>
  )
}

