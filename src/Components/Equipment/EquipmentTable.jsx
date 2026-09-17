import React from "react";
import { Trash2, Pencil } from "lucide-react";

const EquipmentTable = ({
    equipment,
    loading,
    userRole,
    onEdit,
    onDelete,
}) => {

    const canDelete = [
        "TENANT_ADMIN",
        "BRANCH_ADMIN",
    ].includes(userRole);

    return (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-x-auto">

            <table className="w-full min-w-[600px]">

                <thead className="bg-slate-100 border-b border-slate-200">

                    <tr>

                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            EQUIPMENT
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            BRANCH
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                            ACTIONS
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {loading ? (

                        <tr>
                            <td
                                colSpan="3"
                                className="px-6 py-4 text-center"
                            >
                                Loading...
                            </td>
                        </tr>

                    ) : equipment.length > 0 ? (

                        equipment.map((item) => (

                            <tr
                                key={item.id}
                                className="hover:bg-slate-50"
                            >

                                <td className="px-6 py-4">
                                    {item.name}
                                </td>

                                <td className="px-6 py-4">
                                    {item.branch?.name || "-"}
                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-2">

                                        {/* UPDATE - ALL ROLES */}
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="p-2 rounded-md hover:bg-yellow-100"
                                        >
                                            <Pencil
                                                size={16}
                                                className="text-yellow-600"
                                            />
                                        </button>

                                        {/* DELETE - TENANT ADMIN / BRANCH ADMIN */}
                                        {canDelete && (
                                            <button
                                                onClick={() =>
                                                    onDelete(item)
                                                }
                                                className="p-2 rounded-md hover:bg-red-100"
                                            >
                                                <Trash2
                                                    size={16}
                                                    className="text-red-600"
                                                />
                                            </button>
                                        )}

                                    </div>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td
                                colSpan="3"
                                className="px-6 py-4 text-center text-slate-500"
                            >
                                No equipment found.
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
};

export default EquipmentTable;