import api from "./api";

export const getDashboardStats = (
    period = "daily",
    selectedDate = null,
    branchId = null
) => {
    return api.get("admin/api/dashboard/", {
        params: {
            period,
            date: selectedDate,
            ...(branchId != null ? { branch_id: branchId } : {}),
        },
    });
};

export const getExpiringSoonMembers = (branchId = null) => {
    return api.get("admin/api/expiring_soon_members/", {
        params: {
            ...(branchId != null
                ? { branch_id: branchId }
                : {}),
        },
    });
};


export const getBlockedMembers = (branchId = null) => {
    return api.get("admin/api/blocked_members/", {
        params: {
            ...(branchId != null ? { branch_id: branchId } : {}),
        },
    });
};

export const getPlans = () => {
    return api.get("admin/api/plans/");
};

export const renewMember = (memberId, plan) => {
    const formData = new FormData();
    formData.append("plan", plan);

    return api.post(
        `admin/api/members/${memberId}/renew/`,
        formData
    );
};

export const getExpensecategory = (
    period = "daily",
    selectedDate = null,
    branchId = null
) => {
    return api.get("admin/api/expense_by_category/", {
        params: {
            period,
            date: selectedDate,
            ...(branchId != null ? { branch_id: branchId } : {}),
        },
    });
};