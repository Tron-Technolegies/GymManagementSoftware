import React from "react";
import {
    Building2,
    Edit2,
    MapPin,
    Phone,
} from "lucide-react";

import DeleteBranch from "./DeleteBranch";

const BranchCard = ({
    branch,
    isSuperuser,
    onClick,
    onEdit,
    onDelete,
}) => {
    return (
        <div
            onClick={() => onClick(branch)}
            className="bg-white p-6 rounded-xl border border-slate-300 shadow-md cursor-pointer hover:shadow-lg transition"
        >

            <div className="flex justify-between">

                <Building2 />

                <div className="flex gap-2">

                    {/* Edit */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(branch);
                        }}
                        className="p-2 rounded-md hover:bg-yellow-100"
                    >
                        <Edit2
                            size={16}
                            className="text-yellow-600"
                        />
                    </button>

                    {/* Delete */}
                    <DeleteBranch
                        branch={branch}
                        isSuperuser={isSuperuser}
                        onDelete={onDelete}
                    />

                </div>
            </div>

            <h3 className="text-xl font-bold mt-4">
                {branch.name}
            </h3>

            <div className="mt-3 text-sm text-slate-600 space-y-2">

                <div className="flex gap-2">
                    <MapPin size={14} />
                    {branch.location}
                </div>

                <div className="flex gap-2">
                    <Phone size={14} />
                    {branch.phone}
                </div>

                <div>
                    {branch.manager_name}
                </div>

                <div>
                    Capacity: {branch.capacity}
                </div>

            </div>

            <div className="mt-4 text-xs text-slate-400">
                ID: {branch.id}
            </div>

        </div>
    );
};

export default BranchCard;