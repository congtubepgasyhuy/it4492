import React from 'react'
import './styles/wieldy.less'
import { ChatUserList } from './components/Navbar/ChatUserList';
import { Conversations } from './components/Conversations';

export const ProtectedApp = () => (
    <div className="gx-main-content">
        <div className="gx-app-module gx-chat-module">
            <div className="gx-chat-module-box">
                <ChatUserList />
                <Conversations />
            </div>
        </div>
    </div>
)