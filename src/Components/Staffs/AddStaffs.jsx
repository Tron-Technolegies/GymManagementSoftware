
import React, { useState } from "react";
import { X, UserPlus, LockKeyhole, ShieldCheck } from "lucide-react";

const AddStaffs = ({
    onClose,
    onSubmit,
    staff = null,
    isEdit = false,
    userRole,
    branches = [],
}) => {
    const [form, setForm] = useState({
        name: staff?.name || "",
        role: staff?.role || "",
        specialization: staff?.specialization || "",
        experience: staff?.experience ?? "",
        phone: staff?.phone || "",
        joining_date: staff?.joining_date || "",
        salary: staff?.salary ?? "",
        status: staff?.status || "Active",
        branch: staff?.branch?.id
            ? String(staff.branch.id)
            : "",

        // Login account fields
        create_login: false,
        username: "",
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const nextValue = type === "checkbox" ? checked : value;

        setForm((prev) => ({
            ...prev,
            [name]: nextValue,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value
            .replace(/\D/g, "")
            .slice(0, 10);

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
    };

    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Staff name is required";
        }

        if (!form.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(form.phone)) {
            newErrors.phone =
                "Enter a valid 10-digit mobile number";
        }

        if (
            form.experience !== "" &&
            (
                Number(form.experience) < 0 ||
                Number(form.experience) > 50
            )
        ) {
            newErrors.experience =
                "Enter experience between 0 and 50 years";
        }

        if (
            form.salary !== "" &&
            Number(form.salary) < 0
        ) {
            newErrors.salary = "Salary cannot be negative";
        }

        // Tenant Admin must select a branch when adding staff.
        if (
            !isEdit &&
            userRole === "TENANT_ADMIN" &&
            !form.branch
        ) {
            newErrors.branch = "Please select a branch";
        }

        // Credentials are required only for authorized staff.
        if (!isEdit && form.create_login) {
            if (!form.username.trim()) {
                newErrors.username = "Username is required";
            } else if (/\s/.test(form.username.trim())) {
                newErrors.username =
                    "Username cannot contain spaces";
            }

            if (!form.password) {
                newErrors.password = "Password is required";
            } else if (form.password.length < 8) {
                newErrors.password =
                    "Password must be at least 8 characters";
            }

            if (!form.confirm_password) {
                newErrors.confirm_password =
                    "Please confirm the password";
            } else if (
                form.password !== form.confirm_password
            ) {
                newErrors.confirm_password =
                    "Passwords do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const payload = { ...form };

        // Never send confirmation password to the backend.
        delete payload.confirm_password;

        if (isEdit) {
            // Existing staff editing must not change login credentials.
            delete payload.create_login;
            delete payload.username;
            delete payload.password;
        } else if (!payload.create_login) {
            // Regular staff do not receive login credentials.
            delete payload.username;
            delete payload.password;
        }

        onSubmit(payload);
    };

    const inputClass = (field) =>
        `w-full px-3 py-2.5 border rounded-lg text-sm
        outline-none transition
        ${errors[field]
            ? "border-red-400 focus:ring-2 focus:ring-red-200"
            : "border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
        }`;

    const labelClass =
        "block text-sm font-medium text-slate-700 mb-1.5";

    const renderError = (field) =>
        errors[field] ? (
            <p className="text-xs text-red-500 mt-1">
                {errors[field]}
            </p>
        ) : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">

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

                            <p className="text-sm text-slate-500">
                                {isEdit
                                    ? "Update staff information"
                                    : "Add an employee to your branch"}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
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
                        <h3 className="text-base font-semibold text-slate-800 mb-4">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>
                                    Name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className={inputClass("name")}
                                    placeholder="Enter full name"
                                />

                                {renderError("name")}
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Phone <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handlePhoneChange}
                                    className={inputClass("phone")}
                                    placeholder="10-digit mobile number"
                                    maxLength={10}
                                />

                                {renderError("phone")}
                            </div>

                            {!isEdit &&
                                userRole === "TENANT_ADMIN" && (
                                    <div>
                                        <label className={labelClass}>
                                            Branch{" "}
                                            <span className="text-red-500">*</span>
                                        </label>

                                        <select
                                            name="branch"
                                            value={form.branch}
                                            onChange={handleChange}
                                            className={inputClass("branch")}
                                        >
                                            <option value="">
                                                Select Branch
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

                                        {renderError("branch")}
                                    </div>
                                )}
                        </div>
                    </div>

                    {/* Staff Login Access */}
                    {!isEdit && (
                        <div className="mb-6 border border-yellow-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center shrink-0">
                                    <LockKeyhole
                                        size={20}
                                        className="text-yellow-700"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-800">
                                        Staff Login Access
                                    </h3>
                                </div>
                            </div>

                            <label className="flex items-start gap-3 mt-4 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="create_login"
                                    checked={form.create_login}
                                    onChange={handleChange}
                                    className="mt-1 h-4 w-4 accent-yellow-500"
                                />

                                <span>
                                    <span className="block text-sm font-medium text-slate-800">
                                        Create login account for this staff
                                    </span>

                                    <span className="block text-xs text-slate-500 mt-1">
                                        One authorized staff login per
                                        branch, enforced by the backend.
                                    </span>
                                </span>
                            </label>

                            {form.create_login && (
                                <div className="mt-4 pt-4 border-t border-slate-200">
                                    <div className="flex items-center gap-2 mb-4 text-sm text-slate-700">
                                        <ShieldCheck
                                            size={18}
                                            className="text-yellow-600"
                                        />
                                        <span className="font-medium">
                                            Create Staff Credentials
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>
                                                Username{" "}
                                                <span className="text-red-500">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                name="username"
                                                value={form.username}
                                                onChange={handleChange}
                                                className={inputClass("username")}
                                                placeholder="Create username"
                                                autoComplete="username"
                                            />

                                            {renderError("username")}
                                        </div>

                                        <div>
                                            <label className={labelClass}>
                                                Password{" "}
                                                <span className="text-red-500">*</span>
                                            </label>

                                            <input
                                                type="password"
                                                name="password"
                                                value={form.password}
                                                onChange={handleChange}
                                                className={inputClass("password")}
                                                placeholder="Minimum 8 characters"
                                                autoComplete="new-password"
                                            />

                                            {renderError("password")}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className={labelClass}>
                                                Confirm Password{" "}
                                                <span className="text-red-500">*</span>
                                            </label>

                                            <input
                                                type="password"
                                                name="confirm_password"
                                                value={form.confirm_password}
                                                onChange={handleChange}
                                                className={inputClass("confirm_password")}
                                                placeholder="Re-enter password"
                                                autoComplete="new-password"
                                            />

                                            {renderError("confirm_password")}
                                        </div>
                                    </div>

                                    <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-3">
                                        <p className="text-sm text-slate-700">
                                            <strong>Account role:</strong>{" "}
                                            STAFF
                                        </p>

                                        <p className="text-xs text-slate-500 mt-1">
                                            The backend must assign the
                                            correct tenant and branch and
                                            reject a second authorized
                                            staff login for the same branch.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Professional Information */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-slate-800 mb-4">
                            Professional Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>
                                    Role
                                </label>

                                <input
                                    type="text"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    className={inputClass("role")}
                                    placeholder="e.g. Gym Staff"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Specialization
                                </label>

                                <input
                                    type="text"
                                    name="specialization"
                                    value={form.specialization}
                                    onChange={handleChange}
                                    className={inputClass("specialization")}
                                    placeholder="e.g. Fitness Training"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Experience (years)
                                </label>

                                <input
                                    type="number"
                                    name="experience"
                                    value={form.experience}
                                    min="0"
                                    max="50"
                                    onChange={handleChange}
                                    className={inputClass("experience")}
                                />

                                {renderError("experience")}
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Joining Date
                                </label>

                                <input
                                    type="date"
                                    name="joining_date"
                                    value={form.joining_date}
                                    onChange={handleChange}
                                    className={inputClass("joining_date")}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Salary (₹)
                                </label>

                                <input
                                    type="number"
                                    name="salary"
                                    value={form.salary}
                                    min="0"
                                    onChange={handleChange}
                                    className={inputClass("salary")}
                                />

                                {renderError("salary")}
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Status
                                </label>

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

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-8 py-2.5 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-sm font-medium transition"
                        >
                            {isEdit ? "Update Staff" : "Save Staff"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStaffs;
