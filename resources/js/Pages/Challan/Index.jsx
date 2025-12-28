import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import DataTable from '@/Components/DataTable';
import Button from '@/Components/Button';
import { MdAdd, MdEdit, MdDelete, MdVisibility } from 'react-icons/md';
import ChallanActions from './ChallanActions';
import { challanColumns } from './challanConfig.jsx';
import { usePermissions } from '@/Utils/permissions';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';

export default function ChallanIndex(props) {
    const { auth = {}, challans = {}, filters = {} } = props;
    const { canCreate, canEdit, canDelete, hasAnyAction } = usePermissions();

    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Challan Management' }
    ];

    return (
        <>
            <Head title="Challan Management" />

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
                            <h1 className="text-xl lg:text-2xl font-bold text-text">Challan Management</h1>
                            {canCreate('challan') && (
                                <Button
                                    className="flex items-center space-x-2"
                                    tooltip="Create Challan"
                                    onClick={() => router.visit(route('challans.create'))}
                                >
                                    <MdAdd className="w-5 h-5" />
                                    <span>Create Challan</span>
                                </Button>
                            )}
                        </div>

                        <DataTable
                            data={challans.data}
                            columns={[
                                ...challanColumns,
                                ...(hasAnyAction('challan') ? [{
                                    key: "actions",
                                    label: "Actions",
                                    render: (item) => (
                                        <ChallanActions
                                            item={item}
                                        />
                                    ),
                                }] : []),
                            ]}
                            searchPlaceholder="Search challans by party name..."
                            filters={filters}
                            pagination={challans}
                        />
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}
