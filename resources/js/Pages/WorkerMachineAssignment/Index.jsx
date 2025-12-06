import { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Button from '@/Components/Button';
import FormField from '@/Components/FormField';
import Toast from '@/Components/Toast';
import { useToastFlash } from '@/Hooks/useToastFlash';
import { formatMachineNumber } from '@/Utils/helpers';

export default function WorkerMachineAssignmentIndex(props) {
    const { auth = {}, workers = [], machines = [] } = props;

    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        worker_id: '',
        shift_id: 'day',
        machine_ids: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('worker-machine-assignments.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleMachineChange = (machineId) => {
        const currentMachines = [...data.machine_ids];
        const index = currentMachines.indexOf(machineId);

        if (index > -1) {
            currentMachines.splice(index, 1);
        } else {
            currentMachines.push(machineId);
        }

        setData('machine_ids', currentMachines);
    };

    const getWorkerAssignments = (workerId, shift) => {
        const worker = workers.find(w => w.id === parseInt(workerId));
        if (!worker) return [];

        return worker.machine_assignments
            .filter(assignment => assignment.shift_id === shift)
            .map(assignment => assignment.machine.id);
    };

    const currentAssignments = data.worker_id ? getWorkerAssignments(data.worker_id, data.shift_id) : [];

    const getAssignedMachinesForShift = (shift, excludeWorkerId = null) => {
        const assignedMachines = new Set();
        workers.forEach(worker => {
            if (excludeWorkerId && worker.id === excludeWorkerId) return;
            worker.machine_assignments
                .filter(assignment => assignment.shift_id === shift)
                .forEach(assignment => assignedMachines.add(assignment.machine.id));
        });
        return assignedMachines;
    };

    const assignedMachinesForCurrentShift = getAssignedMachinesForShift(data.shift_id, parseInt(data.worker_id));
    const availableMachines = data.worker_id ? machines.filter(machine =>
        !assignedMachinesForCurrentShift.has(machine.id)
    ) : [];

    useEffect(() => {
        if (data.worker_id && data.shift_id) {
            const assignments = getWorkerAssignments(data.worker_id, data.shift_id);
            setData('machine_ids', assignments);
        }
    }, [data.worker_id, data.shift_id]);

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Workers' },
        { label: 'Machine Assignments' }
    ];

    return (
        <>
            <Head title="Worker Machine Assignments" />

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
                            <h1 className="text-xl lg:text-2xl font-bold text-text">Worker Machine Assignments</h1>
                            <p className="text-gray-600 mt-2">Assign machines to workers for different shifts</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Assignment Form */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-text mb-4">Assign Machines</h2>

                                <form onSubmit={handleSubmit} className="space-y-4">
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

                                    {data.worker_id && availableMachines.length > 0 && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Select Machines
                                            </label>
                                            <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                                                {availableMachines.map(machine => (
                                                    <label key={machine.id} className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.machine_ids.includes(machine.id)}
                                                            onChange={() => handleMachineChange(machine.id)}
                                                            className="rounded border-gray-300 text-primary focus:ring-primary"
                                                        />
                                                        <span className="text-sm text-gray-700">
                                                            {formatMachineNumber(machine.number)} {machine.description && `- ${machine.description}`}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.machine_ids && (
                                                <p className="text-red-600 text-sm mt-1">{errors.machine_ids}</p>
                                            )}
                                        </div>
                                    )}

                                    {data.worker_id && availableMachines.length === 0 && (
                                        <div className="text-center py-4">
                                            <p className="text-gray-500 text-sm">No available machines for this shift. All machines are already assigned to other workers.</p>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={processing || !data.worker_id || data.machine_ids.length === 0}
                                        className="w-full"
                                    >
                                        Update Assignments
                                    </Button>
                                </form>
                            </div>

                            {/* Current Assignments Display */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-text mb-4">Current Assignments</h2>

                                {data.worker_id ? (
                                    <div className="space-y-4">
                                        <div className="text-sm text-gray-600">
                                            <strong>Worker:</strong> {workers.find(w => w.id === parseInt(data.worker_id))?.name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <strong>Shift:</strong> {data.shift_id === 'day' ? 'Day Shift' : 'Night Shift'}
                                        </div>

                                        {currentAssignments.length > 0 ? (
                                            <div>
                                                <h3 className="font-medium text-gray-700 mb-2">Assigned Machines:</h3>
                                                <div className="space-y-1">
                                                    {currentAssignments.map(machineId => {
                                                        const machine = machines.find(m => m.id === machineId);
                                                        return machine ? (
                                                            <div key={machineId} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                                                {formatMachineNumber(machine.number)} {machine.description && `- ${machine.description}`}
                                                            </div>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 text-sm">No machines assigned for this shift</p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">Select a worker to view current assignments</p>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Toast />
        </>
    );
}
