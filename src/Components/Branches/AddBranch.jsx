
import React from "react";

const AddBranch = ({
    isOpen,
    editing,
    formData,
    setFormData,
    onClose,
    onSubmit,
}) => {
    if (!isOpen) return null;

    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 sm:p-6">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white p-6 sm:p-8 rounded-xl border border-slate-300 shadow-2xl">
                <div className="flex justify-between mb-6">
                    <h2 className="font-bold text-lg">
                        {editing ? "Update Branch" : "New Branch"}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        placeholder="Branch Name"
                        value={formData.name || ""}
                        onChange={(e) =>
                            updateField("name", e.target.value)
                        }
                        className="border-slate-300 shadow-md p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    <input
                        placeholder="Phone"
                        type="tel"
                        maxLength={10}
                        value={formData.phone || ""}
                        onChange={(e) =>
                            updateField(
                                "phone",
                                e.target.value.replace(/\D/g, "").slice(0, 10)
                            )
                        }
                        className="border-slate-300 shadow-md p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    <input
                        placeholder="Manager Name"
                        value={formData.manager_name || ""}
                        onChange={(e) =>
                            updateField("manager_name", e.target.value)
                        }
                        className="border-slate-300 shadow-md p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    <input
                        placeholder="Capacity"
                        type="number"
                        min="1"
                        value={formData.capacity ?? ""}
                        onChange={(e) =>
                            updateField("capacity", e.target.value)
                        }
                        className="border-slate-300 shadow-md p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    <input
                        placeholder="Location"
                        value={formData.location || ""}
                        onChange={(e) =>
                            updateField("location", e.target.value)
                        }
                        className="border-slate-300 shadow-md p-2 rounded md:col-span-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    {!editing && (
                        <>
                            <div className="md:col-span-2 border-t border-slate-200 pt-5">
                                <h3 className="font-semibold text-base">
                                    Branch Admin Credentials
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    These credentials will be used by the
                                    administrator to log in to this branch.
                                </p>
                            </div>

                            <input
                                placeholder="Admin Username"
                                autoComplete="off"
                                value={formData.admin_username || ""}
                                onChange={(e) =>
                                    updateField(
                                        "admin_username",
                                        e.target.value
                                    )
                                }
                                className="border-slate-300 shadow-md p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />

                            <input
                                placeholder="Admin Password (min. 8 characters)"
                                type="password"
                                autoComplete="new-password"
                                value={formData.admin_password || ""}
                                onChange={(e) =>
                                    updateField(
                                        "admin_password",
                                        e.target.value
                                    )
                                }
                                className="border-slate-300 shadow-md p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </>
                    )}

                    <div className="md:col-span-2 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-slate-300 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={onSubmit}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                        >
                            {editing ? "Update" : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBranch;
