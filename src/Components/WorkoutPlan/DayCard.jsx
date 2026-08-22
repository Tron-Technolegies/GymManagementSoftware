// import React from "react";
// import { Dumbbell } from "lucide-react";


// const DayCard = ({ day }) => {

//     if (!day) {
//         return null;
//     }


//     return (
//         <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

//             {/* HEADER */}

//             <div className="bg-yellow-600 px-6 py-4 text-white">

//                 <h3 className="text-xl font-bold">
//                     Day {day.day}
//                 </h3>

//                 <p className="text-yellow-100 mt-1">
//                     {day.body_part}
//                 </p>

//             </div>


//             {/* EXERCISES */}

//             <div className="p-6 space-y-4">

//                 {day.exercises?.length > 0 ? (

//                     day.exercises.map((exercise) => (

//                         <div
//                             key={
//                                 exercise.exercise_id ||
//                                 exercise.name
//                             }
//                             className="border border-slate-200 rounded-lg p-4"
//                         >

//                             <div className="flex gap-4">

//                                 {/* IMAGE */}

//                                 <div className="w-32 h-32 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">

//                                     {exercise.image ? (

//                                         <img
//                                             src={exercise.image}
//                                             alt={exercise.name}
//                                             className="w-full h-full object-contain"
//                                         />

//                                     ) : (

//                                         <Dumbbell
//                                             size={32}
//                                             className="text-slate-300"
//                                         />

//                                     )}

//                                 </div>


//                                 {/* DETAILS */}

//                                 <div className="flex-1">

//                                     <div className="flex items-center gap-2">

//                                         <Dumbbell
//                                             size={18}
//                                             className="text-yellow-600"
//                                         />

//                                         <h4 className="font-semibold text-slate-800">
//                                             {exercise.name}
//                                         </h4>

//                                     </div>


//                                     <p className="text-sm text-slate-500 mt-2">
//                                         {exercise.sets} Sets ×{" "}
//                                         {exercise.reps} Reps
//                                     </p>


//                                     <p className="text-sm text-slate-500 mt-1">
//                                         Rest: {exercise.rest}
//                                     </p>


//                                     <p className="text-sm text-slate-500 mt-1">
//                                         Equipment:{" "}
//                                         {exercise.equipment || "Bodyweight"}
//                                     </p>

//                                 </div>

//                             </div>

//                         </div>

//                     ))

//                 ) : (

//                     <p className="text-slate-500">
//                         No exercises available for this day.
//                     </p>

//                 )}

//             </div>

//         </div>
//     );
// };


// export default DayCard;