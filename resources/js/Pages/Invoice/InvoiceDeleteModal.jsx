import { useState } from 'react';
import { router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import { MdWarning } from 'react-icons/md';

export default function InvoiceDeleteModal({ isOpen, onClose, invoice }) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = () => {
        setProcessing(true);
        router.delete(route('invoices.destroy', invoice.id), {
            onSuccess: () => {
                onClose();
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Invoice">
            <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                    <MdWarning className="w-8 h-8 text-red-500" />
                    <div>
                        <h3 className="text-lg font-semibold text-text">Confirm Deletion</h3>
                        <p className="text-text-secondary">
                            Are you sure you want to delete invoice {invoice?.formatted_invoice_number}?
                        </p>
                    </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800 text-sm">
                        <strong>Warning:</strong> This action cannot be undone. The invoice will be permanently deleted.
                    </p>
                </div>

                <div className="flex justify-end space-x-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        disabled={processing}
                        loading={processing}
                    >
                        Delete Invoice
                    </Button>
                </div>
            </div>
        </Modal>
    );
}