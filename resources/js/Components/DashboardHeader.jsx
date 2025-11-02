import { Link } from '@inertiajs/react';
import { MdSearch, MdNotifications, MdMessage, MdMenu } from 'react-icons/md';

export default function DashboardHeader({ user, onMenuClick }) {
    return (
        <header className="bg-white border-b border-neutral px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Mobile Menu Button */}
                <button 
                    className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                    onClick={onMenuClick}
                >
                    <MdMenu className="w-6 h-6" />
                </button>
                
                {/* Search Bar */}
                <div className="flex-1 max-w-lg mx-4">
                    <div className="relative hidden sm:block">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MdSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search orders, vendors, shipments..."
                            className="block w-full pl-10 pr-3 py-2 border border-neutral rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-2 lg:space-x-4">
                    {/* Notifications */}
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MdNotifications className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>

                    {/* Messages */}
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MdMessage className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center space-x-2 lg:space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {user?.owner_name?.charAt(0) || 'U'}
                        </div>
                        <div className="text-sm hidden md:block">
                            <div className="font-medium text-text">{user?.owner_name || 'User'}</div>
                            <div className="text-gray-500">Operations</div>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </header>
    );
}