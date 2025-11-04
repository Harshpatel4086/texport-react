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
    MdExpandLess
} from 'react-icons/md';
import { usePermissions } from '@/Utils/permissions';

export default function Sidebar({ isOpen, setIsOpen }) {
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

                {/* Upgrade Plan */}
                {/* <div className="p-4">
                    <div className="bg-slate-700 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                            <span className="text-lg mr-2">⚡</span>
                            <div>
                                <div className="text-sm font-medium">Upgrade plan</div>
                                <div className="text-xs text-gray-400">Unlock advanced analytics</div>
                            </div>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-medium mt-2 transition-colors">
                            Upgrade
                        </button>
                    </div>
                </div> */}
            </div>
        </>
    );
}
