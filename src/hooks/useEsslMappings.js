import { useCallback, useEffect, useMemo, useState } from "react";

import {
    getEsslMappings,
    linkEsslMember,
    linkEsslStaff,
    unlinkEsslEmployee,
    syncEsslEmployees,
} from "../api/essl";

import { getMembers } from "../api/members";
import { getStaffs } from "../api/staffs";

const getRows = (response) => {
    const data = response?.data;

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data?.members)) return data.members;
    if (Array.isArray(data?.staffs)) return data.staffs;

    return [];
};

const getErrorMessage = (error) =>
    error?.response?.data?.error ||
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong.";

export default function useEsslMappings() {
    const [mappings, setMappings] = useState([]);
    const [members, setMembers] = useState([]);
    const [staffs, setStaffs] = useState([]);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [savingId, setSavingId] = useState(null);

    const [selectedTypes, setSelectedTypes] = useState({});
    const [selectedPeople, setSelectedPeople] = useState({});

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Load biometric mappings, members, and staff.
    const loadData = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const [mappingRes, memberRes, staffRes] = await Promise.all([
                getEsslMappings(),
                getMembers(),
                getStaffs(),
            ]);

            setMappings(getRows(mappingRes));
            setMembers(getRows(memberRes));
            setStaffs(getRows(staffRes));

            return true;
        } catch (err) {
            setError(getErrorMessage(err));
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // KPI counts.
    const counts = useMemo(() => {
        const linked = mappings.filter(
            (item) => item.member || item.staff
        ).length;

        return {
            total: mappings.length,
            linked,
            unlinked: mappings.length - linked,
        };
    }, [mappings]);

    // Search and filter.
    const filteredMappings = useMemo(() => {
        const query = search.trim().toLowerCase();

        return mappings.filter((item) => {
            const code = String(
                item.essl_employee_code ??
                item.employee_code ??
                ""
            ).toLowerCase();

            const name = String(
                item.essl_employee_name ??
                item.employee_name ??
                ""
            ).toLowerCase();

            const isLinked = Boolean(item.member || item.staff);
            const isActive = item.is_active !== false;

            const matchesSearch =
                !query ||
                code.includes(query) ||
                name.includes(query);

            const matchesFilter =
                filter === "all" ||
                (filter === "linked" && isLinked) ||
                (filter === "unlinked" && !isLinked) ||
                (filter === "active" && isActive) ||
                (filter === "inactive" && !isActive);

            return matchesSearch && matchesFilter;
        });
    }, [mappings, search, filter]);

    // Link an eSSL employee to a member or staff.
    const linkPerson = async (mapping) => {
        const id = mapping.id;
        const type = selectedTypes[id] || "member";
        const personId = selectedPeople[id];

        if (!personId) {
            setError("Please select a member or staff.");
            return false;
        }

        setSavingId(id);
        setError("");
        setMessage("");

        try {
            if (type === "member") {
                await linkEsslMember(id, personId);
            } else if (type === "staff") {
                await linkEsslStaff(id, personId);
            } else {
                setError("Please select a valid person type.");
                return false;
            }

            setMessage(
                mapping.member || mapping.staff
                    ? "Biometric employee mapping updated successfully."
                    : "Biometric employee linked successfully."
            );

            // The link API succeeded. Refresh the displayed data.
            await loadData();

            return true;
        } catch (err) {
            setError(getErrorMessage(err));
            return false;
        } finally {
            setSavingId(null);
        }
    };

    // Unlink an eSSL employee from the linked member or staff.
    const unlinkPerson = async (mapping) => {
        const id = mapping.id;

        if (!mapping.member && !mapping.staff) {
            setError("This biometric employee is not linked.");
            return false;
        }

        setSavingId(id);
        setError("");
        setMessage("");

        try {
            await unlinkEsslEmployee(id);

            setSelectedTypes((previous) => {
                const updated = { ...previous };
                delete updated[id];
                return updated;
            });

            setSelectedPeople((previous) => {
                const updated = { ...previous };
                delete updated[id];
                return updated;
            });

            setMessage("Biometric employee unlinked successfully.");

            // The unlink API succeeded. Refresh the displayed data.
            await loadData();

            return true;
        } catch (err) {
            setError(getErrorMessage(err));
            return false;
        } finally {
            setSavingId(null);
        }
    };

    // Synchronize employees from eSSL.

    const syncEmployees = async () => {
        if (syncing) return;

        setSyncing(true);
        setError("");
        setMessage("");

        try {
            const response = await syncEsslEmployees();
            const result = response?.data ?? {};

            // Refresh mappings even when some employees failed.
            await loadData();

            const total = Number(result.total_codes ?? 0);
            const syncedCount = Number(result.synced ?? 0);
            const failedCount = Number(result.failed_count ?? 0);

            if (total === 0) {
                setMessage(
                    "No employee codes were returned by eSSL."
                );
            } else if (failedCount > 0 && syncedCount > 0) {
                setMessage(
                    `Partial sync: ${syncedCount} of ${total} employees synced; ${failedCount} failed.`
                );
            } else if (failedCount > 0 && syncedCount === 0) {
                setError(
                    result.error ||
                    `Sync failed: ${failedCount} employee(s) could not be synced.`
                );
            } else {
                setMessage(
                    result.message ||
                    `Successfully synced ${syncedCount} employee(s).`
                );
            }

            return result;
        } catch (err) {
            setError(getErrorMessage(err));
            return null;
        } finally {
            setSyncing(false);
        }
    };


    const dismissMessage = () => setMessage("");
    const dismissError = () => setError("");

    return {
        mappings,
        members,
        staffs,

        search,
        setSearch,
        filter,
        setFilter,

        loading,
        syncing,
        savingId,

        selectedTypes,
        setSelectedTypes,
        selectedPeople,
        setSelectedPeople,

        counts,
        filteredMappings,

        message,
        error,

        linkPerson,
        unlinkPerson,
        syncEmployees,
        loadData,

        dismissMessage,
        dismissError,
    };
}