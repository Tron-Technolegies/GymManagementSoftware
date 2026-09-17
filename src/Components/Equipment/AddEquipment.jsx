import React from "react";

const AddEquipment = ({
    isOpen,
    formData,
    setFormData,
    onClose,
    onSubmit,
    userRole,
    branches = [],
}) => {
    if (!isOpen) return null;

    const isTenantAdmin = userRole === "TENANT_ADMIN";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">

            <div className="w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl p-8">

                <h2 className="text-lg font-semibold mb-5">
                    {formData.id ? "Update Equipment" : "Add Equipment"}
                </h2>

                <div className="grid grid-cols-1 gap-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Equipment Name
                        </label>

                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            placeholder="Enter equipment name"
                            className="w-full border border-slate-200 shadow-lg rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* TENANT ADMIN ONLY */}
                    {isTenantAdmin && !formData.id && (
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Branch
                            </label>

                            <select
                                value={formData.branch_id || ""}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        branch_id: e.target.value,
                                    })
                                }
                                className="w-full border border-slate-200 shadow-lg rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="">
                                    Select Branch
                                </option>

                                {branches.map((branch) => (
                                    <option
                                        key={branch.id}
                                        value={branch.id}
                                    >
                                        {branch.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                </div>

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-300 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onSubmit}
                        className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
                    >
                        {formData.id ? "Update" : "Confirm"}
                    </button>

                </div>

            </div>
        </div>
    );
};

export default AddEquipment;