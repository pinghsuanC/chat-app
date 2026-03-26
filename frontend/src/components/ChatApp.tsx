import { useState } from 'react'
import type { User } from '../types'
import { Toolbar } from './Toolbar'
import { Sidebar } from './Sidebar'
import { ChatArea } from './ChatArea'

const CONTACTS: User[] = [
  { id: 1, name: 'AAA', avatar: 'A' },
  { id: 2, name: 'BBB', avatar: 'B' },
  { id: 3, name: 'CCC', avatar: 'C' },
  { id: 4, name: 'DDD', avatar: 'D' },
]

export function ChatApp() {
  const [activeContact, setActiveContact] = useState(CONTACTS[0])
  const [showChat, setShowChat] = useState(false)

  function handleContactSelect(contact: User) {
    setActiveContact(contact)
    setShowChat(true)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-textPrimary)' }}>
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: full-screen on mobile when not in chat, always visible on md+ */}
        <div className={`${showChat ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-52 lg:w-64 shrink-0`}>
          <Sidebar contacts={CONTACTS} activeContact={activeContact} onContactSelect={handleContactSelect} />
        </div>
        {/* Chat: full-screen on mobile when in chat, always visible on md+ */}
        <div className={`${showChat ? 'flex' : 'hidden'} md:flex flex-1 min-w-0`}>
          <ChatArea contact={activeContact} onBack={() => setShowChat(false)} />
        </div>
      </div>
    </div>
  )
}
