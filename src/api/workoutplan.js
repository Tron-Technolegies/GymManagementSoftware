import api from "./api";

export const generateWorkoutPlan = async (memberId, experienceLevel) => {
    return api.post(
        "/admin/api/generate_workout/",
        {
            member_id: memberId,
            experience_level: experienceLevel,
        }
    );
};

export const completeWorkoutDay = async (memberId) => {
    return api.post(
        `/admin/api/workout/${memberId}/complete/`
    );
};