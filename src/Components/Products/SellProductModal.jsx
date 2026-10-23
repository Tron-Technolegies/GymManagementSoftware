
import { useEffect, useMemo, useState } from "react";
import ConfirmActionModal from "../ConfirmActionModal";
import { getBranches } from "../../api/branches";
import { getMembers } from "../../api/members";

const SellProductModal = ({
    open,
    onClose,
    selectedProduct,
    sellData,
    setSellData,
    memberError,
    quantityerror,
    memberName,
    onCheckMember,
    onCheckQuantity,
    onSell,
}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState("");
    const [showMembers, setShowMembers] = useState(false);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const [membersError, setMembersError] = useState("");
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [loadingBranches, setLoadingBranches] = useState(false);
    const [branchesError, setBranchesError] = useState("");
    const [selectedMemberName, setSelectedMemberName] = useState("");

    // Logged-in user
    const adminUser = useMemo(() => {
        try {
            return JSON.parse(
                localStorage.getItem("adminUser") || "{}"
            );
        } catch {
            return {};
        }
    }, []);

    const userRole = adminUser.role;
    const isTenantAdmin = userRole === "TENANT_ADMIN";

    // Support branch ID stored as either branch_id or branch
    const assignedBranchId =
        adminUser.branch_id ??
        adminUser.branchId ??
        (
            typeof adminUser.branch === "object"
                ? adminUser.branch?.id ?? adminUser.branch?.branch_id
                : adminUser.branch
        );

    // Tenant Admin selects a branch.
    // Branch Admin and Staff use their assigned branch automatically.
    useEffect(() => {
        if (!open) return;

        if (isTenantAdmin) {
            return;
        }

        const branchId = assignedBranchId
            ? String(assignedBranchId)
            : "";

        setSelectedBranch(branchId);
        setMembers([]);
        setSearch("");
        setShowMembers(false);
        setSelectedMemberName("");
        setMembersError(
            branchId ? "" : "Your account is not assigned to a branch."
        );

        setSellData((previous) => ({
            ...previous,
            member_id: "",
        }));
    }, [open, isTenantAdmin, assignedBranchId, setSellData]);

    // Load branches only for Tenant Admin
    useEffect(() => {
        if (!open || !isTenantAdmin) return;

        let cancelled = false;

        const fetchBranches = async () => {
            try {
                setLoadingBranches(true);
                setBranchesError("");

                const response = await getBranches();
                const data = response.data;

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.results)
                        ? data.results
                        : Array.isArray(data?.branches)
                            ? data.branches
                            : [];

                if (!cancelled) {
                    setBranches(list);
                }
            } catch (error) {
                if (!cancelled) {
                    setBranchesError("Unable to load branches.");
                }

                console.error("Failed to fetch branches:", error);
            } finally {
                if (!cancelled) {
                    setLoadingBranches(false);
                }
            }
        };

        fetchBranches();

        return () => {
            cancelled = true;
        };
    }, [open, isTenantAdmin]);

    // Load members for the selected or assigned branch
    useEffect(() => {
        if (!open || !selectedBranch) {
            setMembers([]);
            setLoadingMembers(false);
            return;
        }

        let cancelled = false;

        const fetchMembers = async () => {
            try {
                setLoadingMembers(true);
                setMembersError("");

                const response = await getMembers();
                const data = response.data;

                const allMembers = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.results)
                        ? data.results
                        : Array.isArray(data?.members)
                            ? data.members
                            : [];

                // Keep only members belonging to the active branch
                const branchMembers = allMembers.filter((member) => {
                    const memberBranchId =
                        member.branch?.id ??
                        member.branch_id ??
                        member.branch;

                    return (
                        String(memberBranchId ?? "") ===
                        String(selectedBranch)
                    );
                });

                if (!cancelled) {
                    setMembers(branchMembers);
                }
            } catch (error) {
                if (!cancelled) {
                    setMembers([]);
                    setMembersError(
                        "Unable to load members for the selected branch."
                    );
                }

                console.error("Failed to fetch members:", error);
            } finally {
                if (!cancelled) {
                    setLoadingMembers(false);
                }
            }
        };

        fetchMembers();

        return () => {
            cancelled = true;
        };
    }, [open, selectedBranch]);

    const getMemberId = (member) =>
        String(
            member.member_id ??
            member.member_code ??
            member.id ??
            ""
        );

    const getMemberName = (member) =>
        member.name ??
        member.full_name ??
        member.member_name ??
        [member.first_name, member.last_name]
            .filter(Boolean)
            .join(" ") ??
        "";

    const filteredMembers = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return members;

        return members.filter((member) => {
            const id = getMemberId(member).toLowerCase();
            const name = getMemberName(member).toLowerCase();

            return id.includes(query) || name.includes(query);
        });
    }, [members, search]);

    const handleSelectMember = (member) => {
        const id = getMemberId(member);
        const name = getMemberName(member);

        setSellData((previous) => ({
            ...previous,
            member_id: id,
        }));

        setSelectedMemberName(name);
        setSearch(`${id} - ${name}`);
        setShowMembers(false);
    };

    const handleMemberInput = (value) => {
        setSearch(value);
        setShowMembers(true);
        setSelectedMemberName("");

        setSellData((previous) => ({
            ...previous,
            member_id: "",
        }));
    };

    const handleBranchChange = (branchId) => {
        setSelectedBranch(branchId);
        setMembers([]);
        setSearch("");
        setShowMembers(false);
        setSelectedMemberName("");
        setMembersError("");

        setSellData((previous) => ({
            ...previous,
            member_id: "",
        }));
    };

    const handleConfirmSell = async () => {
        await onSell();
        setShowConfirm(false);
    };

    if (!open || !selectedProduct) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Sell Product</h2>
                        <button onClick={onClose}>✕</button>
                    </div>

                    <div className="space-y-4">
                        {/* Selling Branch - Tenant Admin Only */}
                        {isTenantAdmin && (
                            <div>
                                <label className="block text-sm font-medium">
                                    Selling Branch
                                </label>

                                <select
                                    value={selectedBranch}
                                    onChange={(e) =>
                                        handleBranchChange(e.target.value)
                                    }
                                    disabled={loadingBranches}
                                    className="w-full border border-slate-300 rounded-lg p-2"
                                >
                                    <option value="">
                                        {loadingBranches
                                            ? "Loading branches..."
                                            : "Select selling branch"}
                                    </option>

                                    {branches.map((branch) => (
                                        <option
                                            key={branch.id}
                                            value={String(branch.id)}
                                        >
                                            {branch.name}
                                        </option>
                                    ))}
                                </select>

                                {branchesError && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {branchesError}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Searchable Member Selector - All Roles */}
                        <div className="relative">
                            <label className="block text-sm font-medium">
                                Search Member (ID or Name)
                            </label>

                            <input
                                type="text"
                                placeholder={
                                    selectedBranch
                                        ? "Search member ID or name..."
                                        : "Select a branch first"
                                }
                                value={search}
                                autoComplete="off"
                                disabled={!selectedBranch || loadingMembers}
                                onFocus={() => {
                                    if (selectedBranch) {
                                        setShowMembers(true);
                                    }
                                }}
                                onChange={(e) =>
                                    handleMemberInput(e.target.value)
                                }
                                className="w-full border border-slate-300 rounded-lg p-2 disabled:bg-slate-100"
                            />

                            {showMembers && (
                                <div className="absolute z-50 mt-1 w-full max-h-52 overflow-y-auto rounded-lg border border-slate-300 bg-white shadow-lg">
                                    {loadingMembers ? (
                                        <p className="p-3 text-sm text-slate-500">
                                            Loading members...
                                        </p>
                                    ) : membersError ? (
                                        <p className="p-3 text-sm text-red-500">
                                            {membersError}
                                        </p>
                                    ) : filteredMembers.length === 0 ? (
                                        <p className="p-3 text-sm text-slate-500">
                                            No members found.
                                        </p>
                                    ) : (
                                        filteredMembers.map((member) => {
                                            const id = getMemberId(member);
                                            const name = getMemberName(member);

                                            return (
                                                <button
                                                    key={member.id ?? id}
                                                    type="button"
                                                    onMouseDown={(e) =>
                                                        e.preventDefault()
                                                    }
                                                    onClick={() =>
                                                        handleSelectMember(member)
                                                    }
                                                    className="w-full px-3 py-2 text-left hover:bg-yellow-50"
                                                >
                                                    <span className="font-medium text-yellow-500">
                                                        {id}
                                                    </span>
                                                    <span className="text-yellow-500">
                                                        {" — "}
                                                        {name || "Unnamed member"}
                                                    </span>
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            )}

                            {memberError && (
                                <p className="text-red-500 text-sm mt-1">
                                    {memberError}
                                </p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-medium">
                                Quantity
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={sellData.quantity}
                                onChange={(e) =>
                                    setSellData({
                                        ...sellData,
                                        quantity: Number(e.target.value),
                                    })
                                }
                                onBlur={onCheckQuantity}
                                className="w-full border border-slate-300 rounded-lg p-2"
                            />

                            {quantityerror && (
                                <p className="text-red-500 text-sm mt-1">
                                    {quantityerror}
                                </p>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label className="block text-sm font-medium">
                                Payment Method
                            </label>

                            <select
                                value={sellData.payment_method}
                                onChange={(e) =>
                                    setSellData({
                                        ...sellData,
                                        payment_method: e.target.value,
                                    })
                                }
                                className="w-full border border-slate-300 rounded-lg p-2"
                            >
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                                <option value="upi">UPI</option>
                                <option value="wallet">Wallet</option>
                            </select>
                        </div>

                        {/* Unit Price */}
                        <div>
                            <label className="block text-sm font-medium">
                                Unit Price
                            </label>

                            <input
                                value={selectedProduct.price || ""}
                                readOnly
                                className="w-full border border-slate-300 rounded-lg p-2 bg-slate-100"
                            />
                        </div>

                        {/* Total Amount */}
                        <div>
                            <label className="block text-sm font-medium">
                                Total Amount
                            </label>

                            <input
                                value={
                                    (selectedProduct.price || 0) *
                                    (sellData.quantity || 0)
                                }
                                readOnly
                                className="w-full border border-slate-300 rounded-lg p-2 bg-slate-100"
                            />
                        </div>

                        <div className="text-sm text-slate-500">
                            Current Stock: {selectedProduct.stock}
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 border border-slate-300 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={
                                    !sellData.member_id ||
                                    !!memberError ||
                                    !!quantityerror ||
                                    loadingMembers
                                }
                                onClick={() => {
                                    setShowMembers(false);
                                    setShowConfirm(true);
                                }}
                                className={`px-4 py-2 rounded-lg text-white ${!sellData.member_id ||
                                        memberError ||
                                        quantityerror ||
                                        loadingMembers
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-yellow-600"
                                    }`}
                            >
                                Sell
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showConfirm && (
                <ConfirmActionModal
                    isOpen={showConfirm}
                    title="Confirm Sale"
                    message="Are you sure you want to complete this sale?"
                    confirmText="Sell"
                    cancelText="Cancel"
                    type="add"
                    onConfirm={handleConfirmSell}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </>
    );
};

export default SellProductModal;
