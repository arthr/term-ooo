// src/components/ArchiveDialog.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { GameMode } from '@/game/types'
import { getDayNumber, getDateFromDayNumber, getDayNumberFromDate } from '@/game/engine'
import { getTodayNormalized } from '@/lib/dates'
import { useDialogAnimations } from '@/hooks/useDialogAnimations'
import { DialogShell } from './DialogShell'
import { ResponsiveScrollArea } from './ui/responsive-scroll-area'

interface ArchiveDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    currentMode: GameMode
}

const MAX_DAYS_BACK = 30

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

    const { containerVariants, itemVariants } = useDialogAnimations({
        staggerDelay: 0.1,
        itemDuration: 0.4,
    })

    return (
        <DialogShell
            open={open}
            onOpenChange={onOpenChange}
            title="Histórico de Palavras"
            description={`Escolha um dia anterior para jogar. Limite: últimos ${MAX_DAYS_BACK} dias.`}
            borderColor="border-orange-600"
            titleGradientClassName="bg-gradient-to-r from-orange-400 to-yellow-500"
            showDescription={true}
        >
            <ResponsiveScrollArea 
                desktopClassName="px-6 pb-6"
                mobileClassName="px-4 pb-6 h-[calc(100dvh-10rem)]"
            >
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-4 py-4"
                            >
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
                                                p-2 sm:p-4
                                                [&_.rdp-months]:flex [&_.rdp-months]:justify-center
                                                [&_.rdp-table]:w-full 
                                                [&_.rdp-table]:border-collapse
                                                [--cell-size:2.2rem] 
                                                sm:[--cell-size:2.6rem]
                                                md:[--cell-size:3rem]
                                                [&_.rdp-day_button]:h-[var(--cell-size)] [&_.rdp-day_button]:w-[var(--cell-size)]
                                                [&_.rdp-day_button]:rounded-md
                                                [&_.rdp-head_cell]:pb-2
                                                "
                                        buttonVariant="ghost"
                                        classNames={{
                                            caption_label: "text-white font-semibold",
                                            today: "bg-orange-600/30 text-white font-bold",
                                            day: "items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70 rdp-day rdp-day_button",
                                            disabled: "text-gray-600 opacity-40",
                                            outside: "text-gray-600 opacity-30",
                                        }}
                                    />
                                </motion.div>

                                {selectedDayNumber && (
                                    <motion.div
                                        variants={itemVariants}
                                        className="text-center bg-gray-800/50 rounded-lg py-2 sm:py-3 px-3 sm:px-4 border border-gray-700"
                                    >
                                        <p className="text-xs text-gray-400 mb-1">
                                            Dia selecionado:
                                        </p>
                                        <p className="text-base sm:text-lg font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
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
            </ResponsiveScrollArea>
        </DialogShell>
    )
}

