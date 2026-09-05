import React, { useState } from "react";
import {
    X,
    UserPlus,
    User,
    Briefcase,
    Award,
    Phone,
    Calendar,
    IndianRupee,
    Activity,
    Save,
} from "lucide-react";

const AddStaffs = ({
    onClose,
    onSubmit,
    staff = null,
    isEdit = false,
}) => {
    const [form, setForm] = useState({
        name: staff?.name || "",
        role: staff?.role || "",
        specialization: staff?.specialization || "",
        experience: staff?.experience || "",
        phone: staff?.phone || "",
        joining_date: staff?.joining_date || "",
        salary: staff?.salary || "",
        status: staff?.status || "Active",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear field error while typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Staff name is required";
        }

        if (!form.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(form.phone)) {
            newErrors.phone = "Enter a valid 10-digit mobile number";
        }

        if (
            form.experience !== "" &&
            (Number(form.experience) < 0 || Number(form.experience) > 50)
        ) {
            newErrors.experience = "Enter experience between 0 and 50 years";
        }

        if (
            form.salary !== "" &&
            Number(form.salary) < 0
        ) {
            newErrors.salary = "Salary cannot be negative";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        onSubmit(form);
    };

    const inputClass = (field) =>
        `w-full pl-10 pr-3 py-2.5 border rounded-lg text-sm
        outline-none transition
        ${errors[field]
            ? "border-red-400 focus:ring-2 focus:ring-red-200"
            : "border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
        }`;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center
            bg-slate-900/60 backdrop-blur-sm p-4"
        >
            <div
                className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl
                overflow-hidden max-h-[95vh] flex flex-col"
            >

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center">
                            <UserPlus
                                size={22}
                                className="text-yellow-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                {isEdit ? "Update Staff" : "Add Staff"}
                            </h2>

                            <p className="text-sm text-slate-500 mt-0.5">
                                {isEdit
                                    ? "Update staff member information"
                                    : "Add a new staff member to your branch"}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="w-9 h-9 flex items-center justify-center
                        rounded-lg text-slate-500 hover:bg-slate-100
                        hover:text-slate-700 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 overflow-y-auto"
                >

                    {/* Personal Information */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-slate-800 mb-4">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Name <span className="text-red-500">*</span>
                                </label>

                                <div className="relative">
                                    <User
                                        size={17}
                                        className="absolute left-3 top-3 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        placeholder="Enter staff name"
                                        onChange={handleChange}
                                        className={inputClass("name")}
                                    />
                                </div>

                                {errors.name && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Phone <span className="text-red-500">*</span>
                                </label>

                                <div className="relative">
                                    <Phone
                                        size={17}
                                        className="absolute left-3 top-3 text-slate-400"
                                    />

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        placeholder="10-digit mobile number"
                                        maxLength={10}
                                        onChange={(e) => {
                                            const value =
                                                e.target.value.replace(/\D/g, "");

                                            setForm((prev) => ({
                                                ...prev,
                                                phone: value,
                                            }));

                                            if (errors.phone) {
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    phone: "",
                                                }));
                                            }
                                        }}
                                        className={inputClass("phone")}
                                    />
                                </div>

                                {errors.phone && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-slate-800 mb-4">
                            Professional Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Role
                                </label>

                                <div className="relative">
                                    <Briefcase
                                        size={17}
                                        className="absolute left-3 top-3 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        name="role"
                                        value={form.role}
                                        placeholder="e.g. Trainer"
                                        onChange={handleChange}
                                        className={inputClass("role")}
                                    />
                                </div>
                            </div>

                            {/* Specialization */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Specialization
                                </label>

                                <div className="relative">
                                    <Award
                                        size={17}
                                        className="absolute left-3 top-3 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        name="specialization"
                                        value={form.specialization}
                                        placeholder="e.g. Weight Training"
                                        onChange={handleChange}
                                        className={inputClass("specialization")}
                                    />
                                </div>
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Experience
                                </label>

                                <div className="relative">
                                    <Activity
                                        size={17}
                                        className="absolute left-3 top-3 text-slate-400"
                                    />

                                    <input
                                        type="number"
                                        name="experience"
                                        value={form.experience}
                                        placeholder="Years of experience"
                                        min="0"
                                        max="50"
                                        onChange={handleChange}
                                        className={inputClass("experience")}
                                    />
                                </div>

                                {errors.experience && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.experience}
                                    </p>
                                )}
                            </div>

                            {/* Joining Date */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Joining Date
                                </label>

                                <div className="relative">
                                    <Calendar
                                        size={17}
                                        className="absolute left-3 top-3 text-slate-400"
                                    />

                                    <input
                                        type="date"
                                        name="joining_date"
                                        value={form.joining_date}
                                        onChange={handleChange}
                                        className={inputClass("joining_date")}
                                    />
                                </div>
                            </div>

                            {/* Salary */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Salary
                                </label>

                                <div className="relative">
                                    <IndianRupee
                                        size={17}
                                        className="absolute left-3 top-3 text-slate-400"
                                    />

                                    <input
                                        type="number"
                                        name="salary"
                                        value={form.salary}
                                        placeholder="Monthly salary"
                                        min="0"
                                        onChange={handleChange}
                                        className={inputClass("salary")}
                                    />
                                </div>

                                {errors.salary && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.salary}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Status
                                </label>

                                <div className="relative">
                                    <Activity
                                        size={17}
                                        className="absolute left-3 top-3 text-slate-400"
                                    />

                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                        className={inputClass("status")}
                                    >
                                        <option value="Active">
                                            Active
                                        </option>
                                        <option value="Blocked">
                                            Blocked
                                        </option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Branch information */}
                    <div className="mb-6 p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                        <div className="flex items-start gap-3">
                            <Briefcase
                                size={18}
                                className="text-yellow-600 mt-0.5"
                            />

                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Branch Assignment
                                </p>

                                <p className="text-xs text-slate-600 mt-1">
                                    This staff member will automatically be
                                    assigned to your branch. You cannot assign
                                    staff to another branch.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg border
                            border-slate-300 text-slate-700 text-sm
                            font-medium hover:bg-slate-50 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex items-center gap-2 px-5 py-2.5
                            rounded-lg bg-yellow-500 text-white text-sm
                            font-semibold hover:bg-yellow-600
                            active:bg-yellow-700 transition shadow-sm"
                        >
                            <Save size={17} />

                            {isEdit
                                ? "Update Staff"
                                : "Save Staff"}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStaffs;
