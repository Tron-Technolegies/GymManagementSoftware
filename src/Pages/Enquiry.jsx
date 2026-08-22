import React from "react";
import { Plus } from "lucide-react";

import useEnquiry from "../hooks/useEnquiry";
import usePlans from "../hooks/plans";
import AddEnquiry from "../Components/Enquiry/AddEnquiry";
import EnquiryTable from "../Components/Enquiry/EnquiryTable"
import AlertMessage from "../Components/AlertMessage";
import ConfirmActionModal from "../Components/ConfirmActionModal";

const Enquiry = () => {
    const {
        enquiries,
        loading,
        addEnquiries,
        removeEnquiries,
    } = useEnquiry();

    const { plans } = usePlans();

    const [showAddCard, setShowAddCard] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: "",
        phone: "",
        plan: "",
        date: "",
    });

    const [alertState, setAlertState] = React.useState({
        show: false,
        message: "",
        type: "success",
    });

    const user = JSON.parse(
        localStorage.getItem("adminUser") || "null"
    );

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

    const resetForm = () => {
        setFormData({
            name: "",
            phone: "",
            plan: "",
            date: "",
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
            console.error(error);

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
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                    <Plus size={18} />
                    Add Enquiry
                </button>
            </div>

            <EnquiryTable
                enquiries={enquiries}
                loading={loading}
                isSuperuser={user?.is_superuser}
                onDelete={handleDelete} />

            <AddEnquiry
                isOpen={showAddCard}
                formData={formData}
                setFormData={setFormData}
                plans={plans}
                onClose={closeAddCard}
                onSubmit={handleAddEnquiry} />

            <AlertMessage
                show={alertState.show}
                message={alertState.message}
                type={alertState.type}
                onClose={() =>
                    setAlertState((prev) => ({
                        ...prev,
                        show: false,
                    }))} />

            {/* Confirmation */}
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