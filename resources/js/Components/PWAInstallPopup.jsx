import { useState, useEffect } from 'react';

export default function PWAInstallPopup() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPopup(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
        }
        setShowPopup(false);
    };

    const handleClose = () => {
        setShowPopup(false);
    };

    // Test button - remove after testing
    if (!showPopup) {
        return (
            <button
                onClick={() => setShowPopup(true)}
                className="fixed bottom-4 right-4 z-50 bg-red-500 text-white px-3 py-2 rounded"
            >
                Show Install Popup
            </button>
        );
    }

    return (
        <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-xl border p-4 max-w-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-white text-sm font-bold">T</span>
                    </div>
                    <span className="font-medium text-gray-900">Texport</span>
                </div>
                <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                    ✕
                </button>
            </div>

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
    );
}
