import React from "react";
import {
    Clock,
    Dumbbell
} from "lucide-react";


const WeeklySchedule = ({ workout }) => {
    const schedule = workout?.weekly_plan || [];
    if (!schedule.length) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-6">

                <p className="text-slate-500">
                    No weekly workout schedule available.
                </p>

            </div>
        );
    }


    return (

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
                <Dumbbell
                    size={22}
                    className="text-blue-600"
                />
                <h2 className="text-xl font-bold text-slate-900">
                    Weekly Workout Schedule
                </h2>
            </div>
            <div className="space-y-6">
                {schedule.map((day, index) => (
                    <div
                        key={index}
                        className="border border-slate-200 rounded-xl overflow-hidden">
                        <div className="bg-blue-600 text-white px-5 py-4 flex justify-between">
                            <div>
                                <h3 className="text-lg font-bold">
                                    {day.day}
                                </h3>
                                <p className="text-blue-100">
                                    {day.title}
                                </p>
                                <p className="text-sm mt-1">
                                    {day.focus}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    {day.duration}
                                </div>
                                <p className="text-sm mt-1">
                                    {day.intensity}
                                </p>
                            </div>
                        </div>
                        <div className="p-5 space-y-3">
                            {day.exercises?.map((exercise, i) => (
                                <div key={i} className="bg-slate-50 rounded-lg p-4">

                                    {exercise.gifUrl && (
                                        <div className="w-full h-40 bg-slate-100 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                                            <img
                                                src={exercise.gifUrl}
                                                alt={exercise.name}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                    )}

                                    <h4 className="font-semibold text-slate-800">
                                        {exercise.name}
                                    </h4>
                                    <div className="flex gap-4 text-sm text-slate-500 mt-2">
                                        <span>Sets: {exercise.sets}</span>
                                        <span>Reps: {exercise.reps}</span>
                                        <span>Rest: {exercise.rest}</span>
                                    </div>
                                    {exercise.notes && (
                                        <p className="text-xs text-slate-500 mt-2">
                                            {exercise.notes}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};


export default WeeklySchedule;