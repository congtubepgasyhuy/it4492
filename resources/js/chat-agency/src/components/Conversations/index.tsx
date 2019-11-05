import React from "react";
import { MessagesList } from "./MessagesList";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { with_app_chat_state } from "../../store/chat";


export const Conversations = with_app_chat_state((props) => (
    <div className="gx-chat-box" style={{zIndex: 0}}>
        <div className="gx-chat-main">

            <Header />

            <MessagesList />

            {
                props.store.active_conversation && <Footer />
            }

        </div>
    </div>
))