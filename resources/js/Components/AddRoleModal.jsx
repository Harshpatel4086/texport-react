import { useForm } from '@inertiajs/react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';

export default function AddRoleModal({ isOpen, onClose, permissions }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        permissions: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/roles', {
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

    const handlePermissionChange = (permissionName) => {
        const updatedPermissions = data.permissions.includes(permissionName)
            ? data.permissions.filter(p => p !== permissionName)
            : [...data.permissions, permissionName];
        
        setData('permissions', updatedPermissions);
    };

    const handleSelectAll = () => {
        const allPermissionNames = permissions.map(p => p.name);
        setData('permissions', allPermissionNames);
    };

    const handleDeselectAll = () => {
        setData('permissions', []);
    };

    const handleGroupSelect = (groupPermissions) => {
        const groupNames = groupPermissions.map(p => p.name);
        const isAllSelected = groupNames.every(name => data.permissions.includes(name));
        
        if (isAllSelected) {
            // Deselect all in group
            setData('permissions', data.permissions.filter(p => !groupNames.includes(p)));
        } else {
            // Select all in group
            const newPermissions = [...new Set([...data.permissions, ...groupNames])];
            setData('permissions', newPermissions);
        }
    };

    // Dynamically group permissions by module from database
    const groupedPermissions = {};
    permissions.forEach(permission => {
        const words = permission.name.split(' ');
        const module = words[words.length - 1]; // Get last word (user, role, staff, etc.)
        const moduleName = module.charAt(0).toUpperCase() + module.slice(1);
        
        if (!groupedPermissions[moduleName]) {
            groupedPermissions[moduleName] = [];
        }
        groupedPermissions[moduleName].push(permission);
    });
    
    // Sort groups alphabetically
    const sortedGroups = Object.keys(groupedPermissions).sort().reduce((obj, key) => {
        obj[key] = groupedPermissions[key];
        return obj;
    }, {});

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Add New Role" size="md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Role Name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter role name"
                    required
                    error={errors.name}
                />

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-text">
                            Permissions
                        </label>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={handleSelectAll}
                                className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-primary-600 transition-colors"
                            >
                                Select All
                            </button>
                            <button
                                type="button"
                                onClick={handleDeselectAll}
                                className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                            >
                                Deselect All
                            </button>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {Object.entries(sortedGroups).map(([groupName, groupPermissions]) => {
                            if (groupPermissions.length === 0) return null;
                            const isAllSelected = groupPermissions.every(p => data.permissions.includes(p.name));
                            
                            return (
                                <div key={groupName} className="border border-neutral rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-text">{groupName}</h4>
                                        <button
                                            type="button"
                                            onClick={() => handleGroupSelect(groupPermissions)}
                                            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                        >
                                            {isAllSelected ? 'Deselect All' : 'Select All'}
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {groupPermissions.map((permission) => (
                                            <label key={permission.id} className="flex items-center p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={data.permissions.includes(permission.name)}
                                                    onChange={() => handlePermissionChange(permission.name)}
                                                    className="mr-2 w-4 h-4 rounded border-neutral text-primary focus:ring-primary focus:ring-2"
                                                />
                                                <span className="text-sm text-text">{permission.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {errors.permissions && <p className="mt-2 text-sm text-red-500">{errors.permissions}</p>}
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
                        variant="primary"
                        disabled={processing}
                    >
                        {processing ? 'Creating...' : 'Create'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}