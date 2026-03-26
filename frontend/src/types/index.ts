export interface User {
  id: number
  name: string
  avatar: string
}

export interface Message {
  id: number
  text: string
  authorId: User['id']
}
