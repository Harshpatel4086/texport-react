import { useState, useEffect } from 'react';
import { usePWAInstall } from '../Hooks/usePWAInstall';

const PWAInstallPopup = () => {
    const { isInstalled, isInstallable, installPWA } = usePWAInstall();
    const [showPopup, setShowPopup] = useState(false);
    const [showIOSInstructions, setShowIOSInstructions] = useState(false);

    // Cookie functions
    const setCookie = (name, value, days) => {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
    };

    const getCookie = (name) => {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r;
        }, '');
    };

    // Check if should show popup
    const shouldShowPopup = () => {
        if (isInstalled) return false;
        
        const lastDismissed = getCookie('pwa-popup-dismissed');
        if (!lastDismissed) return true;

        const today = new Date().toDateString();
        return lastDismissed !== today;
    };

    // Detect iOS Safari
    const isIOSSafari = () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome|CriOS|FxiOS/.test(navigator.userAgent);
        return isIOS && isSafari;
    };

    useEffect(() => {
        if (shouldShowPopup()) {
            setShowPopup(true);
            setShowIOSInstructions(isIOSSafari());
        }
    }, [isInstalled, isInstallable]);

    const handleInstall = async () => {
        const installed = await installPWA();
        if (installed || !isInstallable) {
            handleClose();
        }
    };

    const handleClose = () => {
        setShowPopup(false);
        setCookie('pwa-popup-dismissed', new Date().toDateString(), 1);
    };

    if (!showPopup) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
            <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-sm mx-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                            <span className="text-white text-sm font-bold">T</span>
                        </div>
                        <span className="font-medium text-gray-900">Texport</span>
                    </div>
                    <button 
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                {showIOSInstructions ? (
                    <div>
                        <p className="text-sm text-gray-600 mb-4">
                            To install this app on your iPhone:
                        </p>
                        <ol className="text-sm text-gray-600 mb-4 space-y-1">
                            <li>1. Tap the <strong>Share</strong> button ⬆️ in Safari</li>
                            <li>2. Select <strong>"Add to Home Screen"</strong></li>
                            <li>3. Tap <strong>"Add"</strong> to install</li>
                        </ol>
                        <button
                            onClick={handleClose}
                            className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-600 w-full"
                        >
                            Got it
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm text-gray-600 mb-4">
                            Install this app on your home screen for quick and easy access when you're on the go.
                        </p>
                        <div className="flex space-x-2">
                            <button
                                onClick={handleInstall}
                                className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-600 flex-1"
                            >
                                Install
                            </button>
                            <button
                                onClick={handleClose}
                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 flex-1"
                            >
                                Not now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PWAInstallPopup;