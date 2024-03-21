var poString, totalAmountString, materialDocument;

function pdfToBlob(base64EncodedPDF) {
    var decodedPdfContent = atob(base64EncodedPDF.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2]);
    var byteArray = new Uint8Array(decodedPdfContent.length);
    for (var i = 0; i < decodedPdfContent.length; i++) {
        byteArray[i] = decodedPdfContent.charCodeAt(i);
    }
    var blob = new Blob([byteArray.buffer], { type: "application/pdf" });
    return URL.createObjectURL(blob);
}

function fill_fieldsFromOCR(text) {
    var arrayText = text.split("\n");

    for (let i = 0; i < arrayText.length; i++) {
        if (arrayText[i].includes("PO:")) {
            poString = arrayText[i].split('PO: ');
        }

        if (arrayText[i].includes("Total Amount:")) {
            totalAmountString = arrayText[i].split('Total Amount: ');
        }        
    }

    materialDocument = arrayText[9].split(' ')[0];

    InputPO.setValue(poString[1]);
    InputTotalAmount.setValue(totalAmountString[1]);
}
