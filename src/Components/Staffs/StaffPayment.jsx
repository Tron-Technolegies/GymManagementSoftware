import React from "react";

const StaffPayment = ({
    staff,
    paymentData,
    setPaymentData,
    onClose,
    onSubmit,
}) => {
    if (!staff) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">

                <h3 className="text-lg font-semibold mb-4">
                    Staff Payment
                </h3>

                <p className="mb-4">
                    {staff.id} / {staff.name}
                </p>

                {/* PAYMENT TYPE */}

                <select
                    value={paymentData.payment_type}
                    onChange={(e) =>
                        setPaymentData({
                            ...paymentData,
                            payment_type: e.target.value,
                        })
                    }
                    className="w-full border border-slate-300 shadow-md rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    <option value="">
                        Payment Type
                    </option>

                    <option value="Salary">
                        Salary
                    </option>

                    <option value="Incentive">
                        Incentive
                    </option>

                    <option value="Bonus">
                        Bonus
                    </option>

                    <option value="Commission">
                        Commission
                    </option>

                    <option value="Advance">
                        Advance
                    </option>

                    <option value="Overtime">
                        Overtime
                    </option>

                    <option value="Other">
                        Other
                    </option>
                </select>

                {/* AMOUNT */}

                <input
                    type="number"
                    placeholder="Amount"
                    value={paymentData.amount}
                    onChange={(e) =>
                        setPaymentData({
                            ...paymentData,
                            amount: e.target.value,
                        })
                    }
                    className="w-full border border-slate-300 shadow-md rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />

                {/* DATE */}

                <input
                    type="date"
                    value={paymentData.payment_date}
                    onChange={(e) =>
                        setPaymentData({
                            ...paymentData,
                            payment_date: e.target.value,
                        })
                    }
                    className="w-full border border-slate-300 shadow-md rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />

                {/* PAYMENT METHOD */}

                <select
                    value={paymentData.payment_method}
                    onChange={(e) =>
                        setPaymentData({
                            ...paymentData,
                            payment_method: e.target.value,
                        })
                    }
                    className="w-full border border-slate-300 shadow-md rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    <option value="">
                        Payment Method
                    </option>

                    <option value="Cash">
                        Cash
                    </option>

                    <option value="Card">
                        Card
                    </option>

                    <option value="UPI">
                        UPI
                    </option>

                    <option value="Bank Transfer">
                        Bank Transfer
                    </option>
                </select>

                {/* BUTTONS */}

                <div className="flex justify-end gap-2">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-300 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
                    >
                        {paymentData.payment_type
                            ? `Pay ${paymentData.payment_type}`
                            : "Make Payment"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default StaffPayment;