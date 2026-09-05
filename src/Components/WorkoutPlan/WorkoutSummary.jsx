import React from "react";

import {
    Activity,
    CalendarDays,
    Scale,
} from "lucide-react";


const Card = ({
    icon,
    title,
    value,
    color,
}) => {

    return (

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <div className="flex items-center gap-3">

                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
                >
                    {icon}
                </div>

                <div>

                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                        {value}
                    </h3>

                </div>

            </div>

        </div>

    );

};


const WorkoutSummary = ({
    workout,
    member,
}) => {

    if (!workout) {
        return null;
    }

    const bmi =
        member?.bmi ??
        "N/A";

    const daysCount =
        workout?.length || 0;

    const workoutsCount =
        workout?.reduce(
            (total, day) =>
                total +
                (day.workouts?.length || 0),
            0
        ) || 0;


    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {/* BMI */}

            <Card
                title="BMI"
                value={bmi}
                color="bg-yellow-100"
                icon={
                    <Scale
                        size={24}
                        className="text-yellow-600"
                    />
                }
            />


            {/* WORKOUT DAYS */}

            <Card
                title="Workout Days"
                value={`${daysCount} Days`}
                color="bg-purple-100"
                icon={
                    <CalendarDays
                        size={24}
                        className="text-purple-600"
                    />
                }
            />


            {/* TOTAL WORKOUTS */}

            <Card
                title="Workouts"
                value={workoutsCount}
                color="bg-green-100"
                icon={
                    <Activity
                        size={24}
                        className="text-green-600"
                    />
                }
            />

        </div>

    );

};


export default WorkoutSummary;