import { MdEdit, MdDelete } from 'react-icons/md';
import IconButton from '@/Components/IconButton';

export default function MachineActions({ item, onEdit, onDelete }) {
    return (
        <div className="flex items-center space-x-2">
            <IconButton
                icon={MdEdit}
                onClick={() => onEdit(item)}
                tooltip="Edit Machine"
                variant="primary"
                size="sm"
            />
            <IconButton
                icon={MdDelete}
                onClick={() => onDelete(item)}
                tooltip="Delete Machine"
                variant="danger"
                size="sm"
            />
        </div>
    );
}