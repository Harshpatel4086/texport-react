import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Button from '@/Components/Button';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';
import { MdVisibility } from 'react-icons/md';
import IconButton from '@/Components/IconButton';

export default function Payslips({ auth, payslips }) {
    useToastFlash();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const breadcrumbs = [
        { label: "Dashboard", href: route("dashboard") },
        { label: "Workers" },
        { label: "Salary Calculation", href: route("worker-salary.index") },
        { label: "Payslips" },
    ];

    return (
        <>
            <Head title="Worker Payslips" />

            <div className="flex h-screen bg-background">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={auth.user} />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader
                        user={auth.user}
                        onMenuClick={() => setSidebarOpen(true)}
                        breadcrumbs={breadcrumbs}
                    />

                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        <div className="mb-6 lg:mb-8 flex justify-between items-center">
                            <div>
                                <h1 className="text-xl lg:text-2xl font-bold text-text">Worker Payslips</h1>
                                <p className="text-gray-600 mt-2">View and manage generated payslips</p>
                            </div>
                            <Link href={route('worker-salary.index')}>
                                <Button variant="outline">Back to Calculation</Button>
                            </Link>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            {payslips.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Worker Name
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Period
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Total Meters
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Total Salary
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Generated On
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payslips.map((payslip) => (
                                                <tr key={payslip.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {payslip.worker.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {new Date(payslip.date_from).toLocaleDateString()} - {new Date(payslip.date_to).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {payslip.total_meters}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                                                        ₹{payslip.total_salary}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {new Date(payslip.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        <Link href={route('worker-salary.payslip.view', payslip.id)}>
                                                            <IconButton
                                                                icon={MdVisibility}
                                                                tooltip="View Payslip"
                                                                variant="primary"
                                                                size="sm"
                                                            />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="p-6 text-center">
                                    <p className="text-gray-500">No payslips generated yet.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}
