import { useState } from "react";
import { validateMember } from "../../api/getSales"

const useProductSale = (createSale, fetchProducts, showAlert) => {
    const [showSellModal, setShowSellModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [sellData, setSellData] = useState({
        member_id: "",
        quantity: 1,
        payment_method: "cash",
    });

    const [memberError, setMemberError] = useState("");
    const [quantityerror, setQuantityerror] = useState("");
    const [memberName, setMemberName] = useState("");

    const openSell = (product) => {
        setSelectedProduct(product);
        setShowSellModal(true);

        setSellData({
            member_id: "",
            quantity: 1,
            payment_method: "cash",
        });

        setMemberError("");
        setQuantityerror("");
        setMemberName("");
    };

    const closeSell = () => {
        setShowSellModal(false);
    };

    const checkMember = async () => {
        try {
            const res = await validateMember(
                sellData.member_id
            );

            if (res.data.exists) {
                setMemberError("");
                setMemberName(res.data.member_name);
            } else {
                setMemberError("Invalid Member ID");
                setMemberName("");
            }
        } catch (error) {
            console.error(error);

            setMemberError("Unable to verify member");
            setMemberName("");
        }
    };

    const checkQuantity = () => {
        if (sellData.quantity > selectedProduct.stock) {
            setQuantityerror(
                `Only ${selectedProduct.stock} item(s) available`
            );
        } else {
            setQuantityerror("");
        }
    };

    const handleSell = async () => {
        try {
            const invoiceData = await createSale({
                product_id: selectedProduct.id,
                member_id: sellData.member_id,
                quantity: sellData.quantity,
                payment_method:
                    sellData.payment_method || "cash",
            });

            if (invoiceData) {
                await fetchProducts();

                showAlert("Sale completed");

                setShowSellModal(false);

                setSellData({
                    member_id: "",
                    quantity: 1,
                    payment_method: "cash",
                });

                setMemberError("");
                setQuantityerror("");
                setMemberName("");
            }
        } catch (error) {
            console.error(error);

            showAlert("Failed to complete sale");
        }
    };

    return {
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
    };
};

export default useProductSale;