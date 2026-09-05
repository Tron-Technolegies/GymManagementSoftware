import React from "react";

const SaleSuccessModal = ({
    saleModal,
    onDownload,
    onClose,
}) => {
    if (!saleModal) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-[420px] bg-white rounded-xl shadow-xl p-6 text-center">
                <div className="text-2xl my-5">
                    Sale Successful
                </div>

                <p className="text-gray-600 mb-4">
                    Your sale is succesful
                </p>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={onDownload}
                        className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                    >
                        Download Invoice
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-yellow-500 text-white py-2 rounded-md"
                    >
                        OK
                    </button>

                    <button
                        onClick={onClose}
                        className="text-gray-500 text-sm mt-1 hover:text-black"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaleSuccessModal;