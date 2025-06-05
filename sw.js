// Service Worker for PWA functionality
const CACHE_NAME = 'coufal-family-map-v1.0.0';
const STATIC_CACHE_URLS = [
    '/coufal-family-map/index.html',
    '/coufal-family-map/data.js',
    '/coufal-family-map/notableFigures.js',
    '/coufal-family-map/manifest.json'
];

const DYNAMIC_CACHE_NAME = 'coufal-family-dynamic-v1.0.0';

// Install event - cache static resources
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                console.log('Service Worker: Static files cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Error caching static files', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Handle different types of requests
    if (url.origin === location.origin) {
        // Same origin requests - use cache first strategy
        event.respondWith(cacheFirst(request));
    } else if (url.hostname === 'maps.googleapis.com' || url.hostname === 'maps.gstatic.com') {
        // Google Maps API - network first with cache fallback
        event.respondWith(networkFirst(request));
    } else if (request.destination === 'image') {
        // Images - cache first with network fallback
        event.respondWith(cacheFirst(request));
    } else {
        // Other requests - network first
        event.respondWith(networkFirst(request));
    }
});

// Cache first strategy
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Cache first strategy failed:', error);
        
        // Return offline fallback for navigation requests
        if (request.mode === 'navigate') {
            return caches.match('/coufal-family-map/index.html');
        }
        
        throw error;
    }
}

// Network first strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Network failed, trying cache:', request.url);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline fallback for navigation requests
        if (request.mode === 'navigate') {
            return caches.match('/coufal-family-map/index.html');
        }
        
        throw error;
    }
}

// Background sync for offline data collection
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Sync any offline data when connection is restored
    console.log('Service Worker: Background sync triggered');
    
    // You can implement offline data sync here
    // For example, sync user preferences, search history, etc.
}

// Push notifications (for future use)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            vibrate: [200, 100, 200],
            data: {
                url: data.url || '/'
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Explore Map'
                },
                {
                    action: 'close',
                    title: 'Close'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});

// Handle offline/online status
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Periodic background sync (for browsers that support it)
self.addEventListener('periodicsync', event => {
    if (event.tag === 'content-sync') {
        event.waitUntil(syncContent());
    }
});

async function syncContent() {
    // Sync content updates in the background
    console.log('Service Worker: Periodic sync triggered');
}