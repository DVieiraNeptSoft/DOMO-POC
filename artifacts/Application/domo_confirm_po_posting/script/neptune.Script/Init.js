// Only for View - Custom beforeDisplay - Trigger everytime the view is started
if (sap.n) {
    sap.n.Shell.attachBeforeDisplay(function (startParams) {
        // debugger;
        // InputEBELN.setValue(startParams.EBELN);
        // InputBELNR.setValue(startParams.BELNR);

        sap.ui.core.BusyIndicator.show(0);

        var options = {
            parameters: {
                $select: "", // Optional
                "sap-client": "800", // Required
            },
            data: {
                GS_INVOICE: {
                    EBELN: startParams.EBELN,
                    BELNR: startParams.BELNR,
                    ZTOTAL: startParams.ZTOTAL,
                },
            },
        };

        apiRestAPIEmailPosting(options);
    });
}
