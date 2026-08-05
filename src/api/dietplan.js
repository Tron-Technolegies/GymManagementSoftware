import api from "./api";

export const generateDietPlan = (memberId) => {
    return api.post("admin/api/generate_diet/", { member_id: memberId, });
};