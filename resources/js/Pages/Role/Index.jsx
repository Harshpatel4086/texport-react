import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Breadcrumb from '@/Components/Breadcrumb';
import DataTable from '@/Components/DataTable';
import Button from '@/Components/Button';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import IconButton from '@/Components/IconButton';
import AddRoleModal from '@/Components/AddRoleModal';
import EditRoleModal from '@/Components/EditRoleModal';
import DeleteRoleModal from '@/Components/DeleteRoleModal';

export default function RoleIndex(props) {
    const { auth = {}, roles = {}, filters = {}, permissions = [] } = props;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    const breadcrumbItems = [
        { label: 'Home', href: '/dashboard' },
        { label: 'Users', href: '/roles' },
        { label: 'Roles' }
    ];

    const columns = [
        {
            key: "name",
            label: "Role Name",
            sortable: true,
            render: (item) => (
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium">
                        {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-text">
                            {item.name}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "permissions",
            label: "Permissions",
            render: (item) => (
                <div className="flex flex-wrap gap-1">
                    {item.permissions.slice(0, 3).map((permission) => (
                        <span key={permission.id} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                            {permission.name}
                        </span>
                    ))}
                    {item.permissions.length > 3 && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                            +{item.permissions.length - 3} more
                        </span>
                    )}
                </div>
            ),
        },
        {
            key: "created_at",
            label: "Created",
            sortable: true,
            render: (item) => (
                <span className="text-gray-600">
                    {new Date(item.created_at).toLocaleDateString()}
                </span>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (item) => (
                <div className="inline-flex items-center justify-end space-x-1">
                    <IconButton
                        icon={MdEdit}
                        tooltip="Edit"
                        variant="primary"
                        onClick={() => {
                            setSelectedRole(item);
                            setShowEditModal(true);
                        }}
                    />
                    <IconButton
                        icon={MdDelete}
                        tooltip="Delete"
                        variant="danger"
                        onClick={() => {
                            setSelectedRole(item);
                            setShowDeleteModal(true);
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Role Management" />

            <div className="flex h-screen bg-background">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader
                        user={auth.user}
                        onMenuClick={() => setSidebarOpen(true)}
                    />

                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        <Breadcrumb items={breadcrumbItems} />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
                            <h1 className="text-xl lg:text-2xl font-bold text-text">Role Management</h1>
                            <Button
                                className="flex items-center space-x-2"
                                tooltip="Add Role"
                                onClick={() => setShowAddModal(true)}
                            >
                                <MdAdd className="w-5 h-5" />
                                <span>Add Role</span>
                            </Button>
                        </div>

                        <DataTable
                            data={roles.data}
                            columns={columns}
                            searchPlaceholder="Search roles by name..."
                            filters={filters}
                            pagination={roles}
                        />

                        <AddRoleModal
                            isOpen={showAddModal}
                            onClose={() => setShowAddModal(false)}
                            permissions={permissions}
                        />

                        <EditRoleModal
                            isOpen={showEditModal}
                            onClose={() => {
                                setShowEditModal(false);
                                setSelectedRole(null);
                            }}
                            role={selectedRole}
                            permissions={permissions}
                        />

                        <DeleteRoleModal
                            isOpen={showDeleteModal}
                            onClose={() => {
                                setShowDeleteModal(false);
                                setSelectedRole(null);
                            }}
                            role={selectedRole}
                        />
                    </main>
                </div>
            </div>
        </>
    );
}