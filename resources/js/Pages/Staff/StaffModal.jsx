import CrudModal from '@/Components/CrudModal';
import { staffFields, staffRoutes } from './staffConfig.jsx';

export default function StaffModal({ isOpen, onClose, mode, entity, userRoles = [] }) {
    const getTitle = () => {
        switch (mode) {
            case 'create': return 'Add New Staff';
            case 'edit': return 'Edit Staff';
            case 'delete': return 'Delete Staff';
            default: return 'Staff';
        }
    };

    const routes = {
        store: route(staffRoutes.store),
        update: route(staffRoutes.update, ':id'),
        destroy: route(staffRoutes.destroy, ':id'),
    };

    // Add role options to the role field
    const fieldsWithOptions = staffFields.map(field => {
        if (field.name === 'role') {
            return {
                ...field,
                options: userRoles.map(role => ({
                    value: role.name,
                    label: role.name
                }))
            };
        }
        return field;
    });

    return (
        <CrudModal
            isOpen={isOpen}
            onClose={onClose}
            mode={mode}
            title={getTitle()}
            entity={entity}
            fields={fieldsWithOptions}
            routes={routes}
            entityName="Staff"
        />
    );
}