import React from 'react';

export const qualityFields = [
    {
        name: 'quality_name',
        label: 'Quality Name',
        placeholder: 'e.g., Reniyal, Cotton, Rayon',
        required: true,
        validation: {
            required: 'Quality name is required',
            minLength: { value: 2, message: 'Quality name must be at least 2 characters' },
            maxLength: { value: 100, message: 'Quality name cannot exceed 100 characters' }
        }
    },
    {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Optional description for this quality',
        required: false
    },
    {
        name: 'cgst_percentage',
        label: 'CGST (%)',
        type: 'number',
        placeholder: '0.00',
        required: false,
        validation: {
            min: { value: 0, message: 'CGST cannot be negative' },
            max: { value: 100, message: 'CGST cannot exceed 100%' }
        }
    },
    {
        name: 'sgst_percentage',
        label: 'SGST (%)',
        type: 'number',
        placeholder: '0.00',
        required: false,
        validation: {
            min: { value: 0, message: 'SGST cannot be negative' },
            max: { value: 100, message: 'SGST cannot exceed 100%' }
        }
    },
    {
        name: 'igst_percentage',
        label: 'IGST (%)',
        type: 'number',
        placeholder: '0.00',
        required: false,
        validation: {
            min: { value: 0, message: 'IGST cannot be negative' },
            max: { value: 100, message: 'IGST cannot exceed 100%' }
        }
    },
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        required: true,
        options: [
            { value: true, label: 'Active' },
            { value: false, label: 'Inactive' }
        ],
        validation: {
            required: 'Status is required'
        }
    },
];

export const qualityRoutes = {
    store: 'qualities.store',
    update: 'qualities.update',
    destroy: 'qualities.destroy',
};

export const qualityColumns = [
    {
        key: "quality_name",
        label: "Quality Name",
        sortable: true,
        render: (item) => (
            <div className="font-medium text-text">
                {item.quality_name}
            </div>
        ),
    },
    {
        key: "description",
        label: "Description",
        render: (item) => (
            <div className="text-sm text-gray-600 max-w-xs truncate">
                {item.description || '--'}
            </div>
        ),
    },
    {
        key: "tax_info",
        label: "Tax Info",
        render: (item) => (
            <div className="text-xs text-gray-600">
                {item.cgst_percentage > 0 && <div>CGST: {item.cgst_percentage}%</div>}
                {item.sgst_percentage > 0 && <div>SGST: {item.sgst_percentage}%</div>}
                {item.igst_percentage > 0 && <div>IGST: {item.igst_percentage}%</div>}
                {!item.cgst_percentage && !item.sgst_percentage && !item.igst_percentage && '--'}
            </div>
        ),
    },
    {
        key: "status",
        label: "Status",
        sortable: true,
        render: (item) => (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                item.status 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
            }`}>
                {item.status ? 'Active' : 'Inactive'}
            </span>
        ),
    },
    {
        key: "created_at",
        label: "Created Date",
        sortable: true,
        render: (item) => (
            <div className="text-sm text-gray-600">
                {new Date(item.created_at).toLocaleDateString()}
            </div>
        ),
    },
];