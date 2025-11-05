import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Breadcrumb from '@/Components/Breadcrumb';
import DataTable from '@/Components/DataTable';
import Button from '@/Components/Button';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import IconButton from '@/Components/IconButton';
import PartyModal from './PartyModal';
import PartyViewModal from './PartyViewModal';
import PartyActions from './PartyActions';
import { partyColumns } from './partyConfig.jsx';
import { usePermissions } from '@/Utils/permissions';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';

export default function PartyIndex(props) {
    const { auth = {}, parties = {}, filters = {} } = props;
    const { canCreate, canEdit, canDelete, hasAnyAction } = usePermissions();

    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modalState, setModalState] = useState({ isOpen: false, mode: null, entity: null });
    const [viewModalState, setViewModalState] = useState({ isOpen: false, entity: null });

    const handleView = (item) => {
        setViewModalState({ isOpen: true, entity: item });
    };

    const handleEdit = (item) => {
        setModalState({ isOpen: true, mode: 'edit', entity: item });
    };

    const handleDelete = (item) => {
        setModalState({ isOpen: true, mode: 'delete', entity: item });
    };

    const breadcrumbItems = [
        { label: 'Home', href: '/dashboard' },
        { label: 'Parties' }
    ];



    return (
        <>
            <Head title="Party Management" />

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
                            <h1 className="text-xl lg:text-2xl font-bold text-text">Party Management</h1>
                            {canCreate('party') && (
                                <Button
                                    className="flex items-center space-x-2"
                                    tooltip="Add Party"
                                    onClick={() => setModalState({ isOpen: true, mode: 'create', entity: null })}
                                >
                                    <MdAdd className="w-5 h-5" />
                                    <span>Add Party</span>
                                </Button>
                            )}
                        </div>

                        <DataTable
                            data={parties.data}
                            columns={[
                                ...partyColumns,
                                ...(hasAnyAction('party') ? [{
                                    key: "actions",
                                    label: "Actions",
                                    render: (item) => (
                                        <PartyActions
                                            item={item}
                                            onView={handleView}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    ),
                                }] : []),
                            ]}
                            searchPlaceholder="Search parties by name, email, GST number..."
                            filters={filters}
                            pagination={parties}
                                onView={handleView}
                        />

                        <PartyModal
                            isOpen={modalState.isOpen}
                            onClose={() => setModalState({ isOpen: false, mode: null, entity: null })}
                            mode={modalState.mode}
                            entity={modalState.entity}
                        />

                        <PartyViewModal
                            isOpen={viewModalState.isOpen}
                            onClose={() => setViewModalState({ isOpen: false, entity: null })}
                            party={viewModalState.entity}
                        />
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}
