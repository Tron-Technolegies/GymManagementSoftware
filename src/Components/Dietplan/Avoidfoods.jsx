import React from "react";
import { Ban } from "lucide-react";

const Avoidfoods = ({ foods }) => {
    return (
        <div className="rounded-lg p-4 bg-red-50 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
                <Ban size={18} />
                <h3 className="font-semibold">
                    Foods to Avoid
                </h3>
            </div>

            <ul>
                {foods?.map((food, index) => (
                    <li key={index}>{food}</li>
                ))}
            </ul>
        </div>
    );
};

export default Avoidfoods;