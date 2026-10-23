import api from "./api";

export const getIncome = (branchId = null) => {
    return api.get("admin/api/all_incomes/", {
        params: {
            ...(branchId != null ? { branch_id: branchId } : {}),
        },
    });
};

export const addIncome = (data) => {
    return api.post("admin/api/add_income/", data);
};

export const getMembersIncome = (
    period = "daily",
    selectedDate = null,
    branchId = null
) => {
    return api.get("admin/api/income_by_members/", {
        params: {
            period,
            ...(selectedDate ? { date: selectedDate } : {}),
            ...(branchId != null ? { branch_id: branchId } : {}),
        },
    });
};