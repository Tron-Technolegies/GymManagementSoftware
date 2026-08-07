import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
// import { uploadDietPDF } from "../api/dietplan"

const buildFileName = (memberName) => {
    const safeMemberName = memberName
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return `${safeMemberName}-AI-Diet-Plan.pdf`;
};

/**
 * Captures pdfRef's content and builds a jsPDF document with a proper
 * header, clean page slicing, and footer page numbers.
 */
const generatePDF = async (pdfRef, options = {}) => {
    const { memberName = "Member", reportTitle = "AI Diet Plan Report" } = options;

    const element = pdfRef.current;
    if (!element) {
        throw new Error("PDF element not found");
    }

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
    });

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 10;
    const contentWidth = pageWidth - margin * 2;
    const headerHeight = 24;

    pdf.setFillColor(37, 99, 235);
    pdf.rect(0, 0, pageWidth, headerHeight, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(reportTitle, margin, 13);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(`Prepared for: ${memberName}`, margin, 20);

    const dateStr = new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    pdf.text(dateStr, pageWidth - margin, 20, { align: "right" });

    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;
    const pxPerMm = imgWidthPx / contentWidth;

    const firstPageContentHeightMm = pageHeight - headerHeight - margin * 1.5;
    const otherPageContentHeightMm = pageHeight - margin * 2;

    const sliceCanvas = document.createElement("canvas");
    const sliceCtx = sliceCanvas.getContext("2d");

    let renderedPx = 0;
    let isFirstPage = true;
    let pageNum = 1;

    while (renderedPx < imgHeightPx) {
        const availableMm = isFirstPage
            ? firstPageContentHeightMm
            : otherPageContentHeightMm;

        const sliceHeightPx = Math.min(
            Math.floor(availableMm * pxPerMm),
            imgHeightPx - renderedPx
        );

        sliceCanvas.width = imgWidthPx;
        sliceCanvas.height = sliceHeightPx;
        sliceCtx.clearRect(0, 0, imgWidthPx, sliceHeightPx);
        sliceCtx.drawImage(
            canvas,
            0, renderedPx, imgWidthPx, sliceHeightPx,
            0, 0, imgWidthPx, sliceHeightPx
        );

        const sliceData = sliceCanvas.toDataURL("image/png");
        const sliceHeightMm = sliceHeightPx / pxPerMm;
        const yPos = isFirstPage ? headerHeight + 5 : margin;

        pdf.addImage(sliceData, "PNG", margin, yPos, contentWidth, sliceHeightMm);

        pdf.setTextColor(148, 163, 184);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 6, { align: "center" });

        renderedPx += sliceHeightPx;
        isFirstPage = false;

        if (renderedPx < imgHeightPx) {
            pdf.addPage();
            pageNum++;
        }
    }

    return { pdf, fileName: buildFileName(memberName) };
};

const useDownloadPDF = () => {
    const downloadPDF = async (pdfRef, options = {}) => {
        try {
            const { pdf, fileName } = await generatePDF(pdfRef, options);
            pdf.save(fileName);
        } catch (error) {
            console.error("PDF ERROR", error);
        }
    };

    /**
     * Generates the PDF, uploads it to Django to get a public URL, then
     * opens WhatsApp directly in the member's chat with the link
     * prefilled in the message text. No attach step needed since it's
     * a link, not a file - member just taps Send.
     *
     * @param {React.RefObject} pdfRef
     * @param {Object} options - memberName, reportTitle
     * @param {Object} member - full member object (needs id, phone)
     */
    const sharePDFToWhatsApp = async (
        pdfRef,
        options = {}
    ) => {

        try {

            const { pdf, fileName } = await generatePDF(
                pdfRef,
                options
            );


            const pdfBlob = pdf.output("blob");
            const pdfFile = new File(
                [pdfBlob],
                fileName,
                {
                    type: "application/pdf"
                }
            );


            if (navigator.canShare && navigator.canShare({
                files: [pdfFile]
            })) {

                await navigator.share({

                    title: "AI Diet Plan",

                    text: `Dear ${options.memberName},

Your AI Diet Plan is ready.`,

                    files: [
                        pdfFile
                    ]

                });

            } else {

                // fallback for unsupported browsers
                pdf.save(fileName);

                alert(
                    "Direct sharing is not supported on this device. PDF downloaded."
                );
            }


        } catch (error) {

            console.error(
                "WHATSAPP SHARE ERROR",
                error
            );

        }

    };

    return {
        downloadPDF,
        sharePDFToWhatsApp
    };
};

export default useDownloadPDF;