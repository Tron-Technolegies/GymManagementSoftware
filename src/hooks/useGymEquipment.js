import { useCallback, useEffect, useState } from "react";

import {
    getGymEquipment,
    createGymEquipment,
    updateGymEquipment,
    deleteGymEquipment,
} from "../api/gymEquipmentApi";

const useGymEquipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // -----------------------------------------
    // GET - FETCH EQUIPMENT
    // -----------------------------------------

    const fetchEquipment = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getGymEquipment();

            setEquipment(
                response?.data?.equipment || []
            );

        } catch (error) {
            console.error(error);

            setError(
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Failed to fetch equipment"
            );

        } finally {
            setLoading(false);
        }
    }, []);

    // -----------------------------------------
    // POST - ADD EQUIPMENT
    // -----------------------------------------

    const addEquipment = async (data) => {
        try {
            setError(null);

            await createGymEquipment(data);

            await fetchEquipment();

        } catch (error) {
            console.error(error);

            setError(
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Failed to add equipment"
            );

            throw error;
        }
    };

    // -----------------------------------------
    // PUT - UPDATE EQUIPMENT
    // -----------------------------------------

    const editEquipment = async (id, data) => {
        try {
            setError(null);

            await updateGymEquipment(id, data);

            await fetchEquipment();

        } catch (error) {
            console.error(error);

            setError(
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Failed to update equipment"
            );

            throw error;
        }
    };

    // -----------------------------------------
    // DELETE - DELETE EQUIPMENT
    // -----------------------------------------

    const removeEquipment = async (id) => {
        try {
            setError(null);

            await deleteGymEquipment(id);

            await fetchEquipment();

        } catch (error) {
            console.error(error);

            setError(
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Failed to delete equipment"
            );

            throw error;
        }
    };

    // -----------------------------------------
    // INITIAL FETCH
    // -----------------------------------------

    useEffect(() => {
        fetchEquipment();
    }, [fetchEquipment]);

    return {
        equipment,
        loading,
        error,
        fetchEquipment,
        addEquipment,
        editEquipment,
        removeEquipment,
    };
};

export default useGymEquipment;