
import React from "react";
import { X, Users, Phone, Mail, BadgeCheck } from "lucide-react";

export default function BranchMembers({
    isOpen,
    onClose,
    branch,
    members,
    loading,
}) {
    if (!isOpen || !branch) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center
            bg-slate-900/40 p-3 backdrop-blur-sm sm:p-6">

            <div className="flex max-h-[90vh] w-full max-w-5xl flex-col
                overflow-hidden rounded-2xl border border-yellow-200
                bg-white shadow-2xl">

                {/* Yellow Header */}
                <div className="flex items-center justify-between gap-4
                    border-b border-yellow-200 bg-yellow-50 px-5 py-4 sm:px-6">

                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center
                            justify-center rounded-xl bg-yellow-400 text-slate-900
                            shadow-sm">
                            <Users size={23} />
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-lg font-extrabold
                                text-slate-800 sm:text-xl">
                                {branch.name}
                            </h2>
                            <p className="mt-0.5 text-sm text-slate-600">
                                Branch Members
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close members"
                        className="flex h-9 w-9 shrink-0 items-center
                            justify-center rounded-lg border border-yellow-200
                            bg-white text-slate-600 transition
                            hover:bg-yellow-100 hover:text-slate-900"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* Member Count */}
                <div className="flex items-center justify-between gap-3
                    border-b border-slate-100 px-5 py-3 sm:px-6">
                    <p className="text-sm font-semibold text-slate-600">
                        Members list
                    </p>

                    {!loading && (
                        <span className="rounded-full border border-yellow-200
                            bg-yellow-100 px-3 py-1 text-xs font-bold
                            text-yellow-800">
                            {members?.length || 0} members
                        </span>
                    )}
                </div>

                {/* Members Table */}
                <div className="min-h-0 flex-1 overflow-auto">
                    <table className="w-full min-w-[600px] text-left">
                        <thead className="sticky top-0 z-10 bg-yellow-100">
                            <tr>
                                <th className="px-5 py-4 text-xs font-bold
                                    uppercase tracking-wide text-slate-700 sm:px-6">
                                    Name
                                </th>
                                <th className="px-5 py-4 text-xs font-bold
                                    uppercase tracking-wide text-slate-700">
                                    Phone
                                </th>
                                <th className="px-5 py-4 text-xs font-bold
                                    uppercase tracking-wide text-slate-700">
                                    Plan
                                </th>
                                <th className="px-5 py-4 text-xs font-bold
                                    uppercase tracking-wide text-slate-700">
                                    Email
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="h-8 w-8 animate-spin
                                                rounded-full border-4 border-yellow-200
                                                border-t-yellow-500" />
                                            <span className="text-sm font-medium
                                                text-slate-500">
                                                Loading members...
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ) : members && members.length > 0 ? (
                                members.map((member) => (
                                    <tr
                                        key={member.id}
                                        className="transition-colors
                                            hover:bg-yellow-50/70"
                                    >
                                        <td className="px-5 py-4 sm:px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0
                                                    items-center justify-center
                                                    rounded-full bg-yellow-100
                                                    text-sm font-bold text-yellow-800">
                                                    {member.name?.charAt(0)?.toUpperCase() || "M"}
                                                </div>
                                                <span className="font-semibold
                                                    text-slate-800">
                                                    {member.name || "—"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4
                                            text-sm text-slate-600">
                                            <span className="inline-flex items-center gap-2">
                                                <Phone size={14} className="text-yellow-600" />
                                                {member.phone || "—"}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="inline-flex items-center
                                                gap-1.5 rounded-full border
                                                border-yellow-200 bg-yellow-50
                                                px-2.5 py-1 text-xs font-semibold
                                                text-yellow-800">
                                                <BadgeCheck size={14} />
                                                {member.plan?.name || "No Plan"}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            <span className="inline-flex items-center gap-2">
                                                <Mail size={14} className="shrink-0 text-yellow-600" />
                                                {member.email || "—"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-14 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="flex h-14 w-14 items-center
                                                justify-center rounded-2xl bg-yellow-100
                                                text-yellow-700">
                                                <Users size={28} />
                                            </div>
                                            <p className="font-bold text-slate-800">
                                                No members found
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                This branch has no members to display.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t border-yellow-100
                    bg-slate-50 px-5 py-3 sm:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 bg-white text-black border rounded-lg">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
