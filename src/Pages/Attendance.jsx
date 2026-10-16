import { useEffect, useState } from "react";
import AttendanceHeader from "../Components/Attendance/AttendanceHeader";
import AttendanceKPIs from "../Components/Attendance/AttendanceKPIs";
import AttendanceTable from "../Components/Attendance/AttendanceTable";
import AttendanceMemberModal from "../Components/Attendance/AttendanceMemberModal";
import useAttendance from "../hooks/useAttendance";
import ConfirmActionModal from "../Components/ConfirmActionModal";
import AlertMessage from "../Components/AlertMessage";

const PAGE_SIZE = 10;

export default function Attendance() {
    const {
        records = [],
        filteredRecords = [],
        kpis,
        date,
        setDate,
        search,
        setSearch,
        loading,
        syncing,
        error,
        message,
        runSync,
        loadAttendance,
    } = useAttendance();

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [showSyncConfirm, setShowSyncConfirm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [date, search]);

    const totalRecords = filteredRecords.length;
    const totalPages = Math.max(1, Math.ceil(totalRecords / PAGE_SIZE));

    const startIndex = (currentPage - 1) * PAGE_SIZE;

    const currentRecords = filteredRecords.slice(
        startIndex,
        startIndex + PAGE_SIZE
    );

    const handleSync = async () => {
        setShowSyncConfirm(false);

        try {
            await runSync();

            setAlertMessage("Attendance synchronization completed.");
            setAlertType("success");
            setShowAlert(true);
        } catch (error) {
            setAlertMessage(
                error?.message || "Failed to synchronize attendance."
            );
            setAlertType("error");
            setShowAlert(true);
        }
    };

    const handleConfirmSync = async () => {
        await handleSync();
    };

    const handleRefresh = async () => {
        await loadAttendance();
    };

    return (
        <div className="space-y-6 p-4 sm:p-6">
            {/* Page header and filters */}
            <AttendanceHeader
                date={date}
                onDateChange={setDate}
                search={search}
                onSearchChange={setSearch}
                loading={loading}
                syncing={syncing}
                onRefresh={loadAttendance}
                onSync={() => setShowSyncConfirm(true)}
            />

            {/* API feedback */}
            {error && (
                <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {error}
                </div>
            )}

            {message && (
                <div
                    role="status"
                    className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                    {message}
                </div>
            )}

            {/* Attendance summary */}
            <AttendanceKPIs kpis={kpis} />

            {/* Attendance table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col gap-1 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Attendance Records
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Click an employee to view their individual attendance.
                        </p>
                    </div> */}

                    <span className="text-sm text-gray-500">
                        {totalRecords} record{totalRecords !== 1 ? "s" : ""}
                    </span>
                </div>

                <AttendanceTable
                    records={currentRecords}
                    loading={loading}
                    onEmployeeClick={setSelectedEmployee}
                />

                {/* Pagination */}
                {!loading && totalRecords > 0 && (
                    <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-gray-500">
                            Showing{" "}
                            <span className="font-medium text-gray-800">
                                {startIndex + 1}
                            </span>
                            {" – "}
                            <span className="font-medium text-gray-800">
                                {Math.min(startIndex + PAGE_SIZE, totalRecords)}
                            </span>
                            {" of "}
                            <span className="font-medium text-gray-800">
                                {totalRecords}
                            </span>
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={currentPage <= 1}
                                onClick={() =>
                                    setCurrentPage((page) => Math.max(1, page - 1))
                                }
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Previous
                            </button>

                            <span className="min-w-20 text-center text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                type="button"
                                disabled={currentPage >= totalPages}
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.min(totalPages, page + 1)
                                    )
                                }
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Individual employee attendance modal */}
            <AttendanceMemberModal
                isOpen={Boolean(selectedEmployee)}
                employee={selectedEmployee}
                onClose={() => setSelectedEmployee(null)}
            />
            <ConfirmActionModal
                isOpen={showSyncConfirm}
                title="Synchronize Attendance"
                message="Synchronize attendance logs from the eSSL device for the selected date?"
                confirmText="Synchronize"
                cancelText="Cancel"
                onConfirm={handleConfirmSync}
                onCancel={() => setShowSyncConfirm(false)}
                loading={syncing}
                type="update"
            />

            <AlertMessage
                show={showAlert}
                message={alertMessage}
                type={alertType}
                onClose={() => setShowAlert(false)}
            />
        </div>
    );
}