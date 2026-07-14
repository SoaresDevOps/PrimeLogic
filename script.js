document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. CABEÇALHO COM EFEITO EM SCROLL
    ========================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    /* ==========================================
       2. CONTROLE DO MENU MOBILE
    ========================================== */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================
       3. INTERSECTION OBSERVER (ANIMAÇÃO FADE-UP)
    ========================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.15
    };

    const fadeElements = document.querySelectorAll('.fade-up');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona ligeiro delay escalonado se houver elementos irmãos próximos
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ==========================================
       4. EFEITO HOVER INTELIGENTE PARA CARDS
    ========================================== */
    const cards = document.querySelectorAll('.service-card, .project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Cria uma ligeira iluminação sutil baseada no cursor (estilo linear)
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.04) 0%, var(--surface-card) 60%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    /* ==========================================
       5. ROLAGEM SUAVE EXTRA PARA LINKS INTERNOS
    ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
