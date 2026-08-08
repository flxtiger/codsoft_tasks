/**
 * Quiz Logic
 */

const quizData = [
    {
        question: "What is the main goal of a phishing attack?",
        options: [
            "To install a virus that destroys your hardware",
            "To steal sensitive data like passwords and credit card numbers",
            "To send you unwanted advertisements",
            "To monitor your internet speed"
        ],
        correct: 1,
        explanation: "Phishing aims to steal sensitive data by tricking you into providing it voluntarily."
    },
    {
        question: "Which of these is a common red flag in a phishing email?",
        options: [
            "The email addresses you by your first and last name",
            "The email comes from a well-known company",
            "The email creates a sense of extreme urgency",
            "The email includes a signature at the bottom"
        ],
        correct: 2,
        explanation: "Scammers create a false sense of urgency (e.g., 'Your account will be deleted in 24 hours') so you act without thinking."
    },
    {
        question: "What should you do before clicking a link in an email?",
        options: [
            "Click it quickly to see where it goes",
            "Forward it to your friends to see if they think it's safe",
            "Hover your mouse over the link to see the actual destination URL",
            "Reply to the sender and ask if it's safe"
        ],
        correct: 2,
        explanation: "Hovering over a link reveals the true destination URL. If it doesn't match the company it claims to be from, it's likely phishing."
    },
    {
        question: "What is 'Spear Phishing'?",
        options: [
            "Phishing attacks done via text messages",
            "A targeted attack aimed at a specific individual or organization",
            "An attack aimed at catching senior executives (Whales)",
            "A broad attack sent to millions of random email addresses"
        ],
        correct: 1,
        explanation: "Spear phishing is highly targeted. The attacker researches you and customizes the email to make it very convincing."
    },
    {
        question: "You receive a text: 'Your package is delayed. Click here to reschedule: http://usps-track-package.com/ref=89'. What do you do?",
        options: [
            "Click the link, you are expecting a package.",
            "Reply to the text asking for more details.",
            "Ignore it, do not click the link, and check the official USPS website separately.",
            "Click the link but don't enter any personal information."
        ],
        correct: 2,
        explanation: "This is Smishing (SMS Phishing). Never click links in unexpected texts. Always go to the official website directly."
    },
    {
        question: "Does the padlock icon next to a URL mean the website is 100% safe?",
        options: [
            "Yes, it means the website has been verified by the government.",
            "Yes, it means you cannot get hacked.",
            "No, it only means the connection is encrypted. Scammers can use HTTPS too.",
            "No, it means the website is currently being updated."
        ],
        correct: 2,
        explanation: "The padlock (HTTPS) means your data is encrypted in transit. It does NOT mean the site itself is legitimate. Scammers frequently use HTTPS."
    },
    {
        question: "Which email sender address is likely a phishing attempt impersonating Apple?",
        options: [
            "support@apple.com",
            "noreply@apple.com",
            "billing@apple.com",
            "security-alert@apple-support-verify.com"
        ],
        correct: 3,
        explanation: "Scammers use complex domains that look official but aren't the primary domain (apple.com)."
    },
    {
        question: "A pop-up claims your computer is infected with a virus and tells you to call a toll-free number. What is this?",
        options: [
            "A helpful alert from your operating system",
            "A legitimate warning from your antivirus software",
            "Tech Support Scam / Scareware",
            "A network connection error"
        ],
        correct: 2,
        explanation: "Legitimate tech companies will never display pop-ups asking you to call a toll-free number. This is a common scam."
    },
    {
        question: "What is the best defense against phishing if an attacker manages to steal your password?",
        options: [
            "Having a very long password",
            "Using Two-Factor Authentication (2FA)",
            "Changing your password once a year",
            "Clearing your browser cache"
        ],
        correct: 1,
        explanation: "If you have 2FA enabled, the attacker cannot log in even if they have your password, because they don't have your second factor (like your phone)."
    },
    {
        question: "If you realize you just entered your credentials on a fake website, what is your IMMEDIATE next step?",
        options: [
            "Wait a few days to see if anything bad happens.",
            "Email the scammer asking them to delete your data.",
            "Go to the REAL website, change your password immediately, and enable 2FA.",
            "Delete your browser history."
        ],
        correct: 2,
        explanation: "You must change your password on the legitimate site immediately to lock the attacker out before they can access your account."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-quiz-btn');
    const nextBtn = document.getElementById('next-q-btn');
    const restartBtn = document.getElementById('restart-quiz-btn');
    
    const screenStart = document.getElementById('quiz-start');
    const screenActive = document.getElementById('quiz-active');
    const screenResult = document.getElementById('quiz-result');
    
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQSpan = document.getElementById('current-q');
    const progressBar = document.getElementById('quiz-progress');
    
    const scorePercentage = document.getElementById('score-percentage');
    const finalScore = document.getElementById('final-score');
    const scoreMessage = document.getElementById('score-message');
    const scorePath = document.getElementById('score-path');
    const quizReview = document.getElementById('quiz-review');

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];
    let isAnswered = false;

    startBtn.addEventListener('click', () => {
        screenStart.classList.remove('active');
        screenActive.classList.add('active');
        loadQuestion();
    });

    nextBtn.addEventListener('click', () => {
        if (!isAnswered) return;
        
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    restartBtn.addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        screenResult.classList.remove('active');
        screenStart.classList.add('active');
        
        // Reset SVG animation
        scorePath.style.strokeDasharray = `0, 100`;
    });

    function loadQuestion() {
        isAnswered = false;
        nextBtn.disabled = true;
        nextBtn.classList.replace('btn-primary', 'btn-outline');
        
        const qData = quizData[currentQuestion];
        questionText.textContent = `${currentQuestion + 1}. ${qData.question}`;
        currentQSpan.textContent = currentQuestion + 1;
        
        // Update Progress
        const progress = ((currentQuestion) / quizData.length) * 100;
        progressBar.style.width = `${progress}%`;

        // Clear options
        optionsContainer.innerHTML = '';

        qData.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = () => selectOption(index, button);
            optionsContainer.appendChild(button);
        });
    }

    function selectOption(selectedIndex, button) {
        if (isAnswered) return;
        
        isAnswered = true;
        nextBtn.disabled = false;
        nextBtn.classList.replace('btn-outline', 'btn-primary');
        
        const qData = quizData[currentQuestion];
        const options = optionsContainer.children;
        
        userAnswers.push(selectedIndex);

        if (selectedIndex === qData.correct) {
            button.classList.add('correct');
            score++;
        } else {
            button.classList.add('wrong');
            options[qData.correct].classList.add('correct');
        }

        // Disable all buttons
        for (let i = 0; i < options.length; i++) {
            options[i].disabled = true;
        }

        // Add explanation
        const explanation = document.createElement('div');
        explanation.className = 'fade-in';
        explanation.style.marginTop = '1rem';
        explanation.style.padding = '1rem';
        explanation.style.backgroundColor = 'rgba(0,0,0,0.2)';
        explanation.style.borderLeft = '3px solid var(--primary)';
        explanation.style.fontSize = '0.9rem';
        explanation.innerHTML = `<strong>Explanation:</strong> ${qData.explanation}`;
        optionsContainer.appendChild(explanation);
    }

    function showResults() {
        screenActive.classList.remove('active');
        screenResult.classList.add('active');
        
        progressBar.style.width = '100%';
        
        finalScore.textContent = score;
        const percentage = Math.round((score / quizData.length) * 100);
        
        // Animate counter
        let currentPercent = 0;
        const timer = setInterval(() => {
            currentPercent++;
            scorePercentage.textContent = `${currentPercent}%`;
            if (currentPercent >= percentage) {
                clearInterval(timer);
                if (percentage === 0) scorePercentage.textContent = '0%';
            }
        }, 20);

        // Animate SVG Circle
        setTimeout(() => {
            scorePath.style.strokeDasharray = `${percentage}, 100`;
            
            // Color based on score
            if (percentage >= 80) {
                scorePath.parentElement.classList.remove('danger', 'warning');
                scorePath.parentElement.classList.add('primary');
            } else if (percentage >= 50) {
                scorePath.parentElement.classList.remove('primary', 'danger');
                scorePath.parentElement.classList.add('warning');
            } else {
                scorePath.parentElement.classList.remove('primary', 'warning');
                scorePath.parentElement.classList.add('danger');
            }
        }, 100);

        // Message
        if (percentage >= 80) {
            scoreMessage.textContent = "Excellent! You are secure.";
            scoreMessage.className = "primary-text";
        } else if (percentage >= 50) {
            scoreMessage.textContent = "Good, but room for improvement.";
            scoreMessage.className = "warning-text";
        } else {
            scoreMessage.textContent = "You are vulnerable to attacks.";
            scoreMessage.className = "danger-text";
        }
        
        // Build Review
        quizReview.innerHTML = '';
        quizData.forEach((q, i) => {
            const div = document.createElement('div');
            div.className = 'review-item';
            
            const isCorrect = userAnswers[i] === q.correct;
            const icon = isCorrect ? '<i class="fa-solid fa-check primary-text"></i>' : '<i class="fa-solid fa-xmark danger-text"></i>';
            
            div.innerHTML = `
                <div class="review-q">${i+1}. ${q.question} ${icon}</div>
                <div class="review-ans">Correct Answer: <span>${q.options[q.correct]}</span></div>
            `;
            quizReview.appendChild(div);
        });
    }
});
