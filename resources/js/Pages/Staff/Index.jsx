import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Breadcrumb from '@/Components/Breadcrumb';
import DataTable from '@/Components/DataTable';
import Button from '@/Components/Button';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import IconButton from '@/Components/IconButton';
import AddStaffModal from '@/Components/AddStaffModal';
import EditStaffModal from '@/Components/EditStaffModal';
import DeleteStaffModal from '@/Components/DeleteStaffModal';
import { usePermissions } from '@/Utils/permissions';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';

export default function StaffIndex(props) {
    const { auth = {}, staff = {}, filters = {}, userRoles = [] } = props;
    const { canCreate, canEdit, canDelete, hasAnyAction } = usePermissions();

    // Handle flash messages as toasts
    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const mockStaff = {
        data: [
            { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', role: 'Manager', created_at: '2024-01-15' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', role: 'Staff', created_at: '2024-01-20' },
            { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1234567892', role: 'Supervisor', created_at: '2024-02-01' },
        ],
        from: 1,
        to: 3,
        total: 3,
        links: [
            { label: '&laquo; Previous', url: null, active: false },
            { label: '1', url: '#', active: true },
            { label: 'Next &raquo;', url: null, active: false }
        ]
    };

    const breadcrumbItems = [
        { label: 'Home', href: '/dashboard' },
        { label: 'Users', href: '/staff' },
        { label: 'Staff' }
    ];

    const columns = [
        {
            key: "name",
            label: "Name",
            sortable: true,
            render: (item) => (
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium">
                        {item.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-text">
                            {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                            {item.phone}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "email",
            label: "Email",
            sortable: true,
            render: (item) => (
                <span className="text-gray-600">{item.email}</span>
            ),
        },
        {
            key: "role",
            label: "Role",
            render: (item) => (
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                    {item.role}
                </span>
            ),
        },
        {
            key: "created_at",
            label: "Joined",
            sortable: true,
            render: (item) => (
                <span className="text-gray-600">
                    {new Date(item.created_at).toLocaleDateString()}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: () => (
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                </span>
            ),
        },
        // Only show Actions column if user has any action permissions
        ...(hasAnyAction('staff') ? [{
            key: "actions",
            label: "Actions",
            render: (item) => (
                <div className="inline-flex items-center justify-end space-x-1">
                    {canEdit('staff') && (
                        <IconButton
                            icon={MdEdit}
                            tooltip="Edit"
                            variant="primary"
                            onClick={() => {
                                setSelectedStaff(item);
                                setShowEditModal(true);
                            }}
                        />
                    )}
                    {canDelete('staff') && (
                        <IconButton
                            icon={MdDelete}
                            tooltip="Delete"
                            variant="danger"
                            onClick={() => {
                                setSelectedStaff(item);
                                setShowDeleteModal(true);
                            }}
                        />
                    )}
                </div>
            ),
        }] : []),
    ];

    const staffData = staff.data ? staff : mockStaff;

    return (
        <>
            <Head title="Staff Management" />

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
                            <h1 className="text-xl lg:text-2xl font-bold text-text">Staff Management</h1>
                                {canCreate('staff') && (
                                    <Button
                                        className="flex items-center space-x-2"
                                        tooltip="Add Staff"
                                        onClick={() => setShowAddModal(true)}
                                    >
                                        <MdAdd className="w-5 h-5" />
                                        <span>Add Staff</span>
                                    </Button>
                                )}
                        </div>

                        <DataTable
                            data={staffData.data}
                            columns={columns}
                            searchPlaceholder="Search staff by name, email, or role..."
                            filters={filters}
                            pagination={staffData}
                        />

                        {canCreate('staff') && (
                            <AddStaffModal
                                isOpen={showAddModal}
                                onClose={() => setShowAddModal(false)}
                                userRoles={userRoles}

                            />
                        )}

                        {canEdit('staff') && (
                            <EditStaffModal
                                isOpen={showEditModal}
                                onClose={() => {
                                    setShowEditModal(false);
                                    setSelectedStaff(null);
                                }}
                                staff={selectedStaff}
                                userRoles={userRoles}
                            />
                        )}

                        {canDelete('staff') && (
                            <DeleteStaffModal
                                isOpen={showDeleteModal}
                                onClose={() => {
                                    setShowDeleteModal(false);
                                    setSelectedStaff(null);
                                }}
                                staff={selectedStaff}
                            />
                        )}
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}
