import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import type { User } from '../types'
import { useConversation } from '../hooks/useConversation'
import { MessageList } from './MessageList'

const ME: User = { id: 0, name: 'You', avatar: 'Me' }

interface ChatAreaProps {
  contact: User
}

export function ChatArea({ contact }: ChatAreaProps) {
  const { t } = useTranslation()
  const { getMessages, sendMessage: send } = useConversation()
  const [input, setInput] = useState('')
  const messages = getMessages(contact.id)

  function sendMessage() {
    send(contact.id, input, ME.id)
    setInput('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <main className="flex flex-col flex-1 min-w-0">
      <header className="flex items-center gap-3 px-4 h-12 shrink-0 shadow-sm border-b" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-headerBorder)' }}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: 'var(--color-accent)' }}>
          {contact.avatar}
        </div>
        <span className="font-semibold" style={{ color: 'var(--color-textPrimary)' }}>{contact.name}</span>
      </header>

      <MessageList messages={messages} contact={contact} me={ME} />

      <div className="px-4 pb-6 shrink-0">
        <div className="flex items-end gap-2 rounded-lg px-4 py-2" style={{ background: 'var(--color-msgInputBg)' }}>
          <textarea
            className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed max-h-40 py-1.5"
            style={{ color: 'var(--color-textBody)' }}
            placeholder={t('CHAT.MESSAGE_PLACEHOLDER', { name: contact.name })}
            rows={1}
            value={input}
            onChange={e => {
              setInput(e.target.value)
              e.target.style.height = 'auto'
              e.target.style.height = e.target.scrollHeight + 'px'
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="mb-1 p-1.5 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            style={{ color: 'var(--color-textMuted)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-hoverBtn)'
              e.currentTarget.style.color = 'var(--color-textPrimary)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-textMuted)'
            }}
            title={t('CHAT.SEND_TITLE')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
        <p className="text-xs mt-1.5 px-1" style={{ color: 'var(--color-textPlaceholder)' }}>
          <Trans
            i18nKey="CHAT.SEND_HINT"
            components={[
              <kbd className="px-1 rounded text-[10px]" style={{ background: 'var(--color-kbdBg)' }} />,
              <kbd className="px-1 rounded text-[10px]" style={{ background: 'var(--color-kbdBg)' }} />,
            ]}
          />
        </p>
      </div>
    </main>
  )
}
