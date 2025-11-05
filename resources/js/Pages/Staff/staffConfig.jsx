import React from 'react';

export const staffFields = [
    { name: 'name', label: 'Name', placeholder: 'Enter staff name', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address', required: true },
    { name: 'role', label: 'Role', type: 'select', placeholder: 'Select a role', required: true },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Create password', required: true },
];

export const staffRoutes = {
    store: 'staff.store',
    update: 'staff.update',
    destroy: 'staff.destroy',
};

export const staffColumns = [
    {
        key: "name",
        label: "Staff Member",
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
                    <div className="text-sm text-gray-500">
                        {item.email}
                    </div>
                </div>
            </div>
        ),
    },
    {
        key: "role",
        label: "Role",
        sortable: true,
        render: (item) => (
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                {item.role}
            </span>
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