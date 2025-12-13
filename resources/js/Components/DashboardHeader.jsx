import { Link } from '@inertiajs/react';
import { MdMenu, MdChevronRight } from 'react-icons/md';
import Dropdown from '@/Components/Dropdown';
import LanguageSwitcher from '@/Components/LanguageSwitcher';

export default function DashboardHeader({ user, onMenuClick, breadcrumbs = [] }) {
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            {/* Main Header Row */}
            <div className="px-4 lg:px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Left Side - Mobile Menu + Language Switcher + Breadcrumbs */}
                    <div className="flex items-center min-w-0 flex-1">
                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 mr-2"
                            onClick={onMenuClick}
                        >
                            <MdMenu className="w-6 h-6" />
                        </button>

                        {/* Breadcrumbs - Always visible */}
                        {breadcrumbs && breadcrumbs.length > 0 && (
                            <div className="flex-1 min-w-0 relative">
                                {/* Fade effect for overflow indication */}
                                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 sm:hidden"></div>

                                <nav className="flex items-center text-sm overflow-x-auto overflow-y-hidden scrollbar-hide">
                                    <div className="flex items-center space-x-1 sm:space-x-2 min-w-max pr-8 sm:pr-0">
                                        {breadcrumbs.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center"
                                            >
                                                {index > 0 && (
                                                    <MdChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mx-1 sm:mx-2 flex-shrink-0" />
                                                )}
                                                {item.href &&
                                                index !==
                                                    breadcrumbs.length - 1 ? (
                                                    <Link
                                                        href={item.href}
                                                        className="text-gray-600 hover:text-primary font-medium transition-colors text-sm whitespace-nowrap"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ) : (
                                                    <span
                                                        className={
                                                            index ===
                                                            breadcrumbs.length -
                                                                1
                                                                ? "text-primary font-semibold text-sm whitespace-nowrap"
                                                                : "text-gray-900 font-medium text-sm whitespace-nowrap"
                                                        }
                                                    >
                                                        {item.label}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </nav>
                            </div>
                        )}
                        {/* Mobile Language Switcher */}
                        <div className="lg:hidden mr-3">
                            <LanguageSwitcher />
                        </div>
                    </div>

                    {/* Right Side - Language Switcher + User Profile (Desktop Only) */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <LanguageSwitcher />
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                                        <div className="text-right">
                                            <div className="text-sm font-semibold text-text group-hover:text-primary transition-colors">
                                                {user?.name || "Test"}
                                            </div>
                                            <div className="text-xs text-gray-500 capitalize">
                                                {user ? user?.role : "Role"}
                                            </div>
                                        </div>
                                        <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium">
                                            {user?.name
                                                ?.charAt(0)
                                                ?.toUpperCase() || "T"}
                                        </div>
                                        <svg
                                            className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <div className="text-sm font-medium text-gray-900">
                                            {user?.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {user?.email}
                                        </div>
                                    </div>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile Settings
                                    </Dropdown.Link>
                                    <div className="border-t border-gray-100">
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            Sign Out
                                        </Dropdown.Link>
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
