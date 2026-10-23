import { useEffect, useRef, useState } from "react";
import { CalendarDays, ArrowDownToLine } from "lucide-react";

import Income_members from "../Components/Profit_Loss/Income_members";
import Expense_category from "../Components/Profit_Loss/Expense_category";
import Kpis from "../Components/Profit_Loss/Kpis";
import Sales_category from "../Components/Profit_Loss/Sales_category";
import ProfitLossReport from "../Components/ProfitLossReport";
import { handleDownload } from "../hooks/reportdownloads";
import { getBranches } from "../api/branches";

const Profit_loss = () => {
    const pdfRef = useRef(null);

    const [reportData, setReportData] = useState(null);
    const [period, setPeriod] = useState("daily");

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const adminUser = JSON.parse(
        localStorage.getItem("adminUser") || "{}"
    );

    const isTenantAdmin = adminUser?.role === "TENANT_ADMIN";

    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState("all");
    const [branchLoading, setBranchLoading] = useState(false);

    const buttons = [
        "daily",
        "weekly",
        "monthly",
        "yearly",
        "custom",
    ];

    useEffect(() => {
        if (!isTenantAdmin) return;

        const fetchBranches = async () => {
            try {
                setBranchLoading(true);

                const response = await getBranches();
                const data = response.data;

                setBranches(
                    Array.isArray(data)
                        ? data
                        : data?.results ?? data?.branches ?? []
                );
            } catch (error) {
                console.error("Failed to fetch branches:", error);
                setBranches([]);
            } finally {
                setBranchLoading(false);
            }
        };

        fetchBranches();
    }, [isTenantAdmin]);

    // "all" means no branch restriction for tenant admins.
    const branchId =
        selectedBranch === "all"
            ? null
            : Number(selectedBranch);

    const handleReportDownload = () => {
        handleDownload(
            period,
            selectedDate,
            fromDate,
            toDate,
            pdfRef,
            setReportData,
            branchId
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 w-full">
                <div className="flex flex-wrap items-center gap-1 rounded-xl bg-white border border-slate-100 p-1 shadow-sm w-full xl:w-auto">
                    {buttons.map((item) => (
                        <button
                            key={item}
                            onClick={() => setPeriod(item)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${period === item
                                    ? "bg-yellow-500 text-white"
                                    : "text-slate-500 hover:text-slate-900"
                                }`}
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto mt-2 xl:mt-0">
                    {/* Branch filter */}
                    {isTenantAdmin && (
                        <select
                            value={selectedBranch}
                            onChange={(e) =>
                                setSelectedBranch(e.target.value)
                            }
                            disabled={branchLoading}
                            className="h-10 min-w-44 rounded-lg border border-slate-200 bg-white px-3 text-sm"
                        >
                            <option value="all">All Branches</option>

                            {branches.map((branch) => (
                                <option
                                    key={branch.id}
                                    value={branch.id}
                                >
                                    {branch.name}
                                </option>
                            ))}
                        </select>
                    )}

                    {period === "custom" ? (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <input
                                type="date"
                                value={fromDate}
                                max={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="border border-slate-200 rounded-lg px-3 py-2"
                            />

                            <span className="text-slate-500">to</span>

                            <input
                                type="date"
                                value={toDate}
                                max={new Date().toISOString().split("T")[0]}
                                min={fromDate || undefined}
                                onChange={(e) => setToDate(e.target.value)}
                                className="border border-slate-200 rounded-lg px-3 py-2"
                            />
                        </div>
                    ) : (
                        <div className="relative">
                            <input
                                type="date"
                                value={selectedDate}
                                max={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />

                            <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm text-slate-500"
                            >
                                <CalendarDays size={18} />
                            </button>
                        </div>
                    )}

                    <button
                        onClick={handleReportDownload}
                        className="flex items-center gap-2 bg-yellow-500 text-white rounded-lg px-4 py-2"
                    >
                        <ArrowDownToLine size={18} />
                        Download
                    </button>
                </div>
            </div>

            <Kpis
                period={period}
                selectedDate={selectedDate}
                branchId={branchId}
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <Sales_category
                    period={period}
                    selectedDate={selectedDate}
                    branchId={branchId}
                />

                <Income_members
                    period={period}
                    selectedDate={selectedDate}
                    branchId={branchId}
                />

                <Expense_category
                    period={period}
                    selectedDate={selectedDate}
                    branchId={branchId}
                />
            </div>

            <div
                style={{
                    position: "absolute",
                    left: "-9999px",
                    top: 0,
                    width: "800px",
                }}
            >
                <ProfitLossReport
                    ref={pdfRef}
                    report={reportData}
                />
            </div>
        </div>
    );
};

export default Profit_loss;