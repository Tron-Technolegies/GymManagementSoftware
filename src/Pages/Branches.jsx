
import React, { useState } from "react";
import { Plus } from "lucide-react";

import useBranches from "../hooks/useBranches";

import AlertMessage from "../Components/AlertMessage";
import ConfirmActionModal from "../Components/ConfirmActionModal";

import AddBranch from "../Components/Branches/AddBranch";
import BranchCard from "../Components/Branches/BranchCard";
import BranchMembers from "../Components/Branches/BranchMembers";

const createEmptyForm = () => ({
  name: "",
  phone: "",
  location: "",
  manager_name: "",
  capacity: "",
  admin_username: "",
  admin_password: "",
});

const Branches = () => {
  const {
    branches,
    addBranch,
    editBranch,
    removeBranch,
    members,
    membersLoading,
    fetchBranchMembers,
  } = useBranches();

  const user = JSON.parse(
    localStorage.getItem("adminUser") || "null"
  );

  const userRole = user?.role;

  const canAdd = userRole === "TENANT_ADMIN";

  const canEdit = ["TENANT_ADMIN", "BRANCH_ADMIN"].includes(
    userRole
  );

  const canDelete = userRole === "TENANT_ADMIN";

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState(createEmptyForm);

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
    setFormData(createEmptyForm());
  };



  const openBranchModal = async (branch) => {
    if (userRole !== "TENANT_ADMIN") return;

    setSelectedBranch(branch);

    try {
      await fetchBranchMembers(branch.id);
      setShowBranchModal(true);
    } catch (error) {
      setAlertState({
        show: true,
        message:
          error?.response?.data?.error ||
          "Failed to load branch members.",
        type: "error",
      });
    }
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
  const openAdd = () => {
    if (!canAdd) return;

    setEditing(null);
    resetForm();
    setShowForm(true);
  };

  // EDIT
  const openEdit = (branch) => {
    if (!canEdit) return;

    setEditing(branch);

    // Never prefill or submit admin credentials during branch editing.
    setFormData({
      name: branch.name || "",
      phone: branch.phone || "",
      location: branch.location || "",
      manager_name: branch.manager_name || "",
      capacity: branch.capacity ?? "",
      admin_username: "",
      admin_password: "",
    });

    setShowForm(true);
  };

  // CLOSE FORM
  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    resetForm();
  };

  // SUBMIT
  const handleSubmit = () => {
    if (editing) {
      if (!canEdit) return;

      const branchPayload = {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        manager_name: formData.manager_name,
        capacity: formData.capacity,
      };

      openConfirmModal({
        title: "Update Branch",
        message: `Are you sure you want to update ${formData.name || "this branch"
          }?`,
        confirmText: "Update",
        type: "edit",
        successMessage: "Branch updated successfully!",

        action: async () => {
          await editBranch(editing.id, branchPayload);
          closeForm();
        },
      });
    } else {
      if (!canAdd) return;

      const adminUsername = formData.admin_username?.trim();
      const adminPassword = formData.admin_password || "";

      if (!adminUsername) {
        setAlertState({
          show: true,
          message: "Enter a username for the Branch Admin.",
          type: "error",
        });
        return;
      }

      if (adminPassword.length < 8) {
        setAlertState({
          show: true,
          message: "Branch Admin password must be at least 8 characters.",
          type: "error",
        });
        return;
      }

      // Explicitly include the credentials in the create request.
      const branchPayload = {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        manager_name: formData.manager_name,
        capacity: formData.capacity,
        admin_username: adminUsername,
        admin_password: adminPassword,
      };

      openConfirmModal({
        title: "Add Branch",
        message: `Are you sure you want to add ${formData.name || "this branch"
          }?`,
        confirmText: "Save",
        type: "create",
        successMessage: "Branch added successfully!",

        action: async () => {
          await addBranch(branchPayload);
          closeForm();
        },
      });
    }
  };

  // DELETE
  const handleDelete = (branch) => {
    if (!canDelete) return;

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

        {canAdd && (
          <button
            onClick={openAdd}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
          >
            <Plus size={18} />
            Add Branch
          </button>
        )}
      </div>

      <AddBranch
        isOpen={showForm}
        editing={editing}
        formData={formData}
        setFormData={setFormData}
        onClose={closeForm}
        onSubmit={handleSubmit}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {branches.map((branch) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            userRole={userRole}
            onClick={
              userRole === "TENANT_ADMIN"
                ? openBranchModal
                : undefined
            }
            onEdit={canEdit ? openEdit : undefined}
            onDelete={canDelete ? handleDelete : undefined}
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
        loading={membersLoading}
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
