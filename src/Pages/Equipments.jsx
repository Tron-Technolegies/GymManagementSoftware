import React from "react";
import { Plus } from "lucide-react";

import useGymEquipment from "../hooks/useGymEquipment";
import useBranches from "../hooks/useBranches";

import AddEquipment from "../Components/Equipment/AddEquipment";
import EquipmentTable from "../Components/Equipment/EquipmentTable";
import AlertMessage from "../Components/AlertMessage";
import ConfirmActionModal from "../Components/ConfirmActionModal";

const Equipments = () => {
    const {
        equipment,
        loading,
        addEquipment,
        editEquipment,
        removeEquipment,
    } = useGymEquipment();

    // Fetch branches using the existing hook
    const { branches = [] } = useBranches();

    const [showAddCard, setShowAddCard] = React.useState(false);
    const [selectedBranchId, setSelectedBranchId] =
        React.useState("all");

    const [formData, setFormData] = React.useState({
        name: "",
        quantity: 1,
        weight: "",
        branch_id: "",
        is_available: true,
    });

    const [editingEquipment, setEditingEquipment] =
        React.useState(null);

    const [alertState, setAlertState] = React.useState({
        show: false,
        message: "",
        type: "success",
    });

    const user = React.useMemo(() => {
        try {
            return JSON.parse(
                localStorage.getItem("adminUser") || "null"
            );
        } catch {
            return null;
        }
    }, []);

    const userRole = user?.role;

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

    // Branch filtering
    const filteredEquipment =
        userRole === "TENANT_ADMIN" &&
            selectedBranchId !== "all"
            ? equipment.filter(
                (item) =>
                    String(item.branch_id ?? item.branch?.id ?? "") ===
                    String(selectedBranchId)
            )
            : equipment;

    const resetForm = () => {
        setFormData({
            name: "",
            quantity: 1,
            weight: "",
            branch_id: "",
            is_available: true,
        });

        setEditingEquipment(null);
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

    // ADD
    const handleAddEquipment = () => {
        if (!formData.name.trim()) {
            setAlertState({
                show: true,
                message: "Please enter the equipment name.",
                type: "error",
            });
            return;
        }

        if (
            userRole === "TENANT_ADMIN" &&
            !formData.branch_id
        ) {
            setAlertState({
                show: true,
                message: "Please select a branch.",
                type: "error",
            });
            return;
        }

        openConfirmModal({
            title: "Add Equipment",
            message: `Are you sure you want to add ${formData.name || "this equipment"
                }?`,
            confirmText: "Save",
            type: "add",
            successMessage: "Equipment added successfully",
            action: async () => {
                await addEquipment(formData);
                setShowAddCard(false);
                resetForm();
            },
        });
    };

    // EDIT
    const handleEdit = (equipmentItem) => {
        setEditingEquipment(equipmentItem);

        setFormData({
            id: equipmentItem.id,
            name: equipmentItem.name || "",
            quantity: equipmentItem.quantity ?? 1,
            weight: equipmentItem.weight ?? "",
            branch_id:
                equipmentItem.branch_id ??
                equipmentItem.branch?.id ??
                "",
            is_available: equipmentItem.is_available ?? true,
        });

        setShowAddCard(true);
    };

    // UPDATE
    const handleUpdateEquipment = () => {
        if (!editingEquipment) return;

        if (!formData.name.trim()) {
            setAlertState({
                show: true,
                message: "Please enter the equipment name.",
                type: "error",
            });
            return;
        }

        openConfirmModal({
            title: "Update Equipment",
            message: `Are you sure you want to update ${formData.name || "this equipment"
                }?`,
            confirmText: "Update",
            type: "add",
            successMessage: "Equipment updated successfully",
            action: async () => {
                await editEquipment(
                    editingEquipment.id,
                    formData
                );

                setShowAddCard(false);
                resetForm();
            },
        });
    };

    // DELETE
    const handleDelete = (equipmentItem) => {
        openConfirmModal({
            title: "Delete Equipment",
            message: `Are you sure you want to delete ${equipmentItem.name}?`,
            confirmText: "Delete",
            type: "delete",
            successMessage: "Equipment deleted successfully",
            action: async () => {
                await removeEquipment(equipmentItem.id);
            },
        });
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    Gym Equipment
                </h1>

                <button
                    onClick={() => {
                        resetForm();
                        setShowAddCard(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                >
                    <Plus size={18} />
                    Add Equipment
                </button>
            </div>

            {/* TENANT ADMIN BRANCH FILTER */}
            {userRole === "TENANT_ADMIN" && (
                <select
                    value={selectedBranchId}
                    onChange={(e) =>
                        setSelectedBranchId(e.target.value)
                    }
                    className="rounded-lg border border-slate-300 px-4 py-2"
                >
                    <option value="all">All Branches</option>

                    {branches.map((branch) => (
                        <option
                            key={branch.id}
                            value={branch.id}
                        >
                            {branch.name}
                        </option>
                    ))}
                </select>
            )}

            <EquipmentTable
                equipment={filteredEquipment}
                loading={loading}
                userRole={userRole}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AddEquipment
                isOpen={showAddCard}
                formData={formData}
                setFormData={setFormData}
                onClose={closeAddCard}
                onSubmit={
                    editingEquipment
                        ? handleUpdateEquipment
                        : handleAddEquipment
                }
                userRole={userRole}
                branches={branches}
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

export default Equipments;