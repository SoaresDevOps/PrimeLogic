document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. CABEÇALHO COM EFEITO EM SCROLL
    ========================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
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
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const fadeElements = document.querySelectorAll('.fade-up');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ==========================================
       4. EFEITO DE LUZ INTELIGENTE (LINEAR-STYLE GLOW)
    ========================================== */
    const glowCards = document.querySelectorAll('[data-glow]');

    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Iluminação sutil com gradiente radial acionado pelo cursor
            card.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.06), var(--surface-card) 40%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    /* ==========================================
       5. ACORDEÃO DO FAQ (INTERATIVIDADE CRO)
    ========================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fecha todos os outros itens para manter a página limpa
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Se não estava ativo, abre o atual
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
            }
        });
    });

    /* ==========================================
       6. ROLAGEM SUAVE EM LINKS INTERNOS
    ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 90;
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
