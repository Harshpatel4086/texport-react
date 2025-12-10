import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Button from '@/Components/Button';
import FormField from '@/Components/FormField';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';
import { MdVisibility } from 'react-icons/md';
import IconButton from '@/Components/IconButton';
import axios from 'axios';
import { toaster } from "@/Utils/toaster";
import { usePermissions } from '@/Utils/permissions';

export default function WorkerSalaryIndex(props) {
    const { auth = {}, workers = [] } = props;
    const { hasPermission } = usePermissions();

    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [calculating, setCalculating] = useState(false);
    const [generatingPayslip, setGeneratingPayslip] = useState(null);
    const [salaryData, setSalaryData] = useState(null);
    const [filters, setFilters] = useState({
        date_from: new Date().toISOString().split('T')[0],
        date_to: new Date().toISOString().split('T')[0],
        worker_id: '',
        shift_id: '',
    });

    const handleCalculate = async (e) => {
        e.preventDefault();

        if (!filters.date_from || !filters.date_to) {
            toaster.error('Please select both Date From and Date To.');
            return;
        }

        if (workers.length === 0) {
            toaster.error('No workers available for salary calculation.');
            return;
        }

        setCalculating(true);
        try {
            const response = await axios.post(route('worker-salary.calculate'), filters);
            setSalaryData(response.data);
        } catch (error) {
            if (error.response?.data?.error) {
                toaster.error(error.response.data.error);
            } else {
                toaster.error('Error calculating salary');
            }
        } finally {
            setCalculating(false);
        }
    };

    const handleGeneratePayslip = async (workerId) => {
        setGeneratingPayslip(workerId);
        try {
            const response = await axios.post(route('worker-salary.generate-payslip'), {
                ...filters,
                worker_id: workerId
            });
            toaster.success(response.data.message);
        } catch (error) {
            if (error.response?.data?.error) {
                toaster.error(error.response.data.error);
            } else {
                toaster.error('Failed to generate payslip');
            }
        } finally {
            setGeneratingPayslip(null);
        }
    };

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Workers' },
        { label: 'Salary Calculation' }
    ];

    return (
        <>
            <Head title="Worker Salary Calculation" />

            <div className="flex h-screen bg-background">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={auth.user} />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader
                        user={auth.user}
                        onMenuClick={() => setSidebarOpen(true)}
                        breadcrumbs={breadcrumbs}
                    />

                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        <div className="mb-6 lg:mb-8">
                            <h1 className="text-xl lg:text-2xl font-bold text-text">Worker Salary Calculation</h1>
                            <p className="text-gray-600 mt-2">Calculate worker salaries based on production meters</p>
                        </div>

                        {/* Filters */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                            <h2 className="text-lg font-semibold text-text mb-4">Calculation Filters</h2>

                            <form onSubmit={handleCalculate} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <FormField
                                        label="Date From"
                                        name="date_from"
                                        type="date"
                                        value={filters.date_from}
                                        onChange={(e) => setFilters(prev => ({ ...prev, date_from: e.target.value }))}
                                        required
                                    />

                                    <FormField
                                        label="Date To"
                                        name="date_to"
                                        type="date"
                                        value={filters.date_to}
                                        onChange={(e) => setFilters(prev => ({ ...prev, date_to: e.target.value }))}
                                        required
                                    />

                                    <FormField
                                        label="Worker (Optional)"
                                        name="worker_id"
                                        type="select"
                                        value={filters.worker_id}
                                        onChange={(e) => setFilters(prev => ({ ...prev, worker_id: e.target.value }))}
                                        options={[
                                            // { value: '', label: 'All Workers' },
                                            ...workers.map(worker => ({
                                                value: worker.id,
                                                label: worker.name
                                            }))
                                        ]}
                                    />

                                    <FormField
                                        label="Shift (Optional)"
                                        name="shift_id"
                                        type="select"
                                        value={filters.shift_id}
                                        onChange={(e) => setFilters(prev => ({ ...prev, shift_id: e.target.value }))}
                                        options={[
                                            // { value: '', label: 'All Shifts' },
                                            { value: 'day', label: 'Day Shift' },
                                            { value: 'night', label: 'Night Shift' }
                                        ]}
                                    />
                                </div>

                                {hasPermission('calculate worker salary') && (
                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={calculating || !filters.date_from || !filters.date_to}
                                        >
                                            {calculating ? 'Calculating...' : 'Calculate'}
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Payslips Link */}
                        {hasPermission('view worker payslip') && (
                            <div className="mb-6">
                                <Link href={route('worker-salary.payslips')}>
                                    <Button variant="outline">
                                        View All Payslips
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Results */}
                        {salaryData && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <h2 className="text-lg font-semibold text-text">Salary Results</h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Rate: ₹{salaryData.rate} per meter
                                    </p>
                                </div>

                                {salaryData.salaries.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-100">
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Worker Name
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Total Meters
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Rate
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Total Salary
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {salaryData.salaries.map((salary, index) => (
                                                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                        <td className="px-6 py-4 text-sm text-gray-900">
                                                            {salary.worker.name}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-900">
                                                            {salary.total_meters}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-900">
                                                            ₹{salary.rate}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                                                            ₹{salary.total_salary.toFixed(2)}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-900">
                                                            <div className="flex gap-2">
                                                                <Link
                                                                    href={route('worker-salary.report', {
                                                                        worker: btoa(salary.worker.id),
                                                                        date_from: filters.date_from,
                                                                        date_to: filters.date_to,
                                                                        shift_id: filters.shift_id || undefined,
                                                                    })}
                                                                >
                                                                    <IconButton
                                                                        icon={MdVisibility}
                                                                        tooltip="View Detailed Report"
                                                                        variant="primary"
                                                                        size="sm"
                                                                    />
                                                                </Link>
                                                                {hasPermission('generate worker payslip') && (
                                                                    <Button
                                                                        size="sm"
                                                                        variant="secondary"
                                                                        disabled={generatingPayslip === salary.worker.id}
                                                                        onClick={() => handleGeneratePayslip(salary.worker.id)}
                                                                    >
                                                                        {generatingPayslip === salary.worker.id ? 'Generating...' : 'Generate Payslip'}
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="p-6 text-center">
                                        <p className="text-gray-500">No salary data found for the selected criteria.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}
