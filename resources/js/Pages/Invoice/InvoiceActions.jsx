import { MdVisibility, MdDelete, MdLink, MdPrint } from 'react-icons/md';
import IconButton from '@/Components/IconButton';
import { usePermissions } from '@/Utils/permissions';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import InvoiceDeleteModal from './InvoiceDeleteModal';

export default function InvoiceActions({ item }) {
    const { canView, canDelete } = usePermissions();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleView = () => {
        router.visit(route('invoices.show', item.id));
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const handlePrint = () => {
        const publicUrl = route('invoices.public', item.encrypted_id);
        window.open(publicUrl, '_blank');
    };

    const handleCopyLink = async () => {
        try {
            const publicUrl = route('invoices.public', item.encrypted_id);
            
            // Focus the window first
            window.focus();
            
            // Use the modern clipboard API with fallback
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(publicUrl);
            } else {
                // Fallback for older browsers or non-secure contexts
                const textArea = document.createElement('textarea');
                textArea.value = publicUrl;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            
            toast.success('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy link:', err);
            toast.error('Failed to copy link');
        }
    };

    return (
        <>
            <div className="flex items-center space-x-2">
                {canView('invoice') && (
                    <IconButton
                        icon={MdVisibility}
                        onClick={handleView}
                        tooltip="View Invoice"
                        variant="info"
                    />
                )}
                {/* <IconButton
                    icon={MdPrint}
                    onClick={handlePrint}
                    tooltip="Print Invoice"
                    variant="primary"
                /> */}
                <IconButton
                    icon={MdLink}
                    onClick={handleCopyLink}
                    tooltip="Copy Public Link"
                    variant="success"
                />
                {canDelete('invoice') && (
                    <IconButton
                        icon={MdDelete}
                        onClick={handleDelete}
                        tooltip="Delete Invoice"
                        variant="danger"
                    />
                )}
            </div>

            <InvoiceDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                invoice={item}
            />
        </>
    );
}