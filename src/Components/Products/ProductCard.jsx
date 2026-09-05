import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const ProductCard = ({
    product,
    user,
    onSell,
    onEdit,
    onDelete,
}) => {
    const p = product;

    return (
        <div
            className={`p-6 rounded-xl shadow transition ${Number(p.stock) === 0
                    ? "bg-gray-300 text-gray-500"
                    : "bg-white"
                }`}
        >
            <h3 className="text-xl font-bold">{p.name}</h3>

            {p.image && (
                <img
                    src={p.image}
                    alt={p.name}
                    className={`w-full h-48 object-cover rounded-lg mt-2 ${Number(p.stock) === 0
                            ? "grayscale opacity-50"
                            : ""
                        }`}
                />
            )}

            <p className="text-slate-600 mt-2">{p.description}</p>

            <p className="mt-2 text-sm">{p.category}</p>

            <div className="flex justify-between mt-4">
                <p className="font-bold">₹{p.price}</p>
                <p className="text-sm">Stock: {p.stock}</p>
            </div>

            <div className="flex justify-between mt-5">
                {Number(p.stock) === 0 ? (
                    <>
                        <span className="text-red-600 font-semibold">
                            Out of Stock
                        </span>

                        {user?.is_superuser && (
                            <button
                                className="p-2 rounded-md hover:bg-red-100"
                                onClick={() => onDelete(p.id)}
                            >
                                <Trash2
                                    size={16}
                                    className="text-red-600"
                                />
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => onSell(p)}
                            className="px-8 py-2 rounded text-white bg-yellow-500"
                        >
                            Sell
                        </button>

                        <div className="flex gap-2">
                            <button
                                className="p-2 rounded-md hover:bg-green-100"
                                onClick={() => onEdit(p)}
                            >
                                <Edit2
                                    size={16}
                                    className="text-green-600"
                                />
                            </button>

                            {user?.is_superuser && (
                                <button
                                    className="p-2 rounded-md hover:bg-red-100"
                                    onClick={() => onDelete(p.id)}
                                >
                                    <Trash2
                                        size={16}
                                        className="text-red-600"
                                    />
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductCard;