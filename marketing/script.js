// Initialize Lucide Icons
lucide.createIcons();

// Sticky Header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

// Scroll Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left');
animatedElements.forEach(el => observer.observe(el));

// FAQ Accordion Logic
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Optional: Close other open FAQs
        const currentlyActive = document.querySelector('.faq-item.active');
        if (currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove('active');
        }
        item.classList.toggle('active');
    });
});

// Modal Logic
const modal = document.getElementById('consultation-modal');
const openBtns = document.querySelectorAll('.open-consultation');
const closeBtn = document.getElementById('close-modal');

openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal on click outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Form Submission (Popup)
const popupForm = document.getElementById('consultation-form');
if(popupForm) {
    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending... <i data-lucide="loader-2" class="spin"></i>';
        lucide.createIcons();
        
        setTimeout(() => {
            btn.innerHTML = 'Request Sent <i data-lucide="check"></i>';
            lucide.createIcons();
            btn.style.background = '#27c93f';
            
            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                e.target.reset();
                btn.innerHTML = originalText;
                btn.style.background = '';
                lucide.createIcons();
            }, 2000);
        }, 1500);
    });
}

// Form Submission (Inline Enquiry Form)
const inlineForm = document.getElementById('inline-enquiry-form');
if(inlineForm) {
    inlineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending... <i data-lucide="loader-2" class="spin"></i>';
        lucide.createIcons();
        
        setTimeout(() => {
            btn.innerHTML = 'Message Sent <i data-lucide="check"></i>';
            lucide.createIcons();
            btn.style.background = '#27c93f';
            
            setTimeout(() => {
                e.target.reset();
                btn.innerHTML = originalText;
                btn.style.background = '';
                lucide.createIcons();
            }, 3000);
        }, 1500);
    });
}


// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            const navLinksContainer = document.querySelector('.nav-links');
            if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                const mobileMenuBtnIcon = document.querySelector('.mobile-menu-btn i');
                if (mobileMenuBtnIcon) {
                    mobileMenuBtnIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        }
    });
});

// Number Counter Animation
const countUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const textContent = target.innerText;
            const targetNumber = parseFloat(textContent.replace(/[^0-9.]/g, ''));
            if (!targetNumber) return;
            
            let currentNumber = 0;
            const duration = 2000;
            const increment = targetNumber / (duration / 16);
            const isFloat = textContent.includes('.');
            
            const suffix = textContent.replace(/[0-9.]/g, '');
            
            const updateCounter = () => {
                currentNumber += increment;
                if (currentNumber < targetNumber) {
                    target.innerText = (isFloat ? currentNumber.toFixed(1) : Math.ceil(currentNumber)) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    target.innerText = textContent;
                }
            };
            
            updateCounter();
            observer.unobserve(target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-text strong, .bento-stat h4, .stat-item h4').forEach(el => {
    countUpObserver.observe(el);
});

