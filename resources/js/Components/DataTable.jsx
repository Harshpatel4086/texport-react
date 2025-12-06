import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { MdSearch, MdArrowUpward, MdArrowDownward, MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function DataTable(props) {
    const { url } = usePage();
    const {
        data = [],
        columns = [],
        searchable = true,
        sortable = true,
        searchPlaceholder = "Search...",
        currentUrl = url,
        filters = {},
        pagination = null,
        perPageOptions = [10, 25, 50, 100],
        onView = null
    } = props;

    // Safely get URL parameters (client-side only)
    const getUrlParams = () => {
        if (typeof window === 'undefined') return {};
        const params = new URLSearchParams(window.location.search);
        return {
            per_page: params.get('per_page'),
            search: params.get('search'),
            sort: params.get('sort'),
            direction: params.get('direction')
        };
    };

    const [search, setSearch] = useState(filters.search || '');
    const [sortField, setSortField] = useState(filters.sort || '');
    const [sortDirection, setSortDirection] = useState(filters.direction || 'asc');
    const [perPage, setPerPage] = useState(filters.per_page || 10);



    const handleSearch = (e) => {
        e.preventDefault();
        if (searchable) {
            router.get(currentUrl, { search, sort: sortField, direction: sortDirection, per_page: perPage });
        }
    };

    const handleSort = (field) => {
        if (!sortable || !field) return;

        const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(direction);
        router.get(currentUrl, { search, sort: field, direction, per_page: perPage });
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, { search, sort: sortField, direction: sortDirection, per_page: perPage });
        }
    };

    const handlePerPageChange = (newPerPage) => {
        setPerPage(newPerPage);

        // Calculate current position and new page
        const currentPage = pagination?.current_page || 1;
        const currentPerPage = pagination?.per_page || perPage;
        const currentPosition = (currentPage - 1) * currentPerPage + 1;
        const newPage = Math.ceil(currentPosition / newPerPage);

        router.get(currentUrl, { ...filters, search, sort: sortField, direction: sortDirection, per_page: newPerPage, page: newPage });
    };

    const SortIcon = ({ field }) => {
        if (!sortable || sortField !== field) return null;
        return sortDirection === 'asc' ?
            <MdArrowUpward className="w-4 h-4 text-primary" /> :
            <MdArrowDownward className="w-4 h-4 text-primary" />;
    };

    const renderCell = (item, column) => {
        if (column.render) {
            return column.render(item, onView);
        }
        return item[column.key] || '-';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {searchable && (
                        <div className="flex items-center gap-3 flex-1 max-w-lg">
                            <div className="relative flex-1">
                                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder={searchPlaceholder}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-colors hover:border-primary-600"
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="bg-primary hover:bg-primary-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm"
                            >
                                Search
                            </button>
                        </div>
                    )}

                    {pagination && (
                        <div className="flex items-center gap-2 text-sm text-text">
                            <span>Show</span>
                            <select
                                value={perPage}
                                onChange={(e) => handlePerPageChange(Number(e.target.value))}
                                className="border border-neutral rounded-lg px-6 py-2 text-sm bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors hover:border-primary-600"
                            >
                                {perPageOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <span>entries</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                                        sortable && column.sortable ? 'cursor-pointer hover:bg-gray-50' : ''
                                    } ${column.align === 'right' ? 'text-right' : ''}`}
                                    onClick={() => column.sortable && handleSort(column.key)}
                                >
                                    <div className={`flex items-center gap-1 ${column.align === 'right' ? 'justify-end' : ''}`}>
                                        <span>{column.label}</span>
                                        {column.sortable && <SortIcon field={column.key} />}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={item.id || index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`px-6 py-4 text-sm text-gray-900 ${
                                                column.align === 'right' ? 'text-right' : ''
                                            }`}
                                        >
                                            {renderCell(item, column)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center">
                                    <div className="text-gray-500">
                                        <div className="text-lg mb-2">
                                            <MdSearch className="inline-block w-6 h-6 mr-2" />
                                        </div>
                                        <div className="font-medium">No data available</div>
                                        <div className="text-sm">There are no records to display</div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer Section */}
            {pagination && (
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-medium text-gray-900">{pagination.from}</span> to <span className="font-medium text-gray-900">{pagination.to}</span> of <span className="font-medium text-gray-900">{pagination.total}</span> results
                        </div>

                        <div className="flex items-center gap-1">
                            {pagination.links.map((link, index) => {
                                if (link.label.includes('Previous')) {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                link.url
                                                    ? 'text-gray-500 hover:text-primary hover:bg-primary-50 border border-neutral'
                                                    : 'text-gray-300 cursor-not-allowed border border-neutral'
                                            }`}
                                        >
                                            Previous
                                        </button>
                                    );
                                }
                                if (link.label.includes('Next')) {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                link.url
                                                    ? 'text-gray-500 hover:text-primary hover:bg-primary-50 border border-neutral'
                                                    : 'text-gray-300 cursor-not-allowed border border-neutral'
                                            }`}
                                        >
                                            Next
                                        </button>
                                    );
                                }
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(link.url)}
                                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                            link.active
                                                ? 'bg-primary text-white border border-primary'
                                                : 'text-gray-500 hover:text-primary hover:bg-primary-50 border border-neutral'
                                        }`}
                                    >
                                        {link.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
