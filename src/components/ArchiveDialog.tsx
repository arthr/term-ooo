// src/components/ArchiveDialog.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { GameMode } from '@/game/types'
import { getDayNumber } from '@/game/engine'

interface ArchiveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentMode: GameMode
}

// Data inicial do Term.ooo: 2 de janeiro de 2022
const START_DATE = new Date('2022-01-02T00:00:00')
const MAX_DAYS_BACK = 30

function getDayFromDate(date: Date): number {
  const timeDiff = date.getTime() - START_DATE.getTime()
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1
}

function getDateFromDay(dayNumber: number): Date {
  const date = new Date(START_DATE)
  date.setDate(date.getDate() + dayNumber - 1)
  return date
}

export function ArchiveDialog({ open, onOpenChange, currentMode }: ArchiveDialogProps) {
  const navigate = useNavigate()
  const today = new Date()
  const currentDayNumber = getDayNumber()
  
  // Limites de datas
  const minDate = getDateFromDay(Math.max(1, currentDayNumber - MAX_DAYS_BACK))
  const maxDate = getDateFromDay(currentDayNumber - 1) // Ontem (não permite hoje)
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(maxDate)

  const handlePlay = () => {
    if (!selectedDate) return
    
    const dayNumber = getDayFromDate(selectedDate)
    const modePath = currentMode === 'termo' ? '' : currentMode
    
    navigate(`/${modePath}?dia=${dayNumber}`)
    onOpenChange(false)
  }

  const selectedDayNumber = selectedDate ? getDayFromDate(selectedDate) : null

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
      <DialogContent className="max-w-md bg-gradient-to-b from-gray-900 to-gray-800 text-white border-2 border-orange-600 p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
            📅 Arquivo de Dias Anteriores
          </DialogTitle>
          <DialogDescription className="sr-only">
            Escolha um dia anterior para jogar. Limite: últimos {MAX_DAYS_BACK} dias.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          <AnimatePresence>
            {open && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4 py-4"
              >
                <motion.p variants={itemVariants} className="text-sm text-center text-gray-300">
                  Escolha um dia anterior para jogar. Limite: últimos {MAX_DAYS_BACK} dias.
                </motion.p>

                <motion.div variants={itemVariants} className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      return date < minDate || date > maxDate || date > today
                    }}
                    defaultMonth={maxDate}
                    className="rounded-lg border border-gray-700 [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
                    buttonVariant="ghost"
                  />
                </motion.div>

                {selectedDayNumber && (
                  <motion.div 
                    variants={itemVariants} 
                    className="text-center bg-gray-800/50 rounded-lg py-3 px-4 border border-gray-700"
                  >
                    <p className="text-xs text-gray-400 mb-1">
                      Dia selecionado:
                    </p>
                    <p className="text-lg font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                      #{selectedDayNumber} - {selectedDate?.toLocaleDateString('pt-BR')}
                    </p>
                  </motion.div>
                )}

                <motion.div variants={itemVariants} className="flex gap-2 w-full pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-gray-800 hover:bg-gray-700 border-gray-600 text-white"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white"
                    onClick={handlePlay}
                    disabled={!selectedDate}
                  >
                    🎮 Jogar
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

