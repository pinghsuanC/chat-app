import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Message, User } from '../types'

interface MessageListProps {
  messages: Message[]
  contact: User
  me: User
}

export function MessageList({ messages, contact, me }: MessageListProps) {
  const { t } = useTranslation()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full" style={{ color: 'var(--color-textMuted)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 text-white" style={{ background: 'var(--color-accent)' }}>
            {contact.avatar}
          </div>
          <p className="text-xl font-bold" style={{ color: 'var(--color-textPrimary)' }}>{contact.name}</p>
          <p className="text-sm mt-1">{t('CHAT.EMPTY_HISTORY_LINE1')} <strong>{contact.name}</strong>.</p>
        </div>
      )}

      {messages.map(msg => (
        <div
          key={msg.id}
          className="flex items-start gap-3 px-2 py-1 rounded group"
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-msgHover)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold shrink-0 mt-0.5 text-white text-xs" style={{ background: 'var(--color-accent)' }}>
            {me.avatar}
          </div>
          <div className="min-w-0">
            <span className="text-sm font-semibold" style={{ color: 'var(--color-textPrimary)' }}>{me.name}</span>
            <p className="text-sm leading-relaxed break-words whitespace-pre-wrap" style={{ color: 'var(--color-textBody)' }}>{msg.text}</p>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
