import React from "react";

const NutritionCards = ({ nutrition }) => {

    if (!nutrition) return null;

    const cards = [
        {
            title: "Daily Calories",
            value: nutrition.daily_calories,
            unit: "kcal",
        },
        {
            title: "Protein",
            value: nutrition.protein,
        },
        {
            title: "Carbohydrates",
            value: nutrition.carbohydrates,
        },
        {
            title: "Fat",
            value: nutrition.fat,
        },
        {
            title: "Water Intake",
            value: nutrition.water,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

            {cards.map((card, index) => (

                <div
                    key={index}
                    className="bg-white rounded-xl shadow border border-slate-200 p-5"
                >

                    <p className="text-sm text-gray-500">
                        {card.title}
                    </p>

                    <h2 className="text-2xl font-bold text-slate-800 mt-2">
                        {card.value}
                        {card.unit && (
                            <span className="text-sm font-normal ml-1">
                                {card.unit}
                            </span>
                        )}
                    </h2>

                </div>

            ))}

        </div>
    );
};

export default NutritionCards;