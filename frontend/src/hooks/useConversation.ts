import { useConversationStore } from '../store/conversationStore'

export function useConversation() {
  const getMessages = useConversationStore(state => state.getMessages)
  const sendMessage = useConversationStore(state => state.sendMessage)
  return { getMessages, sendMessage }
}
