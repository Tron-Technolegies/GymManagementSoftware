import React, { useRef } from "react";

import {
    X,
    ArrowDownToLine,
    Share2,
} from "lucide-react";

import useDownloadPDF from "../hooks/useDownloadPDF";

import WorkoutSummary from "../Components/WorkoutPlan/WorkoutSummary";
import WeeklySchedule from "../Components/WorkoutPlan/WeeklySchedule";

import {
    sendWorkoutPlanWhatsApp
} from "../utils/SendWorkoutPlan";


const WorkoutPlan = ({
    member,
    workout,
    workoutMember,
    loading,
    error,
    onClose,
}) => {

    const pdfRef = useRef();


    const {
        downloadPDF
    } = useDownloadPDF();


    const displayMember =
        workoutMember ||
        member ||
        {};


    console.log(
        "WorkoutPlan workout:",
        workout
    );

    console.log(
        "WorkoutPlan member:",
        member
    );

    console.log(
        "WorkoutPlan workoutMember:",
        workoutMember
    );


    return (

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

            <div className="flex justify-between items-center mb-6">

                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        AI Workout Plan
                    </h2>
                    <p className="text-slate-500 mt-1">

                        Personalized workout program for{" "}

                        {displayMember?.name ||
                            `Member ${displayMember?.id || ""}`}

                    </p>

                </div>


                {!loading && workout && (

                    <div className="flex items-center gap-3">


                        {/* ==================================
                            DOWNLOAD PDF
                        ================================== */}

                        <button
                            onClick={() =>
                                downloadPDF(
                                    pdfRef,
                                    {
                                        memberName:
                                            displayMember?.name ||
                                            "Member",

                                        reportTitle:
                                            "AI Workout Plan Report",
                                    }
                                )
                            }
                            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2"
                        >

                            <ArrowDownToLine
                                size={18}
                            />

                            Download

                        </button>


                        {/* ==================================
                            WHATSAPP
                        ================================== */}

                        <button
                            onClick={() =>
                                sendWorkoutPlanWhatsApp(
                                    displayMember
                                )
                            }
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-2"
                        >

                            <Share2
                                size={18}
                            />

                            Share

                        </button>

                    </div>

                )}


                {/* ==========================================
                    CLOSE
                ========================================== */}

                <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-slate-100"
                >

                    <X size={20} />

                </button>

            </div>


            {/* ==========================================
                LOADING
            ========================================== */}

            {loading && (

                <div className="py-24 text-center">

                    <div className="animate-spin w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full mx-auto mb-5" />

                    <h2 className="text-xl font-semibold text-slate-700">

                        Generating AI Workout Plan...

                    </h2>

                    <p className="text-slate-500 mt-3">

                        Creating a personalized weekly training schedule.

                    </p>

                </div>

            )}


            {/* ==========================================
                ERROR
            ========================================== */}

            {!loading && error && (

                <div className="bg-red-50 border border-red-200 rounded-xl p-5">

                    <h3 className="font-semibold text-red-700">

                        Workout Generation Failed

                    </h3>

                    <p className="text-red-600 mt-2">
                        {error}
                    </p>

                </div>

            )}


            {/* ==========================================
                NO WORKOUT
            ========================================== */}

            {!loading &&
                !error &&
                !workout && (

                    <div className="py-24 text-center text-slate-500">

                        No workout plan available.

                    </div>

                )}


            {/* ==========================================
                WORKOUT PLAN
            ========================================== */}

            {!loading && workout && (

                <div
                    ref={pdfRef}
                    className="space-y-8"
                >

                    <WorkoutSummary
                        workout={workout}
                        member={displayMember}
                    />


                    <WeeklySchedule
                        workout={workout}
                    />

                </div>

            )}

        </div>
    );
};


export default WorkoutPlan;