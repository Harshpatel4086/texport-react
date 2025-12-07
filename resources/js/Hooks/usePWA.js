import { useEffect } from 'react';

export function usePWA() {
    useEffect(() => {
        // Register service worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                    .then((registration) => {
                        console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }

        // Handle offline/online events
        const handleOffline = () => {
            // Redirect to offline page when going offline
            if (window.location.pathname !== '/offline.html') {
                window.location.href = '/offline.html';
            }
        };

        const handleOnline = () => {
            // Reload page when coming back online (if on offline page)
            if (window.location.pathname === '/offline.html') {
                window.location.href = '/';
            }
        };

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);
}