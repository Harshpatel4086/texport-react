import { useState } from 'react';

export default function PermissionSelector({ value = [], onChange, permissions = [], error }) {
    const [selectAll, setSelectAll] = useState(false);

    // Group permissions by module
    const groupedPermissions = permissions.reduce((groups, permission) => {
        if (!permission || !permission.label) return groups;
        
        const parts = permission.label.split(' ');
        const action = parts[0]; // manage, create, edit, delete
        const module = parts.slice(1).join(' '); // staff, role, party
        
        if (!groups[module]) {
            groups[module] = [];
        }
        groups[module].push({ ...permission, action });
        return groups;
    }, {});

    const handlePermissionChange = (permissionValue, checked) => {
        const newValue = checked
            ? [...value, permissionValue]
            : value.filter(p => p !== permissionValue);
        onChange({ target: { value: newValue } });
    };

    const handleModuleSelectAll = (module, checked) => {
        const modulePermissions = groupedPermissions[module].map(p => p.value);
        let newValue;
        
        if (checked) {
            newValue = [...new Set([...value, ...modulePermissions])];
        } else {
            newValue = value.filter(p => !modulePermissions.includes(p));
        }
        onChange({ target: { value: newValue } });
    };

    const handleGlobalSelectAll = (checked) => {
        setSelectAll(checked);
        const allPermissions = permissions.map(p => p.value);
        const newValue = checked ? allPermissions : [];
        onChange({ target: { value: newValue } });
    };

    const isModuleFullySelected = (module) => {
        const modulePermissions = groupedPermissions[module].map(p => p.value);
        return modulePermissions.every(p => value.includes(p));
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-text">
                    Permissions
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={selectAll || value.length === permissions.length}
                        onChange={(e) => handleGlobalSelectAll(e.target.checked)}
                        className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="text-sm text-primary font-medium">Select All</span>
                </label>
            </div>

            <div className="space-y-4 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
                {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
                    <div key={module} className="border-b border-gray-100 pb-3 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-text capitalize">
                                {module} Management
                            </h4>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={isModuleFullySelected(module)}
                                    onChange={(e) => handleModuleSelectAll(module, e.target.checked)}
                                    className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <span className="text-xs text-primary">Select All</span>
                            </label>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                            {modulePermissions.map((permission) => (
                                <label key={permission.value} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={value.includes(permission.value)}
                                        onChange={(e) => handlePermissionChange(permission.value, e.target.checked)}
                                        className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    />
                                    <span className="text-sm text-gray-700 capitalize">
                                        {permission.action}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}