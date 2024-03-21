async function beginOCR() {
    const worker = window.Tesseract;

    const innerWorker = await worker.createWorker("eng");

    (async () => {
        const {
            data: { text },
        } = await innerWorker.recognize(smallImage.getSrc());
        oTextArea.setValue(text);

        fill_fieldsFromOCR(text); //get PO and Total Amount fields

        await innerWorker.terminate();
        App.setBusy(false);
        // oBtnOCR.setEnabled(true);
        oTextArea.setVisible(true);
        smallImage.setHeight("300px");
        smallImage.setWidth("200px");

        ButtonOCROpen.setVisible(true);
        ButtonPDFOpen.setVisible(true);
        
        ButtonSubmitSAP.setEnabled(true);

        sap.m.MessageToast.show("PDF Scanned Successfully");

        console.log(materialDocument);
    })();
}
