import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import DangerButton from '@/Components/DangerButton';
import FormField from '@/Components/FormField';
import { validateField } from '@/Utils/validation';

export default function PartyFormModal({ 
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
        acc[field.name] = '';
        return acc;
    }, {}) || {};

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm(initialData);
    const [clientErrors, setClientErrors] = useState({});

    useEffect(() => {
        if (mode === 'edit' && entity) {
            const editData = {};
            fields.forEach(field => {
                editData[field.name] = entity[field.name] || '';
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
                    Are you sure you want to delete <strong>{entity?.[fields?.[0]?.name]}</strong>? 
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields?.filter(field => field.type !== 'textarea').map((field) => (
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
                    ))}
                </div>

                {fields?.filter(field => field.type === 'textarea').map((field) => (
                    <FormField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type="textarea"
                        value={data[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        error={clientErrors[field.name] || errors[field.name]}
                        required={field.required}
                    />
                ))}

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