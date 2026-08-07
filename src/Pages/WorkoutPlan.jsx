import React, { useRef } from "react";
import { X, ArrowDownToLine, Share2 } from "lucide-react";
import useDownloadPDF from "../hooks/useDownloadPDF";
// Components
import WorkoutHeader from "../Components/WorkoutPlan/WorkoutHeader";
import WorkoutSummary from "../Components/WorkoutPlan/WorkoutSummary";
import WeeklySchedule from "../Components/WorkoutPlan/WeeklySchedule";
// import WarmupCard from "../Components/WorkoutPlan/WarmupCard";
// import CooldownCard from "../Components/WorkoutPlan/CooldownCard";
// import WorkoutTips from "../Components/WorkoutPlan/WorkoutTips";
// import ProgressionCard from "../Components/WorkoutPlan/ProgressionCard";

const WorkoutPlan = ({
    member,
    workout,
    loading,
    onClose,
}) => {
    const pdfRef = useRef();

    const {
        downloadPDF,
        sharePDFToWhatsApp,
    } = useDownloadPDF();

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        AI Workout Plan
                    </h2>
                    <p className="text-slate-500 mt-1">
                        Personalized workout program for {member?.name}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() =>
                            downloadPDF(
                                pdfRef,
                                {
                                    memberName:
                                        member?.name || "Member",
                                    reportTitle:
                                        "AI Workout Plan Report",
                                }
                            )
                        }
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                    >
                        <ArrowDownToLine size={18} />
                        Download
                    </button>
                    <button
                        onClick={() =>
                            sharePDFToWhatsApp(
                                pdfRef,
                                {
                                    memberName:
                                        member?.name || "Member",

                                    reportTitle:
                                        "AI Workout Plan Report",
                                }
                            )
                        }
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2"
                    >
                        <Share2 size={18} />

                        Share
                    </button>


                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>

                </div>

            </div>
            {
                loading && (

                    <div className="py-24 text-center">

                        <h2 className="text-xl font-semibold text-slate-700">
                            Generating AI Workout Plan...
                        </h2>

                        <p className="text-slate-500 mt-3">
                            Creating a personalized weekly training schedule.
                        </p>

                    </div>

                )
            }
            {
                !loading &&
                !workout && (

                    <div className="py-24 text-center text-slate-500">

                        No workout plan available.

                    </div>
                )
            }
            {
                !loading &&
                workout && (

                    <div
                        ref={pdfRef}
                        className="space-y-8">
                        <WorkoutHeader
                            member={member}
                            summary={workout.summary}
                        />
                        <WorkoutSummary
                            summary={workout.summary}
                        />
                        <WeeklySchedule
                            workout={workout}
                        />

                        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            <WarmupCard
                                warmup={workout.warmup}
                            />

                            <CooldownCard
                                cooldown={workout.cooldown}
                            />

                        </div> */}

                        {/* <WorkoutTips
                            tips={workout.tips}
                        />

                        <ProgressionCard
                            progression={
                                workout.progression
                            }
                        /> */}

                    </div>
                )
            }
        </div>
    );
};

export default WorkoutPlan;