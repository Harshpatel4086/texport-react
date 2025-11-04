import { usePage } from '@inertiajs/react';

export function usePermissions() {
    const { auth } = usePage().props;



    const hasPermission = (permission) => {
        // Owners have all permissions
        if (auth.isOwner) {
            return true;
        }

        // Check if staff has the specific permission
        return auth.permissions && auth.permissions.includes(permission);
    };

    const canManage = (module) => hasPermission(`manage ${module}`);
    const canCreate = (module) => hasPermission(`create ${module}`);
    const canEdit = (module) => hasPermission(`edit ${module}`);
    const canDelete = (module) => hasPermission(`delete ${module}`);
    const hasAnyAction = (module) => canEdit(module) || canDelete(module);

    return {
        hasPermission,
        canManage,
        canCreate,
        canEdit,
        canDelete,
        hasAnyAction,
        isOwner: auth.isOwner,
        permissions: auth.permissions || []
    };
}
