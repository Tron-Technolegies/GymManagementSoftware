import React, { useEffect, useMemo, useState } from "react";
import useAdditionalExpenses from "../../hooks/useExpenses";
import Pagination from "../Pagination";
import { getBranches } from "../../api/branches";

const Expense = () => {

    const {
        expenses,
        loading,
        fetchAdditionalExpenses,
    } = useAdditionalExpenses();


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState("all");

    useEffect(() => {
        fetchAdditionalExpenses();
    }, []);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await getBranches();
                const data = response.data;

                setBranches(
                    Array.isArray(data)
                        ? data
                        : data?.results ?? data?.branches ?? []
                );
            } catch (error) {
                console.error("Failed to fetch branches:", error);
            }
        };

        fetchBranches();
    }, []);

    const filteredExpense = useMemo(() => {
        if (selectedBranch === "all") return expenses;

        return expenses.filter((expense) => {
            const branchId =
                expense.branch?.id ??
                expense.branch_id ??
                expense.branch;

            return String(branchId ?? "") === String(selectedBranch);
        });
    }, [expenses, selectedBranch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedBranch]);


    const paginatedExpense = filteredExpense.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const adminUser = JSON.parse(
        localStorage.getItem("adminUser") || "{}"
    );

    const isTenantAdmin =
        adminUser.role === "TENANT_ADMIN";


    return (
        <div className="w-full overflow-x-auto rounded-xl shadow-sm">


            {loading ? (

                <p className="py-10 text-center text-slate-500">
                    Loading expenses...
                </p>

            ) : (

                <>
                    {isTenantAdmin && (
                        <div className="flex justify-end p-4">
                            <select
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                className="w-full sm:w-64 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                <option value="all">All Branches</option>

                                {branches.map((branch) => (
                                    <option key={branch.id} value={String(branch.id)}>
                                        {branch.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <table className="w-full min-w-[1000px]">

                        <thead className="bg-slate-50">

                            <tr>

                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                                    ID
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                                    TITLE
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                                    NAME
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                                    PHONE
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                                    CATEGORY
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                                    DESCRIPTION
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                                    AMOUNT
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                                    METHOD
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600">
                                    DATE
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {paginatedExpense.length > 0 ? (

                                paginatedExpense.map((expense) => (

                                    <tr
                                        key={expense.id}
                                        className="hover:bg-slate-50"
                                    >

                                        <td className="px-6 py-4">
                                            {expense.id}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {expense.title}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {expense.name || "-"}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {expense.phone || "-"}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {expense.category || "-"}
                                        </td>

                                        <td className="px-6 py-4 min-w-[250px]">
                                            {expense.description || "-"}
                                        </td>

                                        <td className="px-6 py-4 font-semibold whitespace-nowrap">
                                            ₹{expense.amount}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {expense.payment_method || "-"}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {expense.date}
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        colSpan="9"
                                        className="py-10 text-center text-slate-500"
                                    >
                                        No expenses found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>


                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredExpense.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />

                </>

            )}

        </div>
    );
};

export default Expense;
