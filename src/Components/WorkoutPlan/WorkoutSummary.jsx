import React from "react";
import {
    Activity,
    Target,
    Flame,
    Clock,
    CalendarDays,
    Scale
} from "lucide-react";

const Card = ({
    icon,
    title,
    value,
    color
}) => (
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

const WorkoutSummary = ({ workout }) => {

    if (!workout?.summary) {
        return null;
    }

    const summary = workout.summary;

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            <Card
                title="BMI"
                value={summary.bmi}
                color="bg-blue-100"
                icon={
                    <Scale
                        size={24}
                        className="text-blue-600"
                    />
                }
            />

            <Card
                title="Goal"
                value={summary.goal}
                color="bg-green-100"
                icon={
                    <Target
                        size={24}
                        className="text-green-600"
                    />
                }
            />

            <Card
                title="Workout Level"
                value={summary.level}
                color="bg-purple-100"
                icon={
                    <Activity
                        size={24}
                        className="text-purple-600"
                    />
                }
            />

            <Card
                title="Workout Duration"
                value={summary.duration}
                color="bg-orange-100"
                icon={
                    <Clock
                        size={24}
                        className="text-orange-600"
                    />
                }
            />

            <Card
                title="Days / Week"
                value={summary.days_per_week}
                color="bg-indigo-100"
                icon={
                    <CalendarDays
                        size={24}
                        className="text-indigo-600"
                    />
                }
            />

            <Card
                title="Calories / Session"
                value={summary.calories_burn}
                color="bg-red-100"
                icon={
                    <Flame
                        size={24}
                        className="text-red-600"
                    />
                }
            />

        </div>

    );

};

export default WorkoutSummary;