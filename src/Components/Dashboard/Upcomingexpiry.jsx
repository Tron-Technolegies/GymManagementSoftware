import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { sendWhatsApp } from "../../utils/sendWhatsApp";

const Upcomingexpir = ({ expiredMembers }) => {
    return (
        <div className="lg:col-span-2 min-w-0">
            <div className="p-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-800">Upcoming Expiries</h2>
            </div>
            <div className="overflow-x-auto bg-white border rounded-xl border-slate-200 shadow-md shadow-slate-100/60">
                <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-4 text-xs font-semibold text-slate-500">
                                MEMBER
                            </th>
                            <th className="p-4 text-xs font-semibold text-slate-500">
                                PHONE
                            </th>
                            <th className="p-4 text-xs font-semibold text-slate-500">
                                EXPIRY DATE
                            </th>
                            <th className="p-4 text-xs font-semibold text-slate-500">
                                DUE AMOUNT
                            </th>
                            <th className="p-4 text-xs font-semibold text-slate-500 text-right">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {(expiredMembers || []).map((m, i) => (
                            <tr
                                key={i}
                                className="border-t border-slate-100 hover:bg-slate-50 transition">
                                <td className="p-4 text-sm font-semibold text-slate-800 whitespace-nowrap">{m.name}</td>
                                <td className="p-4 text-sm text-slate-600">{m.phone}</td>
                                <td className="p-4 text-sm text-slate-600">{m.expiry_date}</td>
                                <td className="p-4 text-sm text-slate-600">₹{m.due_amount}</td>
                                <td className="p-4 text-sm text-right whitespace-nowrap">
                                    <div className="inline-flex items-center">
                                        <button
                                            className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white text-[10px] rounded font-bold flex items-center gap-1"
                                            onClick={() =>
                                                sendWhatsApp(m)}>
                                            <FaWhatsapp size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Upcomingexpiry;