import React, { useEffect, useState } from "react";
import ConfirmActionModal from "../ConfirmActionModal";
import { getBranches } from "../../api/branches";

const Add_expense = ({ onClose, onSubmit }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState("");

    // Read the logged-in user's role safely
    const getAdminUser = () => {
        try {
            return JSON.parse(localStorage.getItem("adminUser") || "{}");
        } catch {
            return {};
        }
    };

    const adminUser = getAdminUser();
    const isTenantAdmin = adminUser?.role === "TENANT_ADMIN";

    const [formData, setFormData] = useState({
        title: "",
        name: "",
        phone: "",
        category: "misc",
        description: "",
        amount: "",
        payment_method: "cash",
        date: "",
    });

    // Fetch branches only for tenant admin
    useEffect(() => {
        if (!isTenantAdmin) return;

        const fetchBranches = async () => {
            try {
                const response = await getBranches();
                const data = response.data;

                const branchList = Array.isArray(data)
                    ? data
                    : data?.results ?? data?.branches ?? [];

                setBranches(branchList);
            } catch (error) {
                console.error("Failed to fetch branches:", error);
            }
        };

        fetchBranches();
    }, [isTenantAdmin]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setFormData({
            title: "",
            name: "",
            phone: "",
            category: "misc",
            description: "",
            amount: "",
            payment_method: "cash",
            date: "",
        });
        setSelectedBranch("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isTenantAdmin && !selectedBranch) {
            return;
        }

        setShowConfirm(true);
    };

    const confirmSubmit = async () => {
        try {
            setSubmitting(true);

            // Include the selected branch for tenant admin only
            const payload = {
                ...formData,
                ...(isTenantAdmin ? { branch_id: Number(selectedBranch) } : {}),
            };


            await onSubmit(payload);

            resetForm();
            setShowConfirm(false);
            onClose();
        } catch (error) {
            console.error("Failed to add expense:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center backdrop-blur-sm p-4 sm:p-6">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">
                        Add Expense
                    </h2>

                    <button
                        type="button"
                        onClick={() => {
                            setShowConfirm(false);
                            onClose();
                        }}
                        className="text-xl"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Branch selector: tenant admin only */}
                    {isTenantAdmin && (
                        <div>
                            <label className="text-sm font-medium">
                                Branch
                            </label>

                            <select
                                value={selectedBranch}
                                onChange={(e) =>
                                    setSelectedBranch(e.target.value)
                                }
                                className="w-full mt-1 shadow-sm rounded-lg px-3 py-3 border border-slate-200"
                                required
                            >
                                <option value="">Select Branch</option>

                                {branches.map((branch) => (
                                    <option
                                        key={branch.id}
                                        value={String(branch.id)}
                                    >
                                        {branch.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="title"
                            className="w-full mt-1 shadow-lg rounded-lg px-3 py-3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="name"
                                className="w-full mt-1 shadow-lg rounded-lg px-3 py-3"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="phone"
                                className="w-full mt-1 shadow-lg rounded-lg px-3 py-3"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full mt-1 shadow-sm rounded-lg px-3 py-3"
                            >
                                <option value="salary">Salary</option>
                                <option value="rent">Rent</option>
                                <option value="utilities">Utilities</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="marketing">Marketing</option>
                                <option value="equipment">Equipment</option>
                                <option value="misc">Miscellaneous</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Amount
                            </label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className="w-full mt-1 shadow-lg rounded-lg px-3 py-3"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">
                                Payment Method
                            </label>
                            <select
                                name="payment_method"
                                value={formData.payment_method}
                                onChange={handleChange}
                                className="w-full mt-1 shadow-lg rounded-lg px-3 py-3"
                            >
                                <option value="cash">Cash</option>
                                <option value="upi">UPI</option>
                                <option value="card">Card</option>
                                <option value="bank">Bank Transfer</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full mt-1 shadow-lg rounded-lg px-3 py-3"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="description"
                            className="w-full mt-1 shadow-lg rounded-lg px-3 py-3"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setShowConfirm(false);
                                onClose();
                            }}
                            className="px-4 py-2 border border-slate-300 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                            {submitting ? "Adding..." : "Add Expense"}
                        </button>
                    </div>
                </form>
            </div>

            <ConfirmActionModal
                isOpen={showConfirm}
                type="add"
                title="Add Expense"
                message="Are you sure you want to add this expense?"
                confirmText="Add Expense"
                cancelText="Cancel"
                loading={submitting}
                onCancel={() => setShowConfirm(false)}
                onConfirm={confirmSubmit}
            />
        </div>
    );
};

export default Add_expense;