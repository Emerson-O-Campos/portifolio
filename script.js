// ============================================
// PORTFÓLIO EMERSON CAMPOS - SCRIPT PRINCIPAL
// ============================================

(function() {
  'use strict';

  // ============================================
  // 1. CONFIGURAÇÕES GLOBAIS
  // ============================================
  
  const config = {
    isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isDesktop: window.innerWidth > 768,
    get isMotionOk() {
      return !this.isReducedMotion && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    }
  };

  // ============================================
  // 2. MÓDULO: CUSTOM CURSOR
  // ============================================
  
  const CustomCursor = {
    init() {
      const cursor = document.querySelector('.cursor');
      if (!cursor || !config.isDesktop || !config.isMotionOk) return;
      
      document.body.style.cursor = 'none';
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
    }
  };

  // ============================================
  // 3. MÓDULO: HEADER
  // ============================================
  
  const Header = {
    element: null,
    lastScrollY: 0,
    timeout: null,

    init() {
      this.element = document.querySelector('.header');
      if (!this.element) return;
      
      window.addEventListener('scroll', () => this.handleScroll());
    },

    handleScroll() {
      const currentScrollY = window.scrollY;
      
      // Efeito de scroll (mudar background)
      this.element.classList.toggle('scrolled', currentScrollY > 50);
      
      // Esconder/mostrar header
      if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
        this.element.classList.add('header-hidden');
      } else if (currentScrollY < this.lastScrollY) {
        this.element.classList.remove('header-hidden');
        this.element.classList.add('header-visible');
        
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.element.classList.remove('header-visible');
        }, 500);
      }
      
      this.lastScrollY = currentScrollY;
    }
  };

  // ============================================
  // 4. MÓDULO: MENU MOBILE
  // ============================================
  
  const MobileMenu = {
    btn: null,
    nav: null,

    init() {
      this.btn = document.getElementById('menuMobileBtn');
      this.nav = document.querySelector('.nav');
      
      if (!this.btn || !this.nav) return;
      
      this.btn.addEventListener('click', () => this.toggle());
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => this.close());
      });
    },

    toggle() {
      const isOpen = this.nav.classList.toggle('active');
      this.btn.classList.toggle('active');
      this.btn.setAttribute('aria-expanded', String(isOpen));
      this.animateHamburger(isOpen);
    },

    close() {
      this.nav.classList.remove('active');
      this.btn.classList.remove('active');
      this.btn.setAttribute('aria-expanded', 'false');
      this.animateHamburger(false);
    },

    animateHamburger(isOpen) {
      const spans = this.btn.querySelectorAll('span');
      if (!spans.length) return;
      
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    }
  };

  // ============================================
  // 5. MÓDULO: NAVEGAÇÃO ATIVA
  // ============================================
  
  const ActiveNav = {
    sections: null,
    navLinks: null,

    init() {
      this.sections = document.querySelectorAll('section');
      this.navLinks = document.querySelectorAll('.nav-link');
      
      window.addEventListener('scroll', () => this.update());
    },

    update() {
      let current = '';
      const scrollPos = window.scrollY + 200;
      
      this.sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          current = section.getAttribute('id');
        }
      });
      
      this.navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${current}`;
        link.classList.toggle('active', isActive);
      });
    }
  };

  // ============================================
  // 6. MÓDULO: ANIMAÇÃO SKILL BARS
  // ============================================
  
  const SkillBars = {
    init() {
      const skillBars = document.querySelectorAll('.skill-progress');
      if (!skillBars.length) return;
      
      if (config.isMotionOk) {
        this.animateWithObserver(skillBars);
      } else {
        skillBars.forEach(bar => bar.style.width = bar.style.width);
      }
    },

    animateWithObserver(bars) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => { bar.style.width = width; }, 100);
            observer.unobserve(bar);
          }
        });
      }, { threshold: 0.5 });
      
      bars.forEach(bar => observer.observe(bar));
    }
  };

  // ============================================
  // 7. MÓDULO: FOOTER
  // ============================================
  
  const Footer = {
    init() {
      const yearEl = document.getElementById('year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
  };

  // ============================================
  // 8. MÓDULO: SMOOTH SCROLL
  // ============================================
  
  const SmoothScroll = {
    isTransitioning: false,
    overlay: null,

    init() {
      this.createOverlay();
      this.bindLinks();
    },

    createOverlay() {
      this.overlay = document.createElement('div');
      this.overlay.className = 'page-transition-overlay';
      this.overlay.innerHTML = '<div class="transition-loader"><div class="loader-ring"></div></div>';
      document.body.appendChild(this.overlay);
    },

    bindLinks() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href === '#' || !href) return;
          
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            this.navigate(href);
          }
        });
      });
    },

    navigate(targetId) {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      
      const targetSection = document.querySelector(targetId);
      if (!targetSection) {
        this.isTransitioning = false;
        return;
      }
      
      this.overlay.classList.add('active');
      
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          this.overlay.classList.remove('active');
          setTimeout(() => { this.isTransitioning = false; }, 200);
        }, 400);
      }, 300);
    },

    scrollToElement(element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ============================================
  // 9. MÓDULO: REVEAL ANIMATION
  // ============================================
  
  const RevealAnimation = {
    elements: [
      '.project-card-enhanced', '.skill-card-enhanced', '.contact-card-enhanced',
      '.about-card', '.hero-content', '.hero-code-card', '.contact-wrapper-enhanced'
    ],

    init() {
      const elementsToAnimate = document.querySelectorAll(this.elements.join(','));
      if (!elementsToAnimate.length) return;
      
      if (config.isMotionOk) {
        this.setupObserver(elementsToAnimate);
      } else {
        elementsToAnimate.forEach(el => {
          el.classList.add('animated-visible');
        });
      }
    },

    setupObserver(elements) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated-visible');
            
            if (entry.target.classList.contains('contact-wrapper-enhanced')) {
              this.animateChildren(entry.target);
            }
            
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
      
      elements.forEach(el => {
        el.classList.add('animated-hidden');
        observer.observe(el);
      });
    },

    animateChildren(container) {
      const children = container.querySelectorAll('.contact-card-enhanced');
      children.forEach((child, index) => {
        setTimeout(() => child.classList.add('animated-visible'), index * 100);
      });
    }
  };

  // ============================================
  // 10. MÓDULO: IDIOMAS (i18n)
  // ============================================
  
  const I18n = {
    currentLang: localStorage.getItem('portfolio_lang') || 'pt',
    translations: {
      pt: {
        nav: ['Home', 'Sobre', 'Projetos', 'Skills', 'Contato'],
        heroTag: 'Disponível para oportunidades',
        heroTitle: ['Desenvolvedor', 'Front-End'],
        heroDesc: 'Estudante de Engenharia da Computação apaixonado por criar interfaces modernas. Buscando primeira oportunidade como Front-End (Estágio/Júnior) – disponível para início imediato e projetos freelancer.',
        btnProjects: 'Ver Projetos',
        btnContact: 'Contato',
        btnCV: 'Download CV',
        stats: ['Projetos Completos', 'Anos de Estudo', 'Tecnologias'],
        scroll: 'Scroll',
        aboutBadge: 'Sobre mim',
        aboutTitle: 'Quem sou eu?',
        aboutTexts: [
          'Olá! Meu nome é Emerson Campos, sou estudante de Engenharia da Computação na UNIVESP e desenvolvedor Front-End focado em criar soluções web modernas e funcionais.',
          'Minha jornada na programação começou com a curiosidade de entender como os sites funcionam, e hoje me dedico a construir interfaces que unem design atraente, responsividade e performance.',
          'Busco uma oportunidade como Desenvolvedor Front-End (Estágio/Júnior) para aplicar meus conhecimentos e contribuir com projetos reais que impactem positivamente os usuários.'
        ],
        aboutInfo: ['Localização', 'Email', 'Formação'],
        aboutEducation: 'Engenharia da Computação - UNIVESP',
        aboutCardTitle: 'Freelance Disponível',
        aboutCardText: 'Disponível para projetos freelancer e oportunidades de estágio/efetivação.',
        aboutCardFooter: 'Resposta rápida',
        projectsBadge: 'Portfólio',
        projectsTitle: 'Meus Projetos',
        projectsSubtitle: 'Projetos reais desenvolvidos com as melhores práticas do mercado',
        projectsDesc: [
          'Sistema de agendamento para Pet Sitter com envio automático para WhatsApp, validações e cálculo de valores.',
          'Site corporativo para indústria de eletrodutos, com layout moderno e organizado.',
          'Site institucional desenvolvido para cliente real, com design limpo e foco em conversão.'
        ],
        skillsBadge: 'Skills',
        skillsTitle: 'Tecnologias & Ferramentas',
        frontendTitle: 'Front-End',
        skillLevels: ['Intermediário', 'Intermediário', 'Intermediário'],
        toolsTitle: 'Ferramentas',
        responsividade: 'Responsividade',
        languagesTitle: 'Idiomas',
        portugues: 'Português - Nativo',
        ingles: 'Inglês - B1 (Pré-intermediário)',
        contactBadge: 'Contato',
        contactTitle: 'Vamos Conversar?',
        contactSubtitle: 'Entre em contato para oportunidades, projetos ou apenas um bate-papo',
        contactLinks: ['Enviar mensagem', 'Enviar email', 'Conectar', 'Ver repositórios'],
        formButton: 'Enviar mensagem',
        whatsappTooltip: 'Fale comigo'
      },
      en: {
        nav: ['Home', 'About', 'Projects', 'Skills', 'Contact'],
        heroTag: 'Available for opportunities',
        heroTitle: ['Front-End', 'Developer'],
        heroDesc: 'Computer Engineering student passionate about creating modern interfaces. Seeking first opportunity as Front-End Developer (Intern/Junior) – available for immediate start and freelance projects.',
        btnProjects: 'View Projects',
        btnContact: 'Contact',
        btnCV: 'Download CV',
        stats: ['Completed Projects', 'Years of Study', 'Technologies'],
        scroll: 'Scroll',
        aboutBadge: 'About me',
        aboutTitle: 'Who am I?',
        aboutTexts: [
          'Hello! My name is Emerson Campos, I\'m a Computer Engineering student at UNIVESP and a Front-End developer focused on creating modern and functional web solutions.',
          'My journey in programming began with curiosity about how websites work, and today I dedicate myself to building interfaces that combine attractive design, responsiveness, and performance.',
          'I am looking for an opportunity as a Front-End Developer (Intern/Junior) to apply my knowledge and contribute to real projects that positively impact users.'
        ],
        aboutInfo: ['Location', 'Email', 'Education'],
        aboutEducation: 'Computer Engineering - UNIVESP',
        aboutCardTitle: 'Freelance Available',
        aboutCardText: 'Available for freelance projects and internship/permanent opportunities.',
        aboutCardFooter: 'Quick response',
        projectsBadge: 'Portfolio',
        projectsTitle: 'My Projects',
        projectsSubtitle: 'Real projects developed with market best practices',
        projectsDesc: [
          'Pet Sitter scheduling system with automatic WhatsApp sending, validations, and price calculation.',
          'Corporate website for conduit industry, with modern and organized layout.',
          'Institutional website developed for a real client, with clean design and conversion focus.'
        ],
        skillsBadge: 'Skills',
        skillsTitle: 'Technologies & Tools',
        frontendTitle: 'Front-End',
        skillLevels: ['Intermediate', 'Intermediate', 'Intermediate'],
        toolsTitle: 'Tools',
        responsividade: 'Responsiveness',
        languagesTitle: 'Languages',
        portugues: 'Portuguese - Native',
        ingles: 'English - B1 (Pre-intermediate)',
        contactBadge: 'Contact',
        contactTitle: 'Let\'s Talk?',
        contactSubtitle: 'Get in touch for opportunities, projects, or just a chat',
        contactLinks: ['Send message', 'Send email', 'Connect', 'View repositories'],
        formButton: 'Send message',
        whatsappTooltip: 'Talk to me'
      }
    },

    init() {
      const langToggle = document.getElementById('langToggle');
      if (langToggle) {
        langToggle.addEventListener('click', () => this.switch());
      }
      this.apply(this.currentLang);
    },

    switch() {
      this.currentLang = this.currentLang === 'pt' ? 'en' : 'pt';
      localStorage.setItem('portfolio_lang', this.currentLang);
      this.apply(this.currentLang);
    },

    apply(lang) {
      const t = this.translations[lang];
      const langToggleText = document.getElementById('langToggleText');
      
      if (langToggleText) langToggleText.textContent = lang.toUpperCase();
      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
      
      // Navegação
      document.querySelectorAll('.nav-link').forEach((link, i) => {
        if (t.nav[i]) link.textContent = t.nav[i];
      });
      
      // Hero
      const heroTag = document.querySelector('.hero-tag span:last-child');
      if (heroTag) heroTag.textContent = t.heroTag;
      
      const heroTitleLines = document.querySelectorAll('.hero-title span');
      if (heroTitleLines[0]) heroTitleLines[0].textContent = t.heroTitle[0];
      if (heroTitleLines[1]) heroTitleLines[1].textContent = t.heroTitle[1];
      
      const heroDesc = document.querySelector('.hero-desc');
      if (heroDesc) heroDesc.innerHTML = t.heroDesc;
      
      const btnProject = document.querySelector('.hero-buttons .btn-primary span');
      if (btnProject) btnProject.textContent = t.btnProjects;
      
      const btnContact = document.querySelector('.hero-buttons .btn-secondary span');
      if (btnContact) btnContact.textContent = t.btnContact;
      
      document.querySelectorAll('.stat-label').forEach((label, i) => {
        if (t.stats[i]) label.textContent = t.stats[i];
      });
      
      const scrollSpan = document.querySelector('.scroll-indicator span');
      if (scrollSpan) scrollSpan.textContent = t.scroll;
      
      // Sobre
      const aboutBadge = document.querySelector('#sobre .section-badge');
      if (aboutBadge) aboutBadge.textContent = t.aboutBadge;
      
      const aboutTitle = document.querySelector('#sobre .section-title');
      if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
      
      document.querySelectorAll('.about-text p').forEach((p, i) => {
        if (t.aboutTexts[i]) p.innerHTML = t.aboutTexts[i];
      });
      
      document.querySelectorAll('.info-item strong').forEach((label, i) => {
        if (t.aboutInfo[i]) label.textContent = t.aboutInfo[i];
      });
      
      const educationValue = document.querySelectorAll('.info-item p')[2];
      if (educationValue) educationValue.textContent = t.aboutEducation;
      
      const aboutCardTitle = document.querySelector('.about-card h3');
      if (aboutCardTitle) aboutCardTitle.textContent = t.aboutCardTitle;
      
      const aboutCardText = document.querySelector('.about-card p');
      if (aboutCardText) aboutCardText.textContent = t.aboutCardText;
      
      const aboutCardFooter = document.querySelector('.about-card .card-footer span');
      if (aboutCardFooter) aboutCardFooter.textContent = t.aboutCardFooter;
      
      // Projetos
      const projectsBadge = document.querySelector('#projetos .section-badge');
      if (projectsBadge) projectsBadge.textContent = t.projectsBadge;
      
      const projectsTitle = document.querySelector('#projetos .section-title');
      if (projectsTitle) projectsTitle.textContent = t.projectsTitle;
      
      const projectsSubtitle = document.querySelector('#projetos .section-subtitle');
      if (projectsSubtitle) projectsSubtitle.textContent = t.projectsSubtitle;
      
      document.querySelectorAll('.project-description-enhanced').forEach((desc, i) => {
        if (t.projectsDesc && t.projectsDesc[i]) desc.textContent = t.projectsDesc[i];
      });
      
      // Skills
      const skillsBadge = document.querySelector('#habilidades .section-badge');
      if (skillsBadge) skillsBadge.textContent = t.skillsBadge;
      
      const skillsTitle = document.querySelector('#habilidades .section-title');
      if (skillsTitle) skillsTitle.textContent = t.skillsTitle;
      
      const frontendTitle = document.getElementById('frontendTitle');
      if (frontendTitle) frontendTitle.textContent = t.frontendTitle;
      
      document.querySelectorAll('#htmlLevel, #cssLevel, #jsLevel').forEach((el, i) => {
        if (t.skillLevels[i]) el.textContent = t.skillLevels[i];
      });
      
      const toolsTitle = document.getElementById('toolsTitle');
      if (toolsTitle) toolsTitle.textContent = t.toolsTitle;
      
      const responsividadeText = document.getElementById('responsividadeText');
      if (responsividadeText) responsividadeText.textContent = t.responsividade;
      
      const languagesTitle = document.getElementById('languagesTitle');
      if (languagesTitle) languagesTitle.textContent = t.languagesTitle;
      
      const portuguesText = document.getElementById('portuguesText');
      if (portuguesText) portuguesText.textContent = t.portugues;
      
      const inglesText = document.getElementById('inglesText');
      if (inglesText) inglesText.textContent = t.ingles;
      
      // Contato
      const contactBadge = document.querySelector('#contato .section-badge');
      if (contactBadge) contactBadge.textContent = t.contactBadge;
      
      const contactTitle = document.querySelector('#contato .section-title');
      if (contactTitle) contactTitle.textContent = t.contactTitle;
      
      const contactSubtitle = document.querySelector('#contato .section-subtitle');
      if (contactSubtitle) contactSubtitle.textContent = t.contactSubtitle;
      
      document.querySelectorAll('.contact-card-item a span').forEach((link, i) => {
        if (t.contactLinks[i]) link.textContent = t.contactLinks[i];
      });
      
      const formBtn = document.querySelector('.contact-form .btn span');
      if (formBtn) formBtn.textContent = t.formButton;
      
      const whatsappTooltip = document.querySelector('.whatsapp-tooltip');
      if (whatsappTooltip) whatsappTooltip.textContent = t.whatsappTooltip;
    }
  };

  // ============================================
  // 11. MÓDULO: FORMULÁRIO DE CONTATO (ENHANCED)
  // ============================================
  
  const ContactForm = {
    form: null,
    submitBtn: null,
    statusEl: null,

    init() {
      this.form = document.getElementById('contactFormEnhanced');
      if (!this.form) return;
      
      this.submitBtn = document.getElementById('submitBtnEnhanced');
      this.statusEl = document.getElementById('formStatusEnhanced');
      
      this.setupValidation();
      this.setupSubmit();
    },

    setupValidation() {
      const inputs = this.form.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        input.addEventListener('input', () => this.validateInput(input));
        input.addEventListener('blur', () => this.validateInput(input, true));
      });
    },

    validateInput(input, isBlur = false) {
      const group = input.closest('.input-group-enhanced');
      if (!group) return;
      
      if (input.checkValidity() && input.value.trim() !== '') {
        group.classList.add('valid');
        group.classList.remove('error');
      } else if (input.value.trim() === '') {
        group.classList.remove('valid', 'error');
      } else if (isBlur) {
        group.classList.add('error');
        group.classList.remove('valid');
      }
    },

    setupSubmit() {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    async handleSubmit(e) {
      e.preventDefault();
      
      if (!this.validateForm()) return;
      
      this.submitBtn.disabled = true;
      const originalHTML = this.submitBtn.innerHTML;
      this.submitBtn.innerHTML = '<span class="btn-text">Enviando...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';
      
      const templateParams = {
        nome: document.getElementById('userNameEnhanced')?.value || '',
        email: document.getElementById('userEmailEnhanced')?.value || '',
        mensagem: document.getElementById('userMessageEnhanced')?.value || '',
        to_email: 'emersonpsn07@gmail.com'
      };
      
      try {
        await emailjs.send('service_fnj6arn', 'template_ktf8ouz', templateParams);
        
        this.showStatus('✓ Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
        this.form.reset();
        
        document.querySelectorAll('.input-group-enhanced').forEach(group => {
          group.classList.remove('valid', 'error');
        });
      } catch (error) {
        console.error('Erro EmailJS:', error);
        this.showStatus('✗ Erro ao enviar mensagem. Tente novamente ou use o WhatsApp.', 'error');
      } finally {
        this.submitBtn.disabled = false;
        this.submitBtn.innerHTML = originalHTML;
      }
    },

    validateForm() {
      const inputs = this.form.querySelectorAll('input, textarea');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.checkValidity()) {
          isValid = false;
          const group = input.closest('.input-group-enhanced');
          group.classList.add('error');
          group.classList.remove('valid');
        }
      });
      
      if (!isValid) {
        this.showStatus('✗ Por favor, preencha todos os campos corretamente.', 'error');
      }
      
      return isValid;
    },

    showStatus(message, type) {
      if (!this.statusEl) return;
      
      this.statusEl.innerHTML = message;
      this.statusEl.className = `form-status-enhanced ${type}`;
      
      setTimeout(() => {
        this.statusEl.innerHTML = '';
        this.statusEl.className = 'form-status-enhanced';
      }, 5000);
    }
  };

  // ============================================
  // 12. MÓDULO: LAZY LOADING DE IMAGENS
  // ============================================
  
  const LazyLoading = {
    init() {
      const images = document.querySelectorAll('img');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.complete) {
              img.classList.add('loaded');
            } else {
              img.addEventListener('load', () => img.classList.add('loaded'));
            }
            observer.unobserve(img);
          }
        });
      }, { threshold: 0.1 });
      
      images.forEach(img => {
        observer.observe(img);
        if (img.complete) img.classList.add('loaded');
      });
    }
  };

  // ============================================
  // 13. INICIALIZAÇÃO
  // ============================================
  
  const init = () => {
    CustomCursor.init();
    Header.init();
    MobileMenu.init();
    ActiveNav.init();
    SkillBars.init();
    Footer.init();
    SmoothScroll.init();
    RevealAnimation.init();
    I18n.init();
    ContactForm.init();
    LazyLoading.init();
  };
  
  // Aguardar DOM carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
