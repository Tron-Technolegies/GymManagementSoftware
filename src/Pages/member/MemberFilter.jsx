import React, { useState } from "react";
import {
    ShoppingCart,
    Wallet,
    IndianRupee,
    TrendingUp,
} from "lucide-react";
import useDashboard from "../../hooks/useDashboard";

const MemberFilter = () => {
    const [period, setPeriod] = useState("today");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const { stats, loading } = useDashboard(
        period,
        fromDate,
        toDate
    );

    const formatAmount = (value) => {
        return Number(value || 0).toLocaleString("en-IN");
    };

    const periodLabel = {
        today: "Today",
        monthly: "Monthly",
        yearly: "Yearly",
        custom: "Custom",
    };

    const cards = [
        {
            title: `${periodLabel[period]} Sales`,
            value: stats?.sales,
            icon: ShoppingCart,
            iconStyle: "bg-yellow-50 text-yellow-500",
        },
        {
            title: `${periodLabel[period]} Income`,
            value: stats?.income,
            icon: IndianRupee,
            iconStyle: "bg-emerald-50 text-emerald-500",
        },
        {
            title: `${periodLabel[period]} Expense`,
            value: stats?.expense,
            icon: Wallet,
            iconStyle: "bg-red-50 text-red-500",
        },
        {
            title: `${periodLabel[period]} Profit`,
            value: stats?.profit,
            icon: TrendingUp,
            iconStyle: "bg-violet-50 text-violet-500",
        },
    ];

    return (
        <div className="w-full space-y-5">

            {/* Filter */}
            <div className="flex flex-col gap-4">

                <div className="flex flex-wrap gap-2">
                    {["today", "monthly", "yearly", "custom"].map(
                        (option) => (
                            <button
                                key={option}
                                onClick={() => setPeriod(option)}
                                className={`px - 5 py - 2.5 rounded - xl text - sm font - medium transition - all ${period === option
                                        ? "bg-slate-900 text-white shadow-sm"
                                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                    } `}
                            >
                                {periodLabel[option]}
                            </button>
                        )
                    )}
                </div>

                {/* Custom Date Range */}
                {period === "custom" && (
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-slate-500">
                                From
                            </label>

                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) =>
                                    setFromDate(e.target.value)
                                }
                                className="px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-slate-400"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-slate-500">
                                To
                            </label>

                            <input
                                type="date"
                                value={toDate}
                                min={fromDate}
                                onChange={(e) =>
                                    setToDate(e.target.value)
                                }
                                className="px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-slate-400"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-5">

                                <div
                                    className={`w - 11 h - 11 rounded - xl flex items - center justify - center ${card.iconStyle} `}
                                >
                                    <Icon size={22} />
                                </div>

                                <div>
                                    <p className="text-sm text-slate-500">
                                        {card.title}
                                    </p>

                                    {loading ? (
                                        <div className="mt-2 h-8 w-32 rounded-lg bg-slate-100 animate-pulse" />
                                    ) : (
                                        <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                            ₹{formatAmount(card.value)}
                                        </h2>
                                    )}
                                </div>

                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};
