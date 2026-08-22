import { useEffect, useState } from "react";
import {
    getBlockedMembers,
    getPlans,
    renewMember,
} from "../../api/dashboardapi"

// pass onRenewed to let the parent refresh things that depend on a
// successful renew (e.g. expiring members list, kpi stats)
const useBlockedMembers = (onRenewed) => {

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


    const fetchBlockedMembers = async () => {

        try {

            const res = await getBlockedMembers();

            setBlockedMembers(res.data);

        } catch (err) {

            console.log(err);

        }

    };


    const fetchPlans = async () => {

        try {

            const res = await getPlans();

            setPlans(res.data || []);

        } catch (err) {

            console.log("Failed to fetch plans", err);

        }

    };


    useEffect(() => {

        fetchBlockedMembers();
        fetchPlans();

    }, []);


    useEffect(() => {

        if (successMsg) {

            const timer = setTimeout(() => setSuccessMsg(""), 3000);

            return () => clearTimeout(timer);

        }

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

        const selectedPlanName = e.target.value;

        const selectedPlan = plans.find(
            (p) => p.name === selectedPlanName
        );

        if (!selectedPlan) {

            setRenewForm({
                plan: selectedPlanName,
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

        setRenewForm({
            plan: selectedPlanName,
            expiry_date: expiry.toISOString().split("T")[0],
        });

    };


    const handleRenewSubmit = () => {

        if (!renewForm.plan) {

            alert("Please select a plan");

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

            fetchBlockedMembers();

            if (onRenewed) onRenewed();

        } catch (err) {

            console.log(err);

            alert("Failed to renew membership");

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