import { MdEdit, MdDelete } from 'react-icons/md';
import IconButton from '@/Components/IconButton';

export default function WorkerActions({ item, onEdit, onDelete }) {
    return (
        <div className="flex items-center space-x-2">
            <IconButton
                icon={MdEdit}
                onClick={() => onEdit(item)}
                tooltip="Edit Worker"
                variant="primary"
                size="sm"
            />
            <IconButton
                icon={MdDelete}
                onClick={() => onDelete(item)}
                tooltip="Delete Worker"
                variant="danger"
                size="sm"
            />
        </div>
    );
}