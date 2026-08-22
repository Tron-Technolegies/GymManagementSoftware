import { useState, useCallback } from "react";
import { generateWorkoutPlan } from "../api/workoutplan";

export const useWorkoutPlan = () => {
    const [workout, setWorkout] = useState(null);
    const [workoutMember, setWorkoutMember] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generate = useCallback(async (memberId) => {
        setLoading(true);
        setError(null);
        setWorkout(null);
        setWorkoutMember(null);

        try {
            const response = await generateWorkoutPlan(memberId);

            const data = response.data;

            if (data?.success) {
                // API returns: { success, member, available_equipment, workout_plan: { days } }
                setWorkout(data.workout_plan);
                setWorkoutMember(data.member);
            } else {
                setError(data?.error || "Failed to generate workout.");
            }
        } catch (err) {
            setWorkout(null);
            setWorkoutMember(null);
            setError(
                err.response?.data?.error ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setWorkout(null);
        setWorkoutMember(null);
        setError(null);
    }, []);

    return {
        workout,
        workoutMember,
        loading,
        error,
        generate,
        reset,
    };
};

export default useWorkoutPlan;