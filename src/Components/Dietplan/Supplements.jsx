import React from "react";
import { Pill } from "lucide-react";

const Supplements = ({ supplements }) => {
    return (
        <div className="rounded-lg p-4 bg-[#F7F9FB] shadow-sm">
            <div className="flex items-center gap-2 mb-3">
                <Pill size={18} />
                <h3 className="font-semibold">
                    Supplements
                </h3>
            </div>

            <ul>
                {supplements?.map((supplement, index) => (
                    <li key={index}>
                        {supplement}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Supplements;