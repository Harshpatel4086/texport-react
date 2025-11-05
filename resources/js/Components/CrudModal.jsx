import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import DangerButton from '@/Components/DangerButton';
import FormField from '@/Components/FormField';
import PermissionSelector from '@/Components/PermissionSelector';

export default function CrudModal({ 
    isOpen, 
    onClose, 
    mode, // 'create', 'edit', 'delete'
    title,
    entity, // The item being edited/deleted
    fields, // Array of field configurations
    routes, // Object with store, update, destroy routes
    entityName // For delete confirmation text
}) {
    const initialData = fields?.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {}) || {};

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm(initialData);

    useEffect(() => {
        if (mode === 'edit' && entity) {
            const editData = {};
            fields.forEach(field => {
                if (field.name === 'permissions' && entity.permissions) {
                    editData[field.name] = entity.permissions.map(p => p.name);
                } else {
                    editData[field.name] = entity[field.name] || '';
                }
            });
            setData(editData);
        }
    }, [entity, mode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (mode === 'create') {
            post(routes.store, {
                onSuccess: () => {
                    reset();
                    clearErrors();
                    onClose();
                },
            });
        } else if (mode === 'edit') {
            put(routes.update.replace(':id', entity.id), {
                onSuccess: () => {
                    reset();
                    clearErrors();
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
                    {fields?.filter(field => field.type !== 'textarea' && field.type !== 'checkbox-group').map((field) => (
                        <FormField
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            type={field.type || 'text'}
                            value={data[field.name] || ''}
                            onChange={(e) => setData(field.name, e.target.value)}
                            placeholder={field.placeholder}
                            error={errors[field.name]}
                            required={field.required}
                            options={field.options}
                        />
                    ))}
                </div>

                {fields?.filter(field => field.type === 'checkbox-group').map((field) => (
                    <PermissionSelector
                        key={field.name}
                        value={data[field.name] || []}
                        onChange={(e) => setData(field.name, e.target.value)}
                        permissions={field.options}
                        error={errors[field.name]}
                    />
                ))}

                {fields?.filter(field => field.type === 'textarea').map((field) => (
                    <FormField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type="textarea"
                        value={data[field.name] || ''}
                        onChange={(e) => setData(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        error={errors[field.name]}
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