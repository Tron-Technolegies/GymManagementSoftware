
import { useCallback, useEffect, useState } from "react";
import {
    getBlockedMembers,
    getPlans,
    renewMember,
} from "../../api/dashboardapi";

const useBlockedMembers = (onRenewed, branchId = null) => {
    const [blockedMembers, setBlockedMembers] = useState([]);
    const [plans, setPlans] = useState([]);

    const [showRenewForm, setShowRenewForm] = useState(false);
    const [showRenewConfirm, setShowRenewConfirm] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [renewLoading, setRenewLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const [renewForm, setRenewForm] = useState({
        plan: "",
        expiry_date: "",
    });

    // Fetch blocked members for the selected branch.
    const fetchBlockedMembers = useCallback(async () => {
        try {
            const res = await getBlockedMembers(branchId);

            const data = res.data;
            const members = Array.isArray(data)
                ? data
                : data?.results ?? data?.blocked_members ?? [];

            setBlockedMembers(members);
        } catch (err) {
            console.error("Failed to fetch blocked members:", err);
        }
    }, [branchId]);

    const fetchPlans = useCallback(async () => {
        try {
            const res = await getPlans();
            setPlans(res.data || []);
        } catch (err) {
            console.error("Failed to fetch plans:", err);
        }
    }, []);

    useEffect(() => {
        fetchBlockedMembers();
    }, [fetchBlockedMembers]);

    useEffect(() => {
        fetchPlans();
    }, [fetchPlans]);

    useEffect(() => {
        if (!successMsg) return;

        const timer = setTimeout(() => setSuccessMsg(""), 3000);
        return () => clearTimeout(timer);
    }, [successMsg]);

    const openRenewModal = (member) => {
        setSelectedMember(member);
        setRenewForm({
            plan: "",
            expiry_date: "",
        });
        setShowRenewForm(true);
    };

    const closeRenewModal = () => {
        setShowRenewForm(false);
        setShowRenewConfirm(false);
        setSelectedMember(null);

        setRenewForm({
            plan: "",
            expiry_date: "",
        });
    };

    const handlePlanChange = (e) => {
        const selectedPlanId = e.target.value;

        const selectedPlan = plans.find(
            (p) => String(p.id) === String(selectedPlanId)
        );

        if (!selectedPlan) {
            setRenewForm({
                plan: selectedPlanId,
                expiry_date: "",
            });
            return;
        }

        const duration = Number(selectedPlan.duration || 0);
        const today = new Date();
        let baseDate = today;

        if (
            selectedMember?.expiry_date &&
            new Date(selectedMember.expiry_date) > today
        ) {
            baseDate = new Date(selectedMember.expiry_date);
        }

        const expiry = new Date(baseDate);
        expiry.setDate(expiry.getDate() + duration);

        // Use local date instead of UTC to avoid timezone date shifts.
        const year = expiry.getFullYear();
        const month = String(expiry.getMonth() + 1).padStart(2, "0");
        const day = String(expiry.getDate()).padStart(2, "0");

        setRenewForm({
            plan: selectedPlanId,
            expiry_date: `${year}-${month}-${day}`,
        });
    };

    const handleRenewSubmit = () => {
        if (!renewForm.plan) {
            window.alert("Please select a plan");
            return;
        }

        setShowRenewConfirm(true);
    };

    const confirmRenewMember = async () => {
        if (!selectedMember || !renewForm.plan) return;

        try {
            setRenewLoading(true);

            await renewMember(selectedMember.id, renewForm.plan);

            setSuccessMsg("Membership renewed successfully");
            closeRenewModal();

            await fetchBlockedMembers();

            if (onRenewed) {
                await onRenewed();
            }
        } catch (err) {
            console.error("Failed to renew membership:", err);
            window.alert("Failed to renew membership");
        } finally {
            setRenewLoading(false);
        }
    };

    return {
        blockedMembers,
        plans,
        showRenewForm,
        showRenewConfirm,
        selectedMember,
        renewLoading,
        successMsg,
        renewForm,
        openRenewModal,
        closeRenewModal,
        handlePlanChange,
        handleRenewSubmit,
        confirmRenewMember,
        setShowRenewConfirm,
    };
};

export default useBlockedMembers;
