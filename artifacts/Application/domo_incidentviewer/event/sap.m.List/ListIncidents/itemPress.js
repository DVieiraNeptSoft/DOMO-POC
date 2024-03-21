var selectedItem = ListIncidents.getSelectedItem();

// Replace yourField with FieldName
const context = selectedItem.getBindingContext();

// Get Entire Model
const data = context.getObject();

modelPageDetail.setData(data);

GS_INCIDENTS = data;

sap.ui.core.BusyIndicator.show(0);

var options = {
    parameters: {
        "$select": "", // Optional 
        "sap-client": "800" // Required 
    },
    data: {
        GS_INCIDENTS
    }
};

apiRestAPIGetIncidentPics(options);