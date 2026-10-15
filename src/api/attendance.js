import api from "./api";

export const getAttendance = (params = {}) => {
    return api.get("admin/api/attendance/", { params });
};

export const getEmployeeAttendance = (
    employeeCode,
    params = {}
) => {
    return api.get("admin/api/attendance/", {
        params: {
            ...params,
            employee_code: employeeCode,
        },
    });
};

export const syncAttendance = (payload) => {
    return api.post("admin/api/attendance/sync/", payload);
};