import { useState, useEffect } from 'react';

export default function PWAInstallModal() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallPopup, setShowInstallPopup] = useState(false);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            console.log('PWA: beforeinstallprompt event fired');
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
            setShowInstallPopup(true);
        };

        const handleAppInstalled = () => {
            console.log('PWA: App was installed');
            setIsInstallable(false);
            setShowInstallPopup(false);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        // Debug: Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('PWA: App is already installed');
        } else {
            console.log('PWA: App is not installed, waiting for install prompt...');
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        setDeferredPrompt(null);
        setShowInstallPopup(false);
    };

    const handleDismiss = () => {
        setShowInstallPopup(false);
        setDeferredPrompt(null);
    };

    // Show manual install button for testing if no auto prompt
    if (!showInstallPopup && isInstallable) {
        return (
            <button
                onClick={() => setShowInstallPopup(true)}
                className="fixed bottom-4 left-4 z-50 bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors shadow-lg"
            >
                📱 Install App
            </button>
        );
    }

    if (!showInstallPopup) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-brand-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    
                    <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">Install Texport App</h3>
                        <p className="text-gray-600 text-xs mt-1">
                            Get quick access and a better experience
                        </p>
                        
                        <div className="flex space-x-2 mt-3">
                            <button
                                onClick={handleInstall}
                                className="bg-primary text-white px-3 py-1 rounded text-xs font-medium hover:bg-primary-600 transition-colors"
                            >
                                Install
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="text-gray-500 px-3 py-1 rounded text-xs hover:text-gray-700 transition-colors"
                            >
                                Not now
                            </button>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleDismiss}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}