import { MdEdit, MdDelete, MdVisibility } from 'react-icons/md';
import IconButton from '@/Components/IconButton';
import { usePermissions } from '@/Utils/permissions';

export default function PartyActions({ item, onEdit, onDelete, onView }) {
    const { canEdit, canDelete, canView } = usePermissions();

    return (
        <div className="inline-flex items-center justify-end space-x-1">
            {canView('party') && (
                <IconButton
                    icon={MdVisibility}
                    tooltip="View Details"
                    variant="secondary"
                    onClick={() => onView(item)}
                />
            )}
            {canEdit('party') && (
                <IconButton
                    icon={MdEdit}
                    tooltip="Edit"
                    variant="primary"
                    onClick={() => onEdit(item)}
                />
            )}
            {canDelete('party') && (
                <IconButton
                    icon={MdDelete}
                    tooltip="Delete"
                    variant="danger"
                    onClick={() => onDelete(item)}
                />
            )}
        </div>
    );
}