import api from "./api";

// =========================
// GET ALL MEMBERS
// =========================
export const getMembers = () => {
    return api.get("admin/api/members/");
};

export const createMember = (formData) =>
    api.post(
        "admin/api/members/create/",
        formData
    );

export const updateMember = (id, data) => {

    const formData = new FormData();

    Object.entries(data).forEach(([k, v]) => {

        if (v !== null && v !== undefined) {

            formData.append(k, v);

        }

    });

    return api.post(
        `admin/api/members/${id}/update/`,
        formData
    );
};

export const deleteMember = (id) => {

    return api.delete(
        `admin/api/members/${id}/delete/`
    );
};


// =========================
// MEMBER PAYMENT
// =========================
export const memberpayment = (id, data) => {

    return api.post(
        `admin/api/member/${id}/payments/add/`,
        data
    );
};


// =========================
// RENEW MEMBER
// =========================
export const renewMember = (id, data) => {

    const formData = new FormData();

    Object.entries(data).forEach(([k, v]) => {

        if (v !== null && v !== undefined) {

            formData.append(k, v);

        }

    });

    return api.post(
        `admin/api/members/${id}/renew/`,
        formData
    );
};


// =========================
// PAUSE MEMBER
// =========================
export const pauseMember = (
    memberId,
    freezeDate
) => {

    return api.post(
        `admin/api/members/pause/${memberId}/`,
        {
            freeze_date: freezeDate,
        }
    );
};


// =========================
// RESUME MEMBER
// =========================
export const resumeMember = (
    memberId,
    resumeDate
) => {

    return api.post(
        `admin/api/members/resume/${memberId}/`,
        {
            resume_date: resumeDate,
        }
    );
};


// =========================
// GET BLOCKED MEMBERS
// =========================
export const getBlockedMembers = () => {

    return api.get(
        "admin/api/blocked_members/"
    );
};


// =========================
// GET EXPIRING SOON MEMBERS
// =========================
export const getExpiringSoonMembers = () => {

    return api.get(
        "admin/api/expiring_soon_members/"
    );
};


// =========================
// GET EXPIRED MEMBERS
// =========================
export const getExpiredMembers = () => {

    return api.get(
        "admin/api/expired_members/"
    );
};


// GET MEMBER BY ID
export const getMember = (memberId) => {
    return api.get(`admin/api/members/${memberId}/`);
};


// =========================
// GET MEMBER PAYMENTS
// =========================
export const getPayments = () => {

    return api.get(
        "admin/api/members/get_payments/"
    );
};