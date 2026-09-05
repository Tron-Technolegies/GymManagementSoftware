import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";


// =====================================================
// BUILD FILE NAME
// =====================================================

const buildFileName = (
    memberName,
    reportTitle
) => {

    const safeMemberName = memberName
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const safeReportTitle = reportTitle
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return `${safeMemberName}-${safeReportTitle}.pdf`;
};


// =====================================================
// GENERATE PDF
// =====================================================

const generatePDF = async (
    pdfRef,
    options = {}
) => {

    const {
        memberName = "Member",
        reportTitle = "AI Diet Plan Report"
    } = options;


    // =================================================
    // GET ELEMENT
    // =================================================

    const element =
        pdfRef.current;

    if (!element) {
        throw new Error(
            "PDF element not found"
        );
    }


    // =================================================
    // CAPTURE REACT CONTENT
    // =================================================

    const canvas =
        await html2canvas(
            element,
            {
                scale: 2,
                useCORS: true,
                backgroundColor:
                    "#ffffff",
            }
        );


    // =================================================
    // CREATE PDF
    // =================================================

    const pdf =
        new jsPDF(
            "p",
            "mm",
            "a4"
        );


    const pageWidth =
        pdf.internal.pageSize.getWidth();

    const pageHeight =
        pdf.internal.pageSize.getHeight();


    const margin = 10;

    const contentWidth =
        pageWidth -
        margin * 2;

    const headerHeight = 24;


    // =================================================
    // HEADER
    // =================================================

    pdf.setFillColor(
        37,
        99,
        235
    );

    pdf.rect(
        0,
        0,
        pageWidth,
        headerHeight,
        "F"
    );


    // Header text

    pdf.setTextColor(
        255,
        255,
        255
    );


    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(16);


    pdf.text(
        reportTitle,
        margin,
        13
    );


    // Member name

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(10);


    pdf.text(
        `Prepared for: ${memberName}`,
        margin,
        20
    );


    // Date

    const dateStr =
        new Date().toLocaleDateString(
            "en-IN",
            {
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        );


    pdf.text(
        dateStr,
        pageWidth - margin,
        20,
        {
            align: "right"
        }
    );


    // =================================================
    // IMAGE / CONTENT CALCULATION
    // =================================================

    const imgWidthPx =
        canvas.width;

    const imgHeightPx =
        canvas.height;


    const pxPerMm =
        imgWidthPx /
        contentWidth;


    // First page available height

    const firstPageContentHeightMm =
        pageHeight -
        headerHeight -
        margin * 1.5;


    // Other pages available height

    const otherPageContentHeightMm =
        pageHeight -
        margin * 2;


    // =================================================
    // CREATE TEMPORARY CANVAS
    // =================================================

    const sliceCanvas =
        document.createElement(
            "canvas"
        );


    const sliceCtx =
        sliceCanvas.getContext(
            "2d"
        );


    let renderedPx = 0;

    let isFirstPage = true;

    let pageNum = 1;


    // =================================================
    // CREATE PDF PAGES
    // =================================================

    while (
        renderedPx <
        imgHeightPx
    ) {

        const availableMm =
            isFirstPage
                ? firstPageContentHeightMm
                : otherPageContentHeightMm;


        // Calculate how many pixels
        // can fit on the current page

        const sliceHeightPx =
            Math.min(
                Math.floor(
                    availableMm *
                    pxPerMm
                ),
                imgHeightPx -
                renderedPx
            );


        // Resize temporary canvas

        sliceCanvas.width =
            imgWidthPx;

        sliceCanvas.height =
            sliceHeightPx;


        // Clear canvas

        sliceCtx.clearRect(
            0,
            0,
            imgWidthPx,
            sliceHeightPx
        );


        // =================================================
        // COPY PART OF ORIGINAL CANVAS
        // =================================================

        sliceCtx.drawImage(
            canvas,

            // Source
            0,
            renderedPx,
            imgWidthPx,
            sliceHeightPx,

            // Destination
            0,
            0,
            imgWidthPx,
            sliceHeightPx
        );


        // =================================================
        // CONVERT SLICE TO IMAGE
        // =================================================

        const sliceData =
            sliceCanvas.toDataURL(
                "image/png"
            );


        // Calculate image height in mm

        const sliceHeightMm =
            sliceHeightPx /
            pxPerMm;


        // Position

        const yPos =
            isFirstPage
                ? headerHeight + 5
                : margin;


        // =================================================
        // ADD IMAGE TO PDF
        // =================================================

        pdf.addImage(
            sliceData,
            "PNG",
            margin,
            yPos,
            contentWidth,
            sliceHeightMm
        );


        // =================================================
        // FOOTER
        // =================================================

        pdf.setTextColor(
            148,
            163,
            184
        );

        pdf.setFontSize(8);

        pdf.setFont(
            "helvetica",
            "normal"
        );


        pdf.text(
            `Page ${pageNum}`,
            pageWidth / 2,
            pageHeight - 6,
            {
                align: "center"
            }
        );


        // =================================================
        // UPDATE POSITION
        // =================================================

        renderedPx +=
            sliceHeightPx;


        isFirstPage = false;


        // =================================================
        // ADD NEXT PAGE
        // =================================================

        if (
            renderedPx <
            imgHeightPx
        ) {

            pdf.addPage();

            pageNum++;

        }

    }


    // =================================================
    // RETURN PDF
    // =================================================

    return {

        pdf,

        fileName:
            buildFileName(
                memberName,
                reportTitle
            )

    };
};


// =====================================================
// HOOK
// =====================================================

const useDownloadPDF = () => {


    // =================================================
    // DOWNLOAD PDF
    // =================================================

    const downloadPDF = async (
        pdfRef,
        options = {}
    ) => {

        try {

            const {
                pdf,
                fileName
            } =
                await generatePDF(
                    pdfRef,
                    options
                );


            pdf.save(
                fileName
            );


        } catch (error) {

            console.error(
                "PDF ERROR:",
                error
            );

        }

    };


    // =================================================
    // RETURN
    // =================================================

    return {

        downloadPDF

    };

};


export default useDownloadPDF;