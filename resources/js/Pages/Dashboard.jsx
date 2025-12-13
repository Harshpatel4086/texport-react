import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';
import usePushNotifications from '@/Hooks/usePushNotifications';
import {
    MdInventory,
    MdFactory,
    MdPerson,
    MdBuild,
    MdTrendingUp,
    MdBarChart,
    MdPeople,
    MdConstruction,
    MdAssessment
} from 'react-icons/md';

export default function Dashboard({ auth, userRoles, userPermissions, vapidPublicKey, stockData, lotMeterSize, stockSummary, activities, productionChart }) {
    // Handle flash messages as toasts
    useToastFlash();

    // Initialize push notifications
    usePushNotifications(vapidPublicKey);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [productionTooltip, setProductionTooltip] = useState({ show: false, x: 0, y: 0, data: null });
    const [stockTooltip, setStockTooltip] = useState({ show: false, x: 0, y: 0, data: null });
    // const stats = [
    //     // { title: 'Active Orders', value: '1,284', change: '+8.2%', positive: true },
    //     // { title: 'On-Time Shipments', value: '96.4%', change: '+2.1%', positive: true },
    //     // { title: 'Returns', value: '74', change: '-0.8%', positive: false },
    // ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-screen bg-background">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={auth.user} />

                <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                    <DashboardHeader
                        user={auth.user}
                        onMenuClick={() => setSidebarOpen(true)}
                        breadcrumbs={[{ label: 'Dashboard' }]}
                    />

                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                            {/* Stock Summary Card */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm opacity-90 mb-1">Total Stock</div>
                                        <div className="text-2xl font-bold mb-1">
                                            {stockSummary?.totalLots || 0} Lots
                                        </div>
                                        <div className="text-xs opacity-75">
                                            {stockSummary?.totalMeters || 0}m total
                                        </div>
                                    </div>
                                    <MdInventory className="text-4xl opacity-80" />
                                </div>
                            </div>

                            {/* Production Card */}
                            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm opacity-90 mb-1">Today's Production</div>
                                        <div className="text-2xl font-bold mb-1">
                                            {productionChart?.[6]?.meters || 0}m
                                        </div>
                                        <div className="text-xs opacity-75">Meters produced</div>
                                    </div>
                                    <MdFactory className="text-4xl opacity-80" />
                                </div>
                            </div>

                            {/* {stats.slice(0, 2).map((stat, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl border border-neutral shadow-sm">
                                    <div className="text-sm text-gray-500 mb-1">{stat.title}</div>
                                    <div className="text-2xl font-bold text-text mb-2">{stat.value}</div>
                                    <div className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                                        {stat.change}
                                    </div>
                                </div>
                            ))} */}
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                            {/* Production Chart */}
                            <div className="bg-white p-6 rounded-xl border border-neutral shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-text">Production Trend</h2>
                                    <span className="text-sm text-gray-500">Last 7 days</span>
                                </div>
                                <div className="h-48 relative">
                                    {productionChart && productionChart.length > 0 ? (
                                        <svg className="w-full h-full" viewBox="0 0 400 180">
                                            <defs>
                                                <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                                                    <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                                                </pattern>
                                            </defs>
                                            <rect width="100%" height="100%" fill="url(#grid)" />

                                            {(() => {
                                                const maxMeters = Math.max(...productionChart.map(d => d.meters), 1);
                                                const points = productionChart.map((day, index) => {
                                                    const x = (index / (productionChart.length - 1)) * 350 + 25;
                                                    const y = 150 - ((day.meters / maxMeters) * 120);
                                                    return `${x},${y}`;
                                                }).join(' ');

                                                // Y-axis labels
                                                const yLabels = [];
                                                for (let i = 0; i <= 4; i++) {
                                                    const value = Math.round((maxMeters / 4) * (4 - i));
                                                    const y = 30 + (i * 30);
                                                    yLabels.push({ value, y });
                                                }

                                                return (
                                                    <>
                                                        {/* Y-axis labels */}
                                                        {yLabels.map((label, index) => (
                                                            <text
                                                                key={index}
                                                                x="15"
                                                                y={label.y}
                                                                textAnchor="end"
                                                                className="text-xs fill-gray-400"
                                                                fontSize="9"
                                                            >
                                                                {label.value}m
                                                            </text>
                                                        ))}

                                                        <polyline
                                                            fill="none"
                                                            stroke="#3b82f6"
                                                            strokeWidth="3"
                                                            points={points}
                                                            className="drop-shadow-sm"
                                                        />
                                                        {productionChart.map((day, index) => {
                                                            const x = (index / (productionChart.length - 1)) * 350 + 25;
                                                            const y = 150 - ((day.meters / maxMeters) * 120);
                                                            return (
                                                                <g key={index}>
                                                                    <circle
                                                                        cx={x}
                                                                        cy={y}
                                                                        r="4"
                                                                        fill="#3b82f6"
                                                                        stroke="white"
                                                                        strokeWidth="2"
                                                                        className="hover:r-6 transition-all cursor-pointer"
                                                                        onMouseEnter={(e) => {
                                                                            const rect = e.currentTarget.getBoundingClientRect();
                                                                            setProductionTooltip({
                                                                                show: true,
                                                                                x: rect.left + rect.width / 2,
                                                                                y: rect.top - 10,
                                                                                data: { date: day.date, meters: day.meters }
                                                                            });
                                                                        }}
                                                                        onMouseLeave={() => setProductionTooltip({ show: false, x: 0, y: 0, data: null })}
                                                                    />
                                                                    <text
                                                                        x={x}
                                                                        y="170"
                                                                        textAnchor="middle"
                                                                        className="text-xs fill-gray-500"
                                                                        fontSize="10"
                                                                    >
                                                                        {day.date}
                                                                    </text>
                                                                </g>
                                                            );
                                                        })}
                                                    </>
                                                );
                                            })()}
                                        </svg>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                            <MdBarChart className="text-4xl mb-2" />
                                            <span>No production data</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Stock Chart */}
                            <div className="bg-white p-6 rounded-xl border border-neutral shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-text">Stock Overview</h2>
                                    <a href={route('stock.index')} className="text-sm text-primary hover:text-primary-600">View All</a>
                                </div>
                                <div className="h-48 relative">
                                    {stockSummary?.chartData && stockSummary.chartData.length > 0 ? (
                                        <svg className="w-full h-full" viewBox="0 0 400 180">
                                            <defs>
                                                <pattern id="stockGrid" width="40" height="30" patternUnits="userSpaceOnUse">
                                                    <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                                                </pattern>
                                                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
                                                </linearGradient>
                                            </defs>
                                            <rect width="100%" height="100%" fill="url(#stockGrid)" />

                                            {(() => {
                                                const maxLots = Math.max(...stockSummary.chartData.map(d => d.lots), 1);
                                                const points = stockSummary.chartData.map((day, index) => {
                                                    const x = (index / (stockSummary.chartData.length - 1)) * 350 + 25;
                                                    const y = 150 - ((day.lots / maxLots) * 120);
                                                    return `${x},${y}`;
                                                }).join(' ');

                                                const areaPoints = `25,150 ${points} ${(stockSummary.chartData.length - 1) / (stockSummary.chartData.length - 1) * 350 + 25},150`;

                                                // Y-axis labels
                                                const yLabels = [];
                                                for (let i = 0; i <= 4; i++) {
                                                    const value = Math.round((maxLots / 4) * (4 - i));
                                                    const y = 30 + (i * 30);
                                                    yLabels.push({ value, y });
                                                }

                                                return (
                                                    <>
                                                        {/* Y-axis labels */}
                                                        {yLabels.map((label, index) => (
                                                            <text
                                                                key={index}
                                                                x="15"
                                                                y={label.y}
                                                                textAnchor="end"
                                                                className="text-xs fill-gray-400"
                                                                fontSize="9"
                                                            >
                                                                {label.value}
                                                            </text>
                                                        ))}

                                                        <polygon
                                                            fill="url(#areaGradient)"
                                                            points={areaPoints}
                                                        />
                                                        <polyline
                                                            fill="none"
                                                            stroke="#3b82f6"
                                                            strokeWidth="2"
                                                            points={points}
                                                        />
                                                        {stockSummary.chartData.map((day, index) => {
                                                            const x = (index / (stockSummary.chartData.length - 1)) * 350 + 25;
                                                            const y = 150 - ((day.lots / maxLots) * 120);
                                                            return (
                                                                <g key={index}>
                                                                    <circle
                                                                        cx={x}
                                                                        cy={y}
                                                                        r="3"
                                                                        fill="#3b82f6"
                                                                        stroke="white"
                                                                        strokeWidth="2"
                                                                        className="hover:r-5 transition-all cursor-pointer"
                                                                        onMouseEnter={(e) => {
                                                                            const rect = e.currentTarget.getBoundingClientRect();
                                                                            setStockTooltip({
                                                                                show: true,
                                                                                x: rect.left + rect.width / 2,
                                                                                y: rect.top - 10,
                                                                                data: { date: day.date, lots: day.lots }
                                                                            });
                                                                        }}
                                                                        onMouseLeave={() => setStockTooltip({ show: false, x: 0, y: 0, data: null })}
                                                                    />
                                                                    <text
                                                                        x={x}
                                                                        y="170"
                                                                        textAnchor="middle"
                                                                        className="text-xs fill-gray-500"
                                                                        fontSize="10"
                                                                    >
                                                                        {day.date}
                                                                    </text>
                                                                </g>
                                                            );
                                                        })}
                                                    </>
                                                );
                                            })()}
                                        </svg>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                            <MdInventory className="text-4xl mb-2" />
                                            <span>{!lotMeterSize ? 'Set lot size in settings' : 'No stock data'}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Recent Activities & Stock Details */}
                            {/* <div className="space-y-6"> */}
                                {/* Recent Activities */}
                                <div className="bg-white p-6 rounded-xl border border-neutral shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-text">Recent Activities</h2>
                                        <span className="text-sm text-gray-500">Latest updates</span>
                                    </div>
                                    <div className="space-y-3 max-h-64 overflow-y-auto">
                                        {activities && activities.length > 0 ? activities.map((activity, index) => {
                                            const getActivityIcon = (type) => {
                                                switch(type) {
                                                    case 'staff_added': return <MdPerson className="text-blue-500" />;
                                                    case 'worker_added': return <MdPeople className="text-green-500" />;
                                                    case 'machine_added': return <MdBuild className="text-orange-500" />;
                                                    case 'production_added': return <MdTrendingUp className="text-purple-500" />;
                                                    default: return <MdAssessment className="text-gray-500" />;
                                                }
                                            };

                                            return (
                                                <div key={index} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                                    <div className="text-lg">{getActivityIcon(activity.type)}</div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium text-text text-sm">{activity.title}</div>
                                                        <div className="text-xs text-gray-500 truncate">{activity.description}</div>
                                                        <div className="text-xs text-gray-400 mt-1">
                                                            {new Date(activity.time).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }) : (
                                            <div className="text-center py-4 text-gray-500">
                                                No recent activities
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Stock Details */}
                                <div className="bg-white p-6 rounded-xl border border-neutral shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-text">Recent Stock</h2>
                                        <a href={route('stock.index')} className="text-sm text-primary hover:text-primary-600">View All</a>
                                    </div>
                                    {!lotMeterSize ? (
                                        <div className="text-center py-4">
                                            <p className="text-gray-500 mb-2">⚠️ Lot meter size not set</p>
                                            <a href={route('settings.index')} className="text-sm text-primary hover:text-primary-600">
                                                Configure in Settings
                                            </a>
                                        </div>
                                    ) : Object.keys(stockData).length > 0 ? (
                                        <div className="space-y-3">
                                            {Object.entries(stockData).slice(0, 3).map(([date, stockItem]) => (
                                                <div key={date} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                                    <div>
                                                        <div className="font-medium text-text">{date}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {stockItem.total_meters} meters total
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-medium text-primary">{stockItem.total_lots} Lots</div>
                                                        <div className="text-xs text-gray-500">{lotMeterSize}m/lot</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4">
                                            <p className="text-gray-500">No stock data available</p>
                                        </div>
                                    )}
                                </div>
                            {/* </div> */}
                        </div>
                    </main>
                </div>
            </div>

            <Toast />

            {/* Production Chart Tooltip */}
            {productionTooltip.show && (
                <div
                    className="fixed z-50 bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg pointer-events-none"
                    style={{
                        left: productionTooltip.x - 40,
                        top: productionTooltip.y - 40
                    }}
                >
                    <div className="font-medium">{productionTooltip.data?.date}</div>
                    <div>{productionTooltip.data?.meters}m produced</div>
                </div>
            )}

            {/* Stock Chart Tooltip */}
            {stockTooltip.show && (
                <div
                    className="fixed z-50 bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg pointer-events-none"
                    style={{
                        left: stockTooltip.x - 30,
                        top: stockTooltip.y - 40
                    }}
                >
                    <div className="font-medium">{stockTooltip.data?.date}</div>
                    <div>{stockTooltip.data?.lots} lots</div>
                </div>
            )}
        </>
    );
}
