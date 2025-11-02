import { useForm } from '@inertiajs/react';
import Modal from './Modal';
import Button from './Button';

export default function DeleteStaffModal({ isOpen, onClose, staff }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(`/staff/${staff.id}`, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Staff" size="sm">
            <div className="text-center">
                <div className="mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-text mb-2">Delete Staff Member</h3>
                    <p className="text-gray-600">
                        Are you sure you want to delete <strong>{staff?.name}</strong>? This action cannot be undone.
                    </p>
                </div>

                <div className="flex justify-center space-x-3">
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