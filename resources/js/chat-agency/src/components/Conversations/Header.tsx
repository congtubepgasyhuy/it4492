import React from 'react'
import { Avatar } from 'antd';
import { with_app_chat_state } from '../../store/chat';

export const Header = with_app_chat_state(props => (
    <div className="gx-chat-main-header">
        <span className="gx-d-block gx-d-lg-none gx-chat-btn"><i className="gx-icon-btn icon icon-chat"
        /></span>
        <div className="gx-chat-main-header-info">

            <div className="gx-chat-avatar gx-mr-2">
                <div className="gx-status-pos">
                    <Avatar src='https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
                        className="gx-rounded-circle gx-size-60"
                        alt="" />

                    {
                        props.store.active_conversation && props.store.active_conversation.online && (
                            <span className="gx-status gx-online" />
                        )
                    }
                </div>
            </div>

            <div className="gx-chat-contact-name">
                {props.store.active_conversation && props.store.active_conversation.name}
            </div>
        </div>

    </div>
))