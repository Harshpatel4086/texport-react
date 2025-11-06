import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    MdDashboard,
    MdPeople,
    MdLocalShipping,
    MdBusiness,
    MdAssessment,
    MdSettings,
    MdStar,
    MdHistory,
    MdExpandMore,
    MdExpandLess,
    MdPerson,
    MdLogout,
    MdSchedule
} from 'react-icons/md';
import { usePermissions } from '@/Utils/permissions';

export default function Sidebar({ isOpen, setIsOpen, user }) {
    const [expandedMenus, setExpandedMenus] = useState({});
    const { url } = usePage();
    const { canManage } = usePermissions();

    // Build submenu items based on permissions
    const usersSubmenu = [
        ...(canManage('staff') ? [{ name: 'Staff', href: '/staff', routeName: 'staff.index' }] : []),
        ...(canManage('role') ? [{ name: 'Roles', href: '/roles', routeName: 'roles.index' }] : [])
    ];

    const menuItems = [
        {
            name: 'Dashboard',
            icon: MdDashboard,
            href: '/dashboard',
            routeName: 'dashboard'
        },
        // Only show Users menu if user has any submenu permissions
        ...(usersSubmenu.length > 0 ? [{
            name: 'Users',
            icon: MdPeople,
            submenu: usersSubmenu
        }] : []),
        // Show Parties as direct menu item
        ...(canManage('party') ? [{
            name: 'Parties',
            icon: MdBusiness,
            href: '/parties',
            routeName: 'parties.index'
        }] : []),
        // Show Attendance as direct menu item
        ...(canManage('attendance') ? [{
            name: 'Attendance',
            icon: MdSchedule,
            href: '/attendance',
            routeName: 'attendance.index'
        }] : []),
        // { name: 'Logistics', icon: MdLocalShipping, href: '#', routeName: 'logistics' },
        // { name: 'Vendors', icon: MdBusiness, href: '#', routeName: 'vendors' },
        // { name: 'Reports', icon: MdAssessment, href: '#', routeName: 'reports' },
        // { name: 'Settings', icon: MdSettings, href: '#', routeName: 'settings' },
    ];

    const isActive = (routeName) => {
        return url.includes(routeName) || route().current(routeName);
    };

    const hasActiveSubmenu = (submenu) => {
        return submenu?.some(item => isActive(item.routeName));
    };

    // Auto-expand menus with active submenus
    useEffect(() => {
        const autoExpanded = {};
        menuItems.forEach(item => {
            if (item.submenu && hasActiveSubmenu(item.submenu)) {
                autoExpanded[item.name] = true;
            }
        });
        setExpandedMenus(autoExpanded);
    }, [url]);

    // const shortcuts = [
    //     { name: 'Favorites', icon: MdStar, href: '#' },
    //     { name: 'Recents', icon: MdHistory, href: '#' },
    // ];

    const toggleSubmenu = (menuName) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuName]: !prev[menuName]
        }));
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral text-text transform transition-transform duration-300 ease-in-out lg:transform-none ${
                isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            } flex flex-col shadow-lg`}>
                {/* Logo */}
                {/* <div className="p-6 flex items-center justify-between">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
                    <button
                        className="lg:hidden text-gray-400 hover:text-white"
                        onClick={() => setIsOpen(false)}
                    >
                        ✕
                    </button>
                </div> */}

                {/* Main Menu */}
                <div className="flex-1 px-4 overflow-y-auto">
                    <div className="text-xs text-gray-400 mb-4 uppercase tracking-wider"></div>
                    <nav className="space-y-1">
                        {menuItems.map((item, index) => {
                            const IconComponent = item.icon;
                            const isExpanded = expandedMenus[item.name];

                            return (
                                <div key={index}>
                                    {item.submenu ? (
                                        <button
                                            onClick={() => toggleSubmenu(item.name)}
                                            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                hasActiveSubmenu(item.submenu)
                                                    ? 'bg-primary/10 text-primary border-l-4 border-primary'
                                                    : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                                            }`}
                                        >
                                            <IconComponent className="mr-3 text-lg" />
                                            {item.name}
                                            {isExpanded ?
                                                <MdExpandLess className="ml-auto" /> :
                                                <MdExpandMore className="ml-auto" />
                                            }
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                isActive(item.routeName)
                                                    ? 'bg-primary text-white shadow-sm'
                                                    : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                                            }`}
                                        >
                                            <IconComponent className="mr-3 text-lg" />
                                            {item.name}
                                        </Link>
                                    )}

                                    {item.submenu && isExpanded && (
                                        <div className="ml-6 mt-1 space-y-1">
                                            {item.submenu.map((subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    href={subItem.href}
                                                    className={`block px-3 py-1 text-sm transition-colors rounded ${
                                                        isActive(subItem.routeName)
                                                            ? 'text-primary bg-primary/5 font-medium'
                                                            : 'text-gray-500 hover:text-primary hover:bg-primary/5'
                                                    }`}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Shortcuts */}
                    {/* <div className="mt-8">
                        <div className="text-xs text-gray-400 mb-4 uppercase tracking-wider">Shortcuts</div>
                        <nav className="space-y-1">
                            {shortcuts.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                                    >
                                        <IconComponent className="mr-3 text-lg" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div> */}
                </div>

                {/* Mobile User Profile Section */}
                {user && (
                    <div className="lg:hidden border-t border-gray-200 p-4">
                        <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium">
                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-text truncate">
                                    {user?.name || 'User'}
                                </div>
                                <div className="text-xs text-gray-500 capitalize truncate">
                                    {user?.is_staff ? user?.role : 'Owner'}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Link
                                href={route('profile.edit')}
                                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <MdPerson className="w-5 h-5 mr-3" />
                                Profile Settings
                            </Link>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <MdLogout className="w-5 h-5 mr-3" />
                                Sign Out
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
