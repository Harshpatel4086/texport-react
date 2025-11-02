import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { MdSearch, MdArrowUpward, MdArrowDownward } from 'react-icons/md';

export default function DataTable(props) {
    const { url } = usePage();
    const { 
        data = [], 
        columns = [], 
        searchable = true, 
        sortable = true,
        searchPlaceholder = "Search...",
        currentUrl = url,
        filters = {}
    } = props;

    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchable) {
            router.get(currentUrl, { search, sort: sortField, direction: sortDirection });
        }
    };

    const handleSort = (field) => {
        if (!sortable || !field) return;
        
        const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(direction);
        router.get(currentUrl, { search, sort: field, direction });
    };

    const SortIcon = ({ field }) => {
        if (!sortable || sortField !== field) return null;
        return sortDirection === 'asc' ? 
            <MdArrowUpward className="w-4 h-4" /> : 
            <MdArrowDownward className="w-4 h-4" />;
    };

    const renderCell = (item, column) => {
        if (column.render) {
            return column.render(item);
        }
        return item[column.key] || '-';
    };

    return (
        <div>
            {searchable && (
                <div className="bg-white rounded-lg border border-neutral p-4 mb-6">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder={searchPlaceholder}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Search
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg border border-neutral overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-neutral">
                            <tr>
                                {columns.map((column, index) => (
                                    <th 
                                        key={index}
                                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                            sortable && column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                                        } ${column.align === 'right' ? 'text-right' : ''}`}
                                        onClick={() => column.sortable && handleSort(column.key)}
                                    >
                                        <div className={`flex items-center space-x-1 ${column.align === 'right' ? 'justify-end' : ''}`}>
                                            <span>{column.label}</span>
                                            {column.sortable && <SortIcon field={column.key} />}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={item.id || index} className="hover:bg-gray-50">
                                        {columns.map((column, colIndex) => (
                                            <td 
                                                key={colIndex} 
                                                className={`px-6 py-4 whitespace-nowrap text-sm ${
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
                                    <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}