// src/components/TopTabs.tsx
import { GameMode } from '@/game/types'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'

interface TopTabsProps {
  currentMode: GameMode
  onModeChange: (mode: GameMode) => void
  isVisible: boolean
}

export function TopTabs({ currentMode, onModeChange, isVisible }: TopTabsProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="w-full bg-gray-900 border-b border-gray-700 overflow-hidden"
        >
          <div className="container mx-auto px-4 py-3">
            <Tabs value={currentMode} onValueChange={(value) => onModeChange(value as GameMode)}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-gray-800">
                <TabsTrigger value="termo" className="data-[state=active]:bg-gray-700">
                  Termo
                </TabsTrigger>
                <TabsTrigger value="dueto" className="data-[state=active]:bg-gray-700">
                  Dueto
                </TabsTrigger>
                <TabsTrigger value="quarteto" className="data-[state=active]:bg-gray-700">
                  Quarteto
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

