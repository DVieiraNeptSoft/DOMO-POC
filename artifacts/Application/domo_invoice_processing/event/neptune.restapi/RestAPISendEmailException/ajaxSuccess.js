//saving the pdf base 64 string to use later in the reply exception app
var options = {
    // parameters: {
    //     where: JSON.stringify({ebeln: modelSimpleFormUpload.oData.EBELN, belnr: materialDocument}), // Optional
    // },
    data: {
        // ebeln: parseInt(modelSimpleFormUpload.oData.EBELN),
        ebeln: modelSimpleFormUpload.oData.EBELN,
        // belnr: parseInt(materialDocument),
        belnr: materialDocument,
        pdf64string: fileContentBase64,
        // pdf64string: "",
    },
};

apiRestAPISaveExceptionPDF(options);
