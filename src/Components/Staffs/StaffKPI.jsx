import React from "react";
import { ShieldCheck } from "lucide-react";

const StaffKPI = ({ staffs }) => {
    const activeStaffs = staffs.filter(
        (staff) => staff.status === "Active"
    ).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* ACTIVE STAFFS */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-shadow duration-300">

                <div className="flex items-center justify-between">

                    <p className="text-sm text-slate-500 tracking-wide">
                        ACTIVE STAFFS
                    </p>

                    <ShieldCheck
                        size={25}
                        className="text-green-500"
                    />

                </div>

                <h2 className="text-3xl font-bold mt-3 text-slate-900">
                    {activeStaffs}
                </h2>

            </div>

        </div>
    );
};

export default StaffKPI;