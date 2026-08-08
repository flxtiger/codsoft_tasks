// report.js
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-report-btn');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            if (!window.latestScanResults || window.latestScanResults.length === 0) {
                window.showToast('No results to generate report.');
                return;
            }
            
            window.showToast('Generating PDF Report...');
            
            // Using window.print() approach for simplicity if jsPDF fails, 
            // but we will try to use jsPDF since it's loaded in index.html
            try {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                
                // Add title
                doc.setFontSize(22);
                doc.setTextColor(0, 0, 0);
                doc.text("Security Vulnerability Assessment Report", 20, 20);
                
                // Add Meta
                doc.setFontSize(12);
                doc.setTextColor(100, 100, 100);
                doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
                doc.text(`Security Score: ${window.latestRiskScore}/100`, 20, 38);
                
                doc.setDrawColor(200, 200, 200);
                doc.line(20, 45, 190, 45);
                
                let y = 55;
                
                window.latestScanResults.forEach((finding, index) => {
                    if (y > 250) {
                        doc.addPage();
                        y = 20;
                    }
                    
                    doc.setFontSize(14);
                    doc.setTextColor(0, 0, 0);
                    // Name and Risk
                    doc.text(`${index + 1}. ${finding.name} [${finding.risk}]`, 20, y);
                    y += 7;
                    
                    doc.setFontSize(10);
                    doc.setTextColor(50, 50, 50);
                    doc.text(`Line ${finding.line}: ${finding.codeSnippet.substring(0, 80)}`, 25, y);
                    y += 7;
                    
                    doc.setTextColor(100, 100, 100);
                    const descLines = doc.splitTextToSize(`Description: ${finding.description}`, 160);
                    doc.text(descLines, 25, y);
                    y += (descLines.length * 5) + 2;
                    
                    doc.setTextColor(0, 120, 50);
                    const recLines = doc.splitTextToSize(`Recommendation: ${finding.recommendation}`, 160);
                    doc.text(recLines, 25, y);
                    y += (recLines.length * 5) + 10;
                });
                
                doc.save('Security_Report.pdf');
                window.showToast('PDF Report downloaded successfully.');
                
            } catch (error) {
                console.error("PDF Generation failed:", error);
                window.showToast('Error generating PDF. Falling back to print view.');
                window.print();
            }
        });
    }
});
