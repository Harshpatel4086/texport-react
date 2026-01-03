import { MdEdit, MdDelete } from 'react-icons/md';
import IconButton from '@/Components/IconButton';
import { usePermissions } from '@/Utils/permissions';

export default function QualityActions({ item, onEdit, onDelete }) {
    const { canEdit, canDelete } = usePermissions();

    const handleEdit = () => {
        onEdit(item);
    };

    const handleDelete = () => {
        onDelete(item);
    };

    return (
        <div className="flex items-center space-x-2">
            {canEdit('quality') && (
                <IconButton
                    icon={MdEdit}
                    onClick={handleEdit}
                    tooltip="Edit Quality"
                    variant="primary"
                    size="sm"
                />
            )}
            {canDelete('quality') && (
                <IconButton
                    icon={MdDelete}
                    onClick={handleDelete}
                    tooltip="Delete Quality"
                    variant="danger"
                    size="sm"
                />
            )}
        </div>
    );
}