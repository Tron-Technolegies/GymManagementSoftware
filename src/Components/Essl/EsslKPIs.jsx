
import React from "react";
import { Fingerprint, UserRoundCheck, UserRoundX } from "lucide-react";

const cards = [
    {
        key: "total",
        label: "TOTAL EMPLOYEES",
        icon: Fingerprint,
        color: "text-amber-500",
    },
    {
        key: "linked",
        label: "LINKED EMPLOYEES",
        icon: UserRoundCheck,
        color: "text-green-500",
    },
    {
        key: "unlinked",
        label: "UNLINKED EMPLOYEES",
        icon: UserRoundX,
        color: "text-red-500",
    },
];

export default function EsslKPIs({ counts, loading }) {
    return (
        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map(({ key, label, icon: Icon, color }) => (
                <div
                    key={key}
                    className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">{label}</p>
                        <Icon size={23} className={color} />
                    </div>

                    <p className="mt-4 text-3xl font-bold text-slate-900">
                        {loading ? "—" : counts[key]}
                    </p>
                </div>
            ))}
        </div>
    );
}
