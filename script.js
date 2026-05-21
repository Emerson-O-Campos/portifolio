// ============================================
// PORTFÓLIO EMERSON CAMPOS - SCRIPT PRINCIPAL
// ============================================

(function() {
  'use strict';

  // ============================================
  // 1. CONFIGURAÇÕES GLOBAIS
  // ============================================
  
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.innerWidth > 768;
  const isMotionOk = !isReducedMotion && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  // ============================================
  // 2. CUSTOM CURSOR (apenas desktop com motion)
  // ============================================
  
  const cursor = document.querySelector('.cursor');
  if (cursor && isDesktop && isMotionOk) {
    document.body.style.cursor = 'none';
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }

  // ============================================
  // 3. HEADER SCROLL EFFECT
  // ============================================
  
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ============================================
  // 4. MENU MOBILE
  // ============================================
  
  const menuBtn = document.getElementById('menuMobileBtn');
  const nav = document.querySelector('.nav');
  
  const closeMenu = () => {
    if (!nav || !menuBtn) return;
    nav.classList.remove('active');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    
    const spans = menuBtn.querySelectorAll('span');
    if (spans.length) {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  };
  
  const toggleMenu = () => {
    if (!nav || !menuBtn) return;
    const isOpen = nav.classList.toggle('active');
    menuBtn.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    
    const spans = menuBtn.querySelectorAll('span');
    if (spans.length && isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else if (spans.length) {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  };
  
  if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
  
  // Fechar menu ao clicar em link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ============================================
  // 5. ACTIVE LINK ON SCROLL
  // ============================================
  
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });

  // ============================================
  // 6. SKILL BARS ANIMATION
  // ============================================
  
  const skillBars = document.querySelectorAll('.skill-progress');
  if (skillBars.length && isMotionOk) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => { bar.style.width = width; }, 100);
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
  } else if (skillBars.length) {
    skillBars.forEach(bar => bar.style.width = bar.style.width);
  }

  // ============================================
  // 7. FOOTER YEAR
  // ============================================
  
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ============================================
  // 8. SMOOTH SCROLL
  // ============================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // 9. REVEAL ANIMATION ON SCROLL
  // ============================================
  
  const revealElements = document.querySelectorAll('.project-card, .skill-category, .contact-card-item, .about-card');
  
  if (revealElements.length && isMotionOk) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }

  // ============================================
  // 10. SISTEMA DE IDIOMAS (PT/EN)
  // ============================================
  
  const translations = {
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
      formPlaceholders: ['Seu nome', 'Seu email', 'Sua mensagem'],
      formButton: 'Enviar mensagem',
      footerText: 'Desenvolvido com',
      footerBy: 'por Emerson Campos',
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
      formPlaceholders: ['Your name', 'Your email', 'Your message'],
      formButton: 'Send message',
      footerText: 'Developed with',
      footerBy: 'by Emerson Campos',
      whatsappTooltip: 'Talk to me'
    }
  };

  const langToggle = document.getElementById('langToggle');
  const langToggleText = document.getElementById('langToggleText');
  let currentLang = localStorage.getItem('portfolio_lang') || 'pt';

  function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    
    if (langToggleText) langToggleText.textContent = lang.toUpperCase();
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    
    const t = translations[lang];
    
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
    
    document.querySelectorAll('.project-info p').forEach((p, i) => {
      if (t.projectsDesc[i]) p.textContent = t.projectsDesc[i];
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
    
    // Formulário
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    inputs.forEach((input, i) => {
      if (t.formPlaceholders[i] && input.placeholder) {
        input.placeholder = t.formPlaceholders[i];
      }
    });
    
    const formBtn = document.querySelector('.contact-form .btn span');
    if (formBtn) formBtn.textContent = t.formButton;
    
    // Footer
    const footerTextSpan = document.querySelector('.footer-copy span:first-child');
    if (footerTextSpan) footerTextSpan.textContent = t.footerText;
    
    const footerBySpan = document.querySelector('.footer-copy span:last-child');
    if (footerBySpan) footerBySpan.textContent = t.footerBy;
    
    // WhatsApp
    const whatsappTooltip = document.querySelector('.whatsapp-tooltip');
    if (whatsappTooltip) whatsappTooltip.textContent = t.whatsappTooltip;
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      switchLanguage(currentLang === 'pt' ? 'en' : 'pt');
    });
  }
  
  switchLanguage(currentLang);

  // ============================================
  // 11. EMAILJS - FORMULÁRIO DE CONTATO
  // ============================================
  
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  const EMAILJS_CONFIG = {
    serviceId: 'service_fnj6arn',
    templateId: 'template_ktf8ouz',
    publicKey: 'bfB2XwrteTOp0PDY9'
  };

  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';
      
      formStatus.innerHTML = '';
      
      const templateParams = {
        nome: document.getElementById('userName')?.value || '',
        email: document.getElementById('userEmail')?.value || '',
        mensagem: document.getElementById('userMessage')?.value || '',
        to_email: 'emersonpsn07@gmail.com'
      };
      
      try {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams
        );
        
        formStatus.innerHTML = '✓ Mensagem enviada com sucesso! Entrarei em contato em breve.';
        formStatus.style.color = '#00ff99';
        contactForm.reset();
        
        setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
        
      } catch (error) {
        console.error('Erro EmailJS:', error);
        formStatus.innerHTML = '✗ Erro ao enviar mensagem. Tente novamente ou use o WhatsApp.';
        formStatus.style.color = '#ff5555';
        
      } finally {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.innerHTML = originalText;
      }
    });
  }

})();
