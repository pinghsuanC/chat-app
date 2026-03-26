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

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-textPrimary)' }}>
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar contacts={CONTACTS} activeContact={activeContact} onContactSelect={setActiveContact} />
        <ChatArea contact={activeContact} />
      </div>
    </div>
  )
}
