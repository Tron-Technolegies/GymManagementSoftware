import api from "./api";

// GET - List all equipment
export const getGymEquipment = () => {
    return api.get("admin/api/gym-equipment/");
};

// POST - Create equipment
export const createGymEquipment = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("quantity", data.quantity ?? 1);
    formData.append(
        "is_available",
        String(data.is_available ?? true)
    );

    if (
        data.weight !== null &&
        data.weight !== undefined &&
        data.weight !== ""
    ) {
        formData.append("weight", data.weight);
    }

    if (
        data.branch_id !== null &&
        data.branch_id !== undefined &&
        data.branch_id !== ""
    ) {
        formData.append("branch_id", data.branch_id);
    }

    return api.post(
        "admin/api/gym-equipment/create/",
        formData
    );
};

// GET - Retrieve single equipment
export const getGymEquipmentDetail = (id) => {
    return api.get(
        `admin/api/gym-equipment/${id}/`
    );
};

// PUT - Update equipment
export const updateGymEquipment = (id, data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("quantity", data.quantity ?? 1);
    formData.append(
        "is_available",
        String(data.is_available ?? true)
    );

    if (
        data.weight !== null &&
        data.weight !== undefined &&
        data.weight !== ""
    ) {
        formData.append("weight", data.weight);
    }

    return api.put(
        `admin/api/gym-equipment/${id}/update/`,
        formData
    );
};

// DELETE - Delete equipment
export const deleteGymEquipment = (id) => {
    return api.delete(
        `admin/api/gym-equipment/${id}/delete/`
    );
};