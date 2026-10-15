
import React from "react";
import { RefreshCw, Search, X } from "lucide-react";

const filters = [
    ["all", "All"],
    ["linked", "Linked"],
    ["unlinked", "Unlinked"],
    ["active", "Active"],
    ["inactive", "Inactive"],
];

export default function EsslHeader({
    search,
    setSearch,
    filter,
    setFilter,
    syncing,
    loading,
    onSync,
    message,
    error,
    dismissMessage,
    dismissError,
}) {
    return (
        <>
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold text-slate-900">
                            eSSL Biometric Mapping
                        </h1>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                        Link biometric employees to existing members or staff.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onSync}
                    disabled={syncing || loading}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <RefreshCw
                        size={17}
                        className={syncing ? "animate-spin" : ""}
                    />
                    {syncing ? "Syncing..." : "Sync Employees"}
                </button>
            </div>

            {error && (
                <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <span>{error}</span>
                    <button type="button" onClick={dismissError} aria-label="Dismiss error">
                        <X size={17} />
                    </button>
                </div>
            )}

            {message && (
                <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                    <span>{message}</span>
                    <button type="button" onClick={dismissMessage} aria-label="Dismiss message">
                        <X size={17} />
                    </button>
                </div>
            )}

            <div className="mb-6 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {filters.map(([value, label]) => (
                            <button
                                type="button"
                                key={value}
                                onClick={() => setFilter(value)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${filter === value
                                    ? "bg-yellow-400 text-slate-900"
                                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full xl:max-w-sm">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search eSSL ID or employee..."
                            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-yellow-400"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
