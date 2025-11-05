import CrudModal from '@/Components/CrudModal';
import { roleFields, roleRoutes } from './roleConfig.jsx';

export default function RoleModal({ isOpen, onClose, mode, entity, permissions = [] }) {
    const getTitle = () => {
        switch (mode) {
            case 'create': return 'Add New Role';
            case 'edit': return 'Edit Role';
            case 'delete': return 'Delete Role';
            default: return 'Role';
        }
    };

    const routes = {
        store: route(roleRoutes.store),
        update: route(roleRoutes.update, ':id'),
        destroy: route(roleRoutes.destroy, ':id'),
    };

    // Add permissions field for role management
    const fieldsWithPermissions = [
        ...roleFields,
        {
            name: 'permissions',
            label: 'Permissions',
            type: 'checkbox-group',
            options: permissions.map(permission => ({
                value: permission.name,
                label: permission.name
            })),
            required: false
        }
    ];

    return (
        <CrudModal
            isOpen={isOpen}
            onClose={onClose}
            mode={mode}
            title={getTitle()}
            entity={entity}
            fields={fieldsWithPermissions}
            routes={routes}
            entityName="Role"
        />
    );
}