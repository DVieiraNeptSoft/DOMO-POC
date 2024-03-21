let selectedDeviceId;

const codeReader = new ZXing.BrowserMultiFormatReader();
console.log("ZXing code reader initialized");
codeReader
    .listVideoInputDevices()
    .then((videoInputDevices) => {
        selectedDeviceId = videoInputDevices[0].deviceId;
    })
    .catch((err) => {
        console.error(err);
    });

function startScan() {
    video = document.querySelector("video");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    facingMode: {
                        exact: "environment",
                    },
                },
            })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                console.log("Something went wrong!");
            });
    }

    // codeReader.decodeFromVideoDevice(selectedDeviceId, "video", (result, err) => {
    codeReader.decodeFromVideoDevice(undefined, "video", (result, err) => { //needs to be undefined in order to use environment mode in mobile
        if (result) {
            //console result to see the output of the scan
            console.log(result);

            //To view only value of the scan
            console.log(result.text);

            //Sets it to the UI
            InputEquipmentNumber.setValue(result.text);

            //Automatically closes the scanner once a result is captured
            codeReader.reset();
            DialogScanQRCode.close();

            //Fire function with API call to get Material Description
            getMaterialDescription();
        }
        if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
        }
    });
}

function stopScan() {
    codeReader.reset();
}

//  Read further about different implementation procedure on github -https://github.com/zxing-js/library
