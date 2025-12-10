import { useState, useEffect } from 'react';

export const usePWAInstall = () => {
    const [isInstalled, setIsInstalled] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);

    // Check if PWA is installed
    const checkInstallation = () => {
        // Check if running in standalone mode
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return true;
        }
        
        // Check for iOS Safari standalone
        if (window.navigator.standalone === true) {
            return true;
        }
        
        // Check document referrer for installed PWA
        if (document.referrer.startsWith('android-app://')) {
            return true;
        }
        
        return false;
    };

    useEffect(() => {
        // Initial check
        setIsInstalled(checkInstallation());

        // Listen for beforeinstallprompt event
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        // Listen for appinstalled event
        const handleAppInstalled = () => {
            setIsInstalled(true);
            setIsInstallable(false);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const installPWA = async () => {
        if (!deferredPrompt) return false;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setIsInstallable(false);
        }
        
        return outcome === 'accepted';
    };

    return {
        isInstalled,
        isInstallable,
        installPWA
    };
};