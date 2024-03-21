var file = pdfUploader.oFileUpload.files[0];

if (file) {
    var fileReader = new FileReader();
    fileName = file.name;
    fileReader.onload = function (fileLoadedEvent) {
        fileContentBase64 = fileLoadedEvent.target.result;

        fileContent = fileContentBase64.split('data:application/pdf;base64,')[1];
        console.log(fileContent);
        
        PDFViewer.setVisible(true);
        PDFViewer.setSource(pdfToBlob(fileContentBase64));
        // Panel.setVisible(true);
        ButtonUpload.setVisible(true);
    };

    fileReader.readAsDataURL(file);
}