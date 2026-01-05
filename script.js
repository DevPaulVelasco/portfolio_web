document.addEventListener('DOMContentLoaded', () => {
    
    // 1. TYPEWRITER EFFECT
    const typeWriterElement = document.getElementById('typewriter');
    const phrases = ['Software Engineer', 'Frontend Specialist', 'UI/UX Designer', 'Web Developer'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typeWriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typeWriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 2. CUSTOM CURSOR
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }

    // 3. TILT EFFECT FOR CARDS (3D Hover)
    const tiltElements = document.querySelectorAll('.tilt-element');
    
    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            
            const xRotation = -1 * ((y - rect.height / 2) / rect.height * 20);
            const yRotation = (x - rect.width / 2) / rect.width * 20;

            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 4. HEADER SCROLL EFFECT
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 5. MOBILE MENU & ACTIVE LINK FIX (CLICK)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('toggle'); 
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('toggle');
        });
    });

    
    // 6. FORM SUBMISSION
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const btn = form.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            
            
            btn.innerHTML = 'Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    btn.innerHTML = 'Message Sent! ✓';
                    btn.style.backgroundColor = '#00cc52ff';
                    btn.style.color = 'white';
                    form.reset(); 
                } else {
                    throw new Error('Error en el servidor');
                }

            } catch (error) {
                
                console.error('Error:', error);
                btn.innerHTML = 'Error. Try again.';
                btn.style.backgroundColor = '#f50029ff';
                btn.style.color = 'white';
            } finally {
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }
        });
    }

    // 7. CURRENT YEAR
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 8. SCROLL TO TOP
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) { 
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.pointerEvents = 'all';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.pointerEvents = 'none';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 9. SCROLL SPY 
    const sections = document.querySelectorAll('section[id], main[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; 
            const sectionId = current.getAttribute('id');
            const sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

            if (sectionsClass) {
                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                    sectionsClass.classList.add('active');
                } else {
                    sectionsClass.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

});