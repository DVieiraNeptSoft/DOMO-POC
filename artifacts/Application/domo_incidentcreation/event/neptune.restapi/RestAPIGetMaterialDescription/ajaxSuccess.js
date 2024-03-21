console.log(xhr.responseJSON.result.GS_ZDOMOINCIDENTS.MAKTX);

GS_ZDOMOINCIDENTS.MAKTX = xhr.responseJSON.result.GS_ZDOMOINCIDENTS.MAKTX;
InputMaterialDescription.setValue(xhr.responseJSON.result.GS_ZDOMOINCIDENTS.MAKTX);

console.log(modelSimpleFormIncidents.getData());

// Use MessageToast
sap.m.MessageToast.show("Equipment Scanned!");