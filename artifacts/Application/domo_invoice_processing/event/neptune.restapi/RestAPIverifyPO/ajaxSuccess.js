sap.ui.core.BusyIndicator.hide();

var data = modelMultiModelVerifyPO.oData.result.GS_MESSAGE;

modelDialogSystemMessage.setData(data);

switch (data.TYPE) {
    case "A":
        DialogSystemMessage.setState("Error");
        break;

    case "B":
        DialogSystemMessage.setState("Success");
        break;
    case "C":
        sendEmailPosting();

        DialogSystemMessage.setState("Information");
        break;
    case "D":
        sendEmailException();

        DialogSystemMessage.setState("Information");
        break;
    default:
        // console.log(`Sorry, we are out of ${expr}.`);
}

DialogSystemMessage.open();