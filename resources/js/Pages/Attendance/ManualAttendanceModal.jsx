import { useState } from 'react';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { router } from '@inertiajs/react';

export default function ManualAttendanceModal({ isOpen, onClose, staff }) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedStaff, setSelectedStaff] = useState('');
    const [status, setStatus] = useState('present');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        router.post(route('attendance.store'), {
            staff_id: selectedStaff,
            status: status,
            date: selectedDate,
        }, {
            onSuccess: () => {
                onClose();
                setSelectedStaff('');
                setStatus('present');
            }
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Manual Attendance" size="md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="date" value="Date" />
                    <TextInput
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mt-1 block w-full"
                        required
                    />
                </div>

                <div>
                    <InputLabel htmlFor="staff" value="Staff Member" />
                    <select
                        id="staff"
                        value={selectedStaff}
                        onChange={(e) => setSelectedStaff(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        required
                    >
                        <option value="">Select Staff Member</option>
                        {staff.map((member) => (
                            <option key={member.id} value={member.id}>
                                {member.name} - {member.role}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <InputLabel value="Status" />
                    <div className="mt-2 flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="present"
                                checked={status === 'present'}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mr-2"
                            />
                            Present
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="absent"
                                checked={status === 'absent'}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mr-2"
                            />
                            Absent
                        </label>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Add Attendance
                    </Button>
                </div>
            </form>
        </Modal>
    );
}