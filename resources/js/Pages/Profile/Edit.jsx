import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth = {} } = usePage().props;

    // Handle flash messages as toasts
    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Profile Settings' }
    ];

    return (
        <>
            <Head title="Profile Settings" />

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
                            <h1 className="text-xl lg:text-2xl font-bold text-text">Profile Settings</h1>
                            <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
                        </div>

                        <div className="max-w-4xl space-y-6">
                            {/* Profile Information Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                />
                            </div>

                            {/* Password Update Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
                                <UpdatePasswordForm />
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}
