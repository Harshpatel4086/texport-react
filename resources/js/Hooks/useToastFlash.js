import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toaster } from '@/Utils/toaster';

export function useToastFlash() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toaster.success(flash.success);
        }
        if (flash?.error) {
            toaster.error(flash.error);
        }
        if (flash?.warning) {
            toaster.warning(flash.warning);
        }
    }, [flash]);
}