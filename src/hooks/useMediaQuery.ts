import { useState, useEffect } from 'react'

/**
 * Hook para detectar media queries
 * @param query - Media query string (ex: "(min-width: 768px)")
 * @returns boolean indicando se a query corresponde
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)

    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener
    mediaQuery.addEventListener('change', listener)

    // Cleanup
    return () => mediaQuery.removeEventListener('change', listener)
  }, [query])

  return matches
}

/**
 * Hook pré-configurado para detectar desktop (md breakpoint do Tailwind)
 */
export function useIsDesktop() {
  return useMediaQuery('(min-width: 768px)')
}

