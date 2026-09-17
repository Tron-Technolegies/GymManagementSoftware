import api from "./api";

// GET - View all equipment
export const getGymEquipment = () => {
    return api.get("admin/api/gym-equipment/");
};


// POST - Create equipment
export const createGymEquipment = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);

    if (data.branch_id) {
        formData.append("branch_id", data.branch_id);
    }

    return api.post(
        "admin/api/gym-equipment/",
        formData
    );
};


// GET - View single equipment
export const getGymEquipmentDetail = (id) => {
    return api.get(
        `admin/api/gym-equipment/${id}/`
    );
};


// PUT - Update equipment
export const updateGymEquipment = (id, data) => {
    const formData = new FormData();

    formData.append("name", data.name);

    return api.put(
        `admin/api/gym-equipment/${id}/`,
        formData
    );
};


// DELETE - Delete equipment
export const deleteGymEquipment = (id) => {
    return api.delete(
        `admin/api/gym-equipment/${id}/`
    );
};