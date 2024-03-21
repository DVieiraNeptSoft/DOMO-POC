const data = req.body; // request data body.

log.info(data);

// var decodedPdfContent = atob(data.attachments.data);
// var byteArray = new Uint8Array(decodedPdfContent.length);
// for (var i = 0; i < decodedPdfContent.length; i++) {
//     byteArray[i] = decodedPdfContent.charCodeAt(i);
// }
// //create a BLOB
// var blob = new Blob([byteArray.buffer], { type: "application/pdf" });
// var pdfurl = URL.createObjectURL(blob);

// Convert the base64 PDF to a buffer
var base64Pdf = data.attachments.data;
var pdfBuffer = Buffer.from(base64Pdf, "base64");

const attachments = {
    filename: data.attachments.filename,
    content: pdfBuffer,
    encoding: "base64",
};

log.info(attachments);

//await sendEmail(toEmail, subject, html, fromEmail, idTemplate, values, attachments, cc, bcc);

await sendEmail(
    "daniel.vieira@neptune-software.com",
    null,
    null,
    "support@neptune-software.com",
    "024D34D4-34B5-EE11-8925-0022489E23D1",
    {
        user: "daniel.vieira@neptune-software.com",
    },
    attachments
);
