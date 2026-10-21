import React, { useState } from "react";
import {
    X,
    Pause,
    CirclePlay,
    Sparkles,
    Dumbbell,
    ChevronDown
} from "lucide-react";

import PauseMember from "./PauseMember";
import ResumeMember from "./ResumeMember";
import Pausememberview from "./Pausememberview";
import DietPlan from "../Dietplan";
import WorkoutPlan from "../WorkoutPlan";

import { generateDietPlan } from "../../api/dietplan";
import { useWorkoutPlan } from "../../hooks/useWorkoutPlan";
import { useMember } from "../../hooks/Members/ViewMember";


const ViewMemberModal = ({ member, onClose }) => {

    // =========================
    // GET LATEST MEMBER DATA
    // =========================

    const {
        memberData: fetchedMember,
        loading: memberLoading,
        error: memberError,
        fetchMember,
    } = useMember(member?.id);

    // =========================
    // LOCAL MEMBER DATA
    // =========================

    const [memberData, setMemberData] = useState(member);


    React.useEffect(() => {
        if (fetchedMember) {
            setMemberData(fetchedMember);
        }
    }, [fetchedMember]);


    // =========================
    // MODAL STATES
    // =========================

    const [showPauseModal, setShowPauseModal] = useState(false);
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [showDietPlan, setShowDietPlan] = useState(false);
    const [showWorkout, setShowWorkout] = useState(false);

    // Workout dropdown
    const [showWorkoutLevels, setShowWorkoutLevels] = useState(false);
    const [experienceLevel, setExperienceLevel] = useState("beginner");

    const [dietData, setDietData] = useState(null);
    const [loadingDiet, setLoadingDiet] = useState(false);


    // =========================
    // WORKOUT HOOK
    // =========================

    const {
        workout,
        workoutMember,
        loading: loadingWorkout,
        error: workoutError,
        generate,
        reset,
    } = useWorkoutPlan();


    // =========================
    // STATUS STYLE
    // =========================

    const getStatusStyle = (status) => {

        switch (status) {

            case "Active":
                return "bg-green-100 text-green-700";

            case "Blocked":
                return "bg-red-100 text-red-700";

            case "Expired":
                return "bg-yellow-100 text-yellow-700";

            case "Paused":
                return "bg-yellow-100 text-yellow-700";

            default:
                return "bg-slate-100 text-slate-700";
        }
    };


    // =========================
    // GENERATE DIET
    // =========================

    const handleGenerateDiet = async () => {

        try {

            setShowDietPlan(true);
            setLoadingDiet(true);
            setDietData(null);

            const res = await generateDietPlan(memberData.id);

            setDietData(res.data.diet_plan);

        } catch (err) {

            console.error("Diet generation failed:", err);

            setShowDietPlan(false);

        } finally {

            setLoadingDiet(false);
        }
    };


    // =========================
    // GENERATE WORKOUT
    // =========================

    const handleGenerateWorkout = async (level) => {

        if (!memberData?.id || loadingWorkout) {
            return;
        }

        // Save selected level
        setExperienceLevel(level);

        // Close dropdown
        setShowWorkoutLevels(false);

        // Open workout screen
        setShowWorkout(true);

        // Generate workout using selected level
        await generate(
            memberData.id,
            level
        );
    };


    // =========================
    // WORKOUT DROPDOWN TOGGLE
    // =========================

    const handleWorkoutButtonClick = () => {

        if (loadingWorkout) {
            return;
        }

        setShowWorkoutLevels((prev) => !prev);
    };


    // =========================
    // LOADING
    // =========================

    if (memberLoading && !memberData) {

        return (
            <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center">

                <div className="bg-white rounded-xl p-8">
                    Loading member...
                </div>

            </div>
        );
    }


    // =========================
    // UI
    // =========================

    return (

        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden">

                {/* HEADER */}

                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">

                    <div>

                        <h2 className="text-xl font-bold text-slate-900">

                            {showWorkout
                                ? "AI Workout Plan"
                                : showDietPlan
                                    ? "AI Diet Plan"
                                    : "Member Profile"
                            }

                        </h2>

                        <p className="text-sm text-slate-500">

                            {showWorkout
                                ? "Personalized workout program"
                                : showDietPlan
                                    ? "Personalized nutrition plan"
                                    : "View member information"
                            }

                        </p>

                    </div>


                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* BODY */}

                <div className="p-6 overflow-y-auto max-h-[80vh]">

                    {showWorkout ? (

                        <WorkoutPlan
                            member={memberData}
                            workout={workout}
                            workoutMember={workoutMember}
                            loading={loadingWorkout}
                            error={workoutError}
                            onClose={() => {
                                setShowWorkout(false);
                                reset();
                            }}
                        />

                    ) : showDietPlan ? (

                        <DietPlan
                            member={memberData}
                            diet={dietData}
                            loading={loadingDiet}
                            onClose={() => setShowDietPlan(false)}
                        />

                    ) : (

                        <div className="flex flex-col lg:flex-row gap-8">


                            {/* PROFILE */}

                            <div className="w-full lg:w-64 flex flex-col items-center">

                                <div className="w-44 h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">

                                    {memberData?.photo ? (

                                        <img
                                            src={memberData.photo}
                                            alt={memberData.name}
                                            className="w-full h-full object-cover"
                                        />

                                    ) : (

                                        <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-slate-400">

                                            {memberData?.name?.charAt(0)}

                                        </div>

                                    )}

                                </div>


                                <h3 className="mt-4 text-lg font-bold">
                                    {memberData?.name}
                                </h3>


                                <span
                                    className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(memberData?.status)}`}
                                >
                                    {memberData?.status}
                                </span>


                                <div className="space-y-5 my-5 mx-auto flex flex-col items-center">

                                    {/* PAUSE */}

                                    <button
                                        onClick={() =>
                                            memberData?.is_paused
                                                ? setShowResumeModal(true)
                                                : setShowPauseModal(true)
                                        }
                                        className={`flex items-center gap-2 rounded-md px-4 py-2 text-white ${memberData?.is_paused
                                            ? "bg-green-600"
                                            : "bg-yellow-500"
                                            }`}
                                    >

                                        {memberData?.is_paused ? (
                                            <CirclePlay size={16} />
                                        ) : (
                                            <Pause size={16} />
                                        )}

                                        {memberData?.is_paused
                                            ? "Resume Membership"
                                            : "Pause Membership"
                                        }

                                    </button>


                                    {/* DIET */}

                                    <button
                                        onClick={handleGenerateDiet}
                                        disabled={loadingDiet}
                                        className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
                                    >

                                        <Sparkles size={16} />

                                        {loadingDiet
                                            ? "Generating..."
                                            : "Generate AI Diet Plan"
                                        }

                                    </button>


                                    {/* WORKOUT DROPDOWN */}

                                    <div className="relative">

                                        <button
                                            type="button"
                                            onClick={handleWorkoutButtonClick}
                                            disabled={loadingWorkout}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-2 text-white hover:bg-violet-700 disabled:opacity-60"
                                        >

                                            <Dumbbell size={18} />

                                            {loadingWorkout
                                                ? "Generating..."
                                                : "AI Workout Plan"
                                            }

                                            {!loadingWorkout && (
                                                <ChevronDown
                                                    size={17}
                                                    className={`transition-transform ${showWorkoutLevels
                                                        ? "rotate-180"
                                                        : ""
                                                        }`}
                                                />
                                            )}

                                        </button>


                                        {/* LEVEL OPTIONS */}

                                        {showWorkoutLevels && !loadingWorkout && (

                                            <div className="absolute left-0 right-0 mt-2 bg-blue-200 border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50 ">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleGenerateWorkout("beginner")
                                                    }
                                                    className="w-full px-4 py-3 text-left text-sm font-medium text-blue-700 hover:bg-slate-50"
                                                >
                                                    Beginner
                                                </button>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleGenerateWorkout("intermediate")
                                                    }
                                                    className="w-full px-4 py-3 text-left text-sm font-medium text-blue-700 hover:bg-slate-50 border-t border-slate-100"
                                                >
                                                    Intermediate
                                                </button>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleGenerateWorkout("advanced")
                                                    }
                                                    className="w-full px-4 py-4 text-left text-sm font-medium text-blue-700 hover:bg-slate-50 border-t border-slate-100"
                                                >
                                                    Advanced
                                                </button>

                                            </div>

                                        )}

                                    </div>

                                </div>

                            </div>


                            {/* DETAILS */}

                            <div className="flex-1 space-y-8">


                                {/* PERSONAL */}

                                <section>

                                    <h3 className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-4">
                                        Personal Details
                                    </h3>


                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        <DetailCard
                                            label="Member ID"
                                            value={memberData?.id}
                                        />

                                        <DetailCard
                                            label="Phone"
                                            value={memberData?.phone}
                                        />

                                        <DetailCard
                                            label="Email"
                                            value={memberData?.email}
                                        />

                                        <DetailCard
                                            label="Age"
                                            value={memberData?.age}
                                        />

                                        <DetailCard
                                            label="Gender"
                                            value={memberData?.gender}
                                        />

                                        <DetailCard
                                            label="Blood Group"
                                            value={memberData?.blood_group}
                                        />

                                        <DetailCard
                                            label="Location"
                                            value={memberData?.location}
                                        />

                                        <DetailCard
                                            label="Aadhaar"
                                            value={memberData?.adhaar_number}
                                        />

                                    </div>

                                </section>


                                {/* BODY */}

                                <section>

                                    <h3 className="text-xs font-bold text-yellow-600 tracking-widest mb-4">
                                        BODY STATISTICS
                                    </h3>


                                    <div className="grid grid-cols-3 gap-4">

                                        <DetailCard
                                            label="Height"
                                            value={`${memberData?.height || "-"} cm`}
                                        />

                                        <DetailCard
                                            label="Weight"
                                            value={`${memberData?.weight || "-"} kg`}
                                        />

                                        <DetailCard
                                            label="BMI"
                                            value={memberData?.bmi || "-"}
                                        />

                                        <DetailCard
                                            label="Goal"
                                            value={memberData?.goal || "-"}
                                        />

                                        <DetailCard
                                            label="Food Category"
                                            value={memberData?.food_category || "-"}
                                        />

                                    </div>

                                </section>


                                {/* MEMBERSHIP */}

                                <section>

                                    <h3 className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-4">
                                        Membership Details
                                    </h3>


                                    <div className="grid grid-cols-2 gap-4">

                                        <DetailCard
                                            label="Join Date"
                                            value={memberData?.join_date}
                                        />

                                        <DetailCard
                                            label="Expiry Date"
                                            value={memberData?.expiry_date}
                                        />

                                    </div>


                                    <div className="mt-5">

                                        <Pausememberview
                                            memberData={memberData}
                                        />

                                    </div>

                                </section>


                                {/* PAYMENTS */}

                                <section>

                                    <h3 className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-4">
                                        Payment Details
                                    </h3>


                                    <div className="grid grid-cols-2 gap-4">

                                        <DetailCard
                                            label="Paid Amount"
                                            value={`₹${memberData?.paid_amount}`}
                                        />


                                        <div className="bg-red-50 border border-red-100 rounded-xl p-4">

                                            <p className="text-xs font-semibold text-slate-500 uppercase">
                                                Due Amount
                                            </p>

                                            <h4 className="text-lg font-bold text-red-600 mt-1">
                                                ₹{memberData?.due_amount}
                                            </h4>

                                        </div>

                                    </div>

                                </section>

                            </div>

                        </div>
                    )}

                </div>


                {/* FOOTER */}

                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">

                    {(showDietPlan || showWorkout) ? (

                        <button
                            onClick={() => {
                                setShowDietPlan(false);
                                setShowWorkout(false);
                                setShowWorkoutLevels(false);
                            }}
                            className="px-6 py-2 border bg-white text-black rounded-lg"
                        >
                            Back to Profile
                        </button>

                    ) : (

                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-white text-black border rounded-lg">
                            Close
                        </button>

                    )}

                </div>

            </div>


            {/* PAUSE MEMBER MODAL */}

            {showPauseModal && (
                <PauseMember
                    member={memberData}
                    onClose={() => setShowPauseModal(false)}
                    onSuccess={async () => {
                        await fetchMember();
                        setShowResumeModal(false);
                    }}
                />
            )}


            {/* RESUME MEMBER MODAL */}

            {showResumeModal && (
                <ResumeMember
                    member={memberData}
                    onClose={() => setShowResumeModal(false)}
                    onSuccess={(updatedMember) => {
                        setMemberData(updatedMember);
                        setShowResumeModal(false);
                    }}
                />
            )}

        </div>
    );
};


// =========================
// DETAIL CARD
// =========================

const DetailCard = ({ label, value }) => (

    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

        <p className="text-xs font-semibold text-slate-500 uppercase">
            {label}
        </p>

        <h4 className="text-sm font-bold text-slate-900 mt-1">
            {value || "-"}
        </h4>

    </div>
);


export default ViewMemberModal;

