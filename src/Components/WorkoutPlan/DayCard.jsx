import React from "react";
import {
    Clock,
    Flame,
    Dumbbell
} from "lucide-react";

const DayCard = ({ day }) => {

    return (

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-blue-600 px-6 py-4 text-white">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold">
                            {day.day}
                        </h3>
                        <p className="text-blue-100 mt-1">
                            {day.focus}
                        </p>
                    </div>
                    <div className="text-right space-y-2">
                        <div className="flex items-center justify-end gap-2">
                            <Clock size={16} />
                            <span className="text-sm">
                                {day.duration}
                            </span>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <Flame size={16} />
                            <span className="text-sm">
                                {day.calories}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    {day.exercises.map((exercise, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition"
                        >
                            <div className="flex items-start gap-3">

                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Dumbbell
                                        size={18}
                                        className="text-blue-600"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-800">
                                        {exercise.name}
                                    </h4>

                                    <p className="text-sm text-slate-500 mt-1">
                                        {exercise.sets} Sets × {exercise.reps} Reps
                                    </p>
                                </div>
                            </div>
                            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-2 rounded-full">
                                Rest {exercise.rest}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default DayCard;