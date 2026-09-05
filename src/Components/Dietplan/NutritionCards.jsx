// import React from "react";
// import {
//     Flame,
//     Beef,
//     Wheat,
//     Droplets,
//     GlassWater,
// } from "lucide-react";

// const NutritionCards = ({ nutrition }) => {
//     if (!nutrition) return null;

//     const cards = [
//         {
//             title: "Daily Calories",
//             value: nutrition.daily_calories,
//             unit: "kcal",
//             icon: Flame,
//             color: "text-orange-500",
//             bg: "bg-orange-50",
//         },
//         {
//             title: "Protein",
//             value: nutrition.protein,
//             icon: Beef,
//             color: "text-red-500",
//             bg: "bg-red-50",
//         },
//         {
//             title: "Carbohydrates",
//             value: nutrition.carbohydrates,
//             icon: Wheat,
//             color: "text-amber-500",
//             bg: "bg-amber-50",
//         },
//         {
//             title: "Fat",
//             value: nutrition.fat,
//             icon: Droplets,
//             color: "text-purple-500",
//             bg: "bg-purple-50",
//         },
//         {
//             title: "Water Intake",
//             value: nutrition.water,
//             icon: GlassWater,
//             color: "text-yellow-500",
//             bg: "bg-yellow-50",
//         },
//     ];

//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
//             {cards.map((card, index) => {
//                 const Icon = card.icon;

//                 return (
//                     <div
//                         key={index}
//                         className="bg-[#F7F9FB] rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition"
//                     >
//                         <div
//                             className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mb-4`}>
//                             <Icon size={20} className={card.color} />
//                         </div>

//                         <p className="text-sm text-slate-500">
//                             {card.title}
//                         </p>

//                         <h2 className="mt-2 text-lg font-bold text-slate-900">
//                             {card.value}
//                             {card.unit && (
//                                 <span className="ml-1 text-sm font-medium text-slate-500">
//                                     {card.unit}
//                                 </span>
//                             )}
//                         </h2>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

// export default NutritionCards;