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

    // Add options to fields that need them
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

    // Prepare entity data with staff details flattened
    const preparedEntity = entity ? {
        ...entity,
        phone_number: entity.staff_detail?.phone_number || '',
        salary_type: entity.staff_detail?.salary_type || 'monthly',
        salary_amount: entity.staff_detail?.salary_amount || '',
        password: '' // Always empty for edit mode
    } : null;

    return (
        <CrudModal
            isOpen={isOpen}
            onClose={onClose}
            mode={mode}
            title={getTitle()}
            entity={preparedEntity}
            fields={fieldsWithOptions}
            routes={routes}
            entityName="Staff"
        />
    );
}
