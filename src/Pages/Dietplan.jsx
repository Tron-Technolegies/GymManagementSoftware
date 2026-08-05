import React, { useState } from "react";
import { X } from "lucide-react";

import { generateDietPlan } from "../api/dietplan";

import NutritionCards from "../Components/DietPlan/NutritionCards";
import MealPlan from "../Components/DietPlan/MealPlan";
import Avoidfood from "../Components/DietPlan/Avoidfood";
import Shoppinglist from "../Components/DietPlan/Shoppinglist";
import Supplements from "../Components/DietPlan/Supplements";
import Tips from "../Components/DietPlan/Tips";


const DietPlan = ({ member, onClose }) => {

    const [diet, setDiet] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleGenerate = async () => {

        try {

            setLoading(true);

            const res = await generateDietPlan(member.id);

            console.log("Diet Response:", res.data);

            setDiet(res.data.diet_plan);


        } catch (error) {

            console.error(
                "Diet generation failed:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">


            {/* Header */}

            <div className="flex justify-between items-center mb-6">


                <div>

                    <h2 className="text-xl font-bold text-slate-900">
                        AI Diet Plan
                    </h2>

                    <p className="text-sm text-slate-500">
                        Personalized diet plan for {member?.name}
                    </p>

                </div>


                <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-slate-100"
                >

                    <X size={20} />

                </button>


            </div>



            {/* Generate Button */}

            {!diet && (

                <div className="flex justify-center">

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 
                        text-white px-6 py-3 rounded-lg 
                        font-semibold transition"
                    >

                        {
                            loading
                                ? "Generating AI Diet..."
                                : "Generate AI Diet"
                        }

                    </button>

                </div>

            )}



            {/* Loading */}

            {loading && (

                <div className="text-center mt-6 text-slate-500">

                    Creating personalized nutrition plan...

                </div>

            )}




            {/* Diet Result */}

            {diet && (

                <div className="space-y-6">


                    {/* Nutrition */}

                    <NutritionCards
                        nutrition={diet.nutrition}
                    />



                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">


                        {/* Meals */}

                        <div className="lg:col-span-8">

                            <MealPlan
                                meals={diet.meals}
                            />

                        </div>



                        {/* Side Cards */}

                        <div className="lg:col-span-4 space-y-4">


                            <Shoppinglist
                                shoppingList={
                                    diet.shopping_list
                                }
                            />


                            <Avoidfood
                                foods={
                                    diet.foods_to_avoid
                                }
                            />


                            <Supplements
                                supplements={
                                    diet.supplements
                                }
                            />


                            <Tips
                                tips={
                                    diet.tips
                                }
                            />


                        </div>


                    </div>


                </div>

            )}



        </div>

    );

};


export default DietPlan;