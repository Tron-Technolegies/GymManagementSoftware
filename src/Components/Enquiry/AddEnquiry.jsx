import React from "react";

const AddEnquiry = ({
    isOpen,
    formData,
    setFormData,
    plans,
    onClose,
    onSubmit,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">

            <div className="w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl p-8">
                <h2 className="text-lg font-semibold mb-5">
                    Add Enquiry
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name
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
                            className="w-full border border-slate-200 shadow-lg rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Phone
                        </label>

                        <input
                            type="tel"
                            maxLength={10}
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    phone: e.target.value.replace(
                                        /\D/g,
                                        ""
                                    ),
                                })
                            }
                            className="w-full border border-slate-200 shadow-lg rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />

                        {formData.phone.length > 0 &&
                            formData.phone.length < 10 && (
                                <p className="text-yellow-500 text-sm mt-1">
                                    Phone number must be 10 digits.
                                </p>
                            )}
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-600">
                            PLAN
                        </label>

                        <select
                            value={formData.plan}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    plan: e.target.value,
                                })
                            }
                            className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                            <option value="">
                                Select Plan
                            </option>

                            {plans.map((plan) => (
                                <option
                                    key={plan.id}
                                    value={plan.id}>
                                    {plan.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Date
                        </label>

                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    date: e.target.value,
                                })
                            }
                            className="w-full border border-slate-200 shadow-lg rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-300 rounded-lg">
                        Cancel
                    </button>

                    <button
                        onClick={onSubmit}
                        className="bg-yellow-500 text-white px-5 py-2 rounded-lg">
                        Confirm
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AddEnquiry;