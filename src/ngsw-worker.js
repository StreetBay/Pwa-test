self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    // Perform install steps
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    // Clean up old caches if needed
});

self.addEventListener('push', (event) => {
    console.log('Push Notification received:', event);
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Default Title';
    const options = {
        body: data.body || 'Default body text',
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});
