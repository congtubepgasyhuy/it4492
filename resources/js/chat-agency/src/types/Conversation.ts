import { Message } from "./Message";

export type Conversation = {
    id: string
    name: string,
    last_message: Message | null
    online?: boolean
    unread?: number
}