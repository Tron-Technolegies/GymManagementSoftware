import { useMemo, useState } from "react";

const useProductFilters = (products) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [priceSort, setPriceSort] = useState("");
    const [stockSort, setStockSort] = useState("");

    const filteredProducts = useMemo(() => {
        return products
            .filter((p) => {
                const matchesCategory =
                    category === "all" ||
                    p.category?.toLowerCase() === category;

                const matchesSearch =
                    p.name
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                    String(p.id).includes(search);

                return matchesCategory && matchesSearch;
            })
            .sort((a, b) => {
                const priceA = Number(a.price) || 0;
                const priceB = Number(b.price) || 0;

                const stockA = Number(a.stock) || 0;
                const stockB = Number(b.stock) || 0;

                if (priceSort) {
                    return priceSort === "low"
                        ? priceA - priceB
                        : priceB - priceA;
                }

                if (stockSort) {
                    return stockSort === "low"
                        ? stockA - stockB
                        : stockB - stockA;
                }

                return 0;
            });
    }, [
        products,
        search,
        category,
        priceSort,
        stockSort,
    ]);

    return {
        search,
        setSearch,
        category,
        setCategory,
        priceSort,
        setPriceSort,
        stockSort,
        setStockSort,
        filteredProducts,
    };
};

export default useProductFilters;