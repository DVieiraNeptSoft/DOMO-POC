var gs_invoice = {};

function pdfToBlob(base64EncodedPDF) {
    var decodedPdfContent = atob(base64EncodedPDF.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2]);
    var byteArray = new Uint8Array(decodedPdfContent.length);
    for (var i = 0; i < decodedPdfContent.length; i++) {
        byteArray[i] = decodedPdfContent.charCodeAt(i);
    }
    var blob = new Blob([byteArray.buffer], { type: "application/pdf" });
    return URL.createObjectURL(blob);
}