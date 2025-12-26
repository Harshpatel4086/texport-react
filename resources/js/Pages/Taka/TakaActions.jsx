import { MdEdit, MdDelete } from 'react-icons/md';
import IconButton from '@/Components/IconButton';
import { usePermissions } from '@/Utils/permissions';

export default function TakaActions({ item, onEdit, onDelete }) {
    const { canEdit, canDelete } = usePermissions();

    return (
        <div className="inline-flex items-center justify-end space-x-1">
            {canEdit('taka') && (
                <IconButton
                    icon={MdEdit}
                    tooltip="Edit"
                    variant="primary"
                    onClick={() => onEdit(item)}
                />
            )}
            {canDelete('taka') && (
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