import { useEffect, useState } from "react";

import {
    getBranches,
    createBranch,
    updateBranch,
    deleteBranch,
} from "../api/branches";

import { getBranchMembers } from "../api/branch_members";

export default function useBranches() {
    const [branches, setBranches] = useState([]);
    const [members, setMembers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [membersLoading, setMembersLoading] = useState(false);

    // FETCH BRANCHES
    const fetchBranches = async () => {
        setLoading(true);

        try {
            const res = await getBranches();
            setBranches(res.data);
        } catch (error) {
            console.error("Error fetching branches:", error);
        } finally {
            setLoading(false);
        }
    };

    // CREATE BRANCH
    const addBranch = async (data) => {
        await createBranch(data);
        await fetchBranches();
    };

    // UPDATE BRANCH
    const editBranch = async (id, data) => {
        await updateBranch(id, data);
        await fetchBranches();
    };

    // =========================
    // DELETE BRANCH
    // =========================
    const removeBranch = async (id) => {
        await deleteBranch(id);

        setBranches((prev) =>
            prev.filter((branch) => branch.id !== id)
        );
    };

    // FETCH BRANCH MEMBERS
    const fetchBranchMembers = async (branchId) => {
        setMembersLoading(true);

        try {
            const res = await getBranchMembers(branchId);

            setMembers(res.data.customers || []);
        } catch (error) {
            console.error(
                "Failed to fetch branch members:",
                error
            );

            setMembers([]);
        } finally {
            setMembersLoading(false);
        }
    };

    // INITIAL FETCH
    useEffect(() => {
        fetchBranches();
    }, []);

    return {
        // Branches
        branches,
        loading,
        fetchBranches,
        addBranch,
        editBranch,
        removeBranch,

        // Branch members
        members,
        membersLoading,
        fetchBranchMembers,
    };
}