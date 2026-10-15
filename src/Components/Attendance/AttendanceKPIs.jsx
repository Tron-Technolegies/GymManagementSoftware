
import {
    ClipboardCheck,
    Users,
    Link2,
    Unlink,
} from "lucide-react";

const cards = [
    {
        key: "totalPunches",
        label: "Total Punches",
        icon: ClipboardCheck,
    },
    {
        key: "uniqueEmployees",
        label: "Unique Employees",
        icon: Users,
    },
    {
        key: "linkedPunches",
        label: "Linked Punches",
        icon: Link2,
    },
    {
        key: "unlinkedPunches",
        label: "Unlinked Punches",
        icon: Unlink,
    },
];

export default function AttendanceKPIs({ kpis }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map(({ key, label, icon: Icon }) => (
                <div
                    key={key}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">
                            {label}
                        </p>

                        <div className="rounded-lg bg-[#FED505]/20 p-2">
                            <Icon
                                size={20}
                                className="text-gray-800"
                            />
                        </div>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-gray-900">
                        {kpis[key] ?? 0}
                    </p>
                </div>
            ))}
        </div>
    );
}
