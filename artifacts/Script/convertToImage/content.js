const fileContentBase64 = req.body.pdfFile;
const { pdf } = modules.pdftoimg;
var outputImages = [];
var doc = await pdf(fileContentBase64, { scale: 1.5 });
var counter = 1;
for await (const page of doc) {
    log.warn(page);
    outputImages.push({ page: counter, img: `data:image/png;base64,${page.toString('base64')}` });
    counter++;
}
result = outputImages;
complete();