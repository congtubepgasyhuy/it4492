import React from "react";
import { Avatar, Tag } from "antd";
import { Conversation } from "../../types/Conversation";
import { with_app_chat_state, AppChatState } from "../../store/chat";

const format_time = (t: Date) => `${t.getHours()}:${t.getMinutes()} ${
    t.getDate()
    }/${t.getMonth() + 1}`

export const UserCell = with_app_chat_state<{ conversation: Conversation, onClick: Function }>(props => {

    const { id, last_message, name, online, unread } = props.conversation
    const isActiveConversation = props.store.active_conversation && props.store.active_conversation.id == id

    return (
        <div
            className={`gx-chat-user-item ${isActiveConversation ? 'active' : ''}`}
            onClick={() => { props.onClick(props.onClick) }}
        >
            <div className="gx-chat-user-row">
                <div className="gx-chat-avatar">
                    <div className="gx-status-pos">
                        <Avatar
                            src="http://www.sclance.com/pngs/user-png/user_png_1449290.png"
                            className="gx-size-40" />

                        {
                            online && <span className="gx-status gx-online" />
                        }
                    </div>
                </div>

                <div className="gx-chat-info">
                    <span className="gx-name h4">{name}</span>
                    <div className="gx-chat-info-des gx-text-truncate">{
                        last_message && (
                            last_message.sender_name
                            + ': '
                            + (
                                last_message.message ? (
                                    last_message.message.substring(0, 25)
                                    + (last_message.message.length > 25 ? "..." : '')
                                ) : ''
                            )
                        )
                    }</div>
                    <div className="gx-last-message-time">{last_message && format_time(last_message.created_at)}</div>
                </div>

                {unread && (
                    <div className="gx-chat-date">
                        <div className="gx-bg-primary gx-rounded-circle gx-badge gx-text-white">{unread}</div>
                    </div>
                )}
            </div>
        </div>
    )
})