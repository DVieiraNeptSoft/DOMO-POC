function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageData) {
    let image = "data:image/jpeg;base64," + imageData;
    smallImage.setHeight("300px");
    smallImage.setWidth("200px");
    smallImage.setSrc(image);
    MessagePage.setVisible(false);
    oPanel.setVisible(true);
    oTextArea.setVisible(false);
    oBtnOCR.setVisible(true);
    oBtnOCR.setEnabled(true);
    oBtnUpload.setEnabled(true);
    oBtnCamera.setEnabled(true);
}

function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 80,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPG,
        destinationType: Camera.DestinationType.DATA_URL,
    });
}

function getPhoto(source) {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 80,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPG,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: source,
    });
}

function onFail(message) {
    sap.m.MessageToast.show(message);
    oApp.setBusy(false);
    oBtnCamera.setEnabled(true);
    oBtnUpload.setEnabled(true);
}
