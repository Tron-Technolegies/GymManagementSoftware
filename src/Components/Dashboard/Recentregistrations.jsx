import React from "react";

const Recentregistrations = ({ registrations }) => {
    return (
        <div className="lg:col-span-2 min-w-0">
            <div className="p-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-800">Recent Registrations</h2>
            </div>

            <div className="overflow-x-auto bg-white border rounded-xl border-slate-200 shadow-md shadow-slate-100/60">
                <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-4 text-xs font-semibold text-slate-500">MEMBER</th>
                            <th className="p-4 text-xs font-semibold text-slate-500">PHONE</th>
                            <th className="p-4 text-xs font-semibold text-slate-500">EMAIL</th>
                            <th className="p-4 text-xs font-semibold text-slate-500">PLAN</th>
                            <th className="p-4 text-xs font-semibold text-slate-500 text-right">JOIN DATE</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(registrations || []).map((m, i) => (
                            <tr key={i} className="border-t border-slate-100 hover:bg-slate-50 transition">
                                <td className="p-4 text-sm font-semibold text-slate-800 whitespace-nowrap">{m.name}</td>
                                <td className="p-4 text-sm text-slate-600">{m.phone}</td>
                                <td className="p-4 text-sm text-slate-600">{m.email}</td>
                                <td className="p-4 text-sm text-slate-600">{m.plan}</td>
                                <td className="p-4 text-sm text-right text-slate-500">{m.join_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Recentregistrations;