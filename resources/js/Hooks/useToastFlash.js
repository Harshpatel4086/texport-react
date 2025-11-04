import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toaster } from '@/Utils/toaster';

export function useToastFlash() {
    const { flash } = usePage().props;

    useEffect(() => {
        console.log('Flash messages received:', flash);
        if (flash?.success) {
            console.log('Showing success toast:', flash.success);
            toaster.success(flash.success);
        }
        if (flash?.error) {
            console.log('Showing error toast:', flash.error);
            toaster.error(flash.error);
        }
        if (flash?.warning) {
            console.log('Showing warning toast:', flash.warning);
            toaster.warning(flash.warning);
        }
    }, [flash]);
}