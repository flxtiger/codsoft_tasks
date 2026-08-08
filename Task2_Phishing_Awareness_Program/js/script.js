/**
 * Main Script - UI Interactions & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Preloader ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // --- Custom Cursor ---
    const cursor = document.getElementById('custom-cursor');
    const cursorFollower = document.getElementById('custom-cursor-follower');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });

        // Add hover effect to interactive elements
        const hoverElements = document.querySelectorAll('a, button, .hover-border, .tooltip-target, .accordion-header, input, textarea');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    }

    // --- Scroll Progress Bar ---
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight * 100}%`;
        scrollProgress.style.width = scroll;
    });

    // --- Navbar & Back to Top ---
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // --- Mobile Menu ---
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // --- Typewriter Effect ---
    const textToType = "Phishing Attacks";
    const typeWriterElement = document.getElementById('typewriter');
    let i = 0;
    
    function typeWriter() {
        if (i < textToType.length) {
            typeWriterElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                typeWriterElement.innerHTML = '';
                i = 0;
                typeWriter();
            }, 3000);
        }
    }
    
    setTimeout(typeWriter, 2000);

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal, .slide-in-left, .slide-in-right');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // --- FAQ Accordion ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Email Simulation Interactivity ---
    const tooltipTargets = document.querySelectorAll('.tooltip-target');
    const infoBox = document.getElementById('email-info-box');
    
    tooltipTargets.forEach(target => {
        target.addEventListener('click', (e) => {
            // Remove active from all
            tooltipTargets.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked
            target.classList.add('active');
            
            // Update info box
            const info = target.getAttribute('data-info');
            infoBox.innerHTML = `
                <i class="fa-solid fa-triangle-exclamation warning-text info-icon"></i>
                <h3 class="warning-text">Red Flag Identified</h3>
                <p>${info}</p>
            `;
            
            infoBox.style.borderColor = 'var(--warning)';
            infoBox.classList.add('fade-in');
            setTimeout(() => infoBox.classList.remove('fade-in'), 1000);
        });
    });

    // --- Report Form Submission ---
    const reportForm = document.getElementById('report-form');
    const formMessage = document.getElementById('form-message');

    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic Validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const details = document.getElementById('message').value;

            if (name && email && details) {
                // Simulate sending
                const btn = reportForm.querySelector('button');
                const originalText = btn.innerHTML;
                
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
                btn.disabled = true;

                setTimeout(() => {
                    formMessage.innerHTML = '<i class="fa-solid fa-circle-check"></i> Report submitted successfully. Thank you for helping keep the internet safe.';
                    formMessage.className = 'form-status primary-text fade-in';
                    reportForm.reset();
                    
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    
                    setTimeout(() => {
                        formMessage.innerHTML = '';
                        formMessage.className = 'form-status';
                    }, 5000);
                }, 1500);
            }
        });
    }

    // --- Particle Canvas Background ---
    setupParticles();
});

function setupParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    const numberOfParticles = window.innerWidth < 768 ? 40 : 100;
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = Math.random() > 0.5 ? '#00FF9D' : '#ffffff';
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            // Draw lines between close particles
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 157, ${0.1 - distance/1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}
