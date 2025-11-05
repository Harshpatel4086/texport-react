import { Toaster } from 'sonner';

export default function Toast() {
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                    [data-sonner-toast][data-type="success"] {
                        background: #10b981 !important;
                        color: white !important;
                        border: 1px solid #10b981 !important;
                    }
                    [data-sonner-toast][data-type="error"] {
                        background: #ef4444 !important;
                        color: white !important;
                        border: 1px solid #ef4444 !important;
                    }
                    [data-sonner-toast][data-type="warning"] {
                        background: #f59e0b !important;
                        color: white !important;
                        border: 1px solid #f59e0b !important;
                    }
                `
            }} />
            <Toaster position="top-center" />
        </>
    );
}
