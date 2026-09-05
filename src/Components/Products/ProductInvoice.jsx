import React, { forwardRef, useImperativeHandle, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Invoice2 from "../../Components/Sales/Invoice2"

// **********SINLE SALE INVOICE*************

const ProductInvoice = forwardRef(({ saleModal }, ref) => {
    const invoiceRef = useRef();

    const downloadInvoice = async () => {
        try {
            const element = invoiceRef.current;

            if (!element) {
                console.log("Invoice ref not found");
                return;
            }

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");

            const pdfWidth = pdf.internal.pageSize.getWidth();

            const pdfHeight =
                (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(
                imgData,
                "PNG",
                0,
                0,
                pdfWidth,
                pdfHeight
            );

            const productName = saleModal?.product || "product";
            const memberName = saleModal?.member_name || "member";

            const fileName = `${productName}-${memberName}`
                .replace(/[<>:"/\\|?*]/g, "")
                .trim();

            pdf.save(`${fileName}.pdf`);
        } catch (err) {
            console.error("PDF Error", err);
        }
    };

    useImperativeHandle(ref, () => ({
        downloadInvoice,
    }));

    if (!saleModal) {
        return null;
    }

    return (
        <div
            style={{
                position: "absolute",
                left: "-9999px",
                top: "0",
                width: "800px",
                background: "#fff",
                zIndex: -1,
            }}
        >
            <Invoice2
                ref={invoiceRef}
                sale={{
                    id: saleModal.id,
                    invoice_no: saleModal.invoice_no,
                    member_id: saleModal.member_id,
                    member_name: saleModal.member_name,
                    total_amount: saleModal.total_amount,
                    sold_at: saleModal.sold_at,
                    payment_method: saleModal.payment_method,
                    items: [
                        {
                            product_name: saleModal.product,
                            quantity: saleModal.quantity,
                            price: saleModal.unit_price,
                            subtotal: saleModal.total_amount,
                        },
                    ],
                }}
            />
        </div>
    );
});

export default ProductInvoice;