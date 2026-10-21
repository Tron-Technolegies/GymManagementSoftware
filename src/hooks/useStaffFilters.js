import { useEffect, useMemo, useState } from "react";

const useStaffFilters = (staffs = []) => {
    const [search, setSearch] = useState("");
    const [active, setActive] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const filteredStaffs = useMemo(() => {
        return staffs.filter((staff) => {
            const matchesStatus =
                active === "All" ||
                staff.status?.toLowerCase() ===
                active.toLowerCase();

            const query = search.toLowerCase().trim();

            const matchesSearch =
                staff.name
                    ?.toLowerCase()
                    .includes(query) ||
                staff.phone
                    ?.toString()
                    .includes(search);

            return matchesStatus && matchesSearch;
        });
    }, [staffs, search, active]);

    // Reset pagination when search, status, or branch-filtered
    // staff data changes.
    useEffect(() => {
        setCurrentPage(1);
    }, [search, active, staffs]);

    const paginatedStaffs = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = currentPage * itemsPerPage;

        return filteredStaffs.slice(start, end);
    }, [filteredStaffs, currentPage]);

    return {
        search,
        setSearch,
        active,
        setActive,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        filteredStaffs,
        paginatedStaffs,
    };
};

export default useStaffFilters;