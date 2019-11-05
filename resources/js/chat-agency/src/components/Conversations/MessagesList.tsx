import React, { useEffect, createRef, useState } from 'react'
import { Spin } from 'antd';
import { Scrollbars } from "react-custom-scrollbars";
import { with_app_chat_state } from '../../store/chat';
import { API } from '../../api/API';
import { MessageCell } from './MessageCell';
import Carousel, { ModalGateway, Modal } from 'react-images';


export const MessagesList = with_app_chat_state((props) => {


    const scrollBar = createRef() as any
    const [active_image, set_active_image] = useState<number>(-1)

    const view_image = (url: string) => {
        props.store.photos.forEach((img, index) => img.thumb == url && set_active_image(index))
    }

    const ListMessages = (
        <div>
            <Scrollbars
                onScrollStop={() => {
                    if (scrollBar.current.getScrollTop() < 20) props.store.load_more_messages()
                }}
                className="gx-chat-list-scroll"
                ref={scrollBar}
                autoHide
                renderTrackHorizontal={props => (<span />)}
            >
                {
                    props.store.loading_messages && (
                        <div style={{ width: '100%', padding: 30 }}>
                            <div style={{ marginLeft: '49%' }}><Spin /></div>
                        </div>
                    )
                }
                <div className="gx-chat-main-content">
                    {
                        props.store.messages.map((message, index) => (
                            <MessageCell
                                left={`${message.sender_id}` != API.user_id}
                                message={message} key={index}
                                onImageClick={() => view_image(message.image)}
                            />
                        ))
                    }
                </div>
            </Scrollbars>
            <div style={{ zIndex: 100000 }}>
                {
                    active_image >= 0 && (
                        <ModalGateway  >
                            <Modal onClose={() => set_active_image(-1)}>
                                <Carousel
                                    currentIndex={active_image}
                                    frameProps={{ autoSize: 'height' }}
                                    views={props.store.photos.map(el => ({ source: el.fullsize }))}
                                />
                            </Modal>
                        </ModalGateway>
                    )
                }
            </div>
        </div>
    )

    const { messages } = props.store
    const lastMessage = messages[messages.length - 1]

    useEffect(() => {
        (scrollBar as any).current.scrollToBottom()
    }, [
        messages.length == 0,
        lastMessage && lastMessage.created_at.getTime()
    ])



    return ListMessages
})