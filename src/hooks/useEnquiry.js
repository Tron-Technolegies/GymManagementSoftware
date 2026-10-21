
import { useCallback, useEffect, useState } from "react";

import {
    getEnquiry,
    createEnquiry,
    deleteEnquiry,
} from "../api/enquiry";

export default function useEnquiry() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEnquiries = useCallback(async (branchId = "") => {
        setLoading(true);

        try {
            const res = await getEnquiry(branchId);

            setEnquiries(
                Array.isArray(res.data) ? res.data : []
            );
        } catch (err) {
            console.error("Fetch enquiries error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEnquiries().catch(() => { });
    }, [fetchEnquiries]);

    const addEnquiries = async (data, branchId = "") => {
        try {
            await createEnquiry(data);
            await fetchEnquiries(branchId);
        } catch (err) {
            console.error("Add enquiry error:", err);
            throw err;
        }
    };

    const removeEnquiries = async (id) => {
        try {
            await deleteEnquiry(id);

            setEnquiries((prev) =>
                prev.filter((enquiry) => enquiry.id !== id)
            );
        } catch (err) {
            console.error("Delete enquiry error:", err);
            throw err;
        }
    };

    return {
        enquiries,
        loading,
        addEnquiries,
        removeEnquiries,
        fetchEnquiries,
    };
}
