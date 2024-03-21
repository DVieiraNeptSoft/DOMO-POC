var pdf64String = modelMultiModelGetExceptionPDF.oData[0].pdf64string

sap.ui.core.BusyIndicator.hide();

ButtonViewPDF.setVisible(true);
PDFViewer.setVisible(true);
PDFViewer.setSource(pdfToBlob(pdf64String));