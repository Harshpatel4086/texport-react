import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import DangerButton from '@/Components/DangerButton';

export default function ChallanDeleteModal({ isOpen, onClose, challan }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route('challans.destroy', challan.id), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Challan" size="md">
            <p className="text-gray-600 mb-6">
                Are you sure you want to delete challan <strong>{challan?.formatted_challan_number}</strong>? 
                This action cannot be undone and will permanently remove all associated data.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="text-sm text-yellow-800">
                    <strong>Warning:</strong> Deleting this challan will also remove:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>All challan items and meter records</li>
                        <li>Associated delivery information</li>
                        <li>Historical tracking data</li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <DangerButton
                    onClick={handleDelete}
                    processing={processing}
                >
                    Delete Challan
                </DangerButton>
            </div>
        </Modal>
    );
}