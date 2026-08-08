/**
 * URL Checker Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url-input');
    const checkBtn = document.getElementById('check-url-btn');
    const resultContainer = document.getElementById('url-result');

    // Trusted domains list for simulation
    const trustedDomains = [
        'google.com', 'facebook.com', 'twitter.com', 'instagram.com', 
        'linkedin.com', 'github.com', 'apple.com', 'microsoft.com', 
        'amazon.com', 'netflix.com', 'paypal.com', 'bankofamerica.com'
    ];

    // Suspicious keywords
    const suspiciousKeywords = [
        'login', 'secure', 'verify', 'account', 'update', 'banking', 
        'password', 'auth', 'support', 'service', 'confirm', 'billing'
    ];

    checkBtn.addEventListener('click', () => {
        const url = urlInput.value.trim().toLowerCase();
        
        if (!url) {
            showResult('warning', 'Please enter a URL to check.');
            return;
        }

        // Show loading state
        checkBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Scanning';
        checkBtn.disabled = true;
        
        resultContainer.innerHTML = `
            <div class="result-placeholder fade-in">
                <i class="fa-solid fa-radar fa-spin primary-text" style="font-size: 3rem;"></i>
                <p style="margin-top: 1rem;">Analyzing domain reputation and patterns...</p>
            </div>
        `;

        // Simulate network delay
        setTimeout(() => {
            analyzeUrl(url);
            checkBtn.innerHTML = 'Scan URL';
            checkBtn.disabled = false;
        }, 1500);
    });

    // Also trigger on Enter key
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkBtn.click();
        }
    });

    function analyzeUrl(inputUrl) {
        // Clean URL
        let url = inputUrl;
        
        // Strip http/https
        if (url.startsWith('http://') || url.startsWith('https://')) {
            url = url.split('://')[1];
        }
        
        // Get domain (before first slash)
        const domain = url.split('/')[0];
        
        // Exact match with trusted domain
        if (trustedDomains.includes(domain)) {
            renderResult('safe', domain, [
                'Domain matches verified trusted organization.',
                'No suspicious patterns detected.',
                'Known safe connection.'
            ]);
            return;
        }
        
        let riskScore = 0;
        let warnings = [];

        // Check for hyphenated domains trying to look official (e.g. paypal-login.com)
        if (domain.includes('-')) {
            riskScore += 2;
            warnings.push('Domain contains hyphens, often used by attackers to mimic real brands.');
        }

        // Check for suspicious keywords in domain
        let keywordFound = false;
        suspiciousKeywords.forEach(keyword => {
            if (domain.includes(keyword)) {
                keywordFound = true;
            }
        });
        
        if (keywordFound) {
            riskScore += 3;
            warnings.push('Domain contains urgent/action keywords (e.g., login, verify) typical in phishing.');
        }

        // Check for homoglyphs or typosquatting (very basic simulation)
        // Check if it contains trusted domain names as substrings (e.g. security-paypal.com)
        trustedDomains.forEach(trusted => {
            const name = trusted.split('.')[0];
            if (domain.includes(name) && domain !== trusted) {
                riskScore += 5; // Very high risk
                warnings.push(`Domain is trying to impersonate '${name}'.`);
            }
        });

        // Check Top Level Domain
        const tld = domain.split('.').pop();
        const unusualTLDs = ['xyz', 'tk', 'ml', 'ga', 'cf', 'gq', 'top', 'loan', 'click'];
        if (unusualTLDs.includes(tld)) {
            riskScore += 2;
            warnings.push(`Uses unusual Top-Level Domain (.${tld}) frequently used by scammers due to low cost.`);
        }
        
        if (domain.split('.').length > 3) {
            riskScore += 2;
            warnings.push('Contains multiple subdomains to hide the true origin.');
        }

        // Determine Final Status
        if (riskScore >= 5) {
            renderResult('danger', domain, warnings);
        } else if (riskScore > 0) {
            renderResult('warning', domain, warnings);
        } else {
            // Unknown but doesn't have obvious red flags
            renderResult('neutral', domain, [
                'Domain is not in our trusted list.',
                'No obvious malicious patterns detected.',
                'Exercise caution and verify the source.'
            ]);
        }
    }

    function renderResult(status, domain, details) {
        let icon, colorClass, title;
        
        switch (status) {
            case 'safe':
                icon = 'fa-shield-check';
                colorClass = 'primary-text';
                title = 'Safe Domain';
                break;
            case 'danger':
                icon = 'fa-triangle-exclamation';
                colorClass = 'danger-text';
                title = 'High Risk - Phishing Detected';
                break;
            case 'warning':
                icon = 'fa-circle-exclamation';
                colorClass = 'warning-text';
                title = 'Suspicious Domain';
                break;
            default:
                icon = 'fa-circle-question';
                colorClass = 'text-main';
                title = 'Unknown Domain';
        }

        let detailsHtml = details.map(d => `<li><i class="fa-solid fa-angle-right ${colorClass}"></i> ${d}</li>`).join('');

        resultContainer.innerHTML = `
            <div class="result-card">
                <h3 class="${colorClass}"><i class="fa-solid ${icon}"></i> ${title}</h3>
                <div style="font-family: var(--font-mono); margin: 15px 0; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 4px;">
                    ${domain}
                </div>
                <ul style="text-align: left; list-style: none; padding: 0; margin-top: 15px; font-size: 0.9rem;">
                    ${detailsHtml}
                </ul>
                <p style="margin-top: 15px; font-size: 0.8rem; color: var(--text-muted);">
                    *This is a simulation tool for educational purposes based on pattern recognition.
                </p>
            </div>
        `;
    }

    function showResult(type, message) {
        resultContainer.innerHTML = `
            <div class="result-placeholder fade-in">
                <i class="fa-solid fa-circle-info warning-text"></i>
                <p>${message}</p>
            </div>
        `;
    }
});
