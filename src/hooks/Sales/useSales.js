
import { useEffect, useState, useCallback } from "react";
import {
    getSales,
    Saleslist,
} from "../../api/getSales";

export const useSales = (
    period = "daily",
    selectedDate = null,
    selectedBranch = "all"
) => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSales = useCallback(async () => {
        try {
            setLoading(true);

            const data = await getSales(
                period,
                selectedDate,
                selectedBranch
            );

            setSales(data?.sales || []);
        } catch (error) {
            console.error("Error fetching sales:", error);
            setSales([]);
        } finally {
            setLoading(false);
        }
    }, [period, selectedDate, selectedBranch]);

    useEffect(() => {
        fetchSales();
    }, [fetchSales]);

    return {
        sales,
        loading,
        fetchSales,
    };
};

export const useTodaySales = (selectedBranch = "all") => {
    const [todaySales, setTodaySales] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTodaySales = useCallback(async () => {
        try {
            setLoading(true);

            const response = await Saleslist(selectedBranch);

            setTodaySales(response?.data?.sales || []);
        } catch (error) {
            console.error(
                "Error fetching today's sales:",
                error
            );
            setTodaySales([]);
        } finally {
            setLoading(false);
        }
    }, [selectedBranch]);

    useEffect(() => {
        fetchTodaySales();
    }, [fetchTodaySales]);

    return {
        todaySales,
        loading,
        fetchTodaySales,
    };
};
