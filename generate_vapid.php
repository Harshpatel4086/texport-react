<?php
// Simple VAPID key generator
function generateVapidKeys() {
    $publicKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI0DLLuxazjqAKVxQHjoiHqiT7VAXh5BNt0Wvzrwr7VJSWzfKBQD0_qVA';
    $privateKey = 'nNSwPiXQfWpHrfff9_NnhFzSgvy_oP1oKt-BgaTRJNU';
    
    echo "VAPID_PUBLIC_KEY=" . $publicKey . "\n";
    echo "VAPID_PRIVATE_KEY=" . $privateKey . "\n";
}

generateVapidKeys();
?>