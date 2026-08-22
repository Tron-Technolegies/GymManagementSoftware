import { useState } from "react";
import usePlans from "../hooks/plans";

import { Plus, Edit2, Trash2 } from "lucide-react";

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

        <button
          onClick={openAdd}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
        >
          <Plus size={18} />Add Plan
        </button>

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

      <div className="grid md:grid-cols-3 gap-6">

        {plans.map((p) => (
          <div
            key={p.id}
            className="bg-white p-6 rounded-xl border border-slate-300 shadow-md">
            <div className="flex justify-between">
              <h3 className="font-bold">{p.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(p)}
                  className="p-2 rounded-md hover:bg-yellow-100">
                  <Edit2
                    size={16}
                    className="text-yellow-600" />
                </button>

                {user?.is_superuser && (
                  <button
                    onClick={() => handleDelete(p)}
                    className="p-2 rounded-md hover:bg-red-100"
                  >
                    <Trash2
                      size={16}
                      className="text-red-600"
                    />
                  </button>
                )}

              </div>
            </div>

            <div className="mt-4 font-semibold">₹{p.price} / {p.duration} days</div>

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