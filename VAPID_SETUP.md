# VAPID Keys Setup for Push Notifications

## Generate VAPID Keys

Since the automatic generation failed, you can generate VAPID keys using one of these methods:

### Method 1: Online Generator
Visit: https://vapidkeys.com/
Generate keys and add them to your .env file.

### Method 2: Node.js (if you have it installed)
```bash
npx web-push generate-vapid-keys
```

### Method 3: Sample Keys (for testing only)
Add these sample keys to your .env file for testing:

```
VAPID_PUBLIC_KEY=BEl62iUYgUivxIkv69yViEuiBIa40HI0DLLuxazjqAKVxQHjoiHqiT7VAXh5BNt0Wvzrwr7VJSWzfKBQD0_qVA
VAPID_PRIVATE_KEY=nNSwPiXQfWpHrfff9_NnhFzSgvy_oP1oKt-BgaTRJNU
```

**Important**: Generate your own keys for production use!

## After adding VAPID keys to .env:

1. Clear config cache: `php artisan config:clear`
2. Test the notification system by adding a new worker
3. Make sure your browser allows notifications for your domain

## Testing the Implementation

1. Open your dashboard in a supported browser (Chrome, Firefox, Edge)
2. Allow notification permissions when prompted
3. Go to Workers page and add a new worker
4. You should receive a push notification: "New Worker Added"