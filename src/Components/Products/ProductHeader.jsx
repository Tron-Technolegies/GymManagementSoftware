import React from "react";
import { Plus } from "lucide-react";

const ProductHeader = ({
    search,
    setSearch,
    category,
    setCategory,
    priceSort,
    setPriceSort,
    stockSort,
    setStockSort,
    onAdd,
}) => {
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Products</h1>

            <div className="flex flex-wrap items-center gap-3 md:gap-5 w-full lg:w-auto">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full sm:w-auto appearance-none bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition cursor-pointer"
                >
                    <option value="all">All</option>
                    <option value="supplements">Supplements</option>
                    <option value="equipment">Equipment</option>
                    <option value="accessories">Gym Accessories</option>
                    <option value="apparel">Gym Apparel</option>
                    <option value="footwear">Footwear</option>
                    <option value="nutrition">Nutrition & Drinks</option>
                    <option value="other">Other</option>
                </select>

                <select
                    value={priceSort}
                    onChange={(e) => {
                        setPriceSort(e.target.value);
                        if (e.target.value) setStockSort("");
                    }}
                    className="w-full sm:w-auto appearance-none bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition cursor-pointer"
                >
                    <option value="">Price</option>
                    <option value="low">Low → High</option>
                    <option value="high">High → Low</option>
                </select>

                <select
                    value={stockSort}
                    onChange={(e) => {
                        setStockSort(e.target.value);
                        if (e.target.value) setPriceSort("");
                    }}
                    className="w-full sm:w-auto appearance-none bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition cursor-pointer"
                >
                    <option value="">Stock</option>
                    <option value="low">Low → High</option>
                    <option value="high">High → Low</option>
                </select>

                <div className="bg-white shadow-sm border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-2 w-full sm:w-72 focus-within:ring-2 focus-within:ring-yellow-500 transition">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full outline-none text-sm text-slate-700 placeholder-slate-400 bg-transparent"
                    />
                </div>

                <button
                    onClick={onAdd}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={16} />
                    Add
                </button>
            </div>
        </div>
    );
};

export default ProductHeader;