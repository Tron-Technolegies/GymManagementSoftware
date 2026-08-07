import React, { useEffect } from "react";
import { useWorkoutPlan } from "../hooks/useWorkoutPlan"

const WorkoutPlannn = ({ member, onClose }) => {

    const { workout, loading, error, generate } = useWorkoutPlan();

    useEffect(() => {
        generate(member.id);
    }, [member.id, generate]);

    if (loading) return <h2>Generating AI Workout...</h2>;

    if (error) {
        return (
            <div>
                <h2>{error}</h2>
                <button onClick={() => generate(member.id)}>Retry</button>
            </div>
        );
    }

    if (!workout) return null;

    return (
        <div>
            <h1>AI Workout Plan</h1>
            <pre>{JSON.stringify(workout, null, 2)}</pre>
        </div>
    );
};

export default WorkoutPlannn;