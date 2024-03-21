// Custom Init - Happens only once when mounting the component
sap.ui.getCore().attachInit(function(startParams) {

getGPS_coords();

//Set the sap field Date and Time for the correct format
convertDateTimeToSAPFormat(new Date());

PanelIncidentPictures.setVisible(false);

});