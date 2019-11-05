import { PUBLIC_PATH } from "../config";

export const register_service_worker = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {

        console.log('Service Worker and Push is supported');
        try {
            Notification.requestPermission(async state => {
                if (state != 'granted') {
                    alert('Bạn vui lòng cấp quyền thông báo cho ứng dụng để có thể gửi tin nhắn')
                } else {
                    await navigator.serviceWorker.register(`${PUBLIC_PATH}/sw.js`)
                }

            })
        } catch (e) {
            console.log('Service Worker Error', e);
        }
    } else {
        console.warn('Push messaging is not supported');
    }
}