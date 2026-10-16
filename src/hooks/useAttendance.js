import { useCallback, useEffect, useMemo, useState } from "react";
import { getAttendance, syncAttendance } from "../api/attendance";

const getLocalDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const getErrorMessage = (error) => {
    const data = error?.response?.data;

    if (typeof data?.detail === "string") return data.detail;
    if (typeof data?.error === "string") return data.error;
    if (typeof data?.message === "string") return data.message;

    if (error?.message === "Network Error") {
        return "Unable to connect to the server. Check your backend connection.";
    }

    return error?.message || "Something went wrong. Please try again.";
};

const getResponseRows = (response) => {
    const data = response?.data;

    if (Array.isArray(data)) {
        return data;
    }

    if (Array.isArray(data?.results)) {
        return data.results;
    }

    return [];
};

export default function useAttendance() {
    const [records, setRecords] = useState([]);
    const [date, setDate] = useState(getLocalDate);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [error, setError] = useState("");

    const loadAttendance = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getAttendance(
                date ? { date } : {}
            );

            setRecords(getResponseRows(response));
        } catch (err) {
            setError(getErrorMessage(err));
            setRecords([]);
        } finally {
            setLoading(false);
        }
    }, [date]);

    const runSync = useCallback(async () => {
        setSyncing(true);
        setError("");

        try {
            const response = await syncAttendance(
                date ? { date } : {}
            );

            const data = response?.data ?? {};

            // Reload attendance after successful synchronization.
            await loadAttendance();

            return data;
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            setError(errorMessage);

            return { error: errorMessage };
        } finally {
            setSyncing(false);
        }
    }, [date, loadAttendance]);

    useEffect(() => {
        loadAttendance();
    }, [loadAttendance]);

    const filteredRecords = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return records;
        }

        return records.filter((record) => {
            const employeeCode = String(
                record.employee_code ?? ""
            ).toLowerCase();

            const employeeName = String(
                record.employee_name ?? ""
            ).toLowerCase();

            const punchType = String(
                record.punch_type ?? ""
            ).toLowerCase();

            const deviceName = String(
                record.raw_data?.device_name ?? ""
            ).toLowerCase();

            const location = String(
                record.raw_data?.location ?? ""
            ).toLowerCase();

            return (
                employeeCode.includes(query) ||
                employeeName.includes(query) ||
                punchType.includes(query) ||
                deviceName.includes(query) ||
                location.includes(query)
            );
        });
    }, [records, search]);

    const kpis = useMemo(() => {
        const uniqueEmployees = new Set(
            records
                .map((record) => record.employee_code)
                .filter(
                    (employeeCode) =>
                        employeeCode !== null &&
                        employeeCode !== undefined &&
                        String(employeeCode).trim() !== ""
                )
                .map(String)
        );

        const linkedPunches = records.filter(
            (record) =>
                record.member_id != null ||
                record.staff_id != null
        ).length;

        return {
            totalPunches: records.length,
            uniqueEmployees: uniqueEmployees.size,
            linkedPunches,
            unlinkedPunches: records.length - linkedPunches,
        };
    }, [records]);

    return {
        records,
        filteredRecords,
        kpis,
        date,
        setDate,
        search,
        setSearch,
        loading,
        syncing,
        error,
        runSync,
        loadAttendance,
    };
}
