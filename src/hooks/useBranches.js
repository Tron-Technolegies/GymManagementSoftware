
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
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // FETCH BRANCH MEMBERS
    const fetchBranchMembers = async (branchId) => {
        setMembersLoading(true);
        setMembers([]);

        try {
            const res = await getBranchMembers(branchId);
            setMembers(res.data.members || []);
        } catch (error) {
            console.error("Failed to fetch branch members:", error);
            setMembers([]);
            throw error;
        } finally {
            setMembersLoading(false);
        }
    };

    // CREATE BRANCH + BRANCH ADMIN CREDENTIALS
    const addBranch = async (data) => {
        const payload = {
            name: data.name,
            phone: data.phone,
            location: data.location,
            manager_name: data.manager_name,
            capacity: data.capacity,
            admin_username: data.admin_username,
            admin_password: data.admin_password,
        };

        await createBranch(payload);
        await fetchBranches();
    };

    // UPDATE BRANCH
    const editBranch = async (id, data) => {
        await updateBranch(id, data);
        await fetchBranches();
    };

    // DELETE BRANCH
    const removeBranch = async (id) => {
        await deleteBranch(id);

        setBranches((prev) =>
            prev.filter((branch) => branch.id !== id)
        );
    };

    // INITIAL FETCH
    useEffect(() => {
        fetchBranches().catch(() => { });
    }, []);

    return {
        branches,
        loading,
        fetchBranches,
        addBranch,
        editBranch,
        removeBranch,
        members,
        membersLoading,
        fetchBranchMembers,
    };
}
