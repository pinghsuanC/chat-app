import { create } from 'zustand'
import { themes, type Theme, type ThemeId } from '../themes'

function applyTheme(theme: Theme): void {
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme.colors)) {
    root.style.setProperty(`--color-${key}`, value)
  }
}

interface ThemeStore {
  themeId: ThemeId
  setTheme: (id: ThemeId) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  themeId: 'dark',
  setTheme: (id) => {
    applyTheme(themes[id])
    set({ themeId: id })
  },
}))

// Apply the default theme immediately on module load
applyTheme(themes['dark'])
