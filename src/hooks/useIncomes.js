import { useState, useEffect, useCallback } from "react";

import {
    getIncome,
    addIncome,
    getMembersIncome,
} from "../api/income";

const useAdditionalIncomes = (
    period = "daily",
    selectedDate = null,
    branchId = null
) => {
    const [incomes, setIncomes] = useState([]);
    const [memberIncome, setMemberIncome] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAdditionalIncomes = useCallback(async () => {
        try {
            setLoading(true);

            const res = await getIncome(branchId);
            setIncomes(res.data || []);
        } catch (error) {
            console.error("Failed to fetch incomes:", error);
            setIncomes([]);
        } finally {
            setLoading(false);
        }
    }, [branchId]);

    const fetchMemberIncome = useCallback(async (
        selectedPeriod = period,
        date = selectedDate,
        selectedBranch = branchId
    ) => {
        try {
            setLoading(true);

            const res = await getMembersIncome(
                selectedPeriod,
                date,
                selectedBranch
            );

            setMemberIncome(res.data?.income || []);
        } catch (error) {
            console.error("Failed to fetch member income:", error);
            setMemberIncome([]);
        } finally {
            setLoading(false);
        }
    }, [period, selectedDate, branchId]);

    const createIncome = async (data) => {
        try {
            const res = await addIncome(data);

            await fetchAdditionalIncomes();
            await fetchMemberIncome(period, selectedDate, branchId);

            return res.data;
        } catch (error) {
            console.error("Failed to add income:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchAdditionalIncomes();
        fetchMemberIncome(period, selectedDate, branchId);
    }, [
        fetchAdditionalIncomes,
        fetchMemberIncome,
        period,
        selectedDate,
        branchId,
    ]);

    return {
        incomes,
        memberIncome,
        loading,
        fetchAdditionalIncomes,
        fetchMemberIncome,
        createIncome,
    };
};

export default useAdditionalIncomes;