sap.ui.core.BusyIndicator.hide();

var data = modelMultiModelEmailPosting.oData.result.GS_MESSAGE;

modelDialogSystemMessage.setData(data);

DialogSystemMessage.open();