import { useEffect, useState } from "react";
import { getMember } from "../../api/members"

export const useMember = (memberId) => {
    const [memberData, setMemberData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMember = async () => {
        if (!memberId) return;

        setLoading(true);
        setError(null);

        try {
            const res = await getMember(memberId);

            setMemberData(res.data);
        } catch (err) {
            console.error("Failed to fetch member:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMember();
    }, [memberId]);

    return {
        memberData,
        loading,
        error,
        fetchMember,
    };
};