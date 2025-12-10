import { MdEdit, MdDelete } from 'react-icons/md';
import IconButton from '@/Components/IconButton';
import { usePermissions } from '@/Utils/permissions';

export default function WorkerActions({ item, onEdit, onDelete }) {
    const { canEdit, canDelete } = usePermissions();

    return (
        <div className="flex items-center space-x-2">
            {canEdit('workers') && (
                <IconButton
                    icon={MdEdit}
                    onClick={() => onEdit(item)}
                    tooltip="Edit Worker"
                    variant="primary"
                    size="sm"
                />
            )}
            {canDelete('workers') && (
                <IconButton
                    icon={MdDelete}
                    onClick={() => onDelete(item)}
                    tooltip="Delete Worker"
                    variant="danger"
                    size="sm"
                />
            )}
        </div>
    );
}