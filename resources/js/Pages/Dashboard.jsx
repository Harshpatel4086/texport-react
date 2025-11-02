import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';

export default function Dashboard({ auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const stats = [
        { title: 'Active Orders', value: '1,284', change: '+8.2%', positive: true },
        { title: 'On-Time Shipments', value: '96.4%', change: '+2.1%', positive: true },
        { title: 'Returns', value: '74', change: '-0.8%', positive: false },
    ];

    const vendors = [
        { name: 'SilkWorks', category: 'Yarn & Thread', leadTime: '12 days', quality: 'A', region: 'India', avatar: '🧵' },
        { name: 'WeaveCo', category: 'Fabrics', leadTime: '9 days', quality: 'A+', region: 'Turkey', avatar: '🧶' },
        { name: 'DyeMasters', category: 'Dyeing', leadTime: '15 days', quality: 'B+', region: 'Vietnam', avatar: '🎨' },
    ];

    const tickets = [
        { title: 'Shipment delay inquiry', order: '#48211', priority: 'High', status: 'Open' },
        { title: 'Fabric quality check', order: '#47920', priority: 'Medium', status: 'Open' },
    ];

    const quickActions = [
        { title: 'Create PO', icon: '#' },
        { title: 'Book Shipment', icon: '📦' },
        { title: 'Invite Vendor', icon: '👥' },
    ];

    return (
        <>
            <Head title="Dashboard" />
            
            <div className="flex h-screen bg-background">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
                
                <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                    <DashboardHeader 
                        user={auth.user} 
                        onMenuClick={() => setSidebarOpen(true)}
                    />
                    
                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        {/* Breadcrumb */}
                        <div className="text-sm text-gray-500 mb-4 lg:mb-6">
                            Home / Dashboard
                        </div>

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
                            <h1 className="text-xl lg:text-2xl font-bold text-text">Overview</h1>
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                                <button className="px-4 py-2 text-gray-600 hover:text-text transition-colors text-sm">
                                    📤 Export
                                </button>
                                <button className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                                    + New Order
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg border border-neutral">
                                    <div className="text-sm text-gray-500 mb-1">{stat.title}</div>
                                    <div className="text-2xl font-bold text-text mb-2">{stat.value}</div>
                                    <div className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                                        {stat.change}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                            {/* Production Pipeline */}
                            <div className="bg-white p-6 rounded-lg border border-neutral">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-text">Production Pipeline</h2>
                                    <span className="text-sm text-gray-500">Last 30 days</span>
                                </div>
                                <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                    Chart Placeholder
                                </div>
                            </div>

                            {/* Top Vendors */}
                            <div className="bg-white p-6 rounded-lg border border-neutral">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-text">Top Vendors</h2>
                                    <span className="text-sm text-gray-500">Quality score</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-5 gap-4 text-xs text-gray-500 font-medium">
                                        <span>Vendor</span>
                                        <span>Lead Time</span>
                                        <span>Quality</span>
                                        <span>Region</span>
                                        <span></span>
                                    </div>
                                    {vendors.map((vendor, index) => (
                                        <div key={index} className="grid grid-cols-5 gap-4 items-center py-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg">{vendor.avatar}</span>
                                                <div>
                                                    <div className="font-medium text-text">{vendor.name}</div>
                                                    <div className="text-xs text-gray-500">{vendor.category}</div>
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-600">{vendor.leadTime}</span>
                                            <span className="text-sm font-medium text-primary">{vendor.quality}</span>
                                            <span className="text-sm text-gray-600">{vendor.region}</span>
                                            <button className="text-sm text-primary hover:text-primary-600">View</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Logistics Map */}
                            <div className="bg-white p-6 rounded-lg border border-neutral">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-text">Logistics Map</h2>
                                    <span className="text-sm text-gray-500">Global routes</span>
                                </div>
                                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                    🗺️ Map Placeholder
                                </div>
                            </div>

                            {/* Customer Tickets & Quick Actions */}
                            <div className="space-y-6">
                                {/* Customer Tickets */}
                                <div className="bg-white p-6 rounded-lg border border-neutral">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-text">Customer Tickets</h2>
                                        <span className="text-sm text-gray-500">Today</span>
                                    </div>
                                    <div className="space-y-3">
                                        {tickets.map((ticket, index) => (
                                            <div key={index} className="flex items-center justify-between py-2">
                                                <div>
                                                    <div className="font-medium text-text">{ticket.title}</div>
                                                    <div className="text-sm text-gray-500">
                                                        Order {ticket.order} • {ticket.priority}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-secondary font-medium">{ticket.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white p-6 rounded-lg border border-neutral">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-text">Quick Actions</h2>
                                        <span className="text-sm text-gray-500">Shortcuts</span>
                                    </div>
                                    <div className="space-y-2">
                                        {quickActions.map((action, index) => (
                                            <button
                                                key={index}
                                                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                                            >
                                                <span className="text-lg">{action.icon}</span>
                                                <span className="font-medium text-text">{action.title}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}