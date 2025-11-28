// src/components/TopTabs.tsx
import { GameMode } from '@/game/types'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'

interface TopTabsProps {
  currentMode: GameMode
  onModeChange: (mode: GameMode) => void
}

export function TopTabs({ currentMode, onModeChange }: TopTabsProps) {
  return (
    <div className="w-full bg-gray-900 border-b border-gray-700">
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
    </div>
  )
}

