// quiz.js
const quizData = [
    {
        question: "What does XSS stand for?",
        options: ["Cross-Site Scripting", "Cross-System Scripting", "XML Site Scripting", "Cross-Site Security"],
        correct: 0
    },
    {
        question: "Which of the following is the best way to prevent SQL Injection?",
        options: ["Escaping user input", "Using prepared statements", "Encoding data to Base64", "Hiding database errors"],
        correct: 1
    },
    {
        question: "What is the primary purpose of a CSRF token?",
        options: ["To encrypt passwords", "To prevent Cross-Site Request Forgery", "To authenticate users", "To secure API keys"],
        correct: 1
    },
    {
        question: "Why is it dangerous to use eval() in JavaScript?",
        options: ["It makes the code run slower", "It can execute arbitrary code passed by an attacker", "It is deprecated in modern browsers", "It causes memory leaks"],
        correct: 1
    },
    {
        question: "Which hashing algorithm is recommended for storing passwords?",
        options: ["MD5", "SHA-1", "Base64", "bcrypt"],
        correct: 3
    },
    {
        question: "What does the Principle of Least Privilege state?",
        options: ["Give users minimum access necessary for their tasks", "Never use administrator accounts", "All users should have read-only access", "Passwords must be at least 12 characters"],
        correct: 0
    },
    {
        question: "Which HTTP header helps protect against clickjacking?",
        options: ["Content-Type", "X-Frame-Options", "Strict-Transport-Security", "X-XSS-Protection"],
        correct: 1
    },
    {
        question: "Where is the safest place to store a session JWT in a web browser?",
        options: ["localStorage", "sessionStorage", "HttpOnly Cookie", "IndexedDB"],
        correct: 2
    },
    {
        question: "What is the CIA Triad in security?",
        options: ["Confidentiality, Integrity, Availability", "Control, Identity, Authentication", "Cyber, Information, Access", "Confidentiality, Identity, Authorization"],
        correct: 0
    },
    {
        question: "What is the risk of using known vulnerable components?",
        options: ["Code becomes unreadable", "Attackers can exploit known bugs to compromise the system", "The app will crash immediately", "It increases cloud hosting costs"],
        correct: 1
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-questions');
    const submitBtn = document.getElementById('submit-quiz-btn');
    const resultsDiv = document.getElementById('quiz-results');
    const scoreSpan = document.getElementById('quiz-score');
    const restartBtn = document.getElementById('restart-quiz-btn');
    
    let userAnswers = new Array(quizData.length).fill(null);
    let quizSubmitted = false;

    if (!quizContainer) return;

    function renderQuiz() {
        quizContainer.innerHTML = '';
        quizData.forEach((q, index) => {
            const qBlock = document.createElement('div');
            qBlock.className = 'question-block terminal-card fade-in';
            qBlock.style.animationDelay = `${index * 0.1}s`;
            
            const qTitle = document.createElement('h4');
            qTitle.textContent = `${index + 1}. ${q.question}`;
            qBlock.appendChild(qTitle);
            
            const optionsList = document.createElement('ul');
            optionsList.className = 'options-list';
            
            q.options.forEach((opt, optIndex) => {
                const optItem = document.createElement('li');
                optItem.className = 'option-item';
                optItem.textContent = opt;
                
                optItem.addEventListener('click', () => {
                    if(quizSubmitted) return;
                    
                    // Deselect others in this question
                    const siblings = optionsList.querySelectorAll('.option-item');
                    siblings.forEach(s => s.classList.remove('selected'));
                    
                    optItem.classList.add('selected');
                    userAnswers[index] = optIndex;
                });
                
                optionsList.appendChild(optItem);
            });
            
            qBlock.appendChild(optionsList);
            quizContainer.appendChild(qBlock);
            
            setTimeout(() => qBlock.classList.add('visible'), 50);
        });
    }

    renderQuiz();

    if(submitBtn) {
        submitBtn.addEventListener('click', () => {
            // Check if all answered
            if (userAnswers.includes(null)) {
                window.showToast('Please answer all questions before submitting.');
                return;
            }

            quizSubmitted = true;
            let score = 0;
            
            const qBlocks = quizContainer.querySelectorAll('.question-block');
            
            userAnswers.forEach((ans, index) => {
                const options = qBlocks[index].querySelectorAll('.option-item');
                const correctIndex = quizData[index].correct;
                
                if (ans === correctIndex) {
                    score++;
                    options[ans].classList.add('correct');
                } else {
                    options[ans].classList.add('wrong');
                    options[correctIndex].classList.add('correct'); // Show correct answer
                }
            });
            
            const percentage = Math.round((score / quizData.length) * 100);
            scoreSpan.textContent = `${percentage}% (${score}/${quizData.length})`;
            
            if (percentage >= 80) scoreSpan.style.color = 'var(--primary)';
            else if (percentage >= 50) scoreSpan.style.color = 'var(--warning)';
            else scoreSpan.style.color = 'var(--danger)';
            
            resultsDiv.style.display = 'block';
            submitBtn.style.display = 'none';
            
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            window.showToast(`Quiz completed! You scored ${percentage}%`);
        });
    }

    if(restartBtn) {
        restartBtn.addEventListener('click', () => {
            quizSubmitted = false;
            userAnswers = new Array(quizData.length).fill(null);
            resultsDiv.style.display = 'none';
            submitBtn.style.display = 'inline-block';
            renderQuiz();
            quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});
