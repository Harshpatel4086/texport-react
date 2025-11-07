import React from 'react';
import { formatDate } from '@/Utils/dateHelper';

export const staffSalaryFields = [
    { name: 'staff_id', label: 'Staff Name', type: 'select', placeholder: 'Select staff member', required: true },
    { name: 'staff_salary', label: 'Staff Salary', type: 'number', placeholder: 'Enter salary amount', required: true, step: '0.01', min: '0' },
    { name: 'salary_type', label: 'Salary Type', type: 'select', placeholder: 'Auto-filled', required: true, readonly: true, options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'per_meter', label: 'Per Meter' }
    ]},
    { name: 'meter', label: 'Meter', type: 'number', placeholder: 'Enter meter value', required: false, step: '0.01', min: '0', conditional: 'per_meter' },
    { name: 'working_days', label: 'Working Days', type: 'number', placeholder: 'Enter working days', required: false, min: '1', max: '31', conditional: 'monthly' },
    { name: 'total_salary', label: 'Total Salary', type: 'number', placeholder: 'Auto-calculated', required: true, step: '0.01', min: '0', readonly: true },
    { name: 'salary_date', label: 'Salary Date', type: 'date', placeholder: 'Select date', required: true },
];

export const staffSalaryRoutes = {
    store: 'staff-salaries.store',
    update: 'staff-salaries.update',
    destroy: 'staff-salaries.destroy',
};

export const staffSalaryColumns = [
    {
        key: "staff_info",
        label: "Staff Member",
        sortable: false,
        render: (item) => (
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium">
                    {item.staff?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-text">
                        {item.staff?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                        {item.staff?.email}
                    </div>
                </div>
            </div>
        ),
    },
    {
        key: "salary_date",
        label: "Date",
        sortable: true,
        render: (item) => (
            <span className="text-gray-600">
                {formatDate(item.salary_date)}
            </span>
        ),
    },
    {
        key: "salary_info",
        label: "Salary Details",
        render: (item) => (
            <div className="text-sm">
                <div className="font-medium text-text">
                    Base: ₹{parseFloat(item.staff_salary).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                    {item.salary_type?.replace('_', ' ')}
                    {item.salary_type === 'per_meter' && item.meter && ` × ${item.meter}m`}
                    {item.salary_type === 'monthly' && item.working_days && ` × ${item.working_days} days`}
                </div>
            </div>
        ),
    },
    {
        key: "total_salary",
        label: "Total Salary",
        sortable: true,
        render: (item) => (
            <div className="text-sm font-semibold text-green-600">
                ₹{parseFloat(item.total_salary).toLocaleString()}
            </div>
        ),
    },
    {
        key: "created_at",
        label: "Created",
        sortable: true,
        render: (item) => (
            <span className="text-gray-600">
                {formatDate(item.created_at)}
            </span>
        ),
    },
];