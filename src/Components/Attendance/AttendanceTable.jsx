import {
    ClipboardCheck,
    UserRound,
    Link2,
    Unlink,
} from "lucide-react";

const formatPunchTime = (value) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        console.error("Invalid attendance timestamp:", value);
        return "—";
    }

    const formatted = new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
    }).format(date);

    console.log("Attendance time check:", {
        receivedFromAPI: value,
        interpretedAsUTC: date.toISOString(),
        displayedInIndia: formatted,
    });

    return formatted;
};

export default function AttendanceTable({
    records = [],
    loading = false,
    onEmployeeClick,
}) {
    if (loading) {
        return (
            <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-gray-500">
                <ClipboardCheck
                    size={20}
                    className="animate-pulse text-yellow-500"
                />
                Loading attendance records...
            </div>
        );
    }

    if (records.length === 0) {

        return (
            <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
                <div className="mb-3 rounded-full bg-yellow-50 p-4">
                    <ClipboardCheck
                        size={30}
                        className="text-yellow-600"
                    />
                </div>

                <h3 className="font-semibold text-gray-900">
                    No attendance records found
                </h3>

                <p className="mt-1 max-w-sm text-sm text-gray-500">
                    Attendance records will appear here when available. Try changing
                    your search or date filter, or synchronize with the eSSL device.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                        <th className="px-5 py-4 font-semibold">
                            Employee
                        </th>

                        <th className="px-5 py-4 font-semibold">
                            Employee Code
                        </th>


                        <th className="px-5 py-4 font-semibold">
                            Punch date & time
                        </th>

                        <th className="px-5 py-4 font-semibold">
                            Device
                        </th>

                        <th className="px-5 py-4 font-semibold">
                            Location
                        </th>

                        <th className="px-5 py-4 font-semibold">
                            Punch type
                        </th>

                        <th className="px-5 py-4 font-semibold">
                            Mapping
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {records.map((record) => {
                        console.log("Attendance timestamp debug:", {
                            employeeCode: record.employee_code,
                            apiPunchTime: record.punch_time,
                            parsedUTC: record.punch_time
                                ? new Date(record.punch_time).toISOString()
                                : null,
                            displayedIndiaTime: record.punch_time
                                ? new Intl.DateTimeFormat("en-IN", {
                                    dateStyle: "medium",
                                    timeStyle: "medium",
                                    timeZone: "Asia/Kolkata",
                                }).format(new Date(record.punch_time))
                                : null,
                        });
                        const isLinked =
                            record.member_id != null ||
                            record.staff_id != null;

                        const employeeName =
                            record.employee_name ||
                            `Employee ${record.employee_code}`;

                        return (
                            <tr
                                key={record.id}
                                className="transition-colors hover:bg-slate-100/50"
                            >
                                {/* Clickable employee name/code */}

                                {/* Employee Name */}
                                <td className="px-5 py-4">
                                    <button
                                        type="button"
                                        onClick={() => onEmployeeClick?.(record)}
                                        className="group text-left"
                                        title="View individual attendance"
                                    >
                                        <span className="block font-semibold text-gray-900 group-hover:text-yellow-700 group-hover:underline">
                                            {record.employee_name ||
                                                `Employee ${record.employee_code}`}
                                        </span>
                                    </button>
                                </td>

                                {/* Employee Code */}
                                <td className="px-5 py-4 font-medium text-gray-700">
                                    {record.employee_code || "—"}
                                </td>


                                {/* Punch time */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2 whitespace-nowrap text-gray-800">
                                        {formatPunchTime(record.punch_time)}
                                    </div>
                                </td>

                                {/* Device */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        {record.raw_data?.device_name || "—"}
                                    </div>
                                </td>

                                {/* Location */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        {record.raw_data?.location || "—"}
                                    </div>
                                </td>

                                {/* Punch type */}
                                <td className="px-5 py-4">
                                    <span className="inline-flex rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
                                        {record.punch_type || "INOUT"}
                                    </span>
                                </td>

                                {/* Member/staff mapping status */}
                                <td className="px-5 py-4">
                                    {isLinked ? (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                                            <Link2 size={13} />
                                            {record.member_id != null
                                                ? "Member linked"
                                                : "Staff linked"}
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
                                            <Unlink size={13} />
                                            Unlinked
                                        </span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}