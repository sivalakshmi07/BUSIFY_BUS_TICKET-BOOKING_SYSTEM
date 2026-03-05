const fs = require('fs');
const mammoth = require('mammoth');
const pdfParse = require('pdf-parse');

async function extract() {
    try {
        const docxData = await mammoth.extractRawText({ path: '../PROJECT REPORT_SIVA.docx' });
        fs.writeFileSync('siva_report.txt', docxData.value);
        console.log('DOCX extracted.');

        const pdfBuffer = fs.readFileSync('../FSD_Report__16.pdf');
        const pdfData = await pdfParse(pdfBuffer);
        fs.writeFileSync('sample_report.txt', pdfData.text);
        console.log('PDF extracted.');
    } catch (err) {
        console.error('Error:', err);
    }
}

extract();
