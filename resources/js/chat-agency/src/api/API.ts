import * as qs from 'querystring'
import io from 'socket.io-client';
import * as Firebase from 'firebase/app';
import 'firebase/messaging';
import { FIREBASE_CONFIG, SOCKET_ENDPOINT, API_BASE_URL, WEB_AUTH_ENDPOINT, WEB_LOGIN_URL } from '../../config';



Firebase.initializeApp(FIREBASE_CONFIG)

export class API {

    public static access_token: string

    public static user_id: string

    public static socket: SocketIOClient.Socket

    public static async init() {

        await this.webLogin()

        // Init firebase
        const messaging = Firebase.messaging()
        const registration = await navigator.serviceWorker.ready
        messaging.useServiceWorker(registration)

        

        // Connect socket
        this.socket = io(SOCKET_ENDPOINT, {
            forceNew: true,
            transports: ['websocket'],

        })

        // Auth socket
        this.socket.on('connect', async () => {
            const token = await messaging.getToken() 
            const notification_token = {
                key: token,
                type: 'fcm',
                token: token
            }
            this.socket.emit('auth', { access_token: this.access_token, notification_token }) 
        }) 
    }



    static async webLogin() {

        const rs = await fetch(WEB_AUTH_ENDPOINT)

        const { result, message, data } = await rs.json()
        if (result == 0) throw message
        this.access_token = data.access_token
        this.user_id = data.user_id

        if (!this.access_token) {
            alert('Không thể kết nối máy chủ, vui lòng đăng nhập lại')
            window.location.href = WEB_LOGIN_URL
            return;
        }
    }

    static async get<T>(url: string, query: any = {}): Promise<T> {
        const rs = await fetch(`${API_BASE_URL}/${url}?${qs.stringify(query)}`, {
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            }
        })

        const { result, message, data } = await rs.json()
        if (result == 0) throw message
        return data as T
    }

    static async post<T>(url: string, form: any = {}): Promise<T> {
        const rs = await fetch(`${API_BASE_URL}/${url}`, {
            headers: {
                'Authorization': `Bearer ${this.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form),
            method: 'POST'
        })



        const { result, message, data } = await rs.json()
        if (result == 0) {
            throw message
        }
        return data as T
    }

    static async postJSON<T>(url: string, form: any = {}): Promise<T> {
        const rs = await fetch(`${API_BASE_URL}/${url}`, {
            headers: {
                'Authorization': `Bearer ${this.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form),
            method: 'POST'
        })


        const { result, message, data } = await rs.json()
        if (result == 0) {
            throw message
        }
        return data as T
    }
}
