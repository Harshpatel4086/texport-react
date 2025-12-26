import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Button from '@/Components/Button';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';
import { MdWarning, MdRefresh, MdInventory } from 'react-icons/md';

export default function StockIndex(props) {
    const { auth = {}, stocks = {}, error = null } = props;

    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const { post, processing } = useForm();

    const handleRefreshStock = () => {
        post(route('stock.refresh'));
    };

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Stock Management' }
    ];

    return (
        <>
            <Head title="Stock Management" />

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
                            <div>
                                <h1 className="text-xl lg:text-2xl font-bold text-text">Stock Management</h1>
                                <p className="text-gray-600 mt-2">Manage meter-based stock from daily production</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleRefreshStock}
                                    disabled={processing}
                                    className="flex items-center space-x-2"
                                >
                                    <MdRefresh className="w-4 h-4" />
                                    <span>Refresh</span>
                                </Button>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center">
                                <MdWarning className="h-5 w-5 text-orange-600 mr-3" />
                                <span className="text-orange-800">{error}</span>
                            </div>
                        )}

                        {Object.keys(stocks).length > 0 ? (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <h2 className="text-lg font-semibold text-text flex items-center">
                                        <MdInventory className="w-5 h-5 mr-2" />
                                        Date-wise Production Stock
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {Object.entries(stocks).map(([date, stockData]) => (
                                            <div key={date} className="border border-gray-200 rounded-lg">
                                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                                    <h4 className="font-medium text-text">{date}</h4>
                                                </div>
                                                <div className="p-4 space-y-4">
                                                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg border border-primary/20">
                                                        <div>
                                                            <p className="font-medium text-text">
                                                                {stockData.total_meters} Meters
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Total production for this date
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-600">
                                                                Daily Stock
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Machine-wise breakdown */}
                                                    {stockData.machines && stockData.machines.length > 0 && (
                                                        <div className="ml-4">
                                                            <h5 className="text-sm font-medium text-gray-700 mb-2">Machine-wise Production:</h5>
                                                            <div className="space-y-2">
                                                                {stockData.machines.map((machine, machineIndex) => (
                                                                    <div key={machineIndex} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                                                                        <span className="text-gray-700">
                                                                            {machine.machine_name}
                                                                        </span>
                                                                        <span className="font-medium text-gray-900">
                                                                            {machine.total_meters} meters
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                                <MdInventory className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">No stock data available</p>
                                <p className="text-sm text-gray-400 mt-1">Add some production entries first</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}