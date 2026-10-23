import { useState } from "react";
import usePlans from "../hooks/plans";

import { Plus, Edit2, Trash2, BadgeCheck } from "lucide-react";
import AlertMessage from "../Components/AlertMessage";
import ConfirmActionModal from "../Components/ConfirmActionModal";
import AddPlan from "../Components/Plans/AddPlan";
import UpdatePlan from "../Components/Plans/UpdatePlan";

export default function Plans() {
  const {
    plans,
    addPlan,
    editPlan,
    removePlan,
  } = usePlans();

  const user = JSON.parse(
    localStorage.getItem("adminUser") || "null"
  );

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
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

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
  });

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
        message: "Operation failed",
        type: "error",
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);

    setFormData({
      name: "",
      price: "",
      duration: "",
    });

    setShowForm(true);
  };

  const openEdit = (plan) => {
    setEditing(plan);

    setFormData({
      name: plan.name || "",
      price: plan.price || "",
      duration: plan.duration || "",
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);

    setFormData({
      name: "",
      price: "",
      duration: "",
    });
  };

  const handleAdd = () => {
    openConfirmModal({
      title: "Add Plan",
      message: `Are you sure you want to add ${formData.name || "this plan"
        }?`,
      confirmText: "Save",
      type: "create",
      successMessage: "Plan added successfully!",

      action: async () => {
        await addPlan(formData);
        closeForm();
      },
    });
  };

  const handleUpdate = () => {
    openConfirmModal({
      title: "Update Plan",
      message: `Are you sure you want to update ${formData.name || "this plan"
        }?`,
      confirmText: "Update",
      type: "edit",
      successMessage: "Plan updated successfully!",

      action: async () => {
        await editPlan(editing.id, formData);
        closeForm();
      },
    });
  };

  const handleDelete = (plan) => {
    openConfirmModal({
      title: "Delete Plan",
      message: `Are you sure you want to delete ${plan.name}?`,
      confirmText: "Delete",
      type: "delete",
      successMessage: "Plan deleted successfully!",

      action: async () => {
        await removePlan(plan.id);
      },
    });
  };

  return (
    <div className="flex flex-col gap-8">

      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-bold">Plans</h1>

        {["SUPER_ADMIN", "TENANT_ADMIN"].includes(user?.role) && (
          <button
            onClick={openAdd}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
          >
            <Plus size={18} />
            Add Plan
          </button>
        )}

      </div>

      {showForm && !editing && (
        <AddPlan
          formData={formData}
          setFormData={setFormData}
          onClose={closeForm}
          onSubmit={handleAdd}
        />
      )}

      {showForm && editing && (
        <UpdatePlan
          formData={formData}
          setFormData={setFormData}
          onClose={closeForm}
          onSubmit={handleUpdate}
        />
      )}



      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className="flex min-w-0 flex-col overflow-hidden
                rounded-2xl border border-yellow-200
                border-b-4 border-b-yellow-400 bg-white
                shadow-sm transition-all duration-200
                hover:border-yellow-300 hover:shadow-md"
          >
            {/* Yellow Header */}
            <div className="flex min-w-0 items-center justify-between
                gap-2 bg-yellow-50 px-4 py-3">

              {/* Plan Icon and Name */}
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center
                        justify-center rounded-xl bg-yellow-100">
                  <BadgeCheck
                    size={20}
                    className="text-yellow-600"
                  />
                </div>

                <h3 className="min-w-0 truncate text-base
                        font-bold text-slate-800">
                  {p.name}
                </h3>
              </div>

              {/* Action Icons - Right Side */}
              {["SUPER_ADMIN", "TENANT_ADMIN"].includes(user?.role) && (
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    aria-label={`Edit ${p.name}`}
                    onClick={() => openEdit(p)}
                    className="flex h-8 w-8 items-center
                                justify-center rounded-lg
                                text-yellow-700 transition
                                hover:bg-yellow-200"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    type="button"
                    aria-label={`Delete ${p.name}`}
                    onClick={() => handleDelete(p)}
                    className="flex h-8 w-8 items-center
                                justify-center rounded-lg
                                text-red-500 transition
                                hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Price Section */}
            <div className="flex flex-1 flex-col justify-center
                bg-white px-4 py-4">
              <div className="text-2xl font-extrabold text-yellow-600">
                ₹{p.price}
              </div>

              <div className="mt-1 text-sm font-medium text-slate-500">
                {p.duration} days
              </div>

            </div>
          </div>
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
}