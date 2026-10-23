import { useEffect, useState, useCallback } from "react";

import {
    getDashboardStats,
    getExpensecategory,
} from "../api/dashboardapi";

const useDashboard = (
    period = "daily",
    selectedDate = null,
    branchId = null
) => {
    const [stats, setStats] = useState({});
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDashboardStats = useCallback(async (
        selectedPeriod = period,
        date = selectedDate,
        selectedBranch = branchId
    ) => {
        try {
            const res = await getDashboardStats(
                selectedPeriod,
                date,
                selectedBranch
            );

            setStats(res.data || {});
        } catch (error) {
            console.error("Dashboard Error:", error);
            setStats({});
        }
    }, [period, selectedDate, branchId]);

    const fetchExpenseCategories = useCallback(async (
        selectedPeriod = period,
        date = selectedDate,
        selectedBranch = branchId
    ) => {
        try {
            const res = await getExpensecategory(
                selectedPeriod,
                date,
                selectedBranch
            );

            const categories =
                res.data?.expenseCategories ?? [];

            setExpenseCategories(
                Array.isArray(categories)
                    ? categories.map((item) => ({
                        ...item,
                        amount: Number(
                            item.total ?? item.amount ?? 0
                        ),
                    }))
                    : []
            );
        } catch (error) {
            console.error(
                "Expense Category Error:",
                error
            );
            setExpenseCategories([]);
        }
    }, [period, selectedDate, branchId]);

    useEffect(() => {
        let cancelled = false;

        const loadDashboard = async () => {
            setLoading(true);

            try {
                const [statsResult, expensesResult] =
                    await Promise.allSettled([
                        getDashboardStats(
                            period,
                            selectedDate,
                            branchId
                        ),
                        getExpensecategory(
                            period,
                            selectedDate,
                            branchId
                        ),
                    ]);

                if (cancelled) return;

                if (statsResult.status === "fulfilled") {
                    setStats(
                        statsResult.value.data || {}
                    );
                } else {
                    console.error(
                        "Dashboard Error:",
                        statsResult.reason
                    );
                    setStats({});
                }

                if (expensesResult.status === "fulfilled") {
                    const categories =
                        expensesResult.value.data
                            ?.expenseCategories ?? [];

                    setExpenseCategories(
                        Array.isArray(categories)
                            ? categories.map((item) => ({
                                ...item,
                                amount: Number(
                                    item.total ??
                                    item.amount ??
                                    0
                                ),
                            }))
                            : []
                    );
                } else {
                    console.error(
                        "Expense Category Error:",
                        expensesResult.reason
                    );
                    setExpenseCategories([]);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadDashboard();

        return () => {
            cancelled = true;
        };
    }, [period, selectedDate, branchId]);

    return {
        stats,
        expenseCategories,
        loading,
        fetchDashboardStats,
        fetchExpenseCategories,
    };
};

export default useDashboard;