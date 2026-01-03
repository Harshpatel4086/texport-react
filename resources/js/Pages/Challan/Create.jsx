import { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import { MdAdd, MdSave, MdArrowBack, MdRemove, MdInventory, MdWarning, MdInfo, MdPerson } from 'react-icons/md';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';

export default function ChallanCreate(props) {
    const { auth = {}, parties = [], qualities = [], availableStock = 0 } = props;

    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [groups, setGroups] = useState([{ id: 1, items: Array.from({ length: 12 }, (_, i) => ({ sr: i + 1, meter: '' })) }]);
    const [selectedParty, setSelectedParty] = useState('');
    const [selectedQuality, setSelectedQuality] = useState('');
    const [selectedPartyDetails, setSelectedPartyDetails] = useState(null);
    const [stockAlert, setStockAlert] = useState('');
    const [isStockValid, setIsStockValid] = useState(true);

    const { data, setData, post, processing, errors } = useForm({
        party_id: '',
        quality_id: '',
        date: new Date().toISOString().split('T')[0],
        items: [],
        total_meter: 0,
        total_lots: 0
    });

    // Sync selectedParty with form data
    useEffect(() => {
        setData('party_id', selectedParty);
        const party = parties.find(p => p.id == selectedParty);
        setSelectedPartyDetails(party || null);
    }, [selectedParty]);

    // Sync selectedQuality with form data
    useEffect(() => {
        setData('quality_id', selectedQuality);
    }, [selectedQuality]);

    const calculateTotals = () => {
        let totalMeter = 0;
        let totalLots = groups.length;
        const allItems = [];

        groups.forEach((group, groupIndex) => {
            let groupTotal = 0;
            group.items.forEach((item) => {
                const meter = parseFloat(item.meter) || 0;
                groupTotal += meter;
                if (meter > 0) {
                    allItems.push({
                        sr_number: item.sr,
                        meter: meter,
                        group_number: groupIndex + 1
                    });
                }
            });
            totalMeter += groupTotal;
        });

        // Check stock availability
        if (totalMeter > availableStock) {
            setStockAlert(`Stock is not available. Available: ${availableStock}m, Required: ${totalMeter}m`);
            setIsStockValid(false);
        } else {
            setStockAlert('');
            setIsStockValid(true);
        }

        setData(prev => ({
            ...prev,
            items: allItems,
            total_meter: totalMeter,
            total_lots: totalLots
        }));
    };

    useEffect(() => {
        calculateTotals();
    }, [groups]);

    const addGroup = () => {
        const lastGroup = groups[groups.length - 1];
        const lastSr = lastGroup.items[lastGroup.items.length - 1].sr;

        setGroups(prev => [
            ...prev,
            {
                id: prev.length + 1,
                items: Array.from({ length: 12 }, (_, i) => ({ sr: lastSr + i + 1, meter: '' }))
            }
        ]);
    };

    const removeGroup = (groupIndex) => {
        if (groups.length > 1) {
            setGroups(prev => prev.filter((_, index) => index !== groupIndex));
        }
    };

    const updateMeter = (groupIndex, itemIndex, value) => {
        setGroups(prev => prev.map((group, gIndex) =>
            gIndex === groupIndex
                ? {
                    ...group,
                    items: group.items.map((item, iIndex) =>
                        iIndex === itemIndex ? { ...item, meter: value } : item
                    )
                }
                : group
        ));
    };

    const getGroupTotal = (group) => {
        return group.items.reduce((sum, item) => sum + (parseFloat(item.meter) || 0), 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedParty) {
            alert('Please select a party');
            return;
        }
        if (!selectedQuality) {
            alert('Please select a quality');
            return;
        }

        post(route('challans.store'));
    };

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Challan Management', href: route('challans.index') },
        { label: 'Create Challan' }
    ];

    return (
        <>
            <Head title="Create Challan" />

            <div className="flex h-screen bg-background">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={auth.user} />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader
                        user={auth.user}
                        onMenuClick={() => setSidebarOpen(true)}
                        breadcrumbs={breadcrumbs}
                    />

                    <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 lg:mb-8 space-y-3 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                                {/* <div className="p-2 bg-primary/10 rounded-lg">
                                    <MdAdd className="w-6 h-6 text-primary" />
                                </div> */}
                                <div>
                                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-text">Create Challan</h1>
                                    <p className="text-sm text-gray-600 mt-1">Add new challan entry with party details</p>
                                </div>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="flex items-center space-x-2 w-full sm:w-auto justify-center"
                                onClick={() => router.visit(route('challans.index'))}
                            >
                                <MdArrowBack className="w-4 h-4" />
                                <span className="hidden sm:inline">Back to Challans</span>
                                <span className="sm:hidden">Back</span>
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            {/* Party Selection & Date Card */}
                            <Card className="p-4 sm:p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <MdInfo className="w-5 h-5 text-primary" />
                                    <h2 className="text-lg font-semibold text-text">Challan Details</h2>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                                    <div>
                                        <Select
                                            label="Select Party"
                                            value={selectedParty}
                                            onChange={(e) => setSelectedParty(e.target.value)}
                                            error={errors.party_id}
                                            required
                                            className="text-sm sm:text-base"
                                        >
                                            <option value="">Choose a party...</option>
                                            {parties.map((party) => (
                                                <option key={party.id} value={party.id}>
                                                    {party.party_name}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <Select
                                            label="Select Quality"
                                            value={selectedQuality}
                                            onChange={(e) => setSelectedQuality(e.target.value)}
                                            error={errors.quality_id}
                                            required
                                            className="text-sm sm:text-base"
                                        >
                                            <option value="">Choose a quality...</option>
                                            {qualities.map((quality) => (
                                                <option key={quality.id} value={quality.id}>
                                                    {quality.quality_name}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <Input
                                            label="Date"
                                            type="date"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                            error={errors.date}
                                            required
                                            className="text-sm sm:text-base"
                                        />
                                    </div>
                                </div>
                            </Card>

                            {/* Party Details Card */}
                            {selectedPartyDetails && (
                                <Card className="p-4 sm:p-6">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <MdPerson className="w-5 h-5 text-secondary" />
                                        <h2 className="text-lg font-semibold text-text">Selected Party Details</h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="p-3 bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-lg border border-secondary/20">
                                            <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1">Party Name</label>
                                            <div className="text-sm font-semibold text-gray-900">{selectedPartyDetails.party_name}</div>
                                        </div>
                                        {selectedPartyDetails.business_name && (
                                            <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1">Business Name</label>
                                                <div className="text-sm font-semibold text-gray-900">{selectedPartyDetails.business_name}</div>
                                            </div>
                                        )}
                                        {selectedPartyDetails.gst_number && (
                                            <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1">GST Number</label>
                                                <div className="text-sm font-semibold text-gray-900">{selectedPartyDetails.gst_number}</div>
                                            </div>
                                        )}
                                        {selectedPartyDetails.address && (
                                            <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 sm:col-span-2 lg:col-span-3">
                                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1">Address</label>
                                                <div className="text-sm font-semibold text-gray-900">{selectedPartyDetails.address}</div>
                                            </div>
                                        )}
                                        {selectedPartyDetails.business_location && (
                                            <div className="p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200 sm:col-span-2 lg:col-span-3">
                                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1">Business Location</label>
                                                <div className="text-sm font-semibold text-gray-900">{selectedPartyDetails.business_location}</div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            )}

                            {/* Stock Information */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Available Stock Info */}
                                <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-primary/20 rounded-lg">
                                            <MdInventory className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Available Stock</p>
                                            <p className="text-xl font-bold text-primary">{availableStock} meters</p>
                                        </div>
                                    </div>
                                </Card>

                                {/* Stock Alert */}
                                {stockAlert && (
                                    <Card className="p-4 bg-gradient-to-r from-red-50 to-red-100 border-red-200">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-red-200 rounded-lg">
                                                <MdWarning className="w-5 h-5 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-red-600 font-medium">Stock Alert</p>
                                                <p className="text-sm text-red-700">{stockAlert}</p>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </div>

                            {/* SR-wise Entry Section */}
                            {selectedParty && selectedQuality && (
                                <div className="space-y-4 sm:space-y-6">
                                    {groups.map((group, groupIndex) => (
                                        <Card key={group.id} className="p-4 sm:p-6">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                                                <h3 className="text-base sm:text-lg font-semibold text-text">
                                                    Group {groupIndex + 1}
                                                    <span className="text-sm text-gray-500 ml-2">
                                                        (SR {group.items[0].sr} - {group.items[group.items.length - 1].sr})
                                                    </span>
                                                </h3>
                                                {groupIndex > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => removeGroup(groupIndex)}
                                                        className="flex items-center space-x-1 w-full sm:w-auto justify-center"
                                                    >
                                                        <MdRemove className="w-4 h-4" />
                                                        <span>Remove Group</span>
                                                    </Button>
                                                )}
                                            </div>

                                            {/* Mobile Grid Layout */}
                                            <div className="block sm:hidden">
                                                <div className="grid grid-cols-2 gap-3">
                                                    {group.items.map((item, itemIndex) => (
                                                        <div key={item.sr} className="p-3 bg-gray-50 rounded-lg">
                                                            <div className="text-xs font-medium text-gray-600 mb-1">
                                                                SR {item.sr}
                                                            </div>
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                min="0"
                                                                value={item.meter}
                                                                onChange={(e) => updateMeter(groupIndex, itemIndex, e.target.value)}
                                                                placeholder="0.00"
                                                                className="w-full px-2 py-1 text-sm border border-neutral rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Desktop Table Layout */}
                                            <div className="hidden sm:block overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                SR No
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Meter
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {group.items.map((item, itemIndex) => (
                                                            <tr key={item.sr} className="hover:bg-gray-50">
                                                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                    {item.sr}
                                                                </td>
                                                                <td className="px-4 py-3 whitespace-nowrap">
                                                                    <Input
                                                                        type="number"
                                                                        step="0.01"
                                                                        min="0"
                                                                        value={item.meter}
                                                                        onChange={(e) => updateMeter(groupIndex, itemIndex, e.target.value)}
                                                                        placeholder="0.00"
                                                                        // className="w-24 sm:w-32 px-3 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                                                        className="w-32"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                                                <div className="text-sm font-medium text-gray-700">
                                                    Group Total: <span className="text-primary font-bold text-base">{getGroupTotal(group).toFixed(2)} m</span>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}

                                    {/* Add More Rows Button */}
                                    <div className="flex justify-center">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={addGroup}
                                            className="flex items-center space-x-2 w-full sm:w-auto justify-center"
                                        >
                                            <MdAdd className="w-5 h-5" />
                                            <span>Add More Rows (12)</span>
                                        </Button>
                                    </div>

                                    {/* Grand Total Summary */}
                                    <Card className="p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                                        <h3 className="text-lg font-semibold text-text mb-4">Summary</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="p-4 bg-white rounded-lg shadow-sm border border-primary/20">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-primary/20 rounded-lg">
                                                        <MdInventory className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Grand Total Meter</div>
                                                        <div className="text-xl sm:text-2xl font-bold text-primary">{data.total_meter.toFixed(2)} m</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-white rounded-lg shadow-sm border border-secondary/20">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-secondary/20 rounded-lg">
                                                        <MdAdd className="w-5 h-5 text-secondary" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Total Lots</div>
                                                        <div className="text-xl sm:text-2xl font-bold text-secondary">{data.total_lots}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Submit Button */}
                                    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => router.visit(route('challans.index'))}
                                            className="flex items-center justify-center space-x-2 w-full sm:w-auto"
                                        >
                                            <MdArrowBack className="w-4 h-4" />
                                            <span>Cancel</span>
                                        </Button>
                                        <Button
                                            type="submit"
                                            processing={processing}
                                            disabled={!isStockValid || processing}
                                            className="flex items-center justify-center space-x-2 w-full sm:w-auto"
                                        >
                                            <MdSave className="w-5 h-5" />
                                            <span>{processing ? 'Saving...' : 'Save Challan'}</span>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}
