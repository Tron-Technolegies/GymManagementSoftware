import React from "react";

import {
    Trash,
    Pencil,
    CircleDollarSign,
} from "lucide-react";

const StaffTable = ({
    staffs,
    allStaffs,
    user,
    onView,
    onPayment,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-x-auto">
            <table className="w-full min-w-[1000px]">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            STAFF_ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            NAME
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            PHONE
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            ROLE
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            JOIN DATE
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            SALARY
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            PAID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            STATUS
                        </th>
                        <th className="px-6 py-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {allStaffs.length === 0 ? (
                        <tr>
                            <td
                                colSpan="8"
                                className="text-center py-10 text-slate-500">
                                Loading staffs...
                            </td>
                        </tr>
                    ) : staffs.length === 0 ? (
                        <tr>
                            <td
                                colSpan="8"
                                className="text-center py-10 text-slate-500">
                                No staffs found
                            </td>
                        </tr>
                    ) : (
                        staffs.map((staff) => (
                            <tr
                                key={staff.id}
                                className="hover:bg-slate-50 transition cursor-pointer"
                                onClick={() =>
                                    onView(staff)
                                }>
                                <td className="px-6 py-4 text-sm font-medium">
                                    {staff.id}
                                </td>

                                <td className="px-6 py-4">
                                    <p className="font-semibold text-slate-800">
                                        {staff.name}
                                    </p>
                                </td>

                                <td className="px-6 py-4 text-sm">
                                    {staff.phone}
                                </td>

                                <td className="px-6 py-4 text-sm">
                                    {staff.role}
                                </td>

                                <td className="px-6 py-4 text-sm">
                                    {staff.joining_date}
                                </td>

                                <td className="px-6 py-4 text-sm">
                                    {staff.salary}
                                </td>

                                <td className="px-6 py-4 text-sm">
                                    {staff.paid_amount}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${staff.status?.toLowerCase() === "active"
                                            ? "bg-green-100 text-green-700"
                                            : staff.status?.toLowerCase() === "blocked"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-slate-100 text-slate-600"
                                            }`}>
                                        {staff.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button
                                            className="p-2 rounded-md hover:bg-green-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onPayment(staff);
                                            }}>
                                            <CircleDollarSign
                                                size={25}
                                                className="text-green-600" />
                                        </button>
                                        <button
                                            className="p-2 rounded-md hover:bg-yellow-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit(staff);
                                            }}>
                                            <Pencil
                                                size={18}
                                                className="text-yellow-600" />
                                        </button>
                                        {user?.is_superuser && (
                                            <button
                                                className="p-2 rounded-md hover:bg-red-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDelete(staff);
                                                }}>
                                                <Trash
                                                    size={18}
                                                    className="text-red-600" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StaffTable;