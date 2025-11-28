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
const START_DATE = new Date('2022-01-02T00:00:00-03:00') // Timezone São Paulo
const MAX_DAYS_BACK = 30

// Obter data local (São Paulo) normalizada (00:00:00)
function getTodayNormalized(): Date {
  const now = new Date()
  // Criar data local normalizada
  const normalized = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return normalized
}

function getDayFromDate(date: Date): number {
  // Normalizar data para comparação
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const startNormalized = new Date(START_DATE.getFullYear(), START_DATE.getMonth(), START_DATE.getDate())
  const timeDiff = normalized.getTime() - startNormalized.getTime()
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1
}

function getDateFromDay(dayNumber: number): Date {
  const startNormalized = new Date(START_DATE.getFullYear(), START_DATE.getMonth(), START_DATE.getDate())
  const date = new Date(startNormalized)
  date.setDate(date.getDate() + dayNumber - 1)
  return date
}

export function ArchiveDialog({ open, onOpenChange, currentMode }: ArchiveDialogProps) {
  const navigate = useNavigate()
  const today = getTodayNormalized()
  const currentDayNumber = getDayNumber()
  
  // Limites de datas
  const minDate = getDateFromDay(Math.max(1, currentDayNumber - MAX_DAYS_BACK))
  const maxDate = getDateFromDay(currentDayNumber - 1) // Ontem (não permite hoje)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
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
                      // Normalizar data para comparação
                      const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate())
                      const minNormalized = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
                      const maxNormalized = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
                      
                      return normalized < minNormalized || normalized > maxNormalized
                    }}
                    defaultMonth={yesterday}
                    hidden={{ after: yesterday }}
                    className="rounded-lg border-2 border-orange-600/30 bg-gray-800/50 text-white [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
                    buttonVariant="ghost"
                    classNames={{
                      months: "text-white",
                      month_caption: "text-white",
                      caption_label: "text-white font-semibold",
                      weekday: "text-gray-400",
                      day: "text-white hover:bg-orange-600/20",
                      today: "bg-orange-600/30 text-white font-bold",
                      selected: "bg-orange-600 text-white hover:bg-orange-700",
                      disabled: "text-gray-600 opacity-40",
                      outside: "text-gray-600 opacity-30",
                    }}
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

