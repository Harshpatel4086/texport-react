import React from 'react';

export const partyFields = [
    {
        name: 'party_name',
        label: 'Party Name',
        placeholder: 'Enter party name',
        required: true,
        validation: {
            required: 'Party name is required',
            minLength: { value: 2, message: 'Party name must be at least 2 characters' },
            maxLength: { value: 100, message: 'Party name cannot exceed 100 characters' },
            pattern: { value: /^[a-zA-Z\s.'-]+$/, message: 'Party name can only contain letters, spaces, dots, apostrophes and hyphens' }
        }
    },
    {
        name: 'gst_number',
        label: 'GST Number',
        placeholder: 'Enter GST number (e.g., 22AAAAA0000A1Z5)',
        required: true,
        validation: {
            required: 'GST number is required',
            pattern: { value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, message: 'Please enter a valid GST number (15 characters)' }
        }
    },
    {
        name: 'phone_number',
        label: 'Phone Number',
        placeholder: 'Enter phone number',
        required: true,
        validation: {
            required: 'Phone number is required',
            pattern: { value: /^[6-9]\d{9}$/, message: 'Please enter a valid 10-digit Indian mobile number' }
        }
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: true,
        validation: {
            required: 'Email is required',
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please enter a valid email address' }
        }
    },
    {
        name: 'business_name',
        label: 'Business Name',
        placeholder: 'Enter business name',
        required: true,
        validation: {
            required: 'Business name is required',
            minLength: { value: 2, message: 'Business name must be at least 2 characters' },
            maxLength: { value: 150, message: 'Business name cannot exceed 150 characters' }
        }
    },
    {
        name: 'business_location',
        label: 'Business Location',
        placeholder: 'Enter business location',
        required: true,
        validation: {
            required: 'Business location is required',
            minLength: { value: 2, message: 'Business location must be at least 2 characters' },
            maxLength: { value: 100, message: 'Business location cannot exceed 100 characters' }
        }
    },
    {
        name: 'address',
        label: 'Address',
        type: 'textarea',
        placeholder: 'Enter complete address',
        required: true,
        validation: {
            required: 'Address is required',
            minLength: { value: 10, message: 'Address must be at least 10 characters' },
            maxLength: { value: 500, message: 'Address cannot exceed 500 characters' }
        }
    },
];

export const partyRoutes = {
    store: 'parties.store',
    update: 'parties.update',
    destroy: 'parties.destroy',
};

export const partyColumns = [
    {
        key: "party_number",
        label: "Party ID",
        sortable: true,
        render: (item, onView) => (
            <button
                onClick={() => onView && onView(item)}
                className="text-primary hover:text-primary-dark font-medium text-sm transition-colors cursor-pointer"
            >
                {item.formatted_party_number ?? '-'}
            </button>
        ),
    },
    {
        key: "party_name",
        label: "Party Name",
        sortable: true,
        render: (item) => (
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium">
                    {item.party_name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-text">
                        {item.party_name}
                    </div>
                </div>
            </div>
        ),
    },
    {
        key: "email",
        label: "Email",
        render: (item) => (
            <span className="text-sm text-text">{item.email}</span>
        ),
    },
    {
        key: "phone_number",
        label: "Phone",
        render: (item) => (
            <span className="text-sm text-text">{item.phone_number}</span>
        ),
    },
    {
        key: "business_name",
        label: "Business Name",
        render: (item) => (
            <span className="text-sm text-text">{item.business_name}</span>
        ),
    },
];
