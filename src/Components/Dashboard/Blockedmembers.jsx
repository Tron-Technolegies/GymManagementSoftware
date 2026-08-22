import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { sendPlanExpiryWhatsApp } from "../../utils/sendWhatsApp";

const Blockedmembers = ({
    blockedMembers,
    plans,
    showRenewForm,
    showRenewConfirm,
    selectedMember,
    renewLoading,
    renewForm,
    openRenewModal,
    closeRenewModal,
    handlePlanChange,
    handleRenewSubmit,
    confirmRenewMember,
    setShowRenewConfirm,
}) => {
    return (
        <>
            <div className="grid gap-6">
                <div className="w-full min-w-0">
                    <div className="p-4 border-b border-slate-100">
                        <h2 className="font-bold text-slate-800">Blocked Members</h2>
                    </div>

                    <div className="overflow-x-auto bg-white border rounded-xl border-slate-200 shadow-md shadow-slate-100/60">
                        <table className="w-full text-left min-w-[700px]">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="p-4 text-xs font-semibold text-slate-500">
                                        MEMBER
                                    </th>

                                    <th className="p-4 text-xs font-semibold text-slate-500">
                                        PHONE
                                    </th>

                                    <th className="p-4 text-xs font-semibold text-slate-500">
                                        JOIN DATE
                                    </th>

                                    <th className="p-4 text-xs font-semibold text-slate-500">
                                        EXPIRY DATE
                                    </th>

                                    <th className="p-4 text-xs font-semibold text-slate-500 text-right">
                                        ACTIONS
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {blockedMembers?.length > 0 ? (
                                    blockedMembers.map((m, i) => (
                                        <tr
                                            key={i}
                                            className="border-t border-slate-100 hover:bg-slate-50 transition"
                                        >
                                            <td className="p-4 text-sm font-semibold text-slate-800">
                                                {m.name}
                                            </td>

                                            <td className="p-4 text-sm text-slate-600">
                                                {m.phone}
                                            </td>

                                            <td className="p-4 text-sm text-slate-600">
                                                {m.join_date}
                                            </td>

                                            <td className="p-4 text-sm text-slate-600">
                                                {m.expiry_date}
                                            </td>

                                            <td className="p-4 text-sm text-right">
                                                <div className="inline-flex items-center gap-5">
                                                    <button
                                                        className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white text-[10px] rounded font-bold flex items-center gap-1"
                                                        onClick={() =>
                                                            sendPlanExpiryWhatsApp(m)
                                                        }
                                                    >
                                                        <FaWhatsapp size={18} />
                                                    </button>

                                                    <button
                                                        className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-[10px] rounded font-bold"
                                                        onClick={() =>
                                                            openRenewModal(m)
                                                        }
                                                    >
                                                        RENEW
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="p-8 text-center text-slate-500"
                                        >
                                            No blocked members found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Renew Form Modal */}
            {showRenewForm && selectedMember && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">Renew Membership</h2>

                        <div className="space-y-4">
                            <input
                                value={selectedMember?.name || ""}
                                readOnly
                                className="w-full border rounded-lg px-3 py-3 border-slate-300"
                            />

                            <select
                                value={renewForm.plan}
                                onChange={handlePlanChange}
                                className="w-full border rounded-lg px-3 py-3 border-slate-300"
                            >
                                <option value="">Select Plan</option>
                                {plans.map((plan) => (
                                    <option key={plan.id} value={plan.name}>
                                        {plan.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                value={renewForm.expiry_date}
                                readOnly
                                className="w-full border rounded-lg px-3 py-3 border-slate-300"
                                placeholder="Expiry Date"
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={closeRenewModal}
                                    className="px-4 py-2 border border-slate-300 rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleRenewSubmit}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                                >
                                    Renew
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Renew Confirmation Modal */}
            {showRenewConfirm && selectedMember && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-15">
                        <h2 className="text-xl font-bold text-slate-800 mb-3">
                            Confirm Renewal
                        </h2>

                        <p className="text-slate-600 mb-2">
                            Are you sure you want to renew membership for
                            <span className="font-semibold text-slate-900"> {selectedMember.name}</span>?
                        </p>

                        <div className="bg-slate-50 rounded-lg p-3 mb-5 text-sm text-slate-700 space-y-1">
                            <p><span className="font-medium">Plan:</span> {renewForm.plan}</p>
                            <p><span className="font-medium">New Expiry:</span> {renewForm.expiry_date}</p>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowRenewConfirm(false)}
                                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmRenewMember}
                                disabled={renewLoading}
                                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                            >
                                {renewLoading ? "Renewing..." : "Confirm Renew"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Blockedmembers;