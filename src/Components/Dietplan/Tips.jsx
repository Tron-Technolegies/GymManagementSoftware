import React from "react";
import { Lightbulb } from "lucide-react";

const Tips = ({ tips }) => {
    return (
        <div className="rounded-xl bg-[#F7F9FB] p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={18} />
                <h3 className="font-semibold text-lg">
                    Tips
                </h3>
            </div>

            {tips && tips.length > 0 ? (
                <div className="space-y-2 text-sm text-slate-700">
                    {tips.map((tip, index) => (
                        <p key={index}>{tip}</p>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-slate-500">
                    No tips available.
                </p>
            )}
        </div>
    );
};

export default Tips;