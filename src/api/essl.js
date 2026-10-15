import api from "./api";

// Get biometric employee mappings
export const getEsslMappings = (search = "") =>
    api.get("admin/api/list_biometric_mappings/", {
        params: search ? { search } : {},
    });

// Sync employees from eSSL
export const syncEsslEmployees = () =>
    api.post("admin/api/essl/sync-employees/");

// Link eSSL employee to a gym member
export const linkEsslMember = (mappingId, memberId) =>
    api.patch(`admin/api/essl/mappings/${mappingId}/link/`, {
        member: memberId,
        staff: null,
    });

// Link eSSL employee to staff
export const linkEsslStaff = (mappingId, staffId) =>
    api.patch(`admin/api/essl/mappings/${mappingId}/link/`, {
        member: null,
        staff: staffId,
    });

// Unlink eSSL employee
export const unlinkEsslEmployee = (mappingId) =>
    api.patch(`admin/api/essl/mappings/${mappingId}/unlink/`);