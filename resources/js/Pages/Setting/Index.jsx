import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Button from '@/Components/Button';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';
import { useLanguage } from '@/Contexts/LanguageContext';
import {
    MdAttachMoney,
    MdInventory,
    MdSave,
    MdPerson,
    MdNotifications,
    MdSecurity,
    MdLanguage,
    MdPalette,
    MdStorage,
    MdBusiness
} from 'react-icons/md';

export default function SettingIndex(props) {
    const { auth = {}, workerRate = '', businessDetails = {} } = props;

    useToastFlash();
    const { t } = useLanguage();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const settingsSections = [
        {
            id: 'business',
            label: t('Business Details'),
            icon: MdBusiness,
            description: t('Configure business information for challans')
        },
        {
            id: 'worker',
            label: t('Worker Settings'),
            icon: MdPerson,
            description: t('Configure worker rates and production parameters')
        },
    ];
    
    // const [activeSection, setActiveSection] = useState('business');
    const [activeSection, setActiveSection] = useState(settingsSections[0].id);

    const { data, setData, post, processing, errors } = useForm({
        rate: workerRate || '',
    });

    const { data: businessData, setData: setBusinessData, post: postBusiness, processing: businessProcessing, errors: businessErrors } = useForm({
        name: businessDetails.name || '',
        address: businessDetails.address || '',
        phone: businessDetails.phone || '',
        gst: businessDetails.gst || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('settings.worker-rate'));
    };

    const handleBusinessSubmit = (e) => {
        e.preventDefault();
        postBusiness(route('settings.business-details'));
    };



    const breadcrumbs = [
        { label: t('Dashboard'), href: route('dashboard') },
        { label: t('Settings') }
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
                        {/* Header */}
                        <div className="mb-6 lg:mb-8">
                            <h1 className="text-2xl lg:text-3xl font-bold text-text mb-2">
                                {t('Settings')}
                            </h1>
                            {/* <p className="text-gray-600">
                                Manage your application preferences and configurations
                            </p> */}
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                            {/* Settings Navigation */}
                            <div className="xl:col-span-1">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                    <h2 className="text-lg font-semibold text-text mb-4">Categories</h2>
                                    <nav className="space-y-2">
                                        {settingsSections.map((section) => {
                                            const IconComponent = section.icon;
                                            return (
                                                <button
                                                    key={section.id}
                                                    onClick={() => setActiveSection(section.id)}
                                                    className={`w-full flex items-start p-3 rounded-lg text-left transition-all duration-200 group ${
                                                        activeSection === section.id
                                                            ? "bg-primary text-white shadow-md"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                                                    }`}
                                                >
                                                    <IconComponent className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${
                                                        activeSection === section.id ? 'text-white' : 'text-gray-400 group-hover:text-primary'
                                                    }`} />
                                                    <div>
                                                        <div className="font-medium text-sm">{section.label}</div>
                                                        <div className={`text-xs mt-1 ${
                                                            activeSection === section.id ? 'text-white/80' : 'text-gray-500'
                                                        }`}>
                                                            {section.description}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>

                            {/* Settings Content */}
                            <div className="xl:col-span-3">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                    {/* Business Details */}
                                    {activeSection === "business" && (
                                        <div className="p-6">
                                            <div className="flex items-center mb-6">
                                                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                                                    <MdBusiness className="w-6 h-6 text-secondary" />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-semibold text-text">Business Details</h2>
                                                    <p className="text-gray-600">Configure business information for challans</p>
                                                </div>
                                            </div>

                                            <form onSubmit={handleBusinessSubmit} className="space-y-6">
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Business Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={businessData.name}
                                                            onChange={(e) => setBusinessData('name', e.target.value)}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                                            placeholder="Enter business name"
                                                            required
                                                        />
                                                        {businessErrors.name && (
                                                            <p className="text-red-500 text-sm mt-1">{businessErrors.name}</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={businessData.phone}
                                                            onChange={(e) => setBusinessData('phone', e.target.value)}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                                            placeholder="Enter phone number"
                                                        />
                                                        {businessErrors.phone && (
                                                            <p className="text-red-500 text-sm mt-1">{businessErrors.phone}</p>
                                                        )}
                                                    </div>

                                                    <div className="lg:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Business Address *
                                                        </label>
                                                        <textarea
                                                            value={businessData.address}
                                                            onChange={(e) => setBusinessData('address', e.target.value)}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                                            placeholder="Enter business address"
                                                            rows="3"
                                                            required
                                                        />
                                                        {businessErrors.address && (
                                                            <p className="text-red-500 text-sm mt-1">{businessErrors.address}</p>
                                                        )}
                                                    </div>

                                                    <div className="lg:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            GST Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={businessData.gst}
                                                            onChange={(e) => setBusinessData('gst', e.target.value)}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                                            placeholder="Enter GST number"
                                                        />
                                                        {businessErrors.gst && (
                                                            <p className="text-red-500 text-sm mt-1">{businessErrors.gst}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <Button
                                                    type="submit"
                                                    disabled={businessProcessing}
                                                    className="w-full lg:w-auto"
                                                >
                                                    <MdSave className="w-4 h-4 mr-2" />
                                                    {businessProcessing ? 'Saving...' : 'Save Business Details'}
                                                </Button>
                                            </form>
                                        </div>
                                    )}

                                    {/* Worker Settings */}
                                    {activeSection === "worker" && (
                                        <div className="p-6">
                                            <div className="flex items-center mb-6">
                                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                                                    <MdPerson className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-semibold text-text">Worker Settings</h2>
                                                    <p className="text-gray-600">Configure worker rates and production parameters</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                {/* Worker Rate Card */}
                                                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                                    <div className="flex items-center mb-4">
                                                        <MdAttachMoney className="w-5 h-5 text-green-600 mr-2" />
                                                        <h3 className="font-semibold text-text">Rate per Meter</h3>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-4">
                                                        Set the payment rate per meter for worker salary calculations
                                                    </p>

                                                    <form onSubmit={handleSubmit} className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Rate (₹)
                                                            </label>
                                                            <div className="relative">
                                                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    min="0"
                                                                    value={data.rate}
                                                                    onChange={(e) => setData('rate', e.target.value)}
                                                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                                                    placeholder="0.00"
                                                                    required
                                                                />
                                                            </div>
                                                            {errors.rate && (
                                                                <p className="text-red-500 text-sm mt-1">{errors.rate}</p>
                                                            )}
                                                        </div>

                                                        <Button
                                                            type="submit"
                                                            disabled={processing}
                                                            className="w-full"
                                                        >
                                                            <MdSave className="w-4 h-4 mr-2" />
                                                            {processing ? 'Saving...' : 'Save Rate'}
                                                        </Button>
                                                    </form>
                                                </div>

                                                {/* Current Rate Display */}
                                                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/20">
                                                    <div className="flex items-center mb-4">
                                                        <MdStorage className="w-5 h-5 text-primary mr-2" />
                                                        <h3 className="font-semibold text-text">Current Configuration</h3>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-gray-600">Worker Rate:</span>
                                                            <span className="font-semibold text-text">₹{workerRate || '0.00'}/meter</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-gray-600">Status:</span>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                workerRate ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                                {workerRate ? 'Configured' : 'Not Set'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}



                                    {/* Notifications Settings */}
                                    {activeSection === "notifications" && (
                                        <div className="p-6">
                                            <div className="flex items-center mb-6">
                                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                                                    <MdNotifications className="w-6 h-6 text-yellow-600" />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-semibold text-text">Notification Settings</h2>
                                                    <p className="text-gray-600">Manage your notification preferences</p>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-6 text-center">
                                                <MdNotifications className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <h3 className="text-lg font-medium text-gray-600 mb-2">Coming Soon</h3>
                                                <p className="text-gray-500">Notification settings will be available in a future update.</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Security Settings */}
                                    {activeSection === "security" && (
                                        <div className="p-6">
                                            <div className="flex items-center mb-6">
                                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                                                    <MdSecurity className="w-6 h-6 text-red-600" />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-semibold text-text">Security Settings</h2>
                                                    <p className="text-gray-600">Manage security and privacy settings</p>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-6 text-center">
                                                <MdSecurity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <h3 className="text-lg font-medium text-gray-600 mb-2">Coming Soon</h3>
                                                <p className="text-gray-500">Security settings will be available in a future update.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}
