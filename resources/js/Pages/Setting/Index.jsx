import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Button from '@/Components/Button';
import FormField from '@/Components/FormField';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';
import { FaSave } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';

export default function SettingIndex(props) {
    const { auth = {}, workerRate = '' } = props;

    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('rate');

    const { data, setData, post, processing, errors } = useForm({
        rate: workerRate || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('settings.worker-rate'));
    };

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Settings' }
    ];

    const settingsSections = [
        { id: 'rate', label: 'Worker Rate', icon: MdAttachMoney }
    ];

    return (
        <>
            <Head title="Settings" />

            <div className="flex h-screen bg-background">
                <Sidebar
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                    user={auth.user}
                />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader
                        user={auth.user}
                        onMenuClick={() => setSidebarOpen(true)}
                        breadcrumbs={breadcrumbs}
                    />

                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        <div className="mb-6 lg:mb-8">
                            <h1 className="text-xl lg:text-2xl font-bold text-text">
                                Settings
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Manage your application settings
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                            {/* Settings Sidebar */}
                            <div className="lg:col-span-1">
                                {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"> */}
                                {/* <h2 className="text-lg font-semibold text-text mb-4">Settings Menu</h2> */}
                                <nav className="space-y-2">
                                    {settingsSections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() =>
                                                setActiveSection(section.id)
                                            }
                                            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                activeSection === section.id
                                                    ? "bg-primary text-white"
                                                    : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                                            }`}
                                        >
                                            <section.icon className="mr-3 w-5 h-5" />
                                            {section.label}
                                        </button>
                                    ))}
                                </nav>
                                {/* </div> */}
                            </div>

                            {/* Settings Content */}
                            <div className="lg:col-span-3">
                                {activeSection === "rate" && (
                                    <div
                                        id="rate-section"
                                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                                    >
                                        <h2 className="text-lg font-semibold text-text mb-4">
                                            Worker Rate Settings
                                        </h2>
                                        <p className="text-gray-600 mb-6">
                                            Set the rate per meter for worker
                                            salary calculations
                                        </p>

                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-4"
                                        >
                                            <FormField
                                                label="Rate per Meter (₹)"
                                                name="rate"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={data.rate}
                                                onChange={(e) =>
                                                    setData(
                                                        "rate",
                                                        e.target.value
                                                    )
                                                }
                                                error={errors.rate}
                                                required
                                                placeholder="Enter rate per meter"
                                            />

                                            <div className="flex justify-end">
                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    {/* save icon */}
                                                    <FaSave className="w-5 h-5 mr-2" />
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}
