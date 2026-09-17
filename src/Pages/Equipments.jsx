import React from "react";
import { Plus } from "lucide-react";

import useGymEquipment from "../hooks/useGymEquipment";
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

    const [showAddCard, setShowAddCard] = React.useState(false);

    const [formData, setFormData] = React.useState({
        name: "",
        branch_id: "",
    });

    const [editingEquipment, setEditingEquipment] = React.useState(null);

    const [alertState, setAlertState] = React.useState({
        show: false,
        message: "",
        type: "success",
    });

    const user = JSON.parse(
        localStorage.getItem("adminUser") || "null"
    );

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

    const resetForm = () => {

        setFormData({
            name: "",
            branch_id: "",
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

    // -----------------------------------------
    // ADD
    // -----------------------------------------

    const handleAddEquipment = () => {

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

    // -----------------------------------------
    // EDIT
    // -----------------------------------------

    const handleEdit = (equipmentItem) => {

        setEditingEquipment(equipmentItem);

        setFormData({
            id: equipmentItem.id,
            name: equipmentItem.name || "",
            branch_id: equipmentItem.branch?.id || "",
        });

        setShowAddCard(true);
    };

    // -----------------------------------------
    // UPDATE
    // -----------------------------------------

    const handleUpdateEquipment = () => {

        if (!editingEquipment) return;

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

    // -----------------------------------------
    // DELETE
    // -----------------------------------------

    const handleDelete = (equipmentItem) => {

        openConfirmModal({

            title: "Delete Equipment",

            message: `Are you sure you want to delete ${equipmentItem.name
                }?`,

            confirmText: "Delete",

            type: "delete",

            successMessage: "Equipment deleted successfully",

            action: async () => {

                await removeEquipment(
                    equipmentItem.id
                );
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
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                >
                    <Plus size={18} />

                    Add Equipment
                </button>

            </div>

            <EquipmentTable
                equipment={equipment}
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

                /*
                 * Pass your branch list here.
                 * Replace `user?.branches` with wherever
                 * your application already stores/fetches branches.
                 */
                branches={user?.branches || []}
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
                onCancel={() =>
                    setConfirmOpen(false)
                }
                onConfirm={handleConfirmAction}
            />

        </div>
    );
};

export default Equipments;