export type ThemeId = 'dark' | 'light'

export interface ThemeColors {
  bg: string
  sidebar: string
  sidebarInput: string
  toolbar: string
  headerBorder: string
  msgHover: string
  msgInputBg: string
  activeItem: string
  hoverItem: string
  textMuted: string
  textPrimary: string
  textBody: string
  textPlaceholder: string
  accent: string
  searchBg: string
  hoverBtn: string
  kbdBg: string
}

export interface Theme {
  id: ThemeId
  name: string
  colors: ThemeColors
}

export const themes: Record<ThemeId, Theme> = {
  dark: {
    id: 'dark',
    name: 'Dark',
    colors: {
      bg:              '#313338',
      sidebar:         '#2b2d31',
      sidebarInput:    '#1e1f22',
      toolbar:         '#1e1f22',
      headerBorder:    '#1e1f22',
      msgHover:        '#2e3035',
      msgInputBg:      '#383a40',
      activeItem:      '#404249',
      hoverItem:       '#35373c',
      textMuted:       '#949ba4',
      textPrimary:     '#ffffff',
      textBody:        '#dbdee1',
      textPlaceholder: '#6d6f78',
      accent:          '#5865f2',
      searchBg:        '#111214',
      hoverBtn:        '#4e505a',
      kbdBg:           '#2b2d31',
    },
  },
  light: {
    id: 'light',
    name: 'Light',
    colors: {
      bg:              '#ffffff',
      sidebar:         '#f2f3f5',
      sidebarInput:    '#e3e5e8',
      toolbar:         '#e3e5e8',
      headerBorder:    '#e3e5e8',
      msgHover:        '#f2f3f5',
      msgInputBg:      '#ebedef',
      activeItem:      '#d7d9dc',
      hoverItem:       '#e0e1e5',
      textMuted:       '#4e5058',
      textPrimary:     '#060607',
      textBody:        '#2e3338',
      textPlaceholder: '#8e9297',
      accent:          '#5865f2',
      searchBg:        '#ffffff',
      hoverBtn:        '#d7d9dc',
      kbdBg:           '#e3e5e8',
    },
  },
}
