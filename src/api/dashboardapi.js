import api from "./api";

export const getDashboardStats = (
    period = "daily",
    selectedDate = null
) => {

    return api.get(
        "admin/api/dashboard/",
        {
            params: {
                period,
                date: selectedDate,
            },
        }
    );

};

export const getExpiringSoonMembers = () => {
    return api.get("admin/api/expiring_soon_members/");
};

export const getBlockedMembers = () => {
    return api.get("admin/api/blocked_members/");
};

export const getPlans = () => {
    return api.get("admin/api/plans/");
};

export const renewMember = (memberId, plan) => {
    const formData = new FormData();
    formData.append("plan", plan);

    return api.post(`admin/api/members/${memberId}/renew/`, formData);
};

export const getExpensecategory = (
    period = "daily",
    selectedDate = null
) => {

    return api.get(
        "admin/api/expense_by_category/",
        {
            params: {
                period,
                date: selectedDate,
            },
        }
    );

};