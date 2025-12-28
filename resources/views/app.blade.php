<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- PWA Manifest -->
        <link rel="manifest" href="{{ asset('manifest.json') }}">
        <meta name="theme-color" content="#1E88E5">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="apple-mobile-web-app-title" content="Texport">
        <link rel="apple-touch-icon" href="{{ asset('pwa-icon-192.png') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="{{ asset('assets/logo/favicon.png') }}">
        
        <!-- Flag Icons CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.5.0/css/flag-icons.min.css">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        <!-- PWA Install Popup -->
        <div id="pwa-install-popup" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);"></div>
            <div style="position: relative; background: white; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); padding: 24px; max-width: 400px; margin: 16px;">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <span class="text-white text-sm font-bold">T</span>
                    </div>
                    <span class="font-medium text-gray-900">Texport</span>
                </div>
                <button onclick="hidePopup()" class="text-gray-400 hover:text-gray-600">
                    ✕
                </button>
            </div>

            <div id="popup-content">
                <p class="text-sm text-gray-600 mb-4">
                    Install this app on your home screen for quick and easy access when you're on the go.
                </p>

                <div class="flex space-x-2">
                    <button
                        onclick="installPWA()"
                        class="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-600 flex-1"
                    >
                        Install
                    </button>
                    <button
                        onclick="hidePopup()"
                        class="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 flex-1"
                    >
                        Not now
                    </button>
                </div>
            </div>

            <div id="ios-content" style="display: none;">
                <p class="text-sm text-gray-600 mb-4">
                    To install this app on your iPhone:
                </p>
                <ol class="text-sm text-gray-600 mb-4 space-y-1">
                    <li>1. Tap the <strong>Share</strong> button ⬆️ in Safari</li>
                    <li>2. Select <strong>"Add to Home Screen"</strong></li>
                    <li>3. Tap <strong>"Add"</strong> to install</li>
                </ol>

                <button
                    onclick="hidePopup()"
                    class="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-600 w-full"
                >
                    Got it
                </button>
            </div>
        </div>
        </div>

        <script>
            let deferredPrompt;

            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
            });

            // Check if PWA is installed
            function isPWAInstalled() {
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
            }

            // Cookie functions
            function setCookie(name, value, days) {
                const expires = new Date(Date.now() + days * 864e5).toUTCString();
                document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
            }

            function getCookie(name) {
                return document.cookie.split('; ').reduce((r, v) => {
                    const parts = v.split('=');
                    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
                }, '');
            }

            // Check if popup should be shown
            function shouldShowPopup() {
                // Don't show on public challan pages
                if (window.location.pathname.startsWith('/challan/')) {
                    return false;
                }
                
                // Don't show if PWA is already installed
                if (isPWAInstalled()) {
                    return false;
                }
                
                const lastDismissed = getCookie('pwa-popup-dismissed');
                if (!lastDismissed) return true;

                const today = new Date().toDateString();
                return lastDismissed !== today;
            }

            // Hide popup and save dismiss date
            function hidePopup() {
                document.getElementById('pwa-install-popup').style.display = 'none';
                setCookie('pwa-popup-dismissed', new Date().toDateString(), 1);
            }

            function installPWA() {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then(() => {
                        hidePopup();
                    });
                } else {
                    hidePopup();
                }
            }

            // Detect iOS Safari specifically
            function isIOSSafari() {
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome|CriOS|FxiOS/.test(navigator.userAgent);
                return isIOS && isSafari;
            }

            // Show/hide popup on page load
            if (!shouldShowPopup()) {
                document.getElementById('pwa-install-popup').style.display = 'none';
            } else if (isIOSSafari()) {
                document.getElementById('popup-content').style.display = 'none';
                document.getElementById('ios-content').style.display = 'block';
            }
        </script>
    </body>
</html>
