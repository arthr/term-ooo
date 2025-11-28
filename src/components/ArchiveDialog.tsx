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
import { getDayNumber, getDateFromDayNumber, getDayNumberFromDate } from '@/game/engine'

interface ArchiveDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    currentMode: GameMode
}

const MAX_DAYS_BACK = 30

// Obter data local normalizada (00:00:00)
function getTodayNormalized(): Date {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function ArchiveDialog({ open, onOpenChange, currentMode }: ArchiveDialogProps) {
    const navigate = useNavigate()
    const today = getTodayNormalized()
    const currentDayNumber = getDayNumber()

    // Limites de datas
    const minDate = getDateFromDayNumber(Math.max(1, currentDayNumber - MAX_DAYS_BACK))
    const maxDate = getDateFromDayNumber(currentDayNumber - 1) // Ontem (não permite hoje)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(maxDate)

    const handlePlay = () => {
        if (!selectedDate) return

        const dayNumber = getDayNumberFromDate(selectedDate)
        const modePath = currentMode === 'termo' ? '' : currentMode

        navigate(`/${modePath}?dia=${dayNumber}`)
        onOpenChange(false)
    }

    const selectedDayNumber = selectedDate ? getDayNumberFromDate(selectedDate) : null

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
                                        className="
                                                rounded-lg 
                                                border-2 border-orange-600/30 
                                                bg-gray-800/50 
                                                text-white 
                                                p-4
                                                [&_.rdp-months]:flex [&_.rdp-months]:justify-center
                                                [&_.rdp-table]:w-full 
                                                [&_.rdp-table]:border-collapse
                                                [--cell-size:2.6rem] 
                                                md:[--cell-size:3rem]
                                                [&_.rdp-day_button]:h-[var(--cell-size)] [&_.rdp-day_button]:w-[var(--cell-size)]
                                                [&_.rdp-day_button]:rounded-md
                                                [&_.rdp-head_cell]:pb-2
                                                "
                                        buttonVariant="ghost"
                                        classNames={{
                                            // months: "text-white",
                                            // month_caption: "text-white text-center",
                                            caption_label: "text-white font-semibold",
                                            today: "bg-orange-600/30 text-white font-bold",
                                            day: "items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70 rdp-day rdp-day_button",
                                            // selected: "bg-orange-600 text-white hover:bg-orange-700",
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

