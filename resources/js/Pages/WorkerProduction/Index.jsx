import { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Button from '@/Components/Button';
import FormField from '@/Components/FormField';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';
import { usePermissions } from '@/Utils/permissions';
import axios from 'axios';

export default function WorkerProductionIndex(props) {
    const { auth = {}, workers = [] } = props;
    const { hasPermission } = usePermissions();

    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [machines, setMachines] = useState([]);
    const [loadingMachines, setLoadingMachines] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        date: new Date().toISOString().split('T')[0],
        worker_id: '',
        shift_id: 'day',
        entries: [],
    });

    const loadMachines = async () => {
        if (!data.worker_id || !data.shift_id) {
            setMachines([]);
            setData('entries', []);
            return;
        }

        setLoadingMachines(true);
        try {
            const response = await axios.get(route('worker-production.machines'), {
                params: {
                    worker_id: data.worker_id,
                    shift_id: data.shift_id,
                }
            });

            const machineList = response.data;
            setMachines(machineList);

            // Load existing entries if available
            const existingResponse = await axios.get(route('worker-production.existing'), {
                params: {
                    worker_id: data.worker_id,
                    shift_id: data.shift_id,
                    date: data.date,
                }
            });

            const existingEntries = existingResponse.data;

            // Initialize entries for each machine with existing data if available
            const entries = machineList.map(machine => {
                const existing = existingEntries.find(entry => 
                    parseInt(entry.machine_id) === parseInt(machine.id)
                );
                console.log('Machine:', machine.id, 'Existing:', existing);
                return {
                    machine_id: machine.id,
                    meters: existing ? String(existing.meters || '') : '',
                };
            });
            console.log('Final entries:', entries);
            setData('entries', entries);
        } catch (error) {
            console.error('Error loading machines:', error);
            setMachines([]);
            setData('entries', []);
        } finally {
            setLoadingMachines(false);
        }
    };

    useEffect(() => {
        loadMachines();
    }, [data.worker_id, data.shift_id, data.date]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('worker-production.store'), {
            onSuccess: () => {
                // Reset only the meters, keep other form data
                const resetEntries = data.entries.map(entry => ({
                    ...entry,
                    meters: '',
                }));
                setData('entries', resetEntries);
            },
        });
    };

    const updateMeterValue = (machineId, value) => {
        const updatedEntries = data.entries.map(entry =>
            entry.machine_id === machineId
                ? { ...entry, meters: value }
                : entry
        );
        setData('entries', updatedEntries);
    };

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Workers' },
        { label: 'Daily Production Entry' }
    ];

    return (
        <>
            <Head title="Daily Production Entry" />

            <div className="flex h-screen bg-background">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={auth.user} />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader
                        user={auth.user}
                        onMenuClick={() => setSidebarOpen(true)}
                        breadcrumbs={breadcrumbs}
                    />

                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        <div className="mb-6 lg:mb-8">
                            <h1 className="text-xl lg:text-2xl font-bold text-text">Daily Production Entry</h1>
                            <p className="text-gray-600 mt-2">Enter daily production meters for workers</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormField
                                        label="Date"
                                        name="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        error={errors.date}
                                        required
                                    />

                                    <FormField
                                        label="Worker"
                                        name="worker_id"
                                        type="select"
                                        value={data.worker_id}
                                        onChange={(e) => setData('worker_id', e.target.value)}
                                        error={errors.worker_id}
                                        required
                                        options={[
                                            // { value: '', label: 'Select Worker' },
                                            ...workers.map(worker => ({
                                                value: worker.id,
                                                label: worker.name
                                            }))
                                        ]}
                                    />

                                    <FormField
                                        label="Shift"
                                        name="shift_id"
                                        type="select"
                                        value={data.shift_id}
                                        onChange={(e) => setData('shift_id', e.target.value)}
                                        error={errors.shift_id}
                                        required
                                        options={[
                                            { value: 'day', label: 'Day Shift' },
                                            { value: 'night', label: 'Night Shift' }
                                        ]}
                                    />
                                </div>

                                {loadingMachines && (
                                    <div className="text-center py-4">
                                        <p className="text-gray-500">Loading assigned machines...</p>
                                    </div>
                                )}

                                {!loadingMachines && machines.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-text mb-4">Machine Production Entries</h3>
                                        <div className="space-y-4">
                                            {machines.map((machine, index) => {
                                                const entry = data.entries.find(e => e.machine_id === machine.id);
                                                return (
                                                    <div key={machine.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                                        <div className="flex-1">
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                Machine {machine.number}
                                                                {machine.description && (
                                                                    <span className="text-gray-500 ml-2">- {machine.description}</span>
                                                                )}
                                                            </label>
                                                        </div>
                                                        <div className="w-32">
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                min="0"
                                                                placeholder="Meters"
                                                                value={entry?.meters ?? ''}
                                                                onChange={(e) => updateMeterValue(machine.id, e.target.value)}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {errors.entries && (
                                            <p className="text-red-600 text-sm mt-2">{errors.entries}</p>
                                        )}
                                    </div>
                                )}

                                {!loadingMachines && data.worker_id && data.shift_id && machines.length === 0 && (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">No machines assigned to this worker for the selected shift.</p>
                                        <p className="text-sm text-gray-400 mt-1">Please assign machines first in the Machine Assignments section.</p>
                                    </div>
                                )}

                                {machines.length > 0 && hasPermission('entry worker daily production') && (
                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={processing || machines.length === 0}
                                        >
                                            Save Production Entries
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}
