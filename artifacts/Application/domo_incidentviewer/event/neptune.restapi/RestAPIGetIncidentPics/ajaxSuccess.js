sap.ui.core.BusyIndicator.hide();

var data = modelMultiModelIncidentPics.oData.result.GT_INCIDENTPIC;

modelListIncidentPictures.setData(data);

PanelIncidentPictures.setHeaderText(
    "Incident Pictures(" + modelListIncidentPictures.oData.length + ")"
);
