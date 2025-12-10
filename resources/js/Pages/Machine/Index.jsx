import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import DataTable from '@/Components/DataTable';
import Button from '@/Components/Button';
import { MdAdd } from 'react-icons/md';
import MachineModal from './MachineModal';
import MachineActions from './MachineActions';
import { machineColumns } from './machineConfig.jsx';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';
import { usePermissions } from '@/Utils/permissions';

export default function MachineIndex(props) {
    const { auth = {}, machines = {}, filters = {} } = props;
    const { canCreate, canEdit, canDelete, hasAnyAction } = usePermissions();

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
        { label: 'Workers' },
        { label: 'Machine Management' }
    ];

    return (
        <>
            <Head title="Machine Management" />

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
                            <h1 className="text-xl lg:text-2xl font-bold text-text">Machine Management</h1>
                            {canCreate('worker machines') && (
                                <Button
                                    className="flex items-center space-x-2"
                                    tooltip="Add Machine"
                                    onClick={() => setModalState({ isOpen: true, mode: 'create', entity: null })}
                                >
                                    <MdAdd className="w-5 h-5" />
                                    <span>Add Machine</span>
                                </Button>
                            )}
                        </div>

                        <DataTable
                            data={machines.data}
                            columns={[
                                ...machineColumns,
                                ...(hasAnyAction('worker machines') ? [{
                                    key: "actions",
                                    label: "Actions",
                                    render: (item) => (
                                        <MachineActions
                                            item={item}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    ),
                                }] : []),
                            ]}
                            searchPlaceholder="Search machines by number or description..."
                            filters={filters}
                            pagination={machines}
                        />

                        <MachineModal
                            isOpen={modalState.isOpen}
                            onClose={() => setModalState({ isOpen: false, mode: null, entity: null })}
                            mode={modalState.mode}
                            entity={modalState.entity}
                        />
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}