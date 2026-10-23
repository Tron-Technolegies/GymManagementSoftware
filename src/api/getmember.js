import api from "./api";

// Existing API — unchanged
export const getMembers = () => {
    return api.get("admin/api/members/");
};

// Keep this if other code already uses it
export const getMembersByBranch = (branchId) => {
    return api.get("admin/api/members/", {
        params: { branch_id: branchId },
    });
};