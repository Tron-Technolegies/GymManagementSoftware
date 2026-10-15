import React, { useState } from "react";
import {
    LoaderCircle,
    Link2,
    RefreshCw,
    Unlink,
} from "lucide-react";
import ConfirmActionModal from "../ConfirmActionModal";

const getId = (person) =>
    person?.id ?? person?.member_id ?? person?.staff_id ?? "";

const getName = (person) =>
    person?.name ??
    person?.full_name ??
    person?.member_name ??
    person?.staff_name ??
    ([person?.first_name, person?.last_name]
        .filter(Boolean)
        .join(" ") || "Unnamed");

const isMappingLinked = (mapping) =>
    Boolean(mapping?.member || mapping?.staff);

const getLinkedPersonName = (mapping) =>
    mapping?.member_name || mapping?.staff_name || "Unnamed";

const getLinkedPersonId = (mapping) =>
    mapping?.member || mapping?.staff || "";

const getEmployeeName = (mapping) =>
    mapping?.essl_employee_name ??
    mapping?.employee_name ??
    mapping?.essl_employee_code ??
    mapping?.employee_code ??
    "this employee";

export default function EsslTable({
    mappings,
    members,
    staffs,
    loading,
    savingId,
    selectedTypes,
    setSelectedTypes,
    selectedPeople,
    setSelectedPeople,
    onLink,
    onUnlink,
    onRefresh,
}) {
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [selectedLinkMapping, setSelectedLinkMapping] = useState(null);

    const [showUnlinkModal, setShowUnlinkModal] = useState(false);
    const [selectedUnlinkMapping, setSelectedUnlinkMapping] = useState(null);

    const inputClass =
        "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400";

    const closeLinkModal = () => {
        if (savingId === selectedLinkMapping?.id) return;

        setShowLinkModal(false);
        setSelectedLinkMapping(null);
    };

    const closeUnlinkModal = () => {
        if (savingId === selectedUnlinkMapping?.id) return;

        setShowUnlinkModal(false);
        setSelectedUnlinkMapping(null);
    };

    const getSelectedPersonName = (mapping) => {
        if (!mapping) return "the selected person";

        const id = mapping.id;
        const type = selectedTypes[id] || "member";
        const personId = selectedPeople[id];

        const people = type === "member" ? members : staffs;

        const person = people.find(
            (item) => String(getId(item)) === String(personId)
        );

        return person
            ? getName(person)
            : type === "member"
                ? "the selected member"
                : "the selected staff member";
    };

    const confirmLink = async () => {
        if (!selectedLinkMapping) return;

        const id = selectedLinkMapping.id;

        if (savingId === id || !selectedPeople[id]) return;

        try {
            const success = await onLink(selectedLinkMapping);

            if (success === true) {
                setShowLinkModal(false);
                setSelectedLinkMapping(null);
            }
        } catch (error) {
            console.error("Failed to link biometric employee:", error);
        }
    };

    const confirmUnlink = async () => {
        if (!selectedUnlinkMapping) return;

        const id = selectedUnlinkMapping.id;

        if (savingId === id) return;

        try {
            const success = await onUnlink(selectedUnlinkMapping);

            if (success === true) {
                setShowUnlinkModal(false);
                setSelectedUnlinkMapping(null);
            }
        } catch (error) {
            console.error("Failed to unlink biometric employee:", error);
        }
    };

    const isLinkSaving =
        selectedLinkMapping !== null &&
        savingId === selectedLinkMapping.id;

    const isUnlinkSaving =
        selectedUnlinkMapping !== null &&
        savingId === selectedUnlinkMapping.id;

    return (
        <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            {loading ? (
                <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
                    <LoaderCircle
                        size={20}
                        className="animate-spin"
                    />
                    Loading biometric employees...
                </div>
            ) : mappings.length === 0 ? (
                <div className="py-16 text-center text-sm text-slate-500">
                    No biometric employees found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1050px] text-left">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="px-4 py-4">eSSL ID</th>
                                <th className="px-4 py-4">Employee</th>
                                <th className="px-4 py-4">Linked Person</th>
                                <th className="px-4 py-4">Type</th>
                                <th className="px-4 py-4">Status</th>
                                <th className="px-4 py-4">Last Synced</th>
                                <th className="px-4 py-4">Mapping Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-sm">
                            {mappings.map((mapping) => {
                                const id = mapping.id;
                                const linked = isMappingLinked(mapping);

                                const linkedType = mapping.member
                                    ? "Member"
                                    : mapping.staff
                                        ? "Staff"
                                        : "Unlinked";

                                const type = selectedTypes[id] || "member";

                                const people =
                                    type === "member" ? members : staffs;

                                const isSaving = savingId === id;

                                return (
                                    <tr
                                        key={id}
                                        className="align-top hover:bg-slate-50"
                                    >
                                        <td className="px-4 py-4 font-semibold text-slate-800">
                                            {mapping.essl_employee_code ??
                                                mapping.employee_code ??
                                                "—"}
                                        </td>

                                        <td className="px-4 py-4 font-medium text-slate-800">
                                            {mapping.essl_employee_name ??
                                                mapping.employee_name ??
                                                "Unnamed"}
                                        </td>

                                        <td className="px-4 py-4">
                                            {linked ? (
                                                <>

                                                    <div className="mt-1 text-xs text-slate-500">
                                                        ID:{" "}
                                                        {getLinkedPersonId(mapping) || "—"}
                                                    </div>

                                                    <div className="font-medium text-slate-800 mt-1">
                                                        {getLinkedPersonName(mapping)}
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="text-slate-400">
                                                    Not linked
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-4 py-4">
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                                {linkedType}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${mapping.is_active !== false
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-50 text-red-600"
                                                    }`}
                                            >
                                                {mapping.is_active !== false
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4 text-slate-500">
                                            {mapping.last_synced_at
                                                ? new Date(
                                                    mapping.last_synced_at
                                                ).toLocaleString()
                                                : "—"}
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="flex min-w-[230px] flex-col gap-2">
                                                <select
                                                    value={type}
                                                    onChange={(event) => {
                                                        setSelectedTypes(
                                                            (previous) => ({
                                                                ...previous,
                                                                [id]: event.target.value,
                                                            })
                                                        );

                                                        setSelectedPeople(
                                                            (previous) => ({
                                                                ...previous,
                                                                [id]: "",
                                                            })
                                                        );
                                                    }}
                                                    className={inputClass}
                                                    aria-label={`Person type for ${id}`}
                                                >
                                                    <option value="member">
                                                        Member
                                                    </option>
                                                    <option value="staff">
                                                        Staff
                                                    </option>
                                                </select>

                                                <select
                                                    value={selectedPeople[id] || ""}
                                                    onChange={(event) =>
                                                        setSelectedPeople(
                                                            (previous) => ({
                                                                ...previous,
                                                                [id]: event.target.value,
                                                            })
                                                        )
                                                    }
                                                    className={inputClass}
                                                    aria-label={`Select person for ${id}`}
                                                >
                                                    <option value="">
                                                        Select person...
                                                    </option>

                                                    {people.map((person) => {
                                                        const personId = getId(person);

                                                        return (
                                                            <option
                                                                key={personId}
                                                                value={personId}
                                                            >
                                                                {getName(person)} (
                                                                {personId})
                                                            </option>
                                                        );
                                                    })}
                                                </select>

                                                {/* Link or change mapping */}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (!selectedPeople[id]) {
                                                            return;
                                                        }

                                                        setSelectedLinkMapping(mapping);
                                                        setShowLinkModal(true);
                                                    }}
                                                    disabled={
                                                        isSaving ||
                                                        !selectedPeople[id]
                                                    }
                                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {isSaving ? (
                                                        <LoaderCircle
                                                            size={15}
                                                            className="animate-spin"
                                                        />
                                                    ) : (
                                                        <Link2 size={15} />
                                                    )}

                                                    {linked
                                                        ? "Change Mapping"
                                                        : "Link Employee"}
                                                </button>

                                                {/* Unlink existing mapping */}
                                                {linked && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedUnlinkMapping(mapping);
                                                            setShowUnlinkModal(true);
                                                        }}
                                                        disabled={isSaving}
                                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                                                    >
                                                        <Unlink size={15} />
                                                        Unlink Employee
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <span>Showing {mappings.length} employee(s)</span>

                <button
                    type="button"
                    onClick={onRefresh}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-slate-200 px-3 py-2 font-medium hover:bg-slate-50 disabled:opacity-50 sm:self-auto"
                >
                    <RefreshCw
                        size={14}
                        className={loading ? "animate-spin" : ""}
                    />
                    Refresh
                </button>
            </div>

            {/* Link / Change Mapping Confirmation */}
            <ConfirmActionModal
                isOpen={showLinkModal}
                title={
                    isMappingLinked(selectedLinkMapping)
                        ? "Confirm Mapping Change"
                        : "Confirm Employee Link"
                }
                message={`Are you sure you want to ${isMappingLinked(selectedLinkMapping)
                    ? "change the mapping for"
                    : "link"
                    } ${getEmployeeName(selectedLinkMapping)} to ${getSelectedPersonName(
                        selectedLinkMapping
                    )}?`}
                confirmText={
                    isMappingLinked(selectedLinkMapping)
                        ? "Change Mapping"
                        : "Link Employee"
                }
                cancelText="Cancel"
                onConfirm={confirmLink}
                onCancel={closeLinkModal}
                loading={isLinkSaving}
                type="update"
            />

            {/* Unlink Confirmation */}
            <ConfirmActionModal
                isOpen={showUnlinkModal}
                title="Unlink Employee"
                message={`Are you sure you want to unlink ${getEmployeeName(
                    selectedUnlinkMapping
                )}?`}
                confirmText="Unlink"
                cancelText="Cancel"
                onConfirm={confirmUnlink}
                onCancel={closeUnlinkModal}
                loading={isUnlinkSaving}
                type="delete"
            />
        </div>
    );
}