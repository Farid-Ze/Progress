/* global clients */
// Service Worker untuk PWA capabilities
const CACHE_NAME = 'merajut-asa-v1';
const OFFLINE_URL = '/offline';

// Resources to cache
const urlsToCache = [
  '/',
  '/offline',
  '/campaigns',
  '/static/js/main.js',
  '/static/css/main.css',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // If both cache and network fail, show offline page
          return caches.match(OFFLINE_URL);
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline donations
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-donation') {
    event.waitUntil(syncDonations());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Kampanye baru tersedia!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Lihat Kampanye',
        icon: '/icons/explore-action.png'
      },
      {
        action: 'close',
        title: 'Tutup',
        icon: '/icons/close-action.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Merajut ASA', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    // Open campaigns page
    event.waitUntil(
      clients.openWindow('/campaigns')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open main page
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sync donations when back online
async function syncDonations() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const pendingDonations = await cache.match('/pending-donations');
    
    if (pendingDonations) {
      const donations = await pendingDonations.json();
      
      for (const donation of donations) {
        try {
          await fetch('/api/donations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(donation),
          });
        } catch (error) {
          console.error('Failed to sync donation:', error);
        }
      }
      
      // Clear pending donations after successful sync
      await cache.delete('/pending-donations');
    }
  } catch (error) {
    console.error('Failed to sync donations:', error);
  }
}

// Handle share target
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/share') && event.request.method === 'POST') {
    event.respondWith(handleShareTarget(event.request));
  }
});

async function handleShareTarget(request) {
  const formData = await request.formData();
  const title = formData.get('title');
  const text = formData.get('text');
  const url = formData.get('url');
  const files = formData.getAll('files');

  // Process shared content
  const shareData = {
    title,
    text,
    url,
    files: files.map(file => file.name),
  };

  // Store in cache for the main app to process
  const cache = await caches.open(CACHE_NAME);
  await cache.put('/shared-content', new Response(JSON.stringify(shareData)));

  // Redirect to share handler page
  return Response.redirect('/share-handler', 303);
}
