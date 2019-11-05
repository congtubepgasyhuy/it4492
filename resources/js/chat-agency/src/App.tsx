import React, { useState, useEffect } from 'react'
import './styles/wieldy.less'
import { API } from './api/API';
import { ProtectedApp } from './ProtectedApp';
import { Loading } from './Loading';
import { app_chat_state } from './store/chat';

export const App = () => {

    const [loading, set_loading] = useState<boolean>(true)

    const login = async () => {
        try {
            await API.init()
            await app_chat_state.listen()
            set_loading(false)
        } catch (e) {
            alert('Có vấn đề với máy chủ, hiện tại không kết nối được, bạn báo kĩ thuật luôn nhé')
            console.error(e)
        }
    }

    useEffect(() => { login() }, [])

    return loading ? <Loading /> : <ProtectedApp />


}