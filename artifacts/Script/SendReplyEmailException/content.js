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

await sendEmail(
    "daniel.vieira@neptune-software.com",
    null,
    null,
    "support@neptune-software.com",
    "820D5A83-0CC1-EE11-85F9-0022489E2E3E",
    {
        user: "daniel.vieira@neptune-software.com",
        comments: data.GS_INVOICE.ZCOMMENTS
    },
    attachments
);
