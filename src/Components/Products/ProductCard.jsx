import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const ProductCard = ({
    product,
    user,
    canManageProducts,
    canSellProducts,
    onSell,
    onEdit,
    onDelete,
}) => {
    const p = product;

    return (
        <div
            className={`p-3 rounded-xl shadow transition ${Number(p.stock) === 0
                ? "bg-gray-300 text-gray-500"
                : "bg-white"
                }`}
        >
            <h3 className="text-lg font-bold truncate">
                {p.name}
            </h3>

            {p.image && (
                <img
                    src={p.image}
                    alt={p.name}
                    className={`w-full h-32 object-contain bg-gray-50 rounded-lg mt-2 ${Number(p.stock) === 0
                        ? "grayscale opacity-50"
                        : ""
                        }`}
                />
            )}

            <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                {p.description}
            </p>

            <p className="mt-2 text-xs">
                {p.category}
            </p>

            <div className="flex justify-between items-center mt-2">
                <p className="font-bold text-sm">
                    ₹{p.price}
                </p>

                <p className="text-xs">
                    Stock: {p.stock}
                </p>
            </div>

            <div className="flex justify-between items-center mt-3">
                {/* OUT OF STOCK */}
                {Number(p.stock) === 0 ? (
                    <>
                        <span className="text-red-600 text-sm font-semibold">
                            Out of Stock
                        </span>

                        {canManageProducts && (
                            <button
                                type="button"
                                className="p-2 rounded-md hover:bg-red-100"
                                onClick={() => onDelete(p.id)}
                            >
                                <Trash2
                                    size={15}
                                    className="text-red-600"
                                />
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        {/* SELL */}
                        {canSellProducts && (
                            <button
                                type="button"
                                onClick={() => onSell(p)}
                                className="px-5 py-1.5 text-sm rounded text-white bg-yellow-500 hover:bg-yellow-600"
                            >
                                Sell
                            </button>
                        )}

                        {/* EDIT / DELETE */}
                        {canManageProducts && (
                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    className="p-2 rounded-md hover:bg-yellow-100"
                                    onClick={() => onEdit(p)}
                                >
                                    <Pencil
                                        size={15}
                                        className="text-yellow-600"
                                    />
                                </button>

                                <button
                                    type="button"
                                    className="p-2 rounded-md hover:bg-red-100"
                                    onClick={() => onDelete(p.id)}
                                >
                                    <Trash2
                                        size={15}
                                        className="text-red-600"
                                    />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductCard;