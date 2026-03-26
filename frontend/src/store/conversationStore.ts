import { create } from 'zustand'
import type { Message } from '../types'

interface ConversationStore {
  conversations: Record<number, Message[]>
  sendMessage: (contactId: number, text: string, authorId: number) => void
  getMessages: (contactId: number) => Message[]
}

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations: {},
  getMessages: (contactId) => get().conversations[contactId] ?? [],
  sendMessage: (contactId, text, authorId) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const newMsg: Message = { id: Date.now(), text: trimmed, authorId }
    set(state => ({
      conversations: {
        ...state.conversations,
        [contactId]: [...(state.conversations[contactId] ?? []), newMsg],
      },
    }))
  },
}))
