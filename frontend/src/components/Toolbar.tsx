import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme'
import { themes, type ThemeId } from '../themes'
import { languages, type LangId } from '../i18n'

export function Toolbar() {
  const { themeId, setTheme } = useTheme()
  const { t, i18n } = useTranslation()
  const [themeOpen, setThemeOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const themeRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) setThemeOpen(false)
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLang = i18n.language as LangId

  return (
    <div className="flex items-center justify-end gap-1 px-4 h-9 shrink-0 border-b" style={{ background: 'var(--color-toolbar)', borderColor: 'var(--color-headerBorder)' }}>

      {/* Language switcher */}
      <div className="relative" ref={langRef}>
        <button
          onClick={() => setLangOpen(o => !o)}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded transition-colors"
          style={{ color: 'var(--color-textMuted)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-hoverItem)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          title={t('TOOLBAR.LANGUAGE')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
          </svg>
          {languages[currentLang].label}
        </button>

        {langOpen && (
          <div className="absolute right-0 top-full mt-1 w-36 rounded-md shadow-lg z-50 overflow-hidden border" style={{ background: 'var(--color-searchBg)', borderColor: 'var(--color-headerBorder)' }}>
            {(Object.keys(languages) as LangId[]).map(id => (
              <button
                key={id}
                onMouseDown={() => {
                  i18n.changeLanguage(id)
                  setLangOpen(false)
                }}
                className="flex items-center justify-between w-full px-3 py-2 text-sm transition-colors"
                style={{
                  color: 'var(--color-textBody)',
                  background: currentLang === id ? 'var(--color-activeItem)' : 'transparent',
                }}
                onMouseEnter={e => { if (currentLang !== id) e.currentTarget.style.background = 'var(--color-hoverItem)' }}
                onMouseLeave={e => { if (currentLang !== id) e.currentTarget.style.background = 'transparent' }}
              >
                {languages[id].name}
                {currentLang === id && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: 'var(--color-accent)' }}>
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Theme switcher */}
      <div className="relative" ref={themeRef}>
        <button
          onClick={() => setThemeOpen(o => !o)}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded transition-colors"
          style={{ color: 'var(--color-textMuted)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-hoverItem)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          title={t('TOOLBAR.THEME')}
        >
          {themeId === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 011.06 0l1.591 1.59a.75.75 0 11-1.06 1.061L6.166 7.227a.75.75 0 010-1.061z" />
            </svg>
          )}
          {t('toolbar.theme')}
        </button>

        {themeOpen && (
          <div className="absolute right-0 top-full mt-1 w-36 rounded-md shadow-lg z-50 overflow-hidden border" style={{ background: 'var(--color-searchBg)', borderColor: 'var(--color-headerBorder)' }}>
            {(Object.keys(themes) as ThemeId[]).map(id => (
              <button
                key={id}
                onMouseDown={() => {
                  setTheme(id)
                  setThemeOpen(false)
                }}
                className="flex items-center justify-between w-full px-3 py-2 text-sm transition-colors"
                style={{
                  color: 'var(--color-textBody)',
                  background: themeId === id ? 'var(--color-activeItem)' : 'transparent',
                }}
                onMouseEnter={e => { if (themeId !== id) e.currentTarget.style.background = 'var(--color-hoverItem)' }}
                onMouseLeave={e => { if (themeId !== id) e.currentTarget.style.background = 'transparent' }}
              >
                {themes[id].name}
                {themeId === id && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: 'var(--color-accent)' }}>
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
