import React from 'react';

export const roleFields = [
    { name: 'name', label: 'Role Name', placeholder: 'Enter role name', required: true },
];

export const roleRoutes = {
    store: 'roles.store',
    update: 'roles.update',
    destroy: 'roles.destroy',
};

export const roleColumns = [
    {
        key: "name",
        label: "Role Name",
        sortable: true,
        render: (item) => (
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium">
                    {item.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-text">
                        {item.name}
                    </div>
                </div>
            </div>
        ),
    },
    {
        key: "permissions",
        label: "Permissions",
        render: (item) => (
            <div className="flex flex-wrap gap-1">
                {item.permissions.slice(0, 3).map((permission) => (
                    <span key={permission.id} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                        {permission.name}
                    </span>
                ))}
                {item.permissions.length > 3 && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                        +{item.permissions.length - 3} more
                    </span>
                )}
            </div>
        ),
    },
    {
        key: "created_at",
        label: "Created",
        sortable: true,
        render: (item) => (
            <span className="text-gray-600">
                {new Date(item.created_at).toLocaleDateString()}
            </span>
        ),
    },
];