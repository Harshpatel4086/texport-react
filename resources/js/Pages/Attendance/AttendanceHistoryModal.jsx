import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { MdHistory } from 'react-icons/md';

export default function AttendanceHistoryModal({ isOpen, onClose, staff }) {
    const [loading, setLoading] = useState(false);
    const [attendances, setAttendances] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        if (isOpen && staff) {
            const today = new Date();
            const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
            
            setFromDate(thirtyDaysAgo.toISOString().split('T')[0]);
            setToDate(today.toISOString().split('T')[0]);
            
            fetchHistory(thirtyDaysAgo.toISOString().split('T')[0], today.toISOString().split('T')[0]);
        }
    }, [isOpen, staff]);

    const fetchHistory = async (from, to) => {
        if (!staff) return;
        
        setLoading(true);
        try {
            const response = await fetch(route('attendance.history', staff.id) + `?from_date=${from}&to_date=${to}`);
            const data = await response.json();
            setAttendances(data.attendances || []);
        } catch (error) {
            console.error('Error fetching attendance history:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = () => {
        if (fromDate && toDate) {
            fetchHistory(fromDate, toDate);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Attendance History - ${staff?.name}`} size="lg">
            <div>
                <div className="flex items-center space-x-2 mb-4">
                    <MdHistory className="text-primary" />
                    <span className="text-sm text-gray-600">Select date range to view attendance records</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <InputLabel htmlFor="from_date" value="From Date" />
                        <TextInput
                            id="from_date"
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="to_date" value="To Date" />
                        <TextInput
                            id="to_date"
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div className="flex items-end">
                        <Button
                            onClick={handleDateChange}
                            disabled={!fromDate || !toDate || loading}
                            className="w-full"
                        >
                            {loading ? 'Loading...' : 'Filter'}
                        </Button>
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {loading ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Loading attendance history...</p>
                        </div>
                    ) : attendances.length > 0 ? (
                        <div className="space-y-2">
                            {attendances.map((attendance) => (
                                <div
                                    key={attendance.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium text-text">
                                            {new Date(attendance.date).toLocaleDateString('en-GB', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                attendance.status === 'present'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No attendance records found for the selected date range.</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}