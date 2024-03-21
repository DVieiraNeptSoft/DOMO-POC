sap.ui.core.BusyIndicator.hide();
var imgArray = xhr.responseJSON;

if (imgArray.length > 0) {
    // App.to(PageShowImages);
    // modelCarousel.setData(imgArray);
    // modelCarousel.refresh();
    // sap.m.MessageToast.show("PDF Converted Successfully");
    console.log("Converted PDF to Image:");
    console.log(imgArray);

    var img = imgArray[0].img;
    // img = img.split("data:image/png;base64,");

    // console.log("Splitted the image string");
    // console.log(img[1]); //image string

    smallImage.setSrc(img);
    // oPanel.setVisible(true);
    // oBtnOCR.setVisible(true);

    // oBtnOCR.setEnabled(false);
    App.setBusy(true);
    sap.m.MessageToast.show("OCR has begun...");
    beginOCR();
} else {
    sap.m.MessageToast.show("Error converting PDF to Image  !");
}
