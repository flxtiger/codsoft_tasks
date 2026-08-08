// scanner.js
window.latestScanResults = [];
window.latestRiskScore = 0;

const vulnerabilityRules = [
    {
        id: 'vuln_1',
        regex: /eval\s*\(/i,
        name: "eval() Usage Detected",
        risk: "High",
        description: "Using eval() executes arbitrary strings as JavaScript code. This can lead to DOM-based Cross-Site Scripting (XSS) or Remote Code Execution.",
        recommendation: "Avoid using eval(). Use JSON.parse() for JSON data, or rewrite logic to avoid dynamic code execution."
    },
    {
        id: 'vuln_2',
        regex: /document\.write\s*\(/i,
        name: "document.write() Usage",
        risk: "High",
        description: "document.write can overwrite the entire document and is a classic vector for Cross-Site Scripting (XSS).",
        recommendation: "Use safer DOM manipulation methods like document.createElement(), element.textContent, or element.appendChild()."
    },
    {
        id: 'vuln_3',
        regex: /\.innerHTML\s*=/i,
        name: "innerHTML Misuse",
        risk: "Medium",
        description: "Assigning unvalidated user input to innerHTML can cause DOM-based XSS attacks.",
        recommendation: "Use element.textContent for plain text, or a sanitizer library like DOMPurify if HTML is required."
    },
    {
        id: 'vuln_4',
        regex: /SELECT\s+.*?\s+FROM\s+.*?\s+WHERE\s+.*?=\s*['"]?\s*\+/i,
        name: "Potential SQL Injection",
        risk: "Critical",
        description: "Concatenating user input directly into SQL queries makes the application vulnerable to SQL Injection, potentially exposing the entire database.",
        recommendation: "Use prepared statements (parameterized queries) provided by your database driver instead of string concatenation."
    },
    {
        id: 'vuln_5',
        regex: /(password|pwd|secret|api_key|token)\s*=\s*['"][^'"]+['"]/i,
        name: "Hardcoded Credentials",
        risk: "High",
        description: "Hardcoding passwords, API keys, or tokens in source code is a major security risk if the code is exposed.",
        recommendation: "Store sensitive information in environment variables (.env files) or secure vault services."
    },
    {
        id: 'vuln_6',
        regex: /(md5|sha1)\s*\(/i,
        name: "Weak Hashing Algorithm",
        risk: "Medium",
        description: "MD5 and SHA1 are outdated hashing algorithms vulnerable to collision attacks.",
        recommendation: "Use strong hashing algorithms like SHA-256 for integrity, and bcrypt/Argon2 for passwords."
    },
    {
        id: 'vuln_7',
        regex: /localStorage\.setItem\(\s*['"](password|token|session|key)['"]/i,
        name: "Sensitive Data in LocalStorage",
        risk: "Medium",
        description: "Storing sensitive data like tokens or passwords in localStorage is dangerous as it is accessible via JavaScript (XSS).",
        recommendation: "Store sensitive session tokens in secure, HttpOnly cookies."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const scanBtn = document.getElementById('scan-btn');
    const codeInput = document.getElementById('code-input');
    const resultsContainer = document.getElementById('scan-results');
    const resultsList = document.getElementById('results-list');
    const riskScoreEl = document.getElementById('risk-score');
    const riskBarEl = document.getElementById('risk-progress-bar');
    const emptyState = document.getElementById('empty-state');
    const generateReportBtn = document.getElementById('generate-report-btn');

    if (scanBtn) {
        scanBtn.addEventListener('click', () => {
            const code = codeInput.value.trim();
            if (!code) {
                window.showToast('Please enter some code to scan.');
                return;
            }

            // Show loading state
            scanBtn.textContent = 'Scanning...';
            scanBtn.disabled = true;

            setTimeout(() => {
                performScan(code);
                scanBtn.textContent = 'Scan Code';
                scanBtn.disabled = false;
            }, 800); // Fake delay for UX
        });
    }

    function performScan(code) {
        let findings = [];
        let score = 100;
        
        const lines = code.split('\n');

        vulnerabilityRules.forEach(rule => {
            lines.forEach((line, index) => {
                if (rule.regex.test(line)) {
                    findings.push({
                        line: index + 1,
                        codeSnippet: line.trim(),
                        ...rule
                    });
                    
                    // Deduct score based on risk
                    if(rule.risk === 'Critical') score -= 25;
                    else if(rule.risk === 'High') score -= 15;
                    else if(rule.risk === 'Medium') score -= 10;
                    else score -= 5;
                }
            });
        });

        score = Math.max(0, score);
        window.latestScanResults = findings;
        window.latestRiskScore = score;
        displayResults(findings, score);
    }

    function displayResults(findings, score) {
        emptyState.style.display = 'none';
        resultsContainer.style.display = 'block';
        resultsList.innerHTML = '';
        generateReportBtn.style.display = findings.length > 0 ? 'inline-block' : 'none';

        // Update score
        riskScoreEl.textContent = score;
        riskBarEl.style.width = `${score}%`;
        
        if (score > 80) riskBarEl.style.backgroundColor = 'var(--primary)';
        else if (score > 50) riskBarEl.style.backgroundColor = 'var(--warning)';
        else riskBarEl.style.backgroundColor = 'var(--danger)';

        if (findings.length === 0) {
            resultsList.innerHTML = `
                <div class="terminal-card text-center fade-in visible" style="border-color: var(--primary);">
                    <h3 style="color: var(--primary);">[ OK ] SYSTEM SECURE</h3>
                    <p>Zero vulnerabilities detected. Defense mechanisms nominal.</p>
                </div>
            `;
            return;
        }

        findings.forEach((finding, index) => {
            const item = document.createElement('div');
            item.className = `terminal-card result-item ${finding.risk.toLowerCase()} fade-in`;
            item.style.animationDelay = `${index * 0.1}s`;
            
            item.innerHTML = `
                <div class="d-flex justify-between align-center mb-2">
                    <h4>${finding.name}</h4>
                    <span class="badge ${finding.risk.toLowerCase()}">${finding.risk}</span>
                </div>
                <p><strong>Line ${finding.line}:</strong> <code>${finding.codeSnippet}</code></p>
                <p class="mt-2 text-muted">${finding.description}</p>
                <div class="mt-2" style="background: rgba(0, 255, 157, 0.1); padding: 10px; border-radius: 4px; border-left: 3px solid var(--primary);">
                    <strong>💡 Recommendation:</strong> ${finding.recommendation}
                </div>
            `;
            resultsList.appendChild(item);
            
            // Trigger animation
            setTimeout(() => item.classList.add('visible'), 50);
        });
        
        window.showToast(`Scan complete. Found ${findings.length} issues.`);
    }
});
