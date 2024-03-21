ModelData.Delete(ListIncidentPictures, "ZINCIDENTPICNR", modelPageImage.oData.ZINCIDENTPICNR, "EQ");
ModelData.Delete(ModelArrayIncidentPictures, "ZINCIDENTPICNR", modelPageImage.oData.ZINCIDENTPICNR, "EQ");
setCacheModelArrayIncidentPictures();

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

App.back();