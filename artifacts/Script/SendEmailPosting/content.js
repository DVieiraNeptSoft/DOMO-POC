const data = req.body; // request data body.

log.info(data);

//await sendEmail(toEmail, subject, html, fromEmail, idTemplate, values, attachments, cc, bcc);

// Convert the base64 PDF to a buffer
var base64Pdf = data.attachments.data;
var pdfBuffer = Buffer.from(base64Pdf, "base64");

const attachments = {
    filename: data.attachments.filename,
    content: pdfBuffer,
    encoding: "base64",
};

var postingURL =
    "https://gtmdemosystem.neptune-software.cloud/launchpad/domo_confirm_po_posting?appname=domo_confirm_po_posting" +
    "&EBELN=" +
    data.GS_INVOICE.EBELN +
    "&BELNR=" +
    data.GS_INVOICE.BELNR +
    "&ZTOTAL=" +
    data.GS_INVOICE.ZTOTAL;

await sendEmail(
    "daniel.vieira@neptune-software.com",
    null,
    null,
    "support@neptune-software.com",
    "BEA07E41-4AC0-EE11-85F9-0022489E2E3E",
    {
        user: "daniel.vieira@neptune-software.com",
        postingURL: postingURL,
    },
    attachments
);