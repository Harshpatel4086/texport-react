import { useEffect } from 'react';
import { MdClose } from 'react-icons/md';

export default function Modal({ isOpen, onClose, title, children, size = "md" }) {
    const sizes = {
        sm: "max-w-md",
        md: "max-w-lg", 
        lg: "max-w-2xl",
        xl: "max-w-4xl"
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div 
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                    onClick={onClose}
                />
                
                <div className={`inline-block w-full ${sizes[size]} p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-text">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <MdClose className="w-6 h-6" />
                        </button>
                    </div>
                    
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}