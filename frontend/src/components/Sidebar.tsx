import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { User } from '../types'

interface SidebarProps {
  contacts: User[]
  activeContact: User
  onContactSelect: (contact: User) => void
}

export function Sidebar({ contacts, activeContact, onContactSelect }: SidebarProps) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const filteredContacts = search.trim()
    ? contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : contacts

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <aside className="flex flex-col w-60 shrink-0" style={{ background: 'var(--color-sidebar)' }}>
      <div className="p-3 relative" ref={searchRef}>
        <input
          className="w-full text-sm px-3 py-2 rounded-md outline-none"
          style={{
            background: 'var(--color-sidebarInput)',
            color: 'var(--color-textBody)',
          }}
          placeholder={t('SIDEBAR.SEARCH_PLACEHOLDER')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={() => setSearchOpen(true)}
        />
        {searchOpen && (
          <div className="absolute left-3 right-3 top-full mt-1 rounded-md shadow-lg z-50 overflow-hidden" style={{ background: 'var(--color-searchBg)' }}>
            {filteredContacts.length === 0 ? (
              <p className="text-xs px-3 py-2" style={{ color: 'var(--color-textPlaceholder)' }}>{t('SIDEBAR.NO_RESULTS')}</p>
            ) : (
              filteredContacts.map(contact => (
                <button
                  key={contact.id}
                  onMouseDown={() => {
                    onContactSelect(contact)
                    setSearch('')
                    setSearchOpen(false)
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 text-left transition-colors"
                  style={{ color: 'var(--color-textPrimary)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-hoverItem)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 text-white" style={{ background: 'var(--color-accent)' }}>
                    {contact.avatar}
                  </div>
                  <span className="text-sm">{contact.name}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <div className="px-2 mt-2">
        <p className="text-xs font-semibold uppercase px-2 mb-1" style={{ color: 'var(--color-textMuted)' }}>{t('SIDEBAR.DIRECT_MESSAGES')}</p>
        {contacts.map(contact => (
          <button
            key={contact.id}
            onClick={() => onContactSelect(contact)}
            className="flex items-center gap-3 w-full px-2 py-1.5 rounded-md transition-colors"
            style={{
              background: activeContact.id === contact.id ? 'var(--color-activeItem)' : 'transparent',
              color: activeContact.id === contact.id ? 'var(--color-textPrimary)' : 'var(--color-textMuted)',
            }}
            onMouseEnter={e => { if (activeContact.id !== contact.id) e.currentTarget.style.background = 'var(--color-hoverItem)' }}
            onMouseLeave={e => { if (activeContact.id !== contact.id) e.currentTarget.style.background = 'transparent' }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 text-white" style={{ background: 'var(--color-accent)' }}>
              {contact.avatar}
            </div>
            <span className="text-sm font-medium truncate">{contact.name}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}
