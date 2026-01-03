import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import DataTable from '@/Components/DataTable';
import Button from '@/Components/Button';
import { MdAdd } from 'react-icons/md';
import InvoiceActions from './InvoiceActions';
import { invoiceColumns } from './invoiceConfig.jsx';
import { usePermissions } from '@/Utils/permissions';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';

export default function InvoiceIndex(props) {
    const { auth = {}, invoices = {}, filters = {} } = props;
    const { canCreate, hasAnyAction } = usePermissions();

    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Invoice Management' }
    ];

    return (
        <>
            <Head title="Invoice Management" />

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
                            <h1 className="text-xl lg:text-2xl font-bold text-text">Invoice Management</h1>
                            {/* {canCreate('invoice') && (
                                <Button
                                    className="flex items-center space-x-2"
                                    tooltip="Create Invoice from Challan"
                                    onClick={() => router.visit(route('challans.index'))}
                                >
                                    <MdAdd className="w-5 h-5" />
                                    <span>Create Invoice</span>
                                </Button>
                            )} */}
                        </div>

                        <DataTable
                            data={invoices.data}
                            columns={[
                                ...invoiceColumns,
                                ...(hasAnyAction('invoice') ? [{
                                    key: "actions",
                                    label: "Actions",
                                    render: (item) => (
                                        <InvoiceActions
                                            item={item}
                                        />
                                    ),
                                }] : []),
                            ]}
                            searchPlaceholder="Search invoices by party name or invoice number..."
                            filters={filters}
                            pagination={invoices}
                        />
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}