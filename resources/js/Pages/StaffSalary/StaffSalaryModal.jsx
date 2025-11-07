import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import DangerButton from '@/Components/DangerButton';
import FormField from '@/Components/FormField';
import { staffSalaryRoutes } from './staffSalaryConfig';
import { formatDateForInput } from '@/Utils/dateHelper';

export default function StaffSalaryModal({
    isOpen,
    onClose,
    mode,
    entity,
    staffList = []
}) {
    const initialData = {
        staff_id: '',
        staff_salary: '',
        salary_type: '',
        meter: '',
        working_days: '',
        total_salary: '',
        salary_date: new Date().toISOString().split('T')[0]
    };

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm(initialData);

    useEffect(() => {
        if (mode === 'edit' && entity) {
            setData({
                staff_id: entity.staff_id || '',
                staff_salary: entity.staff_salary || '',
                salary_type: entity.salary_type || '',
                meter: entity.meter || '',
                working_days: entity.working_days || '',
                total_salary: entity.total_salary || '',
                salary_date: formatDateForInput(entity.salary_date)
            });
        } else if (mode === 'create') {
            setData({
                staff_id: '',
                staff_salary: '',
                salary_type: '',
                meter: '',
                working_days: '',
                total_salary: '',
                salary_date: new Date().toISOString().split('T')[0]
            });
        }
    }, [entity, mode]);

    // Auto-fill staff salary and type when staff is selected (only in create mode)
    useEffect(() => {
        if (mode === 'create' && data.staff_id && staffList.length > 0) {
            const selectedStaff = staffList.find(staff => staff.id == data.staff_id);
            if (selectedStaff) {
                setData(prev => ({
                    ...prev,
                    staff_salary: selectedStaff.salary_amount || '',
                    salary_type: selectedStaff.salary_type || 'monthly'
                }));
            }
        }
    }, [data.staff_id, staffList, mode]);

    // Auto-calculate total salary
    useEffect(() => {
        if (data.staff_salary && data.salary_type) {
            let total = 0;
            if (data.salary_type === 'per_meter' && data.meter) {
                total = parseFloat(data.staff_salary) * parseFloat(data.meter);
            } else if (data.salary_type === 'monthly' && data.working_days) {
                total = parseFloat(data.staff_salary) * parseFloat(data.working_days);
            }
            setData(prev => ({ ...prev, total_salary: total.toFixed(2) }));
        }
    }, [data.staff_salary, data.salary_type, data.meter, data.working_days]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === 'create') {
            post(route(staffSalaryRoutes.store), {
                onSuccess: () => {
                    reset();
                    clearErrors();
                    onClose();
                },
            });
        } else if (mode === 'edit') {
            put(route(staffSalaryRoutes.update, entity.id), {
                onSuccess: () => {
                    reset();
                    clearErrors();
                    onClose();
                },
            });
        }
    };

    const handleDelete = () => {
        destroy(route(staffSalaryRoutes.destroy, entity.id), {
            onSuccess: () => onClose(),
        });
    };

    const handleClose = () => {
        reset();
        clearErrors();
        onClose();
    };

    const getTitle = () => {
        switch (mode) {
            case 'create': return 'Add Staff Salary';
            case 'edit': return 'Edit Staff Salary';
            case 'delete': return 'Delete Staff Salary';
            default: return 'Staff Salary';
        }
    };

    if (mode === 'delete') {
        return (
            <Modal isOpen={isOpen} onClose={onClose} title={getTitle()} size="md">
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this salary record for <strong>{entity?.staff?.name}</strong>?
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
                        Delete Salary
                    </DangerButton>
                </div>
            </Modal>
        );
    }

    const staffOptions = staffList.map(staff => ({
        value: staff.id,
        label: staff.name
    }));

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={getTitle()} size="lg">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="Staff Name"
                        name="staff_id"
                        type="select"
                        value={data.staff_id}
                        onChange={(e) => setData('staff_id', e.target.value)}
                        placeholder="Select staff member"
                        error={errors.staff_id}
                        required
                        options={staffOptions}
                        disabled={mode === 'edit'}
                    />

                    <FormField
                        label="Staff Salary"
                        name="staff_salary"
                        type="number"
                        value={data.staff_salary}
                        onChange={(e) => setData('staff_salary', e.target.value)}
                        placeholder="Enter salary amount"
                        error={errors.staff_salary}
                        required
                        step="0.01"
                        min="0"
                    />

                    <FormField
                        label="Salary Type"
                        name="salary_type"
                        type="select"
                        value={data.salary_type}
                        onChange={(e) => setData('salary_type', e.target.value)}
                        placeholder="Auto-filled"
                        error={errors.salary_type}
                        required
                        readOnly
                        options={[
                            { value: 'monthly', label: 'Monthly' },
                            { value: 'per_meter', label: 'Per Meter' }
                        ]}
                    />

                    {data.salary_type === 'per_meter' && (
                        <FormField
                            label="Meter"
                            name="meter"
                            type="number"
                            value={data.meter}
                            onChange={(e) => setData('meter', e.target.value)}
                            placeholder="Enter meter value"
                            error={errors.meter}
                            step="0.01"
                            min="0"
                        />
                    )}

                    {data.salary_type === 'monthly' && (
                        <FormField
                            label="Working Days"
                            name="working_days"
                            type="number"
                            value={data.working_days}
                            onChange={(e) => setData('working_days', e.target.value)}
                            placeholder="Enter working days"
                            error={errors.working_days}
                            min="1"
                            max="31"
                        />
                    )}

                    <FormField
                        label="Total Salary"
                        name="total_salary"
                        type="number"
                        value={data.total_salary}
                        onChange={(e) => setData('total_salary', e.target.value)}
                        placeholder="Auto-calculated"
                        error={errors.total_salary}
                        required
                        step="0.01"
                        min="0"
                        readOnly
                    />

                    <FormField
                        label="Salary Date"
                        name="salary_date"
                        type="date"
                        value={data.salary_date}
                        onChange={(e) => setData('salary_date', e.target.value)}
                        placeholder="Select date"
                        error={errors.salary_date}
                        required
                    />
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
                        {mode === 'create' ? 'Add Salary' : 'Update Salary'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
