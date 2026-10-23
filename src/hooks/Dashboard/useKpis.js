
import { useCallback, useEffect, useState } from "react";
import { getDashboardStats } from "../../api/dashboardapi";

const useKpis = (branchId = null) => {
    const [stats, setStats] = useState({
        total_members: 0,
        active_members: 0,
        blocked_members: 0,
        expired_members: 0,
        paused_members: 0,
        pending_payments: 0,
        recent_registrations: [],
        upcoming_expiries_list: [],
        total_income: 0,
        today_income: 0,
        monthly_income: 0,
        total_expense: 0,
        today_expense: 0,
        monthly_expense: 0,
        revenue_growth: 0,
        expense_growth: 0,
        profit_growth: 0,
    });

    const [loading, setLoading] = useState(false);

    const fetchStats = useCallback(async () => {
        try {
            setLoading(true);

            const response = await getDashboardStats(
                "daily",
                null,
                branchId
            );

            setStats(response.data || {});
        } catch (error) {
            console.error("Failed to fetch dashboard KPIs:", error);
        } finally {
            setLoading(false);
        }
    }, [branchId]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return {
        stats,
        loading,
        fetchStats,
    };
};

export default useKpis;
