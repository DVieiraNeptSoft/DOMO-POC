var pdfAttachment;

function createDataURL(pdf) {
    //Register BLOBs on the application.
    jQuery.sap.addUrlWhitelist("blob");
    //convert the base64 to binary and insert it in a byte array.
    var decodedPdfContent = atob(pdf);
    var byteArray = new Uint8Array(decodedPdfContent.length);
    for (var i = 0; i < decodedPdfContent.length; i++) {
        byteArray[i] = decodedPdfContent.charCodeAt(i);
    }
    //create a BLOB and a URL
    var blob = new Blob([byteArray.buffer], { type: "application/pdf" });
    var pdfurl = URL.createObjectURL(blob);

    return pdfurl;
}

function generatePDF() {
    var final_data = {};

    final_data.EBELN = modelSimpleFormShowHeader.oData.EBELN;
    final_data.BUKRS = modelSimpleFormShowHeader.oData.BUKRS;

    var tableEKBE = modelMultiModelEx1.oData.result.GT_EKBE;

    //Calc total invoice amount
    final_data.ZTOTAL = 0;

    for (let i = 0; i < tableEKBE.length; i++) {
        final_data.ZTOTAL = final_data.ZTOTAL + tableEKBE[i].WRBTR;
    }

    var PDFData = { GS_EKKO: final_data, GT_EKBE: tableEKBE };

    $.ajax({
        type: "POST",
        // url: "/pdf/elearning_pdf_demo",
        url: "/pdf/domo_po_pdf",
        data: PDFData,
        success: function (data) {
            // elem.src = "data:application/pdf;base64," + data;
            // Show PDF after decode into base 64
            console.log("data:application/pdf;base64," + data);

            var temp = data;
            App.setBusy(false);

            pdfAttachment = temp;

            var pdfurl = createDataURL(temp);
            console.log(pdfurl);
            oPDFViewer.setSource(pdfurl);

            App.to(oPageViewSalesOrderPDF);
        },
        error: function (result, status) {
            if (data.responseJSON && result.responseJSON.status)
                console.error(data.responseJSON.status);

            App.setBusy(false);
        },
    });

    console.log("PDFData:");
    console.log(PDFData);
}
