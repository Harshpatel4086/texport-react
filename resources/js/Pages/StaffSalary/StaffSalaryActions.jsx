import { MdEdit, MdDelete } from 'react-icons/md';
import IconButton from '@/Components/IconButton';
import { usePermissions } from '@/Utils/permissions';

export default function StaffSalaryActions({ item, onEdit, onDelete }) {
    const { canEdit, canDelete } = usePermissions();

    return (
        <div className="flex items-center space-x-2">
            {canEdit('staff salary') && (
                <IconButton
                    icon={MdEdit}
                    onClick={() => onEdit(item)}
                    tooltip="Edit Salary"
                    variant="primary"
                />
            )}
            {canDelete('staff salary') && (
                <IconButton
                    icon={MdDelete}
                    onClick={() => onDelete(item)}
                    tooltip="Delete Salary"
                    variant="danger"
                />
            )}
        </div>
    );
}