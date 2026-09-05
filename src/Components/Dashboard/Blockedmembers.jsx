import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { sendPlanExpiryWhatsApp } from "../../utils/sendWhatsApp";


const Blockedmembers = ({
    blockedMembers = [],
    plans = [],
    showRenewForm,
    showRenewConfirm,
    selectedMember,
    renewLoading,
    renewForm = {},
    openRenewModal,
    closeRenewModal,
    handlePlanChange,
    handleRenewSubmit,
    confirmRenewMember,
    setShowRenewConfirm,
}) => {

    // Get selected plan object from the plan ID
    const selectedPlan = plans.find(
        (plan) =>
            String(plan.id) === String(renewForm?.plan)
    );

    return (
        <>
            {/* =====================================================
                BLOCKED MEMBERS TABLE
            ===================================================== */}

            <div className="grid gap-6">

                <div className="w-full min-w-0">

                    <div className="p-4 border-b border-slate-100">
                        <h2 className="font-bold text-slate-800">
                            Blocked Members
                        </h2>
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

                                {blockedMembers.length > 0 ? (

                                    blockedMembers.map((m, i) => (

                                        <tr
                                            key={m.id || i}
                                            className="border-t border-slate-100 hover:bg-slate-50 transition"
                                        >

                                            {/* MEMBER */}

                                            <td className="p-4 text-sm font-semibold text-slate-800">
                                                {m.name || "N/A"}
                                            </td>


                                            {/* PHONE */}

                                            <td className="p-4 text-sm text-slate-600">
                                                {m.phone || "N/A"}
                                            </td>


                                            {/* JOIN DATE */}

                                            <td className="p-4 text-sm text-slate-600">
                                                {m.join_date || "N/A"}
                                            </td>


                                            {/* EXPIRY DATE */}

                                            <td className="p-4 text-sm text-slate-600">
                                                {m.expiry_date || "N/A"}
                                            </td>


                                            {/* ACTIONS */}

                                            <td className="p-4 text-sm text-right">

                                                <div className="inline-flex items-center gap-5">

                                                    {/* WHATSAPP */}

                                                    <button
                                                        type="button"
                                                        className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white text-[10px] rounded font-bold flex items-center gap-1"
                                                        onClick={() =>
                                                            sendPlanExpiryWhatsApp(m)
                                                        }
                                                    >
                                                        <FaWhatsapp size={18} />
                                                    </button>


                                                    {/* RENEW */}

                                                    <button
                                                        type="button"
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


            {/* =====================================================
                RENEW MEMBERSHIP MODAL
            ===================================================== */}

            {showRenewForm && selectedMember && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">

                        {/* TITLE */}

                        <h2 className="text-lg font-bold text-slate-800 mb-5">
                            Renew Membership
                        </h2>


                        <div className="space-y-4">

                            {/* MEMBER NAME */}

                            <div>

                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Member
                                </label>

                                <input
                                    value={selectedMember?.name || ""}
                                    readOnly
                                    className="w-full border rounded-lg px-3 py-3 border-slate-300 bg-slate-50"
                                />

                            </div>


                            {/* PLAN */}

                            <div>

                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Select Plan
                                </label>

                                <select
                                    value={renewForm?.plan || ""}
                                    onChange={handlePlanChange}
                                    className="w-full border rounded-lg px-3 py-3 border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >

                                    <option value="">
                                        Select Plan
                                    </option>

                                    {plans.map((plan) => (

                                        <option
                                            key={plan.id}
                                            value={plan.id}
                                        >
                                            {plan.name}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            {/* PLAN DETAILS */}

                            {selectedPlan && (

                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">

                                    <div className="flex justify-between text-sm mb-1">

                                        <span className="text-slate-500">
                                            Plan
                                        </span>

                                        <span className="font-semibold text-slate-800">
                                            {selectedPlan.name}
                                        </span>

                                    </div>


                                    <div className="flex justify-between text-sm mb-1">

                                        <span className="text-slate-500">
                                            Duration
                                        </span>

                                        <span className="font-semibold text-slate-800">
                                            {selectedPlan.duration} days
                                        </span>

                                    </div>


                                    <div className="flex justify-between text-sm">

                                        <span className="text-slate-500">
                                            Price
                                        </span>

                                        <span className="font-semibold text-slate-800">
                                            ₹{selectedPlan.price}
                                        </span>

                                    </div>

                                </div>

                            )}


                            {/* NEW EXPIRY */}

                            <div>

                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    New Expiry Date
                                </label>

                                <input
                                    value={renewForm?.expiry_date || ""}
                                    readOnly
                                    className="w-full border rounded-lg px-3 py-3 border-slate-300 bg-slate-50"
                                    placeholder="Expiry Date"
                                />

                            </div>


                            {/* BUTTONS */}

                            <div className="flex justify-end gap-2 pt-2">

                                <button
                                    type="button"
                                    onClick={closeRenewModal}
                                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="button"
                                    onClick={handleRenewSubmit}
                                    disabled={
                                        !renewForm?.plan ||
                                        !renewForm?.expiry_date
                                    }
                                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Renew
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}


            {/* =====================================================
                CONFIRMATION MODAL
            ===================================================== */}

            {showRenewConfirm && selectedMember && (

                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">

                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

                        {/* TITLE */}

                        <h2 className="text-xl font-bold text-slate-800 mb-3">
                            Confirm Renewal
                        </h2>


                        {/* MESSAGE */}

                        <p className="text-slate-600 mb-4">

                            Are you sure you want to renew membership for{" "}

                            <span className="font-semibold text-slate-900">
                                {selectedMember.name}
                            </span>

                            ?

                        </p>


                        {/* RENEWAL DETAILS */}

                        <div className="bg-slate-50 rounded-lg p-4 mb-5 text-sm text-slate-700 space-y-2">

                            {/* PLAN */}

                            <div className="flex justify-between">

                                <span className="font-medium">
                                    Plan
                                </span>

                                <span className="font-semibold text-slate-900">

                                    {selectedPlan?.name || "Not selected"}

                                </span>

                            </div>


                            {/* DURATION */}

                            {selectedPlan && (

                                <div className="flex justify-between">

                                    <span className="font-medium">
                                        Duration
                                    </span>

                                    <span>
                                        {selectedPlan.duration} days
                                    </span>

                                </div>

                            )}


                            {/* PRICE */}

                            {selectedPlan && (

                                <div className="flex justify-between">

                                    <span className="font-medium">
                                        Price
                                    </span>

                                    <span>
                                        ₹{selectedPlan.price}
                                    </span>

                                </div>

                            )}


                            {/* NEW EXPIRY */}

                            <div className="flex justify-between">

                                <span className="font-medium">
                                    New Expiry
                                </span>

                                <span className="font-semibold text-green-600">
                                    {renewForm?.expiry_date || "N/A"}
                                </span>

                            </div>

                        </div>


                        {/* BUTTONS */}

                        <div className="flex justify-end gap-3">

                            <button
                                type="button"
                                onClick={() =>
                                    setShowRenewConfirm(false)
                                }
                                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                onClick={confirmRenewMember}
                                disabled={renewLoading}
                                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                            >

                                {renewLoading
                                    ? "Renewing..."
                                    : "Confirm Renew"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
};

export default Blockedmembers;