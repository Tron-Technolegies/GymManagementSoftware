import React, { useState } from "react";
import { Plus } from "lucide-react";

import useBranches from "../hooks/useBranches";

import AlertMessage from "../Components/AlertMessage";
import ConfirmActionModal from "../Components/ConfirmActionModal";

import AddBranch from "../Components/Branches/AddBranch";
import BranchCard from "../Components/Branches/BranchCard";
import BranchMembers from "../Components/Branches/BranchMembers";

const Branches = () => {
  const {
    branches,
    addBranch,
    editBranch,
    removeBranch,
    members,
    fetchBranchMembers,
  } = useBranches();

  const user = JSON.parse(
    localStorage.getItem("adminUser") || "null"
  );

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    manager_name: "",
    capacity: "",
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [confirmConfig, setConfirmConfig] = useState({
    title: "",
    message: "",
    confirmText: "Confirm",
    type: "default",
    successMessage: "",
    action: null,
  });

  const [alertState, setAlertState] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      location: "",
      manager_name: "",
      capacity: "",
    });
  };

  const openBranchModal = async (branch) => {
    setSelectedBranch(branch);

    await fetchBranchMembers(branch.id);

    setShowBranchModal(true);
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

  // =========================
  // ADD
  // =========================

  const openAdd = () => {
    setEditing(null);
    resetForm();
    setShowForm(true);
  };

  // =========================
  // EDIT
  // =========================

  const openEdit = (branch) => {
    setEditing(branch);

    setFormData({
      name: branch.name || "",
      phone: branch.phone || "",
      location: branch.location || "",
      manager_name: branch.manager_name || "",
      capacity: branch.capacity || "",
    });

    setShowForm(true);
  };

  // =========================
  // CLOSE FORM
  // =========================

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    resetForm();
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = () => {
    if (editing) {
      openConfirmModal({
        title: "Update Branch",
        message: `Are you sure you want to update ${formData.name || "this branch"
          }?`,
        confirmText: "Update",
        type: "edit",
        successMessage: "Branch updated successfully!",

        action: async () => {
          await editBranch(editing.id, formData);
          closeForm();
        },
      });
    } else {
      openConfirmModal({
        title: "Add Branch",
        message: `Are you sure you want to add ${formData.name || "this branch"
          }?`,
        confirmText: "Save",
        type: "create",
        successMessage: "Branch added successfully!",

        action: async () => {
          await addBranch(formData);
          closeForm();
        },
      });
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (branch) => {
    openConfirmModal({
      title: "Delete Branch",
      message: `Are you sure you want to delete ${branch.name}?`,
      confirmText: "Delete",
      type: "delete",
      successMessage: "Branch deleted successfully!",

      action: async () => {
        await removeBranch(branch.id);
      },
    });
  };

  return (
    <div className="flex flex-col gap-8">

      {/* HEADER */}
      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-bold text-slate-900">
          Branches
        </h1>

        <button
          onClick={openAdd}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
        >
          <Plus size={18} />
          Add Branch
        </button>
      </div>

      <AddBranch
        isOpen={showForm}
        editing={editing}
        formData={formData}
        setFormData={setFormData}
        onClose={closeForm}
        onSubmit={handleSubmit}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            isSuperuser={user?.is_superuser}
            onClick={openBranchModal}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

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

      <BranchMembers
        isOpen={showBranchModal}
        branch={selectedBranch}
        members={members}
        onClose={() => {
          setShowBranchModal(false);
          setSelectedBranch(null);
        }}
      />

      {/* CONFIRM */}
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

export default Branches;