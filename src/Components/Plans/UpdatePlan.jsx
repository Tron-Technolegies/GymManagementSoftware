export default function UpdatePlan({
    formData,
    setFormData,
    onClose,
    onSubmit,
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 sm:p-6">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white p-6 sm:p-8 rounded-xl border border-slate-300 shadow-2xl">

                <h2 className="font-bold text-lg mb-4">
                    Update Plan
                </h2>

                <div className="flex flex-col gap-4">

                    <input
                        placeholder="Plan Name"
                        className="border border-slate-300 shadow-md p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                    />

                    <input
                        placeholder="Price"
                        className="border border-slate-300 shadow-md p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                price: e.target.value,
                            })
                        }
                    />

                    <input
                        placeholder="Duration (months/days)"
                        className="border border-slate-300 shadow-md p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={formData.duration}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                duration: e.target.value,
                            })
                        }
                    />

                    <div className="md:col-span-2 flex justify-end gap-3">

                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-slate-300 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onSubmit}
                            className="bg-yellow-600 text-white px-4 py-2 rounded-lg"
                        >
                            Update
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}