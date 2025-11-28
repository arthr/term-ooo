// src/components/HelpDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Tile } from './Tile'

interface HelpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Como Jogar</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-sm">
          <p>
            Descubra a palavra certa em 6 tentativas (Termo), 7 tentativas (Dueto) ou 9 tentativas (Quarteto).
          </p>
          
          <p>
            Depois de cada tentativa, as peças mostram o quão perto você está da solução.
          </p>
          
          <div className="space-y-3 py-2">
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
          </div>
          
          <div className="border-t border-gray-700 pt-3 space-y-2 text-xs text-gray-300">
            <p>
              • Os acentos são preenchidos automaticamente, e não são considerados nas dicas.
            </p>
            <p>
              • As palavras podem possuir letras repetidas.
            </p>
            <p>
              • Uma palavra nova aparece a cada dia.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

