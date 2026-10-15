import { useState } from "react";
import {
    generateWorkoutPlan,
    completeWorkoutDay,
} from "../api/workoutplan"

export const useWorkout = () => {
    const [loading, setLoading] = useState(false);

    const handleGenerateWorkout = async (memberId) => {
        try {
            setLoading(true);

            const res = await generateWorkoutPlan(memberId);

            return res.data;
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteWorkout = async (memberId) => {
        try {
            setLoading(true);

            const res = await completeWorkoutDay(memberId);

            return res.data;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        handleGenerateWorkout,
        handleCompleteWorkout,
    };
};