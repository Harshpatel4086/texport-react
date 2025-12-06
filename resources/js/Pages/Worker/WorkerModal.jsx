import CrudModal from '@/Components/CrudModal';

export default function WorkerModal({ isOpen, onClose, mode, entity }) {
    const fields = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'Enter worker name',
        },
        {
            name: 'phone',
            label: 'Phone',
            type: 'text',
            placeholder: 'Enter phone number (optional)',
        },
    ];

    const routes = {
        store: route('workers.store'),
        update: route('workers.update', ':id'),
        destroy: route('workers.destroy', ':id'),
    };

    const titles = {
        create: 'Add New Worker',
        edit: 'Edit Worker',
        delete: 'Delete Worker',
    };

    return (
        <CrudModal
            isOpen={isOpen}
            onClose={onClose}
            mode={mode}
            title={titles[mode]}
            entity={entity}
            fields={fields}
            routes={routes}
            entityName="Worker"
        />
    );
}