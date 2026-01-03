import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import { MdArrowBack, MdEdit, MdVisibility, MdInventory, MdInfo, MdCalendarToday, MdPerson, MdStar } from 'react-icons/md';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';
import { usePermissions } from '@/Utils/permissions';

export default function ChallanShow(props) {
    const { auth = {}, challan = {} } = props;
    const { canEdit } = usePermissions();

    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Group items by group_number
    const groupedItems = challan.items?.reduce((groups, item) => {
        const group = groups[item.group_number] || [];
        group.push(item);
        groups[item.group_number] = group;
        return groups;
    }, {}) || {};

    const getGroupTotal = (items) => {
        return items.reduce((sum, item) => sum + parseFloat(item.meter), 0);
    };

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Challan Management', href: route('challans.index') },
        { label: `Challan ${challan.formatted_challan_number}` }
    ];

    return (
        <>
            <Head title={`Challan ${challan.formatted_challan_number}`} />

            <div className="flex h-screen bg-background">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={auth.user} />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader
                        user={auth.user}
                        onMenuClick={() => setSidebarOpen(true)}
                        breadcrumbs={breadcrumbs}
                    />

                    <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 lg:mb-8 space-y-3 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <MdVisibility className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-text">
                                        Challan {challan.formatted_challan_number}
                                    </h1>
                                    <p className="text-sm text-gray-600 mt-1">View challan details and entries</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                                {canEdit('challan') && !challan.invoice && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center justify-center space-x-2 w-full sm:w-auto"
                                        onClick={() => router.visit(route('challans.edit', challan.id))}
                                    >
                                        <MdEdit className="w-4 h-4" />
                                        <span>Edit Challan</span>
                                    </Button>
                                )}
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="flex items-center justify-center space-x-2 w-full sm:w-auto"
                                    onClick={() => router.visit(route('challans.index'))}
                                >
                                    <MdArrowBack className="w-4 h-4" />
                                    <span className="hidden sm:inline">Back to Challans</span>
                                    <span className="sm:hidden">Back</span>
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            {/* Challan Details Card */}
                            <Card className="p-4 sm:p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <MdInfo className="w-5 h-5 text-primary" />
                                    <h2 className="text-lg font-semibold text-text">Challan Details</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <MdInventory className="w-4 h-4 text-primary" />
                                            <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Challan Number</label>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">{challan.formatted_challan_number}</div>
                                    </div>
                                    {/* <div className="p-3 bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-lg border border-secondary/20">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <MdPerson className="w-4 h-4 text-secondary" />
                                            <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Party Name</label>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">{challan.party?.party_name}</div>
                                    </div> */}
                                    <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <MdCalendarToday className="w-4 h-4 text-blue-600" />
                                            <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Date</label>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {new Date(challan.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                    {/* <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <MdCalendarToday className="w-4 h-4 text-gray-600" />
                                            <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Created</label>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {new Date(challan.created_at).toLocaleDateString()}
                                        </div>
                                    </div> */}
                                </div>
                            </Card>

                            {/* Quality Details Card */}
                            {challan.quality && (
                                <Card className="p-4 sm:p-6">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <MdStar className="w-5 h-5 text-yellow-500" />
                                        <h2 className="text-lg font-semibold text-text">Quality Details</h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                                            <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1">Quality Name</label>
                                            <div className="text-sm font-semibold text-gray-900">{challan.quality.quality_name}</div>
                                        </div>
                                        {challan.quality.description && (
                                            <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1">Description</label>
                                                <div className="text-sm font-semibold text-gray-900">{challan.quality.description}</div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            )}

                            {/* Party Details Card */}
                            {challan.party && (
                                <Card className="p-4 sm:p-6">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <MdPerson className="w-5 h-5 text-secondary" />
                                        <h2 className="text-lg font-semibold text-text">Party Details</h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="p-3 bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-lg border border-secondary/20">
                                            <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1">Party Name</label>
                                            <div className="text-sm font-semibold text-gray-900">{challan.party.party_name}</div>
                                        </div>
                                        {challan.party.business_name && (
                                            <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1">Business Name</label>
                                                <div className="text-sm font-semibold text-gray-900">{challan.party.business_name}</div>
                                            </div>
                                        )}
                                        {challan.party.gst_number && (
                                            <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1">GST Number</label>
                                                <div className="text-sm font-semibold text-gray-900">{challan.party.gst_number}</div>
                                            </div>
                                        )}
                                        {challan.party.address && (
                                            <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 sm:col-span-2 lg:col-span-3">
                                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1">Address</label>
                                                <div className="text-sm font-semibold text-gray-900">{challan.party.address}</div>
                                            </div>
                                        )}
                                        {challan.party.business_location && (
                                            <div className="p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200 sm:col-span-2 lg:col-span-3">
                                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1">Business Location</label>
                                                <div className="text-sm font-semibold text-gray-900">{challan.party.business_location}</div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            )}

                            {/* SR-wise Details */}
                            {Object.keys(groupedItems).map((groupNumber) => {
                                const items = groupedItems[groupNumber];
                                const groupTotal = getGroupTotal(items);
                                const firstSr = Math.min(...items.map(item => item.sr_number));
                                const lastSr = Math.max(...items.map(item => item.sr_number));

                                return (
                                    <Card key={groupNumber} className="p-4 sm:p-6">
                                        <div className="mb-4">
                                            <h3 className="text-base sm:text-lg font-semibold text-text">
                                                Group {groupNumber}
                                                <span className="text-sm text-gray-500 ml-2">
                                                    (SR {firstSr} - {lastSr})
                                                </span>
                                            </h3>
                                        </div>

                                        {/* Mobile Grid Layout */}
                                        <div className="block sm:hidden">
                                            <div className="grid grid-cols-2 gap-3">
                                                {items
                                                    .sort((a, b) => a.sr_number - b.sr_number)
                                                    .map((item) => (
                                                    <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                                                        <div className="text-xs font-medium text-gray-600 mb-1">
                                                            SR {item.sr_number}
                                                        </div>
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {parseFloat(item.meter).toFixed(2)} m
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Desktop Table Layout */}
                                        <div className="hidden sm:block overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            SR No
                                                        </th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Meter
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {items
                                                        .sort((a, b) => a.sr_number - b.sr_number)
                                                        .map((item) => (
                                                        <tr key={item.id} className="hover:bg-gray-50">
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {item.sr_number}
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                                {parseFloat(item.meter).toFixed(2)} m
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                                            <div className="text-sm font-medium text-gray-700">
                                                Group Total: <span className="text-primary font-bold text-base">{groupTotal.toFixed(2)} m</span>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}

                            {/* Grand Total Summary */}
                            <Card className="p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                                <h3 className="text-lg font-semibold text-text mb-4">Summary</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 bg-white rounded-lg shadow-sm border border-primary/20">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-primary/20 rounded-lg">
                                                <MdInventory className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">Grand Total Meter</div>
                                                <div className="text-xl sm:text-2xl font-bold text-primary">{parseFloat(challan.total_meter).toFixed(2)} m</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white rounded-lg shadow-sm border border-secondary/20">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-secondary/20 rounded-lg">
                                                <MdInventory className="w-5 h-5 text-secondary" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">Total Lots</div>
                                                <div className="text-xl sm:text-2xl font-bold text-secondary">{challan.total_lots}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}
