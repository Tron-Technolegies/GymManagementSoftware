import api from "./api";

export const generateWorkoutPlan = async (memberId) => {
    const response = await api.post("/admin/api/generate-workout/", {
        member_id: memberId,
    });

    return response; // axios already gives { data, status, ... }
};