import React from "react";
import { DollarSign, Percent, Landmark } from "lucide-react";

const Kpi = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Income */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                <div className="flex items-center gap-3">
                    <Landmark className="text-black" />
                    <p className="text-sm text-slate-500">Income Overview</p>
                </div>

                <h2 className="text-2xl font-bold mt-2">
                    <b className="text-black">₹{stats.total_income}</b>
                </h2>

                <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                        <p className="text-xs text-slate-400">Today Income</p>
                        <p className="text-xs text-black">
                            <b>₹{stats.today_income}</b>
                        </p>
                    </div>

                    <div className="flex justify-between">
                        <p className="text-xs text-slate-400">Monthly Income</p>
                        <p className="text-xs text-black">
                            <b>₹{stats.monthly_income}</b>
                        </p>
                    </div>
                </div>
            </div>

            {/* Expense */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                <div className="flex items-center gap-3">
                    <DollarSign className="text-black" />
                    <p className="text-sm text-slate-500">Expense Overview</p>
                </div>

                <h2 className="text-2xl font-bold mt-2">
                    <b className="text-black">₹{stats.total_expense}</b>
                </h2>

                <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                        <p className="text-xs text-slate-400">Today Expense</p>
                        <p className="text-xs text-black">
                            <b>₹{stats.today_expense}</b>
                        </p>
                    </div>

                    <div className="flex justify-between">
                        <p className="text-xs text-slate-400">Monthly Expense</p>
                        <p className="text-xs text-black">
                            <b>₹{stats.monthly_expense}</b>
                        </p>
                    </div>
                </div>
            </div>

            {/* Growth */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                <div className="flex items-center gap-3">
                    <Percent className="text-black" />
                    <p className="text-sm text-slate-500">Growth Overview</p>
                </div>

                <h2 className="text-2xl font-bold mt-2">
                    <b className="text-black">{stats.profit_growth}%</b>
                </h2>

                <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                        <p className="text-xs text-slate-400">Revenue growth</p>
                        <p className="text-xs text-black">
                            <b>{stats.revenue_growth}%</b>
                        </p>
                    </div>

                    <div className="flex justify-between">
                        <p className="text-xs text-slate-400">Expense growth</p>
                        <p className="text-xs text-black">
                            <b>{stats.expense_growth}%</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Kpi;