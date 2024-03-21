// Only for View - Custom beforeDisplay - Trigger everytime the view is started
if (sap.n) {
    sap.n.Shell.attachBeforeDisplay(function (startParams) {
        setTimeout(function () {
            jQuery.sap.addUrlWhitelist("blob");
        }, 200);

        inSimpleFormEBELN.setValue(startParams.EBELN);
        inSimpleFormZTOTAL.setValue(startParams.ZTOTAL);

        gs_invoice = {
            EBELN: startParams.EBELN,
            BELNR: startParams.BELNR,
            ZTOTAL: startParams.ZTOTAL,
            ZCOMMENTS: "",
        };

        sap.ui.core.BusyIndicator.show(0);

        var options = {
            parameters: {
                where: JSON.stringify({
                    ebeln: startParams.EBELN,
                    belnr: startParams.BELNR,
                }), // Optional
            },
        };

        apiRestAPIGetExceptionPDF(options);
    });
}
