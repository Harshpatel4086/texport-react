import CrudModal from '@/Components/CrudModal';

export default function MachineModal({ isOpen, onClose, mode, entity }) {
    const fields = [
        {
            name: 'number',
            label: 'Machine Number',
            type: 'text',
            required: true,
            placeholder: 'Enter machine number',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Enter machine description (optional)',
        },
    ];

    const routes = {
        store: route('machines.store'),
        update: route('machines.update', ':id'),
        destroy: route('machines.destroy', ':id'),
    };

    const titles = {
        create: 'Add New Machine',
        edit: 'Edit Machine',
        delete: 'Delete Machine',
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
            entityName="Machine"
        />
    );
}
