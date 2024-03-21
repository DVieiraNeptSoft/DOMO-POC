function sendEmailPosting() {
    var filename = "InvoiceNr" + modelSimpleFormUpload.oData.EBELN + ".pdf";

    var options = {
        data: {
            GS_INVOICE: {
                EBELN: modelSimpleFormUpload.oData.EBELN,
                BELNR: materialDocument,
                ZTOTAL: modelSimpleFormUpload.oData.ZTOTAL,
            },

            attachments: { filename: filename, data: fileContent },
        },
    };

    apiRestAPISendEmailPosting(options);
}

function sendEmailException() {
    sap.ui.core.BusyIndicator.show(0);

    var filename = "InvoiceNr" + modelSimpleFormUpload.oData.EBELN + ".pdf";

    var options = {
        data: {
            GS_INVOICE: {
                EBELN: modelSimpleFormUpload.oData.EBELN,
                BELNR: materialDocument,
                ZTOTAL: modelSimpleFormUpload.oData.ZTOTAL
            },

            attachments: { filename: filename, data: fileContent },
        },
    };

    apiRestAPISendEmailException(options);
}
