var offlineData = modelModelArrayIncidentPictures.getData();
console.log("Offline Data Log:");
console.log(offlineData);

if (offlineData.length) {
    modelListIncidentPictures.setData(offlineData);
    modelListIncidentPictures.refresh(true);
    PanelIncidentPictures.setHeaderText(
        "Incident Pictures(" + modelListIncidentPictures.oData.length + ")"
    );
    PanelIncidentPictures.setVisible(true);
} else {
    PanelIncidentPictures.setHeaderText("Incident Pictures(0)");
    PanelIncidentPictures.setVisible(false);
}

if (!AppCache.isOffline) {
    console.log("Online");
    // ButtonScanQRCode.setEnabled(true);
    // ButtonScanQRCode.setEnabled(true);

    ButtonCreateIncident.setVisible(true);
    ButtonSaveIncident.setVisible(false);
} else {
    console.log("Offline");

    ButtonCreateIncident.setVisible(false);
    ButtonSaveIncident.setVisible(true);
}
