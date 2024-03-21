window.addEventListener("offline", onOffline, false);
window.addEventListener("online", onOnline, false);

function onOffline() {
    sap.m.MessageToast.show("Offline!");
    ButtonScanQRCode.setEnabled(false);
    ButtonCreateIncident.setVisible(false);
    ButtonSaveIncident.setVisible(true);
}

function onOnline() {
    sap.m.MessageToast.show("Online!");
    ButtonScanQRCode.setEnabled(true);
    ButtonCreateIncident.setVisible(true);
    ButtonSaveIncident.setVisible(false);
}

// setInterval(saveData, 5000); // Save data every 5 seconds

function saveData() {
    // Save the data
    console.log("Data saved");

    modelModelObjectIncident.setData(modelSimpleFormIncidents.oData);
    setCacheModelObjectIncident();

    modelModelArrayIncidentPictures.setData(modelListIncidentPictures.oData);
    setCacheModelArrayIncidentPictures();

    sap.m.MessageToast.show("Data was saved to cache!");
}

// To stop the auto-saving job, you can use clearInterval(intervalID)
// clearInterval(intervalID);

function convertDateTimeToSAPFormat(value) {
    sap.ui.require(["sap/ui/core/format/DateFormat"], function (DateFormat) {
        var currentDate = value;

        // Format date
        var dateFormat = DateFormat.getDateInstance({ pattern: "yyyyMMdd" });
        var formattedDate = dateFormat.format(currentDate);

        // Format time
        var timeFormat = DateFormat.getTimeInstance({ pattern: "HHmmss" });
        var formattedTime = timeFormat.format(currentDate);

        console.log("Datum: " + formattedDate);
        console.log("Uzeit: " + formattedTime);

        GS_ZDOMOINCIDENTS.ZDATE = formattedDate;
        GS_ZDOMOINCIDENTS.ZTIME = formattedTime;
        GS_ZDOMOINCIDENTS.ZDATETIME = value;

        DateTimePicker.setDateValue(value);
        // InputDate.setValue(convertDateFormat(formattedDate));
        // InputTime.setValue(formattedTime);
    });
}

function getGPS_coords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    function onSuccess(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);

        InputGPSLocation.setValue("Lat: " + latitude + ", Long: " + longitude);
    }

    function onError(error) {
        console.log("Error code: " + error.code);
        console.log("Error message: " + error.message);
    }
}

function convertDateFormat(dateString) {
    var year = dateString.substring(0, 4);
    var month = dateString.substring(4, 6);
    var day = dateString.substring(6, 8);

    return day + "." + month + "." + year;
}

function DetectDevice() {
    let isMobile = window.matchMedia || window.msMatchMedia;
    if (isMobile) {
        let match_mobile = isMobile("(pointer:coarse)");
        return match_mobile.matches;
    }
    return false;
}

function mobileCam() {
    video = document.querySelector("#videoElement");

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
}

function startWebCam() {
    video = document.querySelector("#videoElementWeb");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                console.log("Something went wrong!");
            });
    }
}

function onPhotoDataSuccess(imageData) {
    if (modelListIncidentPictures.oData.length >= 5) {
        DialogWebcam.close();
        DialogMobileCam.close();
        DialogPictureMessage.open();
        return; // exit the function
    }

    // var imgData = "data:image/jpeg;base64," + imageData;
    var imgData = imageData;

    var nd = new Date();
    var ts = nd.getTime();

    var incidentPictures = {
        ZINCIDENTPICNR: "PIC-" + ts,
        ZINCIDENTPICTURES: imgData,
        ZINCIDENTPICTIME: getTS(nd),
    };

    ModelData.Add(ListIncidentPictures, incidentPictures);

    //Set Cached Pictures ----------------------------------------
    // ModelData.Add(ModelArrayIncidentPictures, incidentPictures);
    modelModelArrayIncidentPictures.setData(modelListIncidentPictures.getData());
    setCacheModelArrayIncidentPictures();
    //------------------------------------------------------------

    if (modelListIncidentPictures.oData.length) {
        modelListIncidentPictures.refresh(true);
        PanelIncidentPictures.setHeaderText(
            "Incident Pictures(" + modelListIncidentPictures.oData.length + ")"
        );
        PanelIncidentPictures.setVisible(true);
    } else {
        PanelIncidentPictures.setHeaderText("Incident Pictures(0)");
        PanelIncidentPictures.setVisible(false);
    }

    // Use MessageToast
    sap.m.MessageToast.show("You took a picture!");
}

function getTS(inpdate) {
    var a = inpdate;
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = "0" + a.getMinutes();
    var sec = "0" + a.getSeconds();
    var time =
        date + " " + month + " " + year + " " + hour + ":" + min.substr(-2) + ":" + sec.substr(-2);
    return time;
}

// Stop streaming
function stopStreaming() {
    video.srcObject.getTracks().forEach(function (track) {
        track.stop();
    });

    video.srcObject = null;
}

function clearEverything() {
    InputEquipmentNumber.setValue();
    InputMaterialDescription.setValue();

    //Set the sap field Date and Time for the correct format
    convertDateTimeToSAPFormat(new Date());

    getGPS_coords();

    TextAreaComments.setValue();

    PanelIncidentPictures.setVisible(false);

    modelListIncidentPictures.setData([]);

    modelModelArrayIncidentPictures.setData([]);
    setCacheModelArrayIncidentPictures();

    modelModelObjectIncident.setData({});
    setCacheModelObjectIncident();
}

function getMaterialDescription() {
    GS_ZDOMOINCIDENTS.EQUNR = modelSimpleFormIncidents.oData.EQUNR;

    var options = {
        parameters: {
            $select: "", // Optional
            "sap-client": "800", // Required
        },
        data: {
            GS_ZDOMOINCIDENTS,
        },
    };

    apiRestAPIGetMaterialDescription(options);
}

function createIncident() {
    //Convert
    // convertDateTimeToSAPFormat(modelSimpleFormIncidents.oData.ZDATETIME);
    BusyDialogMessage.setText("Creating the Incident...");
    BusyDialogMessage.open();

    GS_ZDOMOINCIDENTS.EQUNR = modelSimpleFormIncidents.oData.EQUNR;
    GS_ZDOMOINCIDENTS.MAKTX = modelSimpleFormIncidents.oData.MAKTX;
    GS_ZDOMOINCIDENTS.ZDATETIME = modelSimpleFormIncidents.oData.ZDATETIME;
    GS_ZDOMOINCIDENTS.ZGPS = modelSimpleFormIncidents.oData.ZGPS;
    GS_ZDOMOINCIDENTS.ZCOMMENTS = modelSimpleFormIncidents.oData.ZCOMMENTS;

    //For loop to send Picture data to API
    for (let i = 0; i < modelListIncidentPictures.oData.length; i++) {
        GS_ZDOMOINCIDENTPIC = Object.assign({}, modelListIncidentPictures.oData[i]);

        // GS_ZDOMOINCIDENTPIC.ZINCIDENTPICNR = modelListIncidentPictures.oData[i].ZINCIDENTPICNR;

        // GS_ZDOMOINCIDENTPIC.ZINCIDENTPICTURES =
        //     modelListIncidentPictures.oData[i].ZINCIDENTPICTURES;

        // GS_ZDOMOINCIDENTPIC.ZINCIDENTPICTIME = modelListIncidentPictures.oData[i].ZINCIDENTPICTIME;

        GT_ZDOMOINCIDENTPIC.push(GS_ZDOMOINCIDENTPIC);
    }

    // debugger;

    var options = {
        parameters: {
            $select: "", // Optional
            "sap-client": "800", // Required
        },
        data: {
            GS_ZDOMOINCIDENTS,
            GT_ZDOMOINCIDENTPIC,
        },
    };

    apiRestAPISaveIncident(options);
}
