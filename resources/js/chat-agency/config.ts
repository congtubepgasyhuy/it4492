export const PUBLIC_PATH = process.env.NODE_ENV == 'development' ? '' : '/public/js/chat-agency'
export const API_BASE_URL = 'https://qly.prettypaint.com.vn/api/v1'
export const SOCKET_ENDPOINT = 'https://chat.prettypaint.com.vn'
export const WEB_AUTH_ENDPOINT = '//qly.prettypaint.com.vn/admin/getAccesstoken'
export const WEB_LOGIN_URL = '/admin/login'

export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyB0hyV1aWBQMGtTMbI4xVHYcjuYfllGnRA",
    authDomain: "pretty-agency-app.firebaseapp.com",
    databaseURL: "https://pretty-agency-app.firebaseio.com",
    projectId: "pretty-agency-app",
    storageBucket: "",
    messagingSenderId: "147228716573",
    appId: "1:147228716573:web:ced135f1e27bbbd4ce60f4"
}