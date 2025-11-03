import { useForm } from '@inertiajs/react';
import Modal from './Modal';
import Button from './Button';

export default function DeleteRoleModal({ isOpen, onClose, role }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(`/roles/${role.id}`, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    if (!role) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Role" size="sm">
            <div className="space-y-4">
                <p className="text-text">
                    Are you sure you want to delete the role <strong>{role.name}</strong>? 
                    This action cannot be undone.
                </p>

                <div className="flex justify-end space-x-3 pt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="danger"
                        onClick={handleDelete}
                        disabled={processing}
                    >
                        {processing ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}