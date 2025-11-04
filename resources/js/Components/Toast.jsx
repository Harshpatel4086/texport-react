import { useState, useEffect } from 'react';
import { MdCheckCircle, MdError, MdWarning, MdClose } from 'react-icons/md';
import { toaster } from '@/Utils/toaster';

export default function Toast() {
    const [toasts, setToasts] = useState([]);
    useEffect(() => {
        const unsubscribe = toaster.addListener((toast) => {
            setToasts(prev => [...prev, toast]);

            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== toast.id));
            }, 3000);
        });

        return unsubscribe;
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const getToastConfig = (type) => {
        switch (type) {
            case 'success':
                return {
                    icon: <MdCheckCircle className="w-5 h-5 text-white" />,
                    bgColor: 'bg-green-400',
                    textColor: 'text-white'
                };
            case 'error':
                return {
                    icon: <MdError className="w-5 h-5 text-white" />,
                    bgColor: 'bg-red-400',
                    textColor: 'text-white'
                };
            case 'warning':
                return {
                    icon: <MdWarning className="w-5 h-5 text-white" />,
                    bgColor: 'bg-yellow-400',
                    textColor: 'text-white'
                };
            default:
                return {
                    icon: <MdCheckCircle className="w-5 h-5 text-white" />,
                    bgColor: 'bg-green-400',
                    textColor: 'text-white'
                };
        }
    };

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
            {toasts.map((toast) => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onRemove={removeToast}
                    getConfig={getToastConfig}
                />
            ))}
        </div>
    );
}

function ToastItem({ toast, onRemove, getConfig }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(() => onRemove(toast.id), 300);
    };

    return (
        <div className={`transition-all duration-300 ease-in-out ${
            show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
            {(() => {
                const config = getConfig(toast.type);
                return (
                    <div className={`${config.bgColor} rounded-lg shadow-lg p-4 flex items-center space-x-3 min-w-80`}>
                        <div className="flex-shrink-0">
                            {config.icon}
                        </div>
                        <div className="flex-1">
                            <p className={`text-sm font-medium ${config.textColor}`}>{toast.message}</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className={`flex-shrink-0 ${config.textColor} hover:opacity-75 transition-opacity`}
                        >
                            <MdClose className="w-4 h-4" />
                        </button>
                    </div>
                );
            })()}
        </div>
    );
}
