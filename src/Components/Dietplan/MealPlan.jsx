import React from 'react'

const MealPlan = () => {
    return (
        <>
            <div className="space-y-4">

                {diet.meals.map((meal) => (

                    <div
                        key={meal.meal}
                        className="border rounded-lg p-5 bg-white"
                    >

                        <div className="flex justify-between">

                            <div>

                                <h3 className="font-semibold">
                                    {meal.meal}
                                </h3>

                                <span>{meal.time}</span>

                            </div>

                            <div>

                                {meal.calories} CAL

                            </div>

                        </div>

                        <ul className="mt-3 list-disc ml-6">

                            {meal.foods.map((food) => (

                                <li key={food}>
                                    {food}
                                </li>

                            ))}

                        </ul>

                    </div>

                ))}

            </div>
        </>
    )
}

export default MealPlan