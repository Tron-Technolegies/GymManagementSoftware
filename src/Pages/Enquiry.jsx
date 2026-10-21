
import React from "react";
import { Plus } from "lucide-react";

import useEnquiry from "../hooks/useEnquiry";
import usePlans from "../hooks/plans";
import useBranches from "../hooks/useBranches";

import AddEnquiry from "../Components/Enquiry/AddEnquiry";
import EnquiryTable from "../Components/Enquiry/EnquiryTable";
import AlertMessage from "../Components/AlertMessage";
import ConfirmActionModal from "../Components/ConfirmActionModal";

const Enquiry = () => {
    const user = JSON.parse(
        localStorage.getItem("adminUser") || "null"
    );

    const {
        enquiries,
        loading,
        addEnquiries,
        removeEnquiries,
        fetchEnquiries,
    } = useEnquiry();

    const { plans = [] } = usePlans();
    const { branches = [] } = useBranches();

    const [showAddCard, setShowAddCard] = React.useState(false);

    const [formData, setFormData] = React.useState({
        name: "",
        phone: "",
        plan: "",
        date: "",
        branch_id: "",
    });

    const [selectedBranchId, setSelectedBranchId] =
        React.useState("all");

    const [alertState, setAlertState] = React.useState({
        show: false,
        message: "",
        type: "success",
    });

    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const [confirmConfig, setConfirmConfig] = React.useState({
        title: "",
        message: "",
        confirmText: "Confirm",
        type: "default",
        successMessage: "",
        action: null,
    });

    // Fetch enquiries whenever the tenant admin changes the branch filter.
    React.useEffect(() => {
        const branchId =
            user?.role === "TENANT_ADMIN" &&
                selectedBranchId !== "all"
                ? selectedBranchId
                : "";

        fetchEnquiries(branchId).catch((error) => {
            console.error("Failed to fetch enquiries:", error);
        });
    }, [selectedBranchId, user?.role, fetchEnquiries]);

    const resetForm = () => {
        setFormData({
            name: "",
            phone: "",
            plan: "",
            date: "",
            branch_id: "",
        });
    };

    const closeAddCard = () => {
        setShowAddCard(false);
        resetForm();
    };

    const openConfirmModal = ({
        title,
        message,
        confirmText = "Confirm",
        type = "default",
        successMessage = "Operation completed successfully",
        action,
    }) => {
        setConfirmConfig({
            title,
            message,
            confirmText,
            type,
            successMessage,
            action,
        });

        setConfirmOpen(true);
    };

    const handleConfirmAction = async () => {
        if (!confirmConfig.action) return;

        try {
            setConfirmLoading(true);

            await confirmConfig.action();

            setAlertState({
                show: true,
                message: confirmConfig.successMessage,
                type: "success",
            });

            setConfirmOpen(false);
        } catch (error) {
            console.error("Enquiry action failed:", error);

            setAlertState({
                show: true,
                message:
                    error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Operation failed",
                type: "error",
            });
        } finally {
            setConfirmLoading(false);
        }
    };

    const handleDelete = (enquiry) => {
        openConfirmModal({
            title: "Delete Enquiry",
            message: `Are you sure you want to delete ${enquiry.name}?`,
            confirmText: "Delete",
            type: "delete",
            successMessage: "Enquiry deleted successfully",
            action: async () => {
                await removeEnquiries(enquiry.id);
            },
        });
    };

    const handleAddEnquiry = () => {
        openConfirmModal({
            title: "Add Enquiry",
            message: `Are you sure you want to add ${formData.name || "this enquiry"
                }?`,
            confirmText: "Save",
            type: "add",
            successMessage: "Enquiry added successfully",
            action: async () => {
                await addEnquiries(formData);

                setShowAddCard(false);
                resetForm();

                // Refresh the list using the currently selected branch.
                const branchId =
                    user?.role === "TENANT_ADMIN" &&
                        selectedBranchId !== "all"
                        ? selectedBranchId
                        : "";

                await fetchEnquiries(branchId);
            },
        });
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    Enquiries
                </h1>

                <button
                    onClick={() => setShowAddCard(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                >
                    <Plus size={18} />
                    Add Enquiry
                </button>
            </div>

            {user?.role === "TENANT_ADMIN" && (
                <select
                    value={selectedBranchId}
                    onChange={(e) =>
                        setSelectedBranchId(e.target.value)
                    }
                    className="rounded-lg border border-slate-300 px-4 py-2"
                >
                    <option value="all">All Branches</option>

                    {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                            {branch.name}
                        </option>
                    ))}
                </select>
            )}

            <EnquiryTable
                enquiries={enquiries}
                loading={loading}
                canDelete={["TENANT_ADMIN", "BRANCH_ADMIN"].includes(user?.role)}
                onDelete={handleDelete}
            />

            <AddEnquiry
                isOpen={showAddCard}
                formData={formData}
                setFormData={setFormData}
                plans={plans}
                branches={branches}
                userRole={user?.role}
                onClose={closeAddCard}
                onSubmit={handleAddEnquiry}
            />

            <AlertMessage
                show={alertState.show}
                message={alertState.message}
                type={alertState.type}
                onClose={() =>
                    setAlertState((prev) => ({
                        ...prev,
                        show: false,
                    }))
                }
            />

            <ConfirmActionModal
                isOpen={confirmOpen}
                title={confirmConfig.title}
                message={confirmConfig.message}
                confirmText={confirmConfig.confirmText}
                type={confirmConfig.type}
                loading={confirmLoading}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={handleConfirmAction}
            />
        </div>
    );
};

export default Enquiry;
