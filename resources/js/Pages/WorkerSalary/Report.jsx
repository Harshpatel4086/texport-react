import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import { useState } from 'react';

export default function WorkerSalaryReport(props) {
    const { 
        auth = {}, 
        worker = {}, 
        entries = [], 
        totalMeters = 0, 
        rate = 0, 
        totalSalary = 0,
        dateFrom = '',
        dateTo = '',
        shift = ''
    } = props;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const groupedEntries = entries.reduce((acc, entry) => {
        const date = entry.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(entry);
        return acc;
    }, {});

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Workers' },
        { label: 'Salary Calculation', href: route('worker-salary.index') },
        { label: `${worker.name} Report` }
    ];

    return (
        <>
            <Head title={`Salary Report - ${worker.name}`} />

            <div className="flex h-screen bg-background">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={auth.user} />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader
                        user={auth.user}
                        onMenuClick={() => setSidebarOpen(true)}
                        breadcrumbs={breadcrumbs}
                    />

                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        {/* Header Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Worker</h3>
                                    <p className="text-xl font-bold text-text mt-1">{worker.name}</p>
                                    {worker.phone && (
                                        <p className="text-sm text-gray-600">{worker.phone}</p>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Period</h3>
                                    <p className="text-lg font-semibold text-text mt-1">
                                        {new Date(dateFrom).toLocaleDateString()} - {new Date(dateTo).toLocaleDateString()}
                                    </p>
                                    {shift && (
                                        <p className="text-sm text-gray-600 capitalize">{shift} Shift</p>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Meters</h3>
                                    <p className="text-2xl font-bold text-primary mt-1">{totalMeters}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Salary</h3>
                                    <p className="text-2xl font-bold text-green-600 mt-1">₹{totalSalary.toFixed(2)}</p>
                                    <p className="text-sm text-gray-600">@ ₹{rate} per meter</p>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Entries */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-text">Production Details</h2>
                            </div>

                            {Object.keys(groupedEntries).length > 0 ? (
                                <div className="divide-y divide-gray-100">
                                    {Object.entries(groupedEntries).map(([date, dateEntries]) => {
                                        const dayTotal = dateEntries.reduce((sum, entry) => sum + parseFloat(entry.meters), 0);
                                        
                                        return (
                                            <div key={date} className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-md font-semibold text-text">
                                                        {new Date(date).toLocaleDateString('en-US', { 
                                                            weekday: 'long', 
                                                            year: 'numeric', 
                                                            month: 'long', 
                                                            day: 'numeric' 
                                                        })}
                                                    </h3>
                                                    <div className="text-sm text-gray-600">
                                                        Day Total: <span className="font-semibold">{dayTotal} meters</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {dateEntries.map((entry, index) => (
                                                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <p className="font-medium text-text">
                                                                        Machine {entry.machine.number}
                                                                    </p>
                                                                    {entry.machine.description && (
                                                                        <p className="text-sm text-gray-600">
                                                                            {entry.machine.description}
                                                                        </p>
                                                                    )}
                                                                    <p className="text-xs text-gray-500 capitalize mt-1">
                                                                        {entry.shift_id} Shift
                                                                    </p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-lg font-bold text-primary">
                                                                        {entry.meters}m
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        ₹{(entry.meters * rate).toFixed(2)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="p-6 text-center">
                                    <p className="text-gray-500">No production entries found for this period.</p>
                                </div>
                            )}
                        </div>

                        {/* Summary Card */}
                        {entries.length > 0 && (
                            <div className="bg-gradient-to-r from-primary to-primary-600 rounded-xl shadow-sm p-6 mt-6 text-white">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                    <div>
                                        <p className="text-primary-100 text-sm uppercase tracking-wide">Total Working Days</p>
                                        <p className="text-2xl font-bold mt-1">{Object.keys(groupedEntries).length}</p>
                                    </div>
                                    <div>
                                        <p className="text-primary-100 text-sm uppercase tracking-wide">Average Per Day</p>
                                        <p className="text-2xl font-bold mt-1">
                                            {Object.keys(groupedEntries).length > 0 
                                                ? (totalMeters / Object.keys(groupedEntries).length).toFixed(1)
                                                : 0
                                            }m
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-primary-100 text-sm uppercase tracking-wide">Total Earnings</p>
                                        <p className="text-3xl font-bold mt-1">₹{totalSalary.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}