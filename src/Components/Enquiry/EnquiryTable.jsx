
import React from "react";
import { Trash2 } from "lucide-react";

const EnquiryTable = ({
    enquiries = [],
    loading,
    canDelete,
    onDelete,
    userRole,
}) => {
    const showBranch = userRole === "TENANT_ADMIN";

    const canManageActions = [
        "TENANT_ADMIN",
        "BRANCH_ADMIN",
    ].includes(userRole);

    const columnCount =
        4 + (showBranch ? 1 : 0) + (canManageActions ? 1 : 0);

    return (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-x-auto">
            <table className="w-full min-w-[800px]">
                <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            NAME
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            PHONE
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            PLAN
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            DATE
                        </th>

                        {showBranch && (
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                                BRANCH
                            </th>
                        )}

                        {canManageActions && (
                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-600">
                                ACTION
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td
                                colSpan={columnCount}
                                className="px-6 py-4 text-center"
                            >
                                Loading...
                            </td>
                        </tr>
                    ) : enquiries.length > 0 ? (
                        enquiries.map((enquiry) => (
                            <tr
                                key={enquiry.id}
                                className="hover:bg-slate-50 border-b border-slate-100"
                            >
                                <td className="px-6 py-4">
                                    {enquiry.name}
                                </td>

                                <td className="px-6 py-4">
                                    {enquiry.phone}
                                </td>

                                <td className="px-6 py-4">
                                    {enquiry.plan_name ||
                                        enquiry.plan ||
                                        "-"}
                                </td>

                                <td className="px-6 py-4">
                                    {enquiry.date || "-"}
                                </td>

                                {showBranch && (
                                    <td className="px-6 py-4">
                                        {enquiry.branch_name ||
                                            enquiry.branch?.name ||
                                            "-"}
                                    </td>
                                )}

                                {canManageActions && (
                                    <td className="px-6 py-4 text-center">
                                        {canDelete && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onDelete(enquiry)
                                                }
                                                className="p-2 rounded-md hover:bg-red-100"
                                                title="Delete enquiry"
                                            >
                                                <Trash2
                                                    size={16}
                                                    className="text-red-600"
                                                />
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columnCount}
                                className="px-6 py-4 text-center text-slate-500"
                            >
                                No enquiries found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EnquiryTable;
