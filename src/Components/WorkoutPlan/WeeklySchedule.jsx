import React from "react";
import {
    Dumbbell,
    Clock,
    Repeat,
} from "lucide-react";


const WeeklySchedule = ({ workout }) => {

    console.log(
        "WeeklySchedule workout:",
        workout
    );

    const days = workout || [];


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

            {/* TITLE */}

            <div className="flex items-center gap-2 mb-6">

                <Dumbbell
                    size={22}
                    className="text-yellow-600"
                />

                <h2 className="text-xl font-bold text-slate-900">
                    Weekly Workout Schedule
                </h2>

            </div>


            {/* DAYS */}

            <div className="space-y-8">

                {days.map((day) => (

                    <div
                        key={day.day}
                        className="border border-slate-200 rounded-xl overflow-hidden"
                    >

                        {/* DAY HEADER */}

                        <div className="bg-violet-600 text-white px-5 py-4">

                            <h3 className="text-lg font-bold">
                                Day {day.day}
                            </h3>

                            <p className="text-violet-200 mt-1">
                                {day.body_part}
                            </p>

                        </div>


                        {/* WORKOUTS */}

                        <div className="p-5">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {day.workouts?.length > 0 ? (

                                    day.workouts.map(
                                        (workoutItem, index) => (

                                            <div
                                                key={`${day.day}-${index}`}
                                                className="border border-slate-200 rounded-xl bg-white p-5"
                                            >

                                                {/* WORKOUT NAME */}

                                                <div className="flex items-center gap-2 mb-5">

                                                    <Dumbbell
                                                        size={20}
                                                        className="text-yellow-600"
                                                    />

                                                    <h4 className="font-semibold text-slate-800 text-lg">
                                                        {workoutItem.workout_name}
                                                    </h4>

                                                </div>


                                                {/* DETAILS */}

                                                <div className="grid grid-cols-3 gap-3">

                                                    {/* SETS */}

                                                    <div className="bg-violet-50 rounded-lg p-3 text-center">

                                                        <p className="text-xs text-violet-500 uppercase">
                                                            Sets
                                                        </p>

                                                        <p className="text-lg font-bold text-violet-700 mt-1">
                                                            {workoutItem.sets}
                                                        </p>

                                                    </div>


                                                    {/* REPS */}

                                                    <div className="bg-blue-50 rounded-lg p-3 text-center">

                                                        <p className="text-xs text-blue-500 uppercase">
                                                            Reps
                                                        </p>

                                                        <p className="text-lg font-bold text-blue-700 mt-1">
                                                            {workoutItem.reps}
                                                        </p>

                                                    </div>


                                                    {/* DURATION */}

                                                    <div className="bg-green-50 rounded-lg p-3 text-center">

                                                        <p className="text-xs text-green-500 uppercase">
                                                            Minutes
                                                        </p>

                                                        <p className="text-lg font-bold text-green-700 mt-1">
                                                            {workoutItem.duration}
                                                        </p>

                                                    </div>

                                                </div>


                                                {/* BODY PART */}

                                                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">

                                                    <Repeat
                                                        size={16}
                                                    />

                                                    <span>
                                                        {day.body_part}
                                                    </span>

                                                </div>


                                                {/* DURATION */}

                                                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                                                    <Clock
                                                        size={16}
                                                    />

                                                    <span>
                                                        {workoutItem.duration} minutes
                                                    </span>

                                                </div>

                                            </div>

                                        )
                                    )

                                ) : (

                                    <p className="text-slate-500">
                                        No workouts available.
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