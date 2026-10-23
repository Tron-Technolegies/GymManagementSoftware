
import React, { useEffect, useState } from "react";
import ConfirmActionModal from "../ConfirmActionModal";
import { getBranches } from "../../api/branches";

const Add_income = ({ onClose, onSubmit }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const adminUser = JSON.parse(
        localStorage.getItem("adminUser") || "{}"
    );

    const isTenantAdmin = adminUser?.role === "TENANT_ADMIN";

    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [branchError, setBranchError] = useState("");
    const [branchLoading, setBranchLoading] = useState(false);

    const initialFormData = {
        title: "",
        name: "",
        phone: "",
        category: "membership",
        description: "",
        amount: "",
        payment_method: "cash",
        date: "",
    };

    const [formData, setFormData] = useState(initialFormData);

    // Fetch branches for tenant admin
    useEffect(() => {
        if (!isTenantAdmin) return;

        const fetchBranches = async () => {
            try {
                setBranchLoading(true);

                const response = await getBranches();
                const data = response.data;

                const branchList = Array.isArray(data)
                    ? data
                    : data?.results ?? data?.branches ?? [];

                setBranches(branchList);
            } catch (error) {
                console.error("Failed to fetch branches:", error);
                setBranchError("Failed to load branches. Please try again.");
            } finally {
                setBranchLoading(false);
            }
        };

        fetchBranches();
    }, [isTenantAdmin]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isTenantAdmin && !selectedBranch) {
            setBranchError("Please select a branch.");
            return;
        }

        if (isTenantAdmin && branchLoading) {
            setBranchError("Please wait for branches to load.");
            return;
        }

        if (isTenantAdmin && branches.length === 0) {
            setBranchError("No branches available. Please try again.");
            return;
        }

        setBranchError("");
        setShowConfirm(true);
    };

    const confirmSubmit = async () => {
        if (isTenantAdmin && !selectedBranch) {
            setBranchError("Please select a branch.");
            setShowConfirm(false);
            return;
        }

        const payload = {
            ...formData,
            ...(isTenantAdmin
                ? { branch_id: Number(selectedBranch) }
                : {}),
        };

        try {
            setSubmitting(true);

            await onSubmit(payload);

            setFormData({ ...initialFormData });
            setSelectedBranch("");
            setBranchError("");
            setShowConfirm(false);
            onClose();
        } catch (error) {
            console.error("Failed to add income:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        if (submitting) return;

        setShowConfirm(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center backdrop-blur-sm p-4 sm:p-6">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6 sm:p-8">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">
                        Add Income
                    </h2>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={submitting}
                        className="text-xl"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full mt-1 shadow-lg rounded-lg px-3 py-3"
                            placeholder="title"
                            required
                        />
                    </div>

                    {/* Branch selection for tenant admin */}
                    {isTenantAdmin && (
                        <div>
                            <label className="text-sm font-medium">
                                Branch
                            </label>

                            <select
                                value={selectedBranch}
                                onChange={(e) => {
                                    setSelectedBranch(e.target.value);
                                    setBranchError("");
                                }}
                                disabled={branchLoading || submitting}
                                required
                                className="w-full mt-1 shadow-lg rounded-lg px-3 py-3"
                            >
                                <option value="">
                                    {branchLoading
                                        ? "Loading branches..."
                                        : "Select Branch"}
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

                            {branchError && (
                                <p className="mt-1 text-sm text-red-500">
                                    {branchError}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full mt-1 shadow-lg rounded-lg px-3 py-3"
                                placeholder="name"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full mt-1 shadow-lg rounded-lg px-3 py-3"
                                placeholder="phone"
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
                                <option value="membership">
                                    Membership Fee
                                </option>
                                <option value="product_sale">
                                    Product Sale
                                </option>
                                <option value="registration">
                                    Registration Fee
                                </option>
                                <option value="other">
                                    Other
                                </option>
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
                                min="0.01"
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
                            className="w-full mt-1 shadow-lg rounded-lg px-3 py-3"
                            placeholder="description"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={submitting}
                            className="px-4 py-2 border border-slate-300 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={submitting || branchLoading}
                            className="px-5 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white disabled:opacity-60"
                        >
                            Add Income
                        </button>
                    </div>
                </form>
            </div>

            <ConfirmActionModal
                isOpen={showConfirm}
                type="add"
                title="Add Income"
                message="Are you sure you want to add this income?"
                confirmText="Add Income"
                cancelText="Cancel"
                loading={submitting}
                onCancel={() => setShowConfirm(false)}
                onConfirm={confirmSubmit}
            />
        </div>
    );
};

export default Add_income;
