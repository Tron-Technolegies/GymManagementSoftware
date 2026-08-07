import React from "react";
import { Clock3, Flame } from "lucide-react";

const MealPlan = ({ diet }) => {
    if (!diet || !diet.meals) {
        return (
            <p className="text-gray-500">
                No meal plan available
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {diet.meals.map((meal, index) => (
                <div
                    key={index}
                    className="rounded-xl bg-[#F7F9FB] p-5 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-4 ">
                        <div>
                            <h3 className="text-lg font-semibold">
                                {meal.meal}
                            </h3>

                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                <Clock3 size={15} />
                                <span>{meal.time}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 font-semibold">
                            <Flame size={16} />
                            <span>{meal.calories} CAL</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {meal.foods?.map((food, index) => (
                            <div
                                key={index}
                                className="px-4 text-sm text-slate-700"
                            >
                                {food}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MealPlan;