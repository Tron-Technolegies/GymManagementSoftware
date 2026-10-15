import { useEffect, useState } from "react";
import { X, CalendarDays, Clock, RefreshCw } from "lucide-react";
import { getEmployeeAttendance } from "../../api/attendance";

const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};


const formatPunchTime = (value) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        console.error("Invalid attendance timestamp:", value);
        return "—";
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
    }).format(date);
};

export default function AttendanceMemberModal({
    isOpen,
    employee,
    onClose,
}) {
    const [month, setMonth] = useState(getCurrentMonth());
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        if (!isOpen || !employee?.employee_code) {
            setRecords([]);
            setError("");
            setLoading(false);
            return;
        }

        let cancelled = false;

        const loadRecords = async () => {
            setLoading(true);
            setError("");
            setRecords([]);

            try {
                const response = await getEmployeeAttendance(
                    employee.employee_code,
                    { month }
                );

                const data = response?.data;
                const rows = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.results)
                        ? data.results
                        : [];

                if (!cancelled) {
                    setRecords(rows);
                }
            } catch (err) {
                if (!cancelled) {
                    setRecords([]);
                    setError(
                        err?.response?.data?.detail ||
                        err?.response?.data?.error ||
                        "Unable to load this employee's attendance."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadRecords();

        return () => {
            cancelled = true;
        };
    }, [isOpen, employee?.employee_code, month]);


    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || !employee) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="attendance-modal-title"
                className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-4 sm:px-6">
                    <div>
                        <h2
                            id="attendance-modal-title"
                            className="text-lg font-bold text-gray-900 sm:text-xl"
                        >
                            Member Attendance
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {employee.employee_name || "Unknown Employee"}
                            {" · "}
                            Code: {employee.employee_code}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close attendance modal"
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Month filter and count */}
                <div className="flex flex-col gap-3 border-b border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
                    <div>
                        {/* <label
                            htmlFor="attendance-month"
                            className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700"
                        >
                            <CalendarDays size={16} />
                            Filter by month
                        </label> */}

                        <input
                            id="attendance-month"
                            type="month"
                            value={month}
                            max={getCurrentMonth()}
                            onChange={(event) => setMonth(event.target.value)}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                        />
                    </div>

                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2">
                        <p className="text-xs text-gray-600">
                            Total punches
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                            {records.length}
                        </p>
                    </div>
                </div>

                {/* Attendance records */}
                <div className="min-h-0 flex-1 overflow-auto">
                    {loading ? (
                        <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-gray-500">
                            <RefreshCw size={18} className="animate-spin" />
                            Loading attendance...
                        </div>
                    ) : error ? (
                        <div className="m-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    ) : records.length === 0 ? (
                        <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">
                            <Clock size={32} className="mb-3 text-gray-400" />
                            <p className="font-semibold text-gray-800">
                                No attendance records
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                No punches were found for this employee in the selected month.
                            </p>
                        </div>
                    ) : (
                        <table className="w-full min-w-[650px] text-left text-sm">
                            <thead className="sticky top-0 bg-gray-100 text-xs uppercase text-gray-600">
                                <tr>
                                    <th className="px-5 py-3 font-semibold">
                                        #
                                    </th>
                                    <th className="px-5 py-3 font-semibold">
                                        Punch date & time
                                    </th>
                                    <th className="px-5 py-3 font-semibold">
                                        Punch type
                                    </th>
                                    <th className="px-5 py-3 font-semibold">
                                        Device
                                    </th>
                                    <th className="px-5 py-3 font-semibold">
                                        Location
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {records.map((record, index) => (
                                    <tr
                                        key={record.id}
                                        className="hover:bg-slate-50/50"
                                    >
                                        <td className="px-5 py-3 text-gray-500">
                                            {index + 1}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-3 font-medium text-gray-900">
                                            {formatPunchTime(record.punch_time)}
                                        </td>

                                        <td className="px-5 py-3">
                                            <span className="rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">
                                                {record.punch_type || "INOUT"}
                                            </span>
                                        </td>

                                        <td className="px-5 py-3 text-gray-600">
                                            {record.raw_data?.device_name || "—"}
                                        </td>

                                        <td className="px-5 py-3 text-gray-600">
                                            {record.raw_data?.location || "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3 sm:px-6">
                    <p className="text-xs text-gray-500">
                        Attendance for {month || "selected month"}
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-yellow-600 px-5 py-2 text-sm font-semibold text-white hover:bg-yellow-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}