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
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                        className="border-slate-300 shadow-md p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    <input
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phone: e.target.value,
                            })
                        }
                        className="border-slate-300 shadow-md p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    <input
                        placeholder="Manager Name"
                        value={formData.manager_name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                manager_name: e.target.value,
                            })
                        }
                        className="border-slate-300 shadow-md p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    <input
                        placeholder="Capacity"
                        value={formData.capacity}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                capacity: e.target.value,
                            })
                        }
                        className="border-slate-300 shadow-md p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    <input
                        placeholder="Location"
                        value={formData.location}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                location: e.target.value,
                            })
                        }
                        className="border-slate-300 shadow-md p-2 rounded md:col-span-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    <div className="md:col-span-2 flex justify-end gap-3">

                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-slate-300 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onSubmit}
                            className="bg-yellow-600 text-white px-4 py-2 rounded-lg"
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