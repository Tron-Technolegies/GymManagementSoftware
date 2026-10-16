
import {
    CalendarDays,
    RefreshCw,
    Search,
    DownloadCloud,
} from "lucide-react";

export default function AttendanceHeader({
    date,
    onDateChange,
    search,
    onSearchChange,
    onRefresh,
    onSync,
    loading,
    syncing,
}) {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Attendance
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Monitor biometric check-ins and eSSL punch records.
                </p>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full lg:max-w-sm">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            onSearchChange(event.target.value)
                        }
                        placeholder="Search employee, code, device..."
                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#FED505] focus:ring-2 focus:ring-[#FED505]/30"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                        {/* <CalendarDays
                            size={17}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        /> */}
                        <input
                            type="date"
                            value={date}
                            onChange={(event) =>
                                onDateChange(event.target.value)
                            }
                            className="rounded-lg border border-gray-300 bg-white py-2.5  px-5 text-sm outline-none focus:border-[#FED505]"
                            aria-label="Filter attendance by date"
                        />
                    </div>



                    <button
                        type="button"
                        onClick={onSync}
                        disabled={syncing || loading}
                        className="inline-flex items-center gap-2 rounded-lg  px-4 py-2.5 text-sm font-semibold text-gray-900 bg-yellow-500 hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <DownloadCloud
                            size={17}
                            className={syncing ? "animate-pulse" : ""}
                        />
                        {syncing ? "Syncing..." : "Sync Attendance"}
                    </button>

                    <button
                        type="button"
                        onClick={onRefresh}
                        disabled={loading || syncing}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? "animate-spin" : ""}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
