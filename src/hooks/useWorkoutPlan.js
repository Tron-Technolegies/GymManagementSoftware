import { useState, useCallback } from "react";
import { generateWorkoutPlan } from "../api/workoutplan";

export const useWorkoutPlan = () => {

    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generate = useCallback(async (memberId) => {

        setLoading(true);
        setError(null);

        try {
            const res = await generateWorkoutPlan(memberId);

            if (res.data.success) {
                setWorkout(res.data.workout_plan);
            } else {
                setError(res.data.error || "Failed to generate workout.");
            }

        } catch (err) {
            setError(
                err.response?.data?.error || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }

    }, []);

    return { workout, loading, error, generate };
};