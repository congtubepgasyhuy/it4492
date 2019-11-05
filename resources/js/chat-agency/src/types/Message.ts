export type Message = {
    id: number
    sender_id: string
    conversation_id: string
    sender_name: string
    message: string
    image?: string
    image_fullsize?: string
    created_at: Date
} 

export type SendMessagePayload = {
    conversation_id: string
    message: string
    image?: string
}