import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import Button from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Toast from '@/Components/Toast';
import AttendanceHistoryModal from './AttendanceHistoryModal';
import ManualAttendanceModal from './ManualAttendanceModal';
import { useToastFlash } from '@/Hooks/useToastFlash';
import { usePermissions } from '@/Utils/permissions';
import { MdSearch, MdHistory, MdAdd } from 'react-icons/md';

export default function AttendanceIndex({ auth, staff, filters }) {
    const { canCreate } = usePermissions();
    useToastFlash();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState(filters?.search || '');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [historyModal, setHistoryModal] = useState({ isOpen: false, staff: null });
    const [manualModal, setManualModal] = useState(false);

    const markAttendance = (staffId, status) => {
        router.post(route('attendance.store'), {
            staff_id: staffId,
            status: status,
            date: selectedDate,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('attendance.index'), { search }, {
            preserveState: true,
            replace: true,
        });
    };

    const showHistory = (staffMember) => {
        setHistoryModal({ isOpen: true, staff: staffMember });
    };

    const getSelectedDateAttendance = (staffMember) => {
        return staffMember.attendances?.find(att => {
            const attDate = new Date(att.date).toISOString().split('T')[0];
            return attDate === selectedDate;
        });
    };

    const getAttendanceHistory = (staffMember) => {
        return staffMember.attendances?.slice(0, 10) || [];
    };

    const breadcrumbs = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Staff Attendance' }
    ];

    return (
        <>
            <Head title="Staff Attendance" />

            <div className="flex h-screen bg-background">
                <Sidebar
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                    user={auth.user}
                />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader
                        user={auth.user}
                        onMenuClick={() => setSidebarOpen(true)}
                        breadcrumbs={breadcrumbs}
                    />

                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        <div className="mb-6 lg:mb-8">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                                <div>
                                    <h1 className="text-xl lg:text-2xl font-bold text-text">
                                        Staff Attendance
                                    </h1>
                                    <p className="text-gray-600 mt-2">
                                        Mark daily attendance for your staff
                                        members
                                    </p>
                                </div>
                                {/* {canCreate('attendance') && (
                                    <Button
                                        onClick={() => setManualModal(true)}
                                        className="flex items-center space-x-2 mt-4 lg:mt-0"
                                    >
                                        <MdAdd className="w-5 h-5" />
                                        <span>Add Manual Attendance</span>
                                    </Button>
                                )} */}
                            </div>
                        </div>

                        <div className="mb-6 space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <InputLabel
                                        htmlFor="attendance_date"
                                        value="Search Staff"
                                    />
                                    <form
                                        onSubmit={handleSearch}
                                        className="flex gap-3"
                                    >
                                        <div className="flex-1 relative">
                                            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <TextInput
                                                type="text"
                                                placeholder="Search staff by name, email, or role..."
                                                value={search}
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
                                                className="pl-10 w-full"
                                            />
                                        </div>
                                        <Button type="submit">Search</Button>
                                    </form>
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="attendance_date"
                                        value="Select Date"
                                    />
                                    <TextInput
                                        id="attendance_date"
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) =>
                                            setSelectedDate(e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {staff.map((staffMember) => {
                                const dateAttendance =
                                    getSelectedDateAttendance(staffMember);
                                const history =
                                    getAttendanceHistory(staffMember);

                                return (
                                    <div
                                        key={staffMember.id}
                                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                                            <div className="mb-4 lg:mb-0">
                                                <h3 className="text-lg font-semibold text-text">
                                                    {staffMember.name}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {staffMember.email}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {staffMember.role}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-3">
                                                {canCreate("attendance") && (
                                                    <>
                                                        <Button
                                                            variant={
                                                                dateAttendance?.status ===
                                                                "present"
                                                                    ? "success"
                                                                    : "outline-success"
                                                            }
                                                            size="sm"
                                                            onClick={() =>
                                                                markAttendance(
                                                                    staffMember.id,
                                                                    "present"
                                                                )
                                                            }
                                                            className={
                                                                dateAttendance?.status ===
                                                                "present"
                                                                    ? "cursor-default"
                                                                    : ""
                                                            }
                                                        >
                                                            {dateAttendance?.status ===
                                                            "present"
                                                                ? "✓ Present"
                                                                : "Present"}
                                                        </Button>
                                                        <Button
                                                            variant={
                                                                dateAttendance?.status ===
                                                                "absent"
                                                                    ? "danger"
                                                                    : "outline-danger"
                                                            }
                                                            size="sm"
                                                            onClick={() =>
                                                                markAttendance(
                                                                    staffMember.id,
                                                                    "absent"
                                                                )
                                                            }
                                                            className={
                                                                dateAttendance?.status ===
                                                                "absent"
                                                                    ? "cursor-default"
                                                                    : ""
                                                            }
                                                        >
                                                            {dateAttendance?.status ===
                                                            "absent"
                                                                ? "✓ Absent"
                                                                : "Absent"}
                                                        </Button>
                                                    </>
                                                )}
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() =>
                                                        showHistory(staffMember)
                                                    }
                                                    className="flex items-center space-x-1"
                                                >
                                                    <MdHistory className="w-4 h-4" />
                                                    <span>History</span>
                                                </Button>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-3">
                                                Last 10 Days Attendance History
                                            </h4>
                                            {history.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {history.map(
                                                        (attendance) => (
                                                            <div
                                                                key={
                                                                    attendance.id
                                                                }
                                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                    attendance.status ===
                                                                    "present"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : "bg-red-100 text-red-800"
                                                                }`}
                                                                title={`${new Date(
                                                                    attendance.date
                                                                ).toLocaleDateString(
                                                                    "en-GB"
                                                                )} - ${
                                                                    attendance.status
                                                                }`}
                                                            >
                                                                {new Date(
                                                                    attendance.date
                                                                ).toLocaleDateString(
                                                                    "en-GB",
                                                                    {
                                                                        day: "2-digit",
                                                                        month: "2-digit",
                                                                    }
                                                                )}{" "}
                                                                -{" "}
                                                                {attendance.status
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    attendance.status.slice(
                                                                        1
                                                                    )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500 italic">
                                                    No attendance records found
                                                    for the last 10 days
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {staff.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">
                                        No staff members found. Add staff
                                        members first to manage attendance.
                                    </p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            <Toast />

            <AttendanceHistoryModal
                isOpen={historyModal.isOpen}
                onClose={() => setHistoryModal({ isOpen: false, staff: null })}
                staff={historyModal.staff}
            />

            <ManualAttendanceModal
                isOpen={manualModal}
                onClose={() => setManualModal(false)}
                staff={staff}
            />
        </>
    );
}
