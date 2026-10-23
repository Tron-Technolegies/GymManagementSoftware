import { useCallback, useEffect, useState } from "react";
import { getExpiringSoonMembers } from "../../api/dashboardapi";

const useExpiringMembers = (branchId = null) => {
    const [expiredMembers, setExpiredMembers] = useState([]);

    const fetchExpiringMembers = useCallback(
        async (selectedBranch = branchId) => {
            try {
                const res = await getExpiringSoonMembers(
                    selectedBranch
                );

                const data = res.data;

                setExpiredMembers(
                    Array.isArray(data)
                        ? data
                        : data?.results ?? data?.members ?? []
                );
            } catch (err) {
                console.error(
                    "Failed to fetch upcoming expiries:",
                    err
                );
                setExpiredMembers([]);
            }
        },
        [branchId]
    );

    useEffect(() => {
        fetchExpiringMembers();
    }, [fetchExpiringMembers]);

    return {
        expiredMembers,
        fetchExpiringMembers,
    };
};

export default useExpiringMembers;