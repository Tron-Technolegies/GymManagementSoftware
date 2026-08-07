import React from "react";
import {
    X,
    Dumbbell,
    ArrowDownToLine,
    Share2
} from "lucide-react";

const WorkoutHeader = ({
    member,
    onDownload,
    onShare,
    onClose,
}) => {

    return (

        <div className="flex justify-between items-center pb-6 border-b border-slate-200">

            <div className="flex items-center gap-4">

                {/* <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">

                    <Dumbbell
                        size={28}
                        className="text-blue-600"
                    />

                </div> */}

                {/* <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        AI Workout Plan
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Personalized weekly workout schedule for{" "}
                        <span className="font-semibold text-slate-700">
                            {member?.name}
                        </span>
                    </p>

                </div> */}

            </div>
            {/* 
            <div className="flex items-center gap-3">

                <button
                    onClick={onDownload}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg"
                >
                    <ArrowDownToLine size={18} />
                    Download
                </button>

                <button
                    onClick={onShare}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg"
                >
                    <Share2 size={18} />
                    Share
                </button>

                <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-slate-100 transition"
                >
                    <X size={20} />
                </button>

            </div> */}

        </div>

    );

};

export default WorkoutHeader;