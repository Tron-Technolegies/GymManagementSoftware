import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// **************ADMIN SALES REPORT ****************

export const generateInvoicePDF = async (
    invoiceRef,
    period = "daily",
    selectedDate = ""
) => {
    const element = invoiceRef.current;

    if (!element) return;

    await new Promise((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
        });
    });

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

    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        pdfWidth,
        pdfHeight
    );

    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft > 0) {
        position -= pdf.internal.pageSize.getHeight();

        pdf.addPage();

        pdf.addImage(
            imgData,
            "PNG",
            0,
            position,
            pdfWidth,
            pdfHeight
        );

        heightLeft -= pdf.internal.pageSize.getHeight();
    }

    // ==============================
    // PDF FILE NAME
    // ==============================

    let fileName;

    if (period === "daily") {
        fileName = `Daily-Sales-Report-${selectedDate}.pdf`;
    } else if (period === "weekly") {
        fileName = "Weekly-Sales-Report.pdf";
    } else if (period === "monthly") {
        fileName = "Monthly-Sales-Report.pdf";
    } else if (period === "yearly") {
        fileName = "Yearly-Sales-Report.pdf";
    } else {
        fileName = `Sales-Report-${selectedDate}.pdf`;
    }

    pdf.save(fileName);
};