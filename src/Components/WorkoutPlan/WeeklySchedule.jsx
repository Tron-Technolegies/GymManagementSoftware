import React from "react";
import { Dumbbell } from "lucide-react";

const getImageUrl = (image) => {
    if (!image || typeof image !== "string") {
        return null;
    }

    const url = image.trim();

    if (
        url.startsWith("https://") ||
        url.startsWith("http://")
    ) {
        return url;
    }

    return null;
};

const WeeklySchedule = ({ workout }) => {

    console.log(
        "WeeklySchedule workout:",
        workout
    );

    const days = workout?.days || [];

    // =====================================================
    // NO DAYS
    // =====================================================

    if (!days.length) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-6">

                <div className="flex items-center gap-2">

                    <Dumbbell
                        size={22}
                        className="text-yellow-600"
                    />

                    <p className="text-slate-500">
                        No weekly workout schedule available.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

            {/* =================================================
                TITLE
            ================================================= */}

            <div className="flex items-center gap-2 mb-6">

                <Dumbbell
                    size={22}
                    className="text-yellow-600"
                />

                <h2 className="text-xl font-bold text-slate-900">
                    Weekly Workout Schedule
                </h2>

            </div>

            {/* =================================================
                DAYS
            ================================================= */}

            <div className="space-y-8">

                {days.map((day) => (

                    <div
                        key={day.day}
                        className="border border-slate-200 rounded-xl overflow-hidden"
                    >

                        {/* =================================================
                            DAY HEADER
                        ================================================= */}

                        <div className="bg-violet-600 text-white px-5 py-4">

                            <h3 className="text-lg font-bold">
                                Day {day.day}
                            </h3>

                            <p className="text-violet-200 mt-1">
                                {day.body_part}
                            </p>

                        </div>

                        {/* =================================================
                            EXERCISES
                        ================================================= */}

                        <div className="p-5">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {day.exercises?.length > 0 ? (

                                    day.exercises.map(
                                        (exercise, index) => {

                                            const imageUrl =
                                                getImageUrl(
                                                    exercise.image
                                                );

                                            console.log(
                                                "Exercise:",
                                                exercise.name,
                                                "Image:",
                                                imageUrl
                                            );

                                            return (

                                                <div
                                                    key={
                                                        exercise.exercise_id ||
                                                        `${day.day}-${index}`
                                                    }
                                                    className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                                                >

                                                    {/* =================================================
                                                        IMAGE
                                                    ================================================= */}

                                                    <div className="w-full h-64 bg-slate-100 flex items-center justify-center overflow-hidden">

                                                        {imageUrl ? (

                                                            <img
                                                                src={imageUrl}
                                                                alt={
                                                                    exercise.name
                                                                }
                                                                className="w-full h-full object-contain"
                                                                loading="lazy"
                                                                onError={(e) => {

                                                                    console.error(
                                                                        "IMAGE LOAD ERROR:",
                                                                        imageUrl
                                                                    );

                                                                    e.currentTarget.style.display =
                                                                        "none";

                                                                    const parent =
                                                                        e.currentTarget.parentElement;

                                                                    if (parent) {

                                                                        parent.innerHTML = `
                                                                            <div class="text-center">
                                                                                <p class="text-sm text-slate-400">
                                                                                    Image unavailable
                                                                                </p>
                                                                            </div>
                                                                        `;
                                                                    }

                                                                }}
                                                            />

                                                        ) : (

                                                            <div className="text-center">

                                                                <Dumbbell
                                                                    size={40}
                                                                    className="text-slate-300 mx-auto"
                                                                />

                                                                <p className="text-sm text-slate-400 mt-2">
                                                                    No image available
                                                                </p>

                                                            </div>

                                                        )}

                                                    </div>

                                                    {/* =================================================
                                                        DETAILS
                                                    ================================================= */}

                                                    <div className="p-5">

                                                        {/* =================================================
                                                            EXERCISE NAME
                                                        ================================================= */}

                                                        <div className="flex items-center gap-2 mb-3">

                                                            <Dumbbell
                                                                size={18}
                                                                className="text-yellow-600 flex-shrink-0"
                                                            />

                                                            <h4 className="font-semibold text-slate-800 text-lg">
                                                                {exercise.name}
                                                            </h4>

                                                        </div>

                                                        {/* =================================================
                                                            HOW TO PERFORM
                                                        ================================================= */}

                                                        {exercise.description && (

                                                            <div className="mb-5 bg-slate-50 border border-slate-200 rounded-lg p-4">

                                                                {/* <h5 className="font-semibold text-slate-700 mb-2">
                                                                    How to Perform
                                                                </h5> */}

                                                                <p className="text-sm text-slate-600 leading-6">
                                                                    {exercise.description}
                                                                </p>

                                                            </div>

                                                        )}

                                                        {/* =================================================
                                                            SETS / REPS / REST
                                                        ================================================= */}

                                                        <div className="flex flex-wrap gap-2">

                                                            <span className="px-3 py-1 bg-violet-50 text-violet-700 rounded-lg text-sm">
                                                                {exercise.sets} Sets
                                                            </span>

                                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                                                                {exercise.reps} Reps
                                                            </span>

                                                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm">
                                                                Rest:{" "}
                                                                {exercise.rest}
                                                            </span>

                                                        </div>

                                                        {/* =================================================
                                                            EQUIPMENT
                                                        ================================================= */}

                                                        <div className="mt-4">

                                                            <p className="text-xs text-slate-400 uppercase">
                                                                Equipment
                                                            </p>

                                                            <p className="text-sm font-medium text-slate-700 mt-1">
                                                                {exercise.equipment ||
                                                                    "Bodyweight"}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>

                                            );

                                        }
                                    )

                                ) : (

                                    <p className="text-slate-500">
                                        No exercises available.
                                    </p>

                                )}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default WeeklySchedule;