import { useEffect } from 'react';
import { router } from '@inertiajs/react';

const usePushNotifications = (vapidPublicKey) => {
    useEffect(() => {
        if (!vapidPublicKey || !('serviceWorker' in navigator) || !('PushManager' in window)) {
            return;
        }

        const initializePushNotifications = async () => {
            try {
                // Request notification permission
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    console.log('Notification permission denied');
                    return;
                }

                // Register service worker and wait for it to be ready
                let registration = await navigator.serviceWorker.getRegistration();
                if (!registration) {
                    const swPath = window.location.origin + '/service-worker.js';
                    registration = await navigator.serviceWorker.register(swPath);
                    console.log('Service Worker registered successfully');
                }
                
                // Wait for service worker to be active
                await navigator.serviceWorker.ready;
                
                // Ensure service worker is active before subscribing
                if (!registration.active) {
                    await new Promise(resolve => {
                        if (registration.installing) {
                            registration.installing.addEventListener('statechange', () => {
                                if (registration.installing.state === 'activated') {
                                    resolve();
                                }
                            });
                        } else {
                            resolve();
                        }
                    });
                }

                // Create push subscription
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
                });

                // Send subscription to backend
                router.post('/subscriptions', subscription.toJSON(), {
                    preserveState: true,
                    preserveScroll: true,
                    only: [],
                });
                console.log('Push notifications enabled successfully');
            } catch (error) {
                console.error('Push notification setup failed:', error);
            }
        };

        // Add delay to ensure page is fully loaded
        setTimeout(initializePushNotifications, 1000);
    }, [vapidPublicKey]);
};

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export default usePushNotifications;