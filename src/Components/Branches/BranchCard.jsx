
import React from "react";
import {
    Building2,
    Edit2,
    Eye,
    MapPin,
    Phone,
    Users,
} from "lucide-react";

import DeleteBranch from "./DeleteBranch";

const BranchCard = ({
    branch,
    userRole,
    onClick,
    onEdit,
    onDelete,
}) => {
    const canView = userRole === "TENANT_ADMIN";

    const canEdit = [
        "TENANT_ADMIN",
        "BRANCH_ADMIN",
    ].includes(userRole);

    const canDelete = userRole === "TENANT_ADMIN";

    return (
        <div
            onClick={() => onClick?.(branch)}
            className={`relative flex h-full w-full min-w-0 flex-col
                overflow-visible rounded-2xl border border-slate-200
                border-b-4 border-b-yellow-400 bg-white p-4
                shadow-sm transition-all duration-200 hover:shadow-md
                ${onClick ? "cursor-pointer" : "cursor-default"}`}
        >
            {/* Header */}
            <div className="flex min-h-[80px] items-center justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center
                        justify-center rounded-2xl bg-amber-50">
                        <Building2
                            size={34}
                            strokeWidth={2.2}
                            className="text-yellow-600"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="break-words text-lg font-bold
                            leading-6 text-slate-900">
                            {branch.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Branch ID: {branch.id}
                        </p>
                    </div>
                </div>

                {/* Status */}
                <span className="inline-flex shrink-0 items-center gap-2
                    rounded-full bg-green-50 px-3 py-2 text-xs
                    font-semibold text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-600" />
                    {branch.status || "Active"}
                </span>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-slate-200" />

            {/* Branch Details */}
            <div className="min-h-[76px] space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                    <MapPin
                        size={18}
                        className="mt-0.5 shrink-0 text-slate-400"
                    />
                    <span className="break-words">
                        {branch.location || "Location not available"}
                    </span>
                </div>

                <div className="flex items-start gap-3">
                    <Phone
                        size={18}
                        className="mt-0.5 shrink-0 text-slate-400"
                    />
                    <span className="break-words">
                        {branch.phone || "Phone not available"}
                    </span>
                </div>
            </div>

            {/* Member Capacity */}
            <div className="flex min-h-[88px] items-center gap-4
                rounded-2xl bg-amber-50 px-5 py-3">
                <Users
                    size={30}
                    strokeWidth={2.2}
                    className="shrink-0 text-yellow-600"
                />

                <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-500">
                        Member Capacity
                    </p>

                    <div className="mt-1 flex flex-wrap items-baseline gap-2">
                        <span className="text-2xl font-bold leading-8 text-slate-900">
                            {branch.capacity ?? 0}
                        </span>

                        <span className="text-sm text-slate-500">
                            Members
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-auto flex items-center justify-end gap-2 pt-3">
                {/* View Icon - Tenant Admin Only */}
                {canView && (
                    <button
                        type="button"
                        aria-label="View branch"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick?.(branch);
                        }}
                        disabled={!onClick}
                        className="flex h-8 w-8 items-center justify-center
                            rounded-lg bg-white text-yellow-500 transition
                            hover:bg-slate-50
                            disabled:cursor-default disabled:opacity-60"
                    >
                        <Eye size={16} />
                    </button>
                )}

                {/* Edit Icon */}
                {canEdit && (
                    <button
                        type="button"
                        aria-label="Edit branch"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(branch);
                        }}
                        className="flex h-8 w-8 items-center justify-center
                            rounded-lg text-yellow-500 transition
                            hover:border-yellow-300 hover:bg-amber-50"
                    >
                        <Edit2 size={16} />
                    </button>
                )}

                {/* Delete Icon - Tenant Admin Only */}
                {canDelete && (
                    <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DeleteBranch
                            branch={branch}
                            onDelete={onDelete}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BranchCard;
