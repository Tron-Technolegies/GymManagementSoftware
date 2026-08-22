import React, { useState } from "react";
import {
    useStaffs,
    useDeleteStaff,
    useStaffPayment,
    useCreateStaff,
    useUpdateStaff,
} from "../hooks/staffs";
import useStaffFilters from "../hooks/useStaffFilters";
import AddStaffs from "../Components/Staffs/AddStaffs";
import ViewStaffsModal from "../Components/Staffs/ViewStaffsModal";
import StaffKPI from "../Components/Staffs/StaffKPI";
import StaffPayment from "../Components/Staffs/StaffPayment";
import StaffTable from "../Components/Staffs/StaffTable";
import Pagination from "../Components/Pagination";
import AlertMessage from "../Components/AlertMessage";
import ConfirmActionModal from "../Components/ConfirmActionModal";

const Staffs = () => {
    const user = JSON.parse(
        localStorage.getItem("adminUser") || "null"
    );
    const { staffs, fetchStaffs } = useStaffs();
    const { remove } = useDeleteStaff();
    const { addPayment } = useStaffPayment();
    const { create } = useCreateStaff();
    const { update } = useUpdateStaff();
    const {
        search,
        setSearch,
        active,
        setActive,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        filteredStaffs,
        paginatedStaffs,
    } = useStaffFilters(staffs);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [editStaff, setEditStaff] = useState(null);
    const [showStaff, setShowStaff] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentData, setPaymentData] = useState({
        amount: "",
        payment_date: "",
        payment_method: "",
        payment_type: "",
    });

    const [alertState, setAlertState] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] =
        useState(false);
    const [confirmConfig, setConfirmConfig] = useState({
        title: "",
        message: "",
        confirmText: "Confirm",
        type: "default",
        successMessage: "",
        action: null,
    });

    const openConfirmModal = ({
        title,
        message,
        confirmText = "Confirm",
        type = "default",
        successMessage = "Operation completed successfully",
        action,
    }) => {

        setConfirmConfig({
            title,
            message,
            confirmText,
            type,
            successMessage,
            action,
        });

        setConfirmOpen(true);
    };

    const handleConfirmAction = async () => {
        if (!confirmConfig.action) return;

        try {
            setConfirmLoading(true);
            await confirmConfig.action();
            setAlertState({
                show: true,
                message:
                    confirmConfig.successMessage,
                type: "success",
            });

            setConfirmOpen(false);
        } catch (error) {

            console.error(error);
            setAlertState({
                show: true,
                message:
                    error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Operation failed",
                type: "error",
            });
        } finally {
            setConfirmLoading(false);
        }
    };
    const handleAddStaff = (formData) => {

        openConfirmModal({
            title: "Add Staff",
            message: `Are you sure you want to add ${formData.name || "this staff"
                }?`,
            confirmText: "Save",
            type: "add",
            successMessage:
                "Staff added successfully",

            action: async () => {

                const payload = new FormData();

                Object.keys(formData).forEach(
                    (key) => {
                        payload.append(
                            key,
                            formData[key]
                        );
                    }
                );
                await create(payload);
                await fetchStaffs();
                setShowAdd(false);
            },
        });
    };

    const handleUpdateStaff = (formData) => {
        if (!editStaff) return;
        openConfirmModal({
            title: "Update Staff",
            message: `Are you sure you want to update ${formData.name || "this staff"
                }?`,

            confirmText: "Update",
            type: "update",
            successMessage:
                "Staff updated successfully",
            action: async () => {
                await update(
                    editStaff.id,
                    formData
                );
                await fetchStaffs();

                setSelectedStaff((prev) =>
                    prev?.id === editStaff.id
                        ? {
                            ...prev,
                            ...formData,
                        }
                        : prev
                );
                setShowUpdate(false);
                setEditStaff(null);
            },
        });
    };
    const handleDelete = (staff) => {
        openConfirmModal({
            title: "Delete Staff",
            message: `Are you sure you want to delete ${staff.name}?`,
            confirmText: "Delete",
            type: "delete",
            successMessage:
                "Staff deleted successfully",
            action: async () => {
                await remove(staff.id);
                await fetchStaffs();
            },
        });
    };
    const handleSavePayment = async () => {

        if (!selectedStaff) return;

        try {
            await addPayment(
                selectedStaff.id,
                paymentData
            );

            setAlertState({
                show: true,
                message: `₹${paymentData.amount} ${paymentData.payment_type} payment recorded for ${selectedStaff.name}`,
                type: "success",
            });

            setShowPaymentForm(false);

            setPaymentData({
                amount: "",
                payment_date: "",
                payment_method: "",
            });
            await fetchStaffs();
        } catch (error) {
            console.error(error);
            setAlertState({
                show: true,
                message:
                    error?.response?.data?.error ||
                    "Failed to record payment",
                type: "error",
            });
        }
    };
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl">Staff Management</h1>
                </div>

                <button
                    onClick={() =>
                        setShowAdd(true)
                    }
                    className="px-4 py-2 rounded-md text-sm bg-yellow-500 font-semibold text-white hover:bg-yellow-600 transition">
                    + ADD STAFF
                </button>
            </div>

            <StaffKPI staffs={staffs} />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2 px-2 rounded-lg border border-slate-100 shadow-sm">

                <input
                    type="text"
                    placeholder="Search Staffs..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full md:w-72 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />

                <div className="flex gap-2">

                    {[
                        "All",
                        "Active",
                        "Blocked",
                    ].map((status) => (

                        <button
                            key={status}
                            onClick={() =>
                                setActive(status)
                            }
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${active === status
                                ? "bg-yellow-500 text-white"
                                : "bg-slate-100 text-slate-600"
                                }`}
                        >
                            {status}
                        </button>

                    ))}

                </div>

            </div>
            <StaffTable
                staffs={paginatedStaffs}
                allStaffs={staffs}
                user={user}
                onView={(staff) => {
                    setSelectedStaff(staff);
                    setShowStaff(true);
                }}
                onPayment={(staff) => {
                    setSelectedStaff(staff);
                    setShowPaymentForm(true);
                }}
                onEdit={(staff) => {
                    setEditStaff(staff);
                    setShowUpdate(true);
                }}
                onDelete={handleDelete}
            />
            <Pagination
                currentPage={currentPage}
                totalItems={filteredStaffs.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
            {showAdd && (
                <AddStaffs
                    onClose={() =>
                        setShowAdd(false)
                    }
                    onSubmit={handleAddStaff}
                    isEdit={false}
                />
            )}
            {showUpdate && (
                <AddStaffs
                    staff={editStaff}
                    isEdit={true}
                    onClose={() => {
                        setShowUpdate(false);
                        setEditStaff(null);
                    }}
                    onSubmit={handleUpdateStaff}
                />
            )}
            {showStaff &&
                selectedStaff && (
                    <ViewStaffsModal
                        staff={selectedStaff}
                        onClose={() => {
                            setShowStaff(false);
                            setSelectedStaff(null);
                        }}
                    />
                )}

            {showPaymentForm &&
                selectedStaff && (
                    <StaffPayment
                        staff={selectedStaff}
                        paymentData={paymentData}
                        setPaymentData={
                            setPaymentData
                        }
                        onClose={() =>
                            setShowPaymentForm(
                                false
                            )
                        }
                        onSubmit={
                            handleSavePayment
                        }
                    />
                )}
            <AlertMessage
                show={alertState.show}
                message={alertState.message}
                type={alertState.type}
                onClose={() =>
                    setAlertState((prev) => ({
                        ...prev,
                        show: false,
                    }))
                }
            />
            <ConfirmActionModal
                isOpen={confirmOpen}
                title={confirmConfig.title}
                message={confirmConfig.message}
                confirmText={
                    confirmConfig.confirmText
                }
                type={confirmConfig.type}
                loading={confirmLoading}
                onCancel={() =>
                    setConfirmOpen(false)
                }
                onConfirm={
                    handleConfirmAction
                }
            />

        </div>
    );
};

export default Staffs;