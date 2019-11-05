import React from 'react'
import { Avatar } from 'antd';
import { Message } from '../../types/Message';
import { format_time } from '../../helpers/format-time';
import { API } from '../../api/API';


export const MessageCell = (props: { message: Message, left: boolean, onImageClick: Function }) => (
    <div className={props.left ? 'gx-chat-item' : 'gx-chat-item gx-flex-row-reverse'}>

        <Avatar className="gx-size-40 gx-align-self-end" src='https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
            alt="" />

        <div className="gx-bubble-block">
            <div className="gx-bubble">
                {
                    props.message.message && <div className="gx-message"> {props.message.message}</div>
                }
                {
                    props.message.image && <img src={props.message.image} onClick={() => props.onImageClick()} />
                }
                <div className="gx-time gx-text-muted gx-text-right gx-mt-2">{format_time(props.message.created_at)}</div>
            </div>
        </div>

    </div>
)