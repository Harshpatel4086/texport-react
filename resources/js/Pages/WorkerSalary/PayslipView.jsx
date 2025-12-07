import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Button from '@/Components/Button';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';
import { formatMachineNumber } from '@/Utils/helpers';

export default function PayslipView({ auth, payslip }) {
    useToastFlash();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const breadcrumbs = [
        { label: "Dashboard", href: route("dashboard") },
        { label: "Workers" },
        { label: "Salary Calculation", href: route("worker-salary.index") },
        { label: "Payslips", href: route("worker-salary.payslips") },
        { label: "View Payslip" },
    ];

    const handleDownload = () => {
        window.print();
    };

    return (
        <>
            <Head title={`Payslip - ${payslip.worker.name}`} />

            <div className="flex h-screen bg-background">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={auth.user} />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader
                        user={auth.user}
                        onMenuClick={() => setSidebarOpen(true)}
                        breadcrumbs={breadcrumbs}
                    />

                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        <div className="mb-6 lg:mb-8 flex justify-between items-center print:hidden">
                            <div>
                                <h1 className="text-xl lg:text-2xl font-bold text-text">Payslip Details</h1>
                                <p className="text-gray-600 mt-2">Worker: {payslip.worker.name}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleDownload} variant="primary">
                                    Download PDF
                                </Button>
                                <Link href={route('worker-salary.payslips')}>
                                    <Button variant="outline">Back to Payslips</Button>
                                </Link>
                            </div>
                        </div>

                        {/* Payslip Content */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8" id="payslip-content">
                            {/* Header */}
                            <div className="text-center mb-8 border-b pb-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">PAYSLIP</h1>
                                <p className="text-gray-600">Period: {new Date(payslip.date_from).toLocaleDateString()} - {new Date(payslip.date_to).toLocaleDateString()}</p>
                            </div>

                            {/* Worker Details */}
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-4">Worker Information</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Name:</span> {payslip.worker.name}</p>
                                        {payslip.worker.phone && (
                                            <p><span className="font-medium">Phone:</span> {payslip.worker.phone}</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-4">Payslip Details</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Payslip ID:</span> #{payslip.id}</p>
                                        <p><span className="font-medium">Generated On:</span> {new Date(payslip.created_at).toLocaleDateString()}</p>
                                        <p><span className="font-medium">Shift:</span> {payslip.shift_id ? payslip.shift_id.charAt(0).toUpperCase() + payslip.shift_id.slice(1) : 'All Shifts'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Calculation Details */}
                            <div className="mb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">Production Summary</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <p className="text-2xl font-bold text-primary">{payslip.total_meters}</p>
                                            <p className="text-sm text-gray-600">Total Meters</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-primary">₹{payslip.rate}</p>
                                            <p className="text-sm text-gray-600">Rate per Meter</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-green-600">₹{payslip.total_salary}</p>
                                            <p className="text-sm text-gray-600">Total Salary</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Daily Breakdown */}
                            <div className="mb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">Daily Production Breakdown</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="px-4 py-2 text-left border-b">Date</th>
                                                <th className="px-4 py-2 text-left border-b">Shift</th>
                                                <th className="px-4 py-2 text-left border-b">Machine</th>
                                                <th className="px-4 py-2 text-right border-b">Meters</th>
                                                <th className="px-4 py-2 text-right border-b">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payslip.calculation_data.map((entry, index) => (
                                                <tr key={index} className="border-b">
                                                    <td className="px-4 py-2">{new Date(entry.date).toLocaleDateString()}</td>
                                                    <td className="px-4 py-2 capitalize">{entry.shift_id}</td>
                                                    <td className="px-4 py-2">{formatMachineNumber(entry.machine?.number) || 'N/A'}</td>
                                                    <td className="px-4 py-2 text-right">{entry.meters}</td>
                                                    <td className="px-4 py-2 text-right">₹{(entry.meters * payslip.rate).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr className="bg-gray-50 font-semibold">
                                                <td colSpan="3" className="px-4 py-2 text-right">Total:</td>
                                                <td className="px-4 py-2 text-right">{payslip.total_meters}</td>
                                                <td className="px-4 py-2 text-right">₹{payslip.total_salary}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="text-center text-sm text-gray-500 border-t pt-4">
                                <p>This is a computer-generated payslip. No signature required.</p>
                                <p className="mt-2">Generated on {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Toast />

            <style dangerouslySetInnerHTML={{
                __html: `
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        #payslip-content, #payslip-content * {
                            visibility: visible;
                        }
                        #payslip-content {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                        }
                    }
                `
            }} />
        </>
    );
}
