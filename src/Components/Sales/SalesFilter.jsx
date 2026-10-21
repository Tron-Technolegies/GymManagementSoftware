
import React from "react";

const SalesFilter = ({
    period,
    setPeriod,
    selectedDate,
    setSelectedDate,
    user,
    branches = [],
    selectedBranch = "all",
    setSelectedBranch,
}) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-xl shadow">
            <div className="flex flex-wrap gap-2">
                {["daily", "weekly", "monthly", "yearly"].map((item) => (
                    <button
                        key={item}
                        onClick={() => setPeriod(item)}
                        className={`px-4 py-2 rounded-lg shadow ${period === item
                                ? "bg-yellow-500 text-white"
                                : "bg-white"
                            }`}
                    >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
                {user?.role === "TENANT_ADMIN" && (
                    <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="border border-slate-300 rounded-lg p-3"
                    >
                        <option value="all">All Branches</option>

                        {branches.map((branch) => (
                            <option
                                key={branch.id}
                                value={String(branch.id)}
                            >
                                {branch.name}
                            </option>
                        ))}
                    </select>
                )}

                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-slate-200 rounded-lg p-3"
                />
            </div>
        </div>
    );
};

export default SalesFilter;
