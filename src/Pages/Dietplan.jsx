import React, { useRef } from "react";
import { X, ArrowDownToLine, Share2 } from "lucide-react";
import useDownloadPDF from "../hooks/useDownloadPDF";
import NutritionCards from "../Components/DietPlan/NutritionCards";
import MealPlan from "../Components/DietPlan/MealPlan";
import Avoidfood from "../Components/DietPlan/Avoidfood";
import Shoppinglist from "../Components/DietPlan/Shoppinglist";
import Supplements from "../Components/DietPlan/Supplements";
import Tips from "../Components/DietPlan/Tips";


const DietPlan = ({ member, diet, loading, onClose }) => {
    const {
        downloadPDF,
        sharePDFToWhatsApp
    } = useDownloadPDF();
    const pdfRef = useRef();
    return (

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center py-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        AI Diet Plan
                    </h2>
                    <p className="text-sm text-slate-500">
                        Personalized diet plan for {member?.name}
                    </p>
                </div>
                <div className="flex items-center gap-3">


                    {/* Download PDF */}

                    <button
                        onClick={() =>
                            downloadPDF(
                                pdfRef,
                                {
                                    memberName:
                                        member?.name || "Member",

                                    reportTitle:
                                        "AI Diet Plan Report",
                                }
                            )
                        }
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                    >
                        <ArrowDownToLine size={18} />

                        Download
                    </button>
                    <button
                        onClick={() =>
                            sharePDFToWhatsApp(
                                pdfRef,
                                {
                                    memberName:
                                        member?.name || "Member",

                                    reportTitle:
                                        "AI Diet Plan Report",
                                }
                            )
                        }
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2"
                    >
                        <Share2 size={18} />

                        Share

                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100"
                    >

                        <X size={20} />
                    </button>
                </div>

            </div>
            {loading && (

                <div className="text-center py-12">
                    <div className="text-lg font-semibold text-slate-700">
                        Generating AI Diet Plan...
                    </div>
                    <p className="text-slate-500 mt-2">
                        Creating a personalized nutrition plan.
                    </p>
                </div>
            )}

            {!loading && !diet && (
                <div className="text-center py-12 text-slate-500">
                    No diet plan available.
                </div>
            )}

            {/* PDF CONTENT */}
            {!loading && diet && (
                <div
                    ref={pdfRef}
                    className="space-y-6"
                >
                    <NutritionCards

                        nutrition={diet.nutrition}

                    />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8">
                            <MealPlan

                                diet={diet}
                            />

                        </div>
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