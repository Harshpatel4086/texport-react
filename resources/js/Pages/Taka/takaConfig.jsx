import React from 'react';

export const takaFields = [
    {
        name: 'taka_number',
        label: 'Taka Number',
        placeholder: 'Enter taka number',
        required: true,
        validation: {
            required: 'Taka number is required',
            minLength: { value: 1, message: 'Taka number must be at least 1 character' },
            maxLength: { value: 255, message: 'Taka number cannot exceed 255 characters' }
        }
    },
    {
        name: 'meter',
        label: 'Meter',
        type: 'number',
        placeholder: 'Enter meter value',
        required: true,
        validation: {
            required: 'Meter is required',
            min: { value: 0, message: 'Meter must be 0 or greater' }
        }
    }
];

export const takaRoutes = {
    store: 'takas.store',
    update: 'takas.update',
    destroy: 'takas.destroy',
};

export const takaColumns = [
    {
        key: "taka_number",
        label: "Taka Number",
        sortable: true,
        render: (item) => (
            <span className="text-sm font-medium text-text">{item.taka_number}</span>
        ),
    },
    {
        key: "meter",
        label: "Meter",
        sortable: true,
        render: (item) => (
            <span className="text-sm text-text">{parseFloat(item.meter).toFixed(2)}</span>
        ),
    },
    {
        key: "created_at",
        label: "Created At",
        sortable: true,
        render: (item) => (
            <span className="text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString()}
            </span>
        ),
    }
];