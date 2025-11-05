import { usePage } from '@inertiajs/react';

export function usePermissions() {
    const { auth } = usePage().props;



    const hasPermission = (permission) => {
        // Owners have all permissions that exist in the database
        if (auth.isOwner) {
            // Only return true if the permission exists in the permissions array
            // This ensures we only show menus for permissions that are seeded
            return auth.permissions && auth.permissions.includes(permission);
        }

        // Check if staff has the specific permission
        return auth.permissions && auth.permissions.includes(permission);
    };

    const canManage = (module) => hasPermission(`manage ${module}`);
    const canCreate = (module) => hasPermission(`create ${module}`);
    const canEdit = (module) => hasPermission(`edit ${module}`);
    const canDelete = (module) => hasPermission(`delete ${module}`);
    const canView = (module) => hasPermission(`view ${module}`);
    const hasAnyAction = (module) => canEdit(module) || canDelete(module) || canView(module);

    return {
        hasPermission,
        canManage,
        canCreate,
        canEdit,
        canDelete,
        canView,
        hasAnyAction,
        isOwner: auth.isOwner,
        permissions: auth.permissions || []
    };
}
