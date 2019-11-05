declare var registration: ServiceWorkerRegistration


class SW {
    static async run() {

        addEventListener('install', () => console.log('Installed'))

        addEventListener('push', async data => {
            const msg = await (data as any).data.json().notification
            registration.showNotification(msg.title, {
                body: msg.body,
                icon: "http://www.iconarchive.com/download/i75883/martz90/circle/messages.ico"
            })
        })
 
    }
}


SW.run()

 