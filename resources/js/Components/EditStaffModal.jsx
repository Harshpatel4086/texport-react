import { useForm, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';

export default function EditStaffModal({ isOpen, onClose, staff, userRoles }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role: '',
        password: '',
    });

    useEffect(() => {
        if (staff) {
            setData({
                name: staff.name || '',
                email: staff.email || '',
                role: staff.role || '',
                password: '',
            });
        }
    }, [staff]);

    // Use dynamic roles from current user
    const roles = userRoles.map(role => ({
        value: role.name,
        label: role.name
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/staff/${staff.id}`, {
            onSuccess: () => {
                reset();
                onClose();
            }
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Edit Staff" size="md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter staff name"
                    required
                    error={errors.name}
                />

                <Input
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="Enter email address"
                    required
                    error={errors.email}
                />

                <div>
                    <label className="block text-sm font-medium text-text mb-2">
                        Role <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className="w-full px-4 py-3 border border-neutral rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                    >
                        <option value="">Select a role</option>
                        {roles.map((role) => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                    {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                    {roles.length === 0 && (
                        <p className="mt-1 text-sm text-gray-500">
                            Role is not available{' '}
                            <Link href="/roles" className="text-primary hover:text-primary-600 underline">
                                Create role
                            </Link>
                        </p>
                    )}
                </div>

                <Input
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Leave blank to keep current password"
                    error={errors.password}
                />

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
                        variant="primary"
                        disabled={processing}
                    >
                        {processing ? 'Updating...' : 'Update'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
