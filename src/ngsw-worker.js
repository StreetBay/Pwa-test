importScripts('./ngsw-worker.js');

self.addEventListener('push', (event) => {
    console.log('Push Notification received:', event);
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'PWA Notification';
    const options = {
        body: data.body || 'New notification received',
        icon: '/assets/icons/icon-72x72.png',
        badge: '/assets/icons/icon-72x72.png'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});