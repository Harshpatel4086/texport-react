import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import DataTable from '@/Components/DataTable';
import Button from '@/Components/Button';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import IconButton from '@/Components/IconButton';
import RoleModal from './RoleModal';
import RoleActions from './RoleActions';
import { roleColumns } from './roleConfig.jsx';
import { usePermissions } from '@/Utils/permissions';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';

export default function RoleIndex(props) {
    const { auth = {}, roles = {}, filters = {}, permissions = [] } = props;
    const { canCreate, canEdit, canDelete, hasAnyAction } = usePermissions();

    // Handle flash messages as toasts
    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modalState, setModalState] = useState({ isOpen: false, mode: null, entity: null });

    const handleEdit = (item) => {
        setModalState({ isOpen: true, mode: 'edit', entity: item });
    };

    const handleDelete = (item) => {
        setModalState({ isOpen: true, mode: 'delete', entity: item });
    };

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Users' },
        { label: 'Role Management' }
    ];



    return (
        <>
            <Head title="Role Management" />

            <div className="flex h-screen bg-background">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={auth.user} />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader
                        user={auth.user}
                        onMenuClick={() => setSidebarOpen(true)}
                        breadcrumbs={breadcrumbs}
                    />

                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
                            <h1 className="text-xl lg:text-2xl font-bold text-text">Role Management</h1>
                            {canCreate('role') && (
                                <Button
                                    className="flex items-center space-x-2"
                                    tooltip="Add Role"
                                    onClick={() => setModalState({ isOpen: true, mode: 'create', entity: null })}
                                >
                                    <MdAdd className="w-5 h-5" />
                                    <span>Add Role</span>
                                </Button>
                            )}
                        </div>

                        <DataTable
                            data={roles.data}
                            columns={[
                                ...roleColumns,
                                ...(hasAnyAction('role') ? [{
                                    key: "actions",
                                    label: "Actions",
                                    render: (item) => (
                                        <RoleActions
                                            item={item}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    ),
                                }] : []),
                            ]}
                            searchPlaceholder="Search roles by name..."
                            filters={filters}
                            pagination={roles}
                        />

                        <RoleModal
                            isOpen={modalState.isOpen}
                            onClose={() => setModalState({ isOpen: false, mode: null, entity: null })}
                            mode={modalState.mode}
                            entity={modalState.entity}
                            permissions={permissions}
                        />
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}
