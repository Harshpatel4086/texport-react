import { toast } from 'sonner';

class Toaster {
    success(message) {
        toast.success(message);
    }

    error(message) {
        toast.error(message);
    }

    warning(message) {
        toast.warning(message);
    }
}

export const toaster = new Toaster();