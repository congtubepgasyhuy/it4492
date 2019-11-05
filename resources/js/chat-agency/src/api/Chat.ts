import { API } from "./API";
import { Message, SendMessagePayload } from "../types/Message";
import { Conversation } from "../types/Conversation";



export class ChatAPI {

   

    static async get_messages(conversation_id: string, page: number = 1): Promise<{
        messages: Message[],
        total_page: number
    }> {

        const { messages, pages } = await API.get<{
            messages: Array<Message & { created_at: string }>,
            pages: number
        }>('messages', { conversation_id, page })


        return {
            total_page: pages,
            messages: messages.map(m => ({ ...m, created_at: new Date(m.created_at) }))
        }
    }

    static async get_conversation() {
        type M = { conversations: Array<Conversation & { last_message: Message & { created_at: String } }> }

        const { conversations } = await API.get<M>('conversations')

        return conversations.map(c => ({
            ...c,
            last_message: c.last_message ? {
                ...c.last_message,
                created_at: new Date(c.last_message.created_at)
            } : null
        } as Conversation))
    }

    static async getOnlineList(): Promise<{ [conversation_id: string]: string[] }> {
        return await new Promise(s => (
            API.socket.emit('get-online-list', null, s)
        ))
    }

    static onNewMessage(callback: (msg: Message) => any) {
        API.socket.on('message', (data: Message & { crecreated_at: string }) => callback({
            ...data,
            created_at: new Date(data.created_at)
        }))
    }

    static whenSomeoneOnline(callback: (user_id: string) => any) {
        API.socket.on('online', e => callback(e.user_id))
    }

    static whenSomeoneOffline(callback: (user_id: string) => any) {
        API.socket.on('offline', e => callback(e.user_id))
    }

    static async sendMessage(msg: SendMessagePayload) {
        await API.post('postMessage', { ...msg, sender_id: API.user_id })
    }
}
