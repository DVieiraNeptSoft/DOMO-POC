if (DetectDevice()) {
    //return true if mobile
    mobileCam();

    DialogMobileCam.open();
} else {
    //return false if desktop
    startWebCam();

    DialogWebcam.open();
}