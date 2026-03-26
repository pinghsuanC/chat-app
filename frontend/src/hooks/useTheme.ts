import { useThemeStore } from '../store/themeStore'
import { themes } from '../themes'

export function useTheme() {
  const { themeId, setTheme } = useThemeStore()
  return { theme: themes[themeId], themeId, setTheme }
}
