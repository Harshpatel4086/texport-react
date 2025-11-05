import Modal from '@/Components/Modal';

export default function PartyViewModal({ isOpen, onClose, party }) {
    if (!party) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Party Details" size="lg">
            

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Party Name</label>
                            <p className="text-sm text-text bg-gray-50 p-3 rounded-md">{party.party_name}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                            <p className="text-sm text-text bg-gray-50 p-3 rounded-md">{party.business_name}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <p className="text-sm text-text bg-gray-50 p-3 rounded-md">{party.email}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <p className="text-sm text-text bg-gray-50 p-3 rounded-md">{party.phone_number}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                            <p className="text-sm text-text bg-gray-50 p-3 rounded-md">{party.gst_number}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Business Location</label>
                            <p className="text-sm text-text bg-gray-50 p-3 rounded-md">{party.business_location}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <p className="text-sm text-text bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{party.address}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
                            <p className="text-sm text-text bg-gray-50 p-3 rounded-md">
                                {new Date(party.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
        </Modal>
    );
}
