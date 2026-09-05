import React, { useRef, useState } from "react";

import useProducts from "../hooks/Products/useProducts";
import useProductFilters from "../hooks/Products/useProductFilters";
import useProductSale from "../hooks/Products/useProductSale";
import { useSaleInvoice } from "../hooks/Sales/useSaleInvoice"
import ProductHeader from "../Components/Products/ProductHeader";
import ProductCard from "../Components/Products/ProductCard";
import ProductFormModal from "../Components/Products/ProductFormModal";
import DeleteProductModal from "../Components/Products/DeleteProductModal";
import SellProductModal from "../Components/Products/SellProductModal";
import SaleSuccessModal from "../Components/Products/SaleSuccessModal";
import ProductInvoice from "../Components/Products/ProductInvoice";
import AlertMessage from "../Components/AlertMessage";

const Products = () => {
    const {
        products,
        addProduct,
        editProduct,
        removeProduct,
        fetchProducts,
    } = useProducts();

    const {
        search,
        setSearch,
        category,
        setCategory,
        priceSort,
        setPriceSort,
        stockSort,
        setStockSort,
        filteredProducts,
    } = useProductFilters(products);

    const user = JSON.parse(
        localStorage.getItem("adminUser") || "null"
    );

    const [showFormModal, setShowFormModal] = useState(false);
    const [editing, setEditing] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const invoiceRef = useRef();

    const {
        saleModal,
        createSale,
        closeSaleModal,
    } = useSaleInvoice();

    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertOpen(true);
    };

    const {
        showSellModal,
        selectedProduct,
        sellData,
        setSellData,
        memberError,
        quantityerror,
        memberName,
        openSell,
        closeSell,
        checkMember,
        checkQuantity,
        handleSell,
    } = useProductSale(
        createSale,
        fetchProducts,
        showAlert
    );

    const openAdd = () => {
        setEditing(null);
        setShowFormModal(true);
    };

    const openEdit = (product) => {
        setEditing(product);
        setShowFormModal(true);
    };

    const handleSaveProduct = async (formData) => {
        try {
            if (editing) {
                await editProduct(editing.id, formData);
                showAlert("Product updated successfully!");
            } else {
                await addProduct(formData);
                showAlert("Product added successfully!");
            }

            setShowFormModal(false);
            setEditing(null);
        } catch (err) {
            console.error(err);

            showAlert(
                editing
                    ? "Failed to update product!"
                    : "Failed to add product!"
            );
        }
    };

    const handleDelete = async () => {
        try {
            await removeProduct(selectedProductId);

            showAlert("Product deleted successfully!");

            setShowDeleteModal(false);
            setSelectedProductId(null);
        } catch (err) {
            console.error(err);

            showAlert("Failed to delete product!");
        }
    };

    return (
        <div className="flex flex-col gap-8">

            {/* Product Header */}
            <ProductHeader
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                priceSort={priceSort}
                setPriceSort={setPriceSort}
                stockSort={stockSort}
                setStockSort={setStockSort}
                onAdd={openAdd}
            />

            {/* Products */}
            <div className="grid md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        user={user}
                        onSell={openSell}
                        onEdit={openEdit}
                        onDelete={(productId) => {
                            setSelectedProductId(productId);
                            setShowDeleteModal(true);
                        }}
                    />
                ))}
            </div>

            {/* Add / Edit Product Modal */}
            {showFormModal && (
                <ProductFormModal
                    open={showFormModal}
                    onClose={() => {
                        setShowFormModal(false);
                        setEditing(null);
                    }}
                    onSubmit={handleSaveProduct}
                    editing={editing}
                />
            )}

            {/* Delete Product Modal */}
            {showDeleteModal && (
                <DeleteProductModal
                    open={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(false);
                        setSelectedProductId(null);
                    }}
                    onConfirm={handleDelete}
                />
            )}

            {/* Sell Product Modal */}
            {showSellModal && selectedProduct && (
                <SellProductModal
                    open={showSellModal}
                    onClose={closeSell}
                    selectedProduct={selectedProduct}
                    sellData={sellData}
                    setSellData={setSellData}
                    memberError={memberError}
                    quantityerror={quantityerror}
                    memberName={memberName}
                    onCheckMember={checkMember}
                    onCheckQuantity={checkQuantity}
                    onSell={handleSell}
                />
            )}

            {/* Sale Success Modal */}
            <SaleSuccessModal
                saleModal={saleModal}
                onDownload={() =>
                    invoiceRef.current?.downloadInvoice()
                }
                onClose={closeSaleModal}
            />

            {/* Invoice */}
            <ProductInvoice
                ref={invoiceRef}
                saleModal={saleModal}
            />

            {/* Alert */}
            <AlertMessage
                show={alertOpen}
                message={alertMessage}
                type="success"
                onClose={() => setAlertOpen(false)}
            />

        </div>
    );
};

export default Products;