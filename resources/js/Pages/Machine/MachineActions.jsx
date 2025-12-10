import { MdEdit, MdDelete } from 'react-icons/md';
import IconButton from '@/Components/IconButton';
import { usePermissions } from '@/Utils/permissions';

export default function MachineActions({ item, onEdit, onDelete }) {
    const { canEdit, canDelete } = usePermissions();

    return (
        <div className="flex items-center space-x-2">
            {canEdit('worker machines') && (
                <IconButton
                    icon={MdEdit}
                    onClick={() => onEdit(item)}
                    tooltip="Edit Machine"
                    variant="primary"
                    size="sm"
                />
            )}
            {canDelete('worker machines') && (
                <IconButton
                    icon={MdDelete}
                    onClick={() => onDelete(item)}
                    tooltip="Delete Machine"
                    variant="danger"
                    size="sm"
                />
            )}
        </div>
    );
}