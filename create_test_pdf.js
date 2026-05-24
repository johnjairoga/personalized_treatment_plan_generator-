const fs = require("fs");

// Minimal valid PDF with text content
const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 248 >>
stream
BT
/F1 12 Tf
50 700 Td
(Test Treatment Plan) Tj
0 -30 Td
(Patient Name: John Smith) Tj
0 -30 Td
(Treatment: Regenerative Exosome Therapy) Tj
0 -30 Td
(Injection Protocol:) Tj
0 -20 Td
(25 gauge needle, 2.5cm depth, 45-degree approach) Tj
0 -15 Td
(Exosome concentration: 2x10e6) Tj
0 -15 Td
(Dosage: 250mg per injection) Tj
0 -15 Td
(Schedule: Weekly for 8 weeks) Tj
0 -30 Td
(Total Cost: 5000) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000273 00000 n
0000000352 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
650
%%EOF`;

fs.writeFileSync("test.pdf", pdfContent);
console.log("Created test.pdf");
