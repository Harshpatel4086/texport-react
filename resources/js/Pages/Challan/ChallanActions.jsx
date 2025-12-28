import { MdVisibility, MdEdit, MdDelete, MdLink } from 'react-icons/md';
import IconButton from '@/Components/IconButton';
import { usePermissions } from '@/Utils/permissions';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import ChallanDeleteModal from './ChallanDeleteModal';

export default function ChallanActions({ item }) {
    const { canView, canEdit, canDelete } = usePermissions();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleView = () => {
        router.visit(route('challans.show', item.id));
    };

    const handleEdit = () => {
        router.visit(route('challans.edit', item.id));
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const handleCopyLink = async () => {
        try {
            const publicUrl = route('challans.public', item.encrypted_id);
            await navigator.clipboard.writeText(publicUrl);
            toast.success('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy link:', err);
            toast.error('Failed to copy link');
        }
    };

    return (
        <>
            <div className="flex items-center space-x-2">
                {canView('challan') && (
                    <IconButton
                        icon={MdVisibility}
                        onClick={handleView}
                        tooltip="View Challan"
                        variant="info"
                    />
                )}
                <IconButton
                    icon={MdLink}
                    onClick={handleCopyLink}
                    tooltip="Copy Public Link"
                    variant="success"
                />
                {canEdit('challan') && (
                    <IconButton
                        icon={MdEdit}
                        onClick={handleEdit}
                        tooltip="Edit Challan"
                        variant="warning"
                    />
                )}
                {canDelete('challan') && (
                    <IconButton
                        icon={MdDelete}
                        onClick={handleDelete}
                        tooltip="Delete Challan"
                        variant="danger"
                    />
                )}
            </div>

            <ChallanDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                challan={item}
            />
        </>
    );
}