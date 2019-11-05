import React, { FunctionComponent } from 'react'
import { observable } from 'mobx'
import { Conversation } from "../types/Conversation";
import { Message, SendMessagePayload } from "../types/Message";
import { observer } from 'mobx-react'
import { ChatAPI } from '../api/Chat';
import { API } from '../api/API';

export class AppChatState {

    @observable photos: Array<{ thumb: string, fullsize: string }> = []
    @observable conversations: Conversation[] = []
    @observable messages: Message[] = []

    @observable loading_conversations: boolean = false
    @observable loading_messages: boolean = false
    @observable active_conversation: Conversation

    private total_messsages_page: number = 0
    private current_messages_page = 1



    async listen() {
        this.load_conversion()

        ChatAPI.whenSomeoneOnline(user_id => {
            this.conversations.filter(c => c.id == user_id)[0].online = true
            console.log(`${user_id} online`)
        })

        ChatAPI.whenSomeoneOffline(user_id => this.conversations.filter(c => c.id == user_id)[0].online = false)
        ChatAPI.onNewMessage(msg => {

            if (
                this.active_conversation && msg.conversation_id == this.active_conversation.id
                && msg.id > this.messages[this.messages.length - 1].id
            ) {
                this.messages.push(msg)
                if (msg.image) this.photos.unshift({
                    fullsize: msg.image_fullsize,
                    thumb: msg.image
                })
            }

            if (msg.sender_id == API.user_id) return

            const newest = this.conversations.filter((c, i) => {
                if (c.id == msg.conversation_id) {
                    this.conversations[i].last_message = msg
                    return true
                }
            })[0]

            if (!this.active_conversation || msg.conversation_id != this.active_conversation.id) {
                newest.unread = newest.unread ? newest.unread + 1 : 1
            }



            this.conversations = [
                newest,
                ... this.conversations.filter(c => c.id != msg.conversation_id)
            ]
        })

    }

    async load_conversion() {
        const conversations = await ChatAPI.get_conversation()
        const online_list = await ChatAPI.getOnlineList()

        this.conversations = conversations.map(c => {
            const user_id = `${c.id}`
            const room = online_list[user_id]
            return { ...c, online: room && room.includes(user_id) }
        })
    }

    async load_message(conversation_id: string) {
        this.active_conversation = this.conversations.filter((v, i) => {
            if (v.id == conversation_id) {
                this.conversations[i].unread = undefined
                return true
            }
        })[0]
        this.loading_messages = true
        this.messages = []
        const { total_page, messages } = await ChatAPI.get_messages(conversation_id)
        this.photos = messages.filter(msg => msg.image).map(msg => ({
            fullsize: msg.image_fullsize,
            thumb: msg.image
        }))
        this.messages = messages
        this.total_messsages_page = total_page
        this.current_messages_page = 1
        this.loading_messages = false
    }

    async load_more_messages() {
        if (this.loading_messages || this.current_messages_page == this.total_messsages_page) return

        this.loading_messages = true
        const { messages } = await ChatAPI.get_messages(
            this.active_conversation.id,
            ++this.current_messages_page
        )
        this.loading_messages = false
        this.messages = [...messages, ... this.messages]
    }

    async send_image(id: string, image: string, image_fullsize: string) {
        this.messages.push({
            conversation_id: this.active_conversation.id,
            created_at: new Date(),
            message: null,
            sender_id: API.user_id,
            sender_name: 'Tôi',
            image,
            image_fullsize,
            id: this.messages[this.messages.length - 1].id + 1
        })

        this.photos.push({ fullsize: image_fullsize, thumb: image })

        await ChatAPI.sendMessage({
            conversation_id: this.active_conversation.id,
            image: id,
            message: null
        })
    }

    async send_message(m: SendMessagePayload) {
        if (m.conversation_id == this.active_conversation.id) {
            this.messages.push({
                conversation_id: m.conversation_id,
                created_at: new Date(),
                message: m.message,
                sender_id: API.user_id,
                sender_name: 'Tôi',
                id: this.messages[this.messages.length - 1].id + 1
            })
        }
        await ChatAPI.sendMessage(m)
    }
}

export const app_chat_state = new AppChatState()


export const with_app_chat_state = <T extends {}>(TargetComponent: FunctionComponent<T & { store: AppChatState }>) => {
    const C = observer(TargetComponent)
    return (props: T) => <C {...props} store={app_chat_state} />
}