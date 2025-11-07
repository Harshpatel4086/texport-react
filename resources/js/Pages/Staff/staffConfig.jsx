import React from 'react';

export const staffFields = [
    { name: 'name', label: 'Name', placeholder: 'Enter staff name', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address', required: true },
    { name: 'phone_number', label: 'Phone Number', placeholder: 'Enter phone number', required: false },
    { name: 'role', label: 'Role', type: 'select', placeholder: 'Select a role', required: true },
    { name: 'salary_type', label: 'Salary Type', type: 'select', placeholder: 'Select salary type', required: true, options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'per_meter', label: 'Per Meter' }
    ]},
    { name: 'salary_amount', label: 'Salary Amount', type: 'number', placeholder: 'Enter salary amount', required: false, step: '0.01', min: '0' },
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
                    {item.staff_detail?.phone_number && (
                        <div className="text-xs text-gray-400">
                            📞 {item.staff_detail.phone_number}
                        </div>
                    )}
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
        key: "salary_info",
        label: "Salary",
        render: (item) => (
            <div className="text-sm">
                {item.staff_detail ? (
                    <>
                        <div className="font-medium text-text">
                            {item.staff_detail.salary_amount ?
                                `₹${parseFloat(item.staff_detail.salary_amount).toLocaleString()}` :
                                'Not Set'
                            }
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                            {item.staff_detail.salary_type?.replace('_', ' ') || 'Monthly'}
                        </div>
                    </>
                ) : (
                    <span className="text-gray-400">Not Set</span>
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
