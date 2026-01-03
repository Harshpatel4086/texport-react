import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import DangerButton from '@/Components/DangerButton';
import FormField from '@/Components/FormField';
import Select from '@/Components/Select';
import { validateField } from '@/Utils/validation';

export default function QualityFormModal({ 
    isOpen, 
    onClose, 
    mode,
    title,
    entity,
    fields,
    routes,
    entityName
}) {
    const initialData = fields?.reduce((acc, field) => {
        acc[field.name] = field.name === 'status' ? true : '';
        return acc;
    }, {}) || {};

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm(initialData);
    const [clientErrors, setClientErrors] = useState({});

    useEffect(() => {
        if (mode === 'edit' && entity) {
            const editData = {};
            fields.forEach(field => {
                editData[field.name] = entity[field.name] !== undefined ? entity[field.name] : (field.name === 'status' ? true : '');
            });
            setData(editData);
        }
    }, [entity, mode]);

    const handleFieldChange = (fieldName, value) => {
        setData(fieldName, value);
        
        // Clear client-side error for this field
        if (clientErrors[fieldName]) {
            setClientErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        }

        // Validate field on change
        const field = fields.find(f => f.name === fieldName);
        if (field?.validation) {
            const error = validateField(fieldName, value, field.validation);
            if (error) {
                setClientErrors(prev => ({ ...prev, [fieldName]: error }));
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        fields.forEach(field => {
            if (field.validation) {
                const error = validateField(field.name, data[field.name], field.validation);
                if (error) {
                    errors[field.name] = error;
                }
            }
        });
        setClientErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        if (mode === 'create') {
            post(routes.store, {
                onSuccess: () => {
                    reset();
                    clearErrors();
                    setClientErrors({});
                    onClose();
                },
            });
        } else if (mode === 'edit') {
            put(routes.update.replace(':id', entity.id), {
                onSuccess: () => {
                    reset();
                    clearErrors();
                    setClientErrors({});
                    onClose();
                },
            });
        }
    };

    const handleDelete = () => {
        destroy(routes.destroy.replace(':id', entity.id), {
            onSuccess: () => onClose(),
        });
    };

    const handleClose = () => {
        reset();
        clearErrors();
        setClientErrors({});
        onClose();
    };

    if (mode === 'delete') {
        return (
            <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete <strong>{entity?.quality_name}</strong>? 
                    This action cannot be undone.
                </p>

                <div className="flex justify-end space-x-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <DangerButton
                        onClick={handleDelete}
                        processing={processing}
                    >
                        Delete {entityName}
                    </DangerButton>
                </div>
            </Modal>
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={title} size="lg">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 gap-4">
                    {fields?.map((field) => {
                        if (field.type === 'select') {
                            return (
                                <div key={field.name}>
                                    <Select
                                        label={field.label}
                                        value={data[field.name]}
                                        onChange={(e) => handleFieldChange(field.name, e.target.value === 'true')}
                                        error={clientErrors[field.name] || errors[field.name]}
                                        required={field.required}
                                    >
                                        {field.options?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                            );
                        }

                        if (field.type === 'textarea') {
                            return (
                                <div key={field.name}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {field.label}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    <textarea
                                        value={data[field.name] || ''}
                                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder={field.placeholder}
                                    />
                                    {(clientErrors[field.name] || errors[field.name]) && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {clientErrors[field.name] || errors[field.name]}
                                        </p>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <FormField
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                type={field.type || 'text'}
                                value={data[field.name] || ''}
                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                placeholder={field.placeholder}
                                error={clientErrors[field.name] || errors[field.name]}
                                required={field.required}
                            />
                        );
                    })}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                    >
                        {mode === 'create' ? `Add ${entityName}` : `Update ${entityName}`}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}