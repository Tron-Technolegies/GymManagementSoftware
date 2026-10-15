
import React from "react";
import { CirclePlay } from "lucide-react";

const Pausememberview = ({ memberData }) => {
    if (!memberData?.is_paused) return null;

    const usedDays =
        memberData?.pause_days_used ??
        memberData?.used_pause_days ??
        0;

    const remainingDays =
        memberData?.pause_days_remaining ??
        memberData?.remaining_pause_days ??
        0;

    return (
        <div className="relative overflow-hidden bg-green-600 p-5 rounded-lg">
            <CirclePlay
                size={120}
                className="absolute right-2 top-2 text-white/20 blur-[2px]"
            />

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <b className="text-white">LEAVE STATUS</b>
                </div>

                <div className="flex justify-between gap-7 text-white mb-2">
                    <p>Paused On:</p>
                    <b>{memberData?.pause_start_date || "-"}</b>
                </div>

                <div className="flex justify-between gap-7 text-white mb-2">
                    <p>Used:</p>
                    <b>{usedDays} Days</b>
                </div>

                <div className="flex justify-between gap-7 text-white mb-2">
                    <p>Remaining:</p>
                    <b>{remainingDays} Days</b>
                </div>

                <div className="flex justify-between gap-7 text-white mb-2">
                    <p>Requests Used:</p>
                    <b>{memberData?.pause_count ?? 0}</b>
                </div>

                <div className="flex justify-between gap-7 text-white">
                    <p>Requests Remaining:</p>
                    <b>{memberData?.remaining_pause_requests ?? 0}</b>
                </div>
            </div>
        </div>
    );
};

export default Pausememberview;