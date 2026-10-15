
import React, { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { useMemberPause } from "../../hooks/usememberpause";

const ResumeMember = ({ member, onClose, onSuccess }) => {
    const { handleResume, loading } = useMemberPause();

    const [resumeDate, setResumeDate] = useState("");
    const [alert, setAlert] = useState("");
    const [alertType, setAlertType] = useState("success");

    const showAlert = (message, type = "success") => {
        setAlertType(type);
        setAlert(message);
        setTimeout(() => setAlert(""), 3000);
    };

    const handleResumeClick = async () => {
        if (!resumeDate) {
            showAlert("Please select a resume date", "error");
            return;
        }

        try {
            const data = await handleResume(member.id, resumeDate);

            if (data?.success === false) {
                showAlert(
                    data.error || data.message || "Failed to resume member",
                    "error"
                );
                return;
            }

            // Refresh the parent member profile through onSuccess.
            onSuccess?.(data);

            showAlert(
                data?.message || "Member resumed successfully",
                "success"
            );

            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Failed to resume member";

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
                    <div className="w-15 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                        <TriangleAlert size={24} className="text-yellow-600" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Resume Membership
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Select the date this member returned to the gym.
                            Expiry will be extended accordingly.
                        </p>
                    </div>
                </div>

                <div className="mt-4 mb-3 p-3 bg-slate-50 rounded-lg border">
                    <p className="text-sm text-slate-600">
                        Paused from:
                        <span className="font-semibold text-slate-900 ml-2">
                            {member?.pause_start_date || "Not available"}
                        </span>
                    </p>

                    <p className="text-sm text-slate-600 mt-2">
                        Pause days remaining:
                        <span className="font-semibold text-slate-900 ml-2">
                            {member?.pause_days_remaining ??
                                member?.remaining_pause_days ??
                                0}
                        </span>
                    </p>
                </div>

                <div className="mt-5">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        RETURNED ON
                    </label>

                    <input
                        type="date"
                        value={resumeDate}
                        max={new Date().toLocaleDateString("en-CA")}
                        min={
                            member?.pause_start_date
                                ? (() => {
                                    const date = new Date(
                                        `${member.pause_start_date}T00:00:00`
                                    );
                                    date.setDate(date.getDate() + 1);

                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, "0");
                                    const day = String(date.getDate()).padStart(2, "0");

                                    return `${year}-${month}-${day}`;
                                })()
                                : undefined
                        }
                        onChange={(e) => setResumeDate(e.target.value)}
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
                        onClick={handleResumeClick}
                        disabled={loading}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Resuming..." : "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumeMember;