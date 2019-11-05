import React, { useState, createRef } from 'react'
import { Avatar, Icon, Popover, Button } from 'antd';
import { app_chat_state, with_app_chat_state } from '../../store/chat';
import { API } from '../../api/API';
import { Message, SendMessagePayload } from '../../types/Message';
import { UploadImageList } from './UploadImageList';

const InputBox = (props: { onEnter: Function }) => {

    const [value, set_value] = useState("")

    return (
        <input
            className=" ant-input gx-chat-textarea"
            onKeyDown={e => e.keyCode == 13 && (props.onEnter(value), set_value(" "))}
            onChange={e => set_value(e.target.value)}
            value={value}
        />
    )



}

export const Footer = with_app_chat_state(props => {
    const ref = createRef() as any

    const UploadButton = (
        <div ref={ref as any}>
            <Icon
                type="camera"
                style={{ fontSize: 30, color: '#038fde', marginLeft: 10, cursor: 'pointer' }}

            />
        </div>

    )

    return (
        <div className="gx-chat-main-footer">
            <div className="gx-flex-row gx-align-items-center" style={{ maxHeight: 51 }}>
                <div className="gx-col">
                    <div className="gx-form-group">
                        <InputBox
                            onEnter={message => props.store.send_message({
                                conversation_id: props.store.active_conversation.id,
                                message
                            })}
                        />
                    </div>

                </div>
                <Popover
                    content={<UploadImageList onClose={() => ref.current.click()} />}
                    title="Gửi tin nhắn ảnh"
                    trigger="click"
                    placement="topRight"
                >
                    {
                        UploadButton
                    }
                </Popover>

            </div>
        </div>
    )
})



