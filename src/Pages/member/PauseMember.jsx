
import React, { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { useMemberPause } from "../../hooks/usememberpause";

const PauseMember = ({ member, onClose, onSuccess }) => {
    const { handlePause, loading } = useMemberPause();

    const [freezeDate, setFreezeDate] = useState("");
    const [alert, setAlert] = useState("");
    const [alertType, setAlertType] = useState("success");

    const showAlert = (message, type = "success") => {
        setAlertType(type);
        setAlert(message);
        setTimeout(() => setAlert(""), 3000);
    };

    const handlePauseClick = async () => {
        if (!freezeDate) {
            showAlert("Please select a freeze date", "error");
            return;
        }

        try {
            const data = await handlePause(member.id, freezeDate);

            if (data?.success === false) {
                showAlert(
                    data.error || data.message || "Failed to pause member",
                    "error"
                );
                return;
            }

            onSuccess?.(data);

            showAlert(
                data?.message || "Member paused successfully",
                "success"
            );

            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Failed to pause member";

            showAlert(message, "error");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            {alert && (
                <div className="fixed top-5 right-5 z-[60]">
                    <div
                        className={`${alertType === "error"
                            ? "bg-red-500"
                            : "bg-green-500"
                            } text-white px-5 py-3 rounded-lg shadow-lg max-w-sm`}
                    >
                        {alert}
                    </div>
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-xl w-96">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                        <TriangleAlert size={24} className="text-yellow-600" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Pause Membership
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Select the date this membership should be frozen.
                        </p>
                    </div>
                </div>

                <div className="mt-4 mb-3 p-3 bg-yellow-500 rounded-lg">
                    <p className="text-sm text-white">
                        Total pause allowance:
                        <span className="font-semibold text-white ml-2">
                            {member?.max_pause_days ?? "—"} days
                        </span>
                    </p>

                    <p className="text-sm text-white mt-2">
                        Days remaining:
                        <span className="font-semibold text-white ml-2">
                            {member?.pause_days_remaining ??
                                member?.remaining_pause_days ??
                                "—"}
                        </span>
                    </p>

                    <p className="text-sm text-white mt-2">
                        Requests remaining:
                        <span className="font-semibold text-white ml-2">
                            {member?.remaining_pause_requests ?? "—"}
                        </span>
                    </p>
                </div>

                <div className="mt-5">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        FREEZE FROM
                    </label>

                    <input
                        type="date"
                        value={freezeDate}
                        max={new Date().toLocaleDateString("en-CA")}
                        min={member?.membership_start_date || undefined}
                        onChange={(e) => setFreezeDate(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2"
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handlePauseClick}
                        disabled={loading}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Pausing..." : "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PauseMember;