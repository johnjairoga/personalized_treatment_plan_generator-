import PDFDocument from 'pdfkit';
import fs from 'fs';

const doc = new PDFDocument();
doc.fontSize(16).text('Sample Treatment Plan');
doc.fontSize(12).text('Patient: John Smith', 50, 100);
doc.text('Treatment: Stem Cell Therapy');
doc.text('Dosage: 250mg per injection');
doc.text('Price: $5000');
doc.text('This is a sample PDF for testing text extraction.');

doc.pipe(fs.createWriteStream('test-sample.pdf'));
doc.end();

console.log('Sample PDF created: test-sample.pdf');
