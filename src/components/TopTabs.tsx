// src/components/TopTabs.tsx
import { GameMode } from '@/game/types'
import { motion, AnimatePresence } from 'framer-motion'

interface TopTabsProps {
  currentMode: GameMode
  onModeChange: (mode: GameMode) => void
  isVisible: boolean
}

export function TopTabs({ currentMode, onModeChange, isVisible }: TopTabsProps) {
  const modes: {
    value: GameMode;
    label: string;
  }[] = [
    { value: 'termo', label: 'Termo' },
    { value: 'dueto', label: 'Dueto' },
    { value: 'quarteto', label: 'Quarteto' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="border-b border-slate-700 bg-slate-800/30 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-2 py-2 sm:px-4 sm:py-3">
            <div className="flex gap-2 justify-center">
              {modes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => onModeChange(mode.value)}
                  className={`
                    flex items-center
                    px-4 sm:px-6 py-1 rounded-sm transition-all duration-200
                    text-sm sm:text-base
                    ${
                      currentMode === mode.value
                        ? "bg-slate-600 text-white shadow-lg"
                        : "bg-transparent text-slate-300 hover:bg-slate-700/50"
                    }
                  `}
                >
                  <span className="font-medium">
                    {mode.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
