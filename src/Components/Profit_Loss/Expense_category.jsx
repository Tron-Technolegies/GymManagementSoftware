import React from "react";
import useDashboard from "../../hooks/useDashboard";

const Expense_category = ({
    period = "daily",
    selectedDate,
    branchId = null,
}) => {
    let adminUser = {};

    try {
        adminUser = JSON.parse(
            localStorage.getItem("adminUser") || "{}"
        );
    } catch (error) {
        console.error("Failed to read admin user:", error);
    }

    const isTenantAdmin =
        adminUser.role === "TENANT_ADMIN";

    const userBranchId =
        adminUser.branch_id ??
        adminUser.branch?.id ??
        adminUser.branch ??
        null;

    // Tenant admin can select a branch or view all branches.
    // Other roles are restricted to their assigned branch.
    const effectiveBranchId = isTenantAdmin
        ? branchId
        : userBranchId;

    const {
        expenseCategories = [],
        loading,
    } = useDashboard(
        period,
        selectedDate,
        effectiveBranchId
    );

    const sortedExpenses = [
        ...expenseCategories,
    ].sort(
        (a, b) =>
            Number(b.amount || 0) -
            Number(a.amount || 0)
    );

    const maxAmount = Math.max(
        ...sortedExpenses.map(
            (item) => Number(item.amount) || 0
        ),
        1
    );

    const periodLabel =
        period.charAt(0).toUpperCase() +
        period.slice(1);

    if (loading) {
        return (
            <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-md p-8">
                <p className="text-sm text-gray-400">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-md p-8">
            <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900">
                    Expense by Category
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                    {periodLabel} expenses
                </p>
            </div>

            <div className="space-y-6">
                {sortedExpenses.length > 0 ? (
                    sortedExpenses.map((item, index) => {
                        const amount =
                            Number(item.amount) || 0;

                        const width =
                            (amount / maxAmount) * 100;

                        return (
                            <div
                                key={`${item.category}-${index}`}
                                className="flex items-center gap-3"
                            >
                                <span className="w-28 text-sm text-gray-600 capitalize truncate">
                                    {item.category}
                                </span>

                                <div className="flex-1">
                                    <div
                                        className="h-6 rounded-md bg-red-500 transition-all duration-300"
                                        style={{
                                            width: `${width}%`,
                                        }}
                                    />
                                </div>

                                <span className="text-sm font-medium text-gray-700">
                                    ₹
                                    {amount.toLocaleString(
                                        "en-IN"
                                    )}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500">
                        No expense data available
                    </p>
                )}
            </div>
        </div>
    );
};

export default Expense_category;