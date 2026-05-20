// Cursor custom (apenas desktop e sem motion)
const cursor = document.querySelector('.cursor');

if (cursor && window.innerWidth > 768 && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
}

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Menu mobile
const menuBtn = document.getElementById('menuMobileBtn');
const nav = document.querySelector('.nav');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true' ? false : true;
    menuBtn.setAttribute('aria-expanded', expanded);
    
    nav.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    const spans = menuBtn.querySelectorAll('span');
    if (menuBtn.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Fechar menu ao clicar em link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    if (menuBtn) {
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      const spans = menuBtn.querySelectorAll('span');
      if (spans) {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }
  });
});

// Active link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
      observer.unobserve(bar);
    }
  });
}, observerOptions);

skillBars.forEach(bar => observer.observe(bar));

// Ano no footer
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Smooth scroll para âncoras
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

// Reveal animation on scroll (com respeito ao prefers-reduced-motion)
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const revealElements = document.querySelectorAll('.project-card, .skill-category, .contact-card-item, .about-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
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
  // Se o usuário prefere reduzir movimento, mostra tudo sem animação
  const revealElements = document.querySelectorAll('.project-card, .skill-category, .contact-card-item, .about-card');
  revealElements.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
}

// ============================================
// SISTEMA DE IDIOMAS (PT/EN) - VERSÃO DEFINITIVA
// ============================================

const langToggle = document.getElementById('langToggle');
const langToggleText = document.getElementById('langToggleText');

// Dicionário de traduções
const translations = {
  pt: {
    // Navegação
    navHome: "Home",
    navSobre: "Sobre",
    navProjetos: "Projetos",
    navSkills: "Skills",
    navContato: "Contato",
    
    // Hero
    heroTag: "Disponível para oportunidades",
    heroTitle1: "Desenvolvedor",
    heroTitle2: "Front-End",
    heroDesc: "Estudante de Engenharia da Computação apaixonado por criar interfaces modernas. Buscando primeira oportunidade como Front-End (Estágio/Júnior) – disponível para início imediato e projetos freelancer.",
    btnProjects: "Ver Projetos",
    btnContact: "Contato",
    btnCV: "Download CV",
    stat1: "Projetos Completos",
    stat2: "Anos de Estudo",
    stat3: "Tecnologias",
    scroll: "Scroll",
    
    // Sobre
    aboutBadge: "Sobre mim",
    aboutTitle: "Quem sou eu?",
    aboutText1: "Olá! Meu nome é Emerson Campos, sou estudante de Engenharia da Computação na UNIVESP e desenvolvedor Front-End focado em criar soluções web modernas e funcionais.",
    aboutText2: "Minha jornada na programação começou com a curiosidade de entender como os sites funcionam, e hoje me dedico a construir interfaces que unem design atraente, responsividade e performance.",
    aboutText3: "Busco uma oportunidade como Desenvolvedor Front-End (Estágio/Júnior) para aplicar meus conhecimentos e contribuir com projetos reais que impactem positivamente os usuários.",
    aboutLocation: "Localização",
    aboutEmail: "Email",
    aboutEducation: "Formação",
    aboutEducationValue: "Engenharia da Computação - UNIVESP",
    aboutCardTitle: "Freelance Disponível",
    aboutCardText: "Disponível para projetos freelancer e oportunidades de estágio/efetivação.",
    aboutCardFooter: "Resposta rápida",
    
    // Projetos
    projectsBadge: "Portfólio",
    projectsTitle: "Meus Projetos",
    projectsSubtitle: "Projetos reais desenvolvidos com as melhores práticas do mercado",
    project1Desc: "Sistema de agendamento para Pet Sitter com envio automático para WhatsApp, validações e cálculo de valores.",
    project2Desc: "Site corporativo para indústria de eletrodutos, com layout moderno e organizado.",
    project3Desc: "Site institucional desenvolvido para cliente real, com design limpo e foco em conversão.",
    
    // Skills
    skillsBadge: "Skills",
    skillsTitle: "Tecnologias & Ferramentas",
    frontendTitle: "Front-End",
    htmlLevel: "Intermediário",
    cssLevel: "Intermediário",
    jsLevel: "Intermediário",
    toolsTitle: "Ferramentas",
    responsividadeText: "Responsividade",
    languagesTitle: "Idiomas",
    portuguesText: "Português - Nativo",
    inglesText: "Inglês - B1 (Pré-intermediário)",
    
    // Contato
    contactBadge: "Contato",
    contactTitle: "Vamos Conversar?",
    contactSubtitle: "Entre em contato para oportunidades, projetos ou apenas um bate-papo",
    contactWhatsapp: "Enviar mensagem",
    contactEmail: "Enviar email",
    contactLinkedin: "Conectar",
    contactGithub: "Ver repositórios",
    formName: "Seu nome",
    formEmail: "Seu email",
    formMessage: "Sua mensagem",
    formButton: "Enviar mensagem",
    
    // Footer
    footerText: "Desenvolvido com",
    footerBy: "por Emerson Campos",
    
    // WhatsApp
    whatsappTooltip: "Fale comigo"
  },
  en: {
    // Navigation
    navHome: "Home",
    navSobre: "About",
    navProjetos: "Projects",
    navSkills: "Skills",
    navContato: "Contact",
    
    // Hero
    heroTag: "Available for opportunities",
    heroTitle1: "Front-End",
    heroTitle2: "Developer",
    heroDesc: "Computer Engineering student passionate about creating modern interfaces. Seeking first opportunity as Front-End Developer (Intern/Junior) – available for immediate start and freelance projects.",
    btnProjects: "View Projects",
    btnContact: "Contact",
    btnCV: "Download CV",
    stat1: "Completed Projects",
    stat2: "Years of Study",
    stat3: "Technologies",
    scroll: "Scroll",
    
    // About
    aboutBadge: "About me",
    aboutTitle: "Who am I?",
    aboutText1: "Hello! My name is Emerson Campos, I'm a Computer Engineering student at UNIVESP and a Front-End developer focused on creating modern and functional web solutions.",
    aboutText2: "My journey in programming began with curiosity about how websites work, and today I dedicate myself to building interfaces that combine attractive design, responsiveness, and performance.",
    aboutText3: "I am looking for an opportunity as a Front-End Developer (Intern/Junior) to apply my knowledge and contribute to real projects that positively impact users.",
    aboutLocation: "Location",
    aboutEmail: "Email",
    aboutEducation: "Education",
    aboutEducationValue: "Computer Engineering - UNIVESP",
    aboutCardTitle: "Freelance Available",
    aboutCardText: "Available for freelance projects and internship/permanent opportunities.",
    aboutCardFooter: "Quick response",
    
    // Projects
    projectsBadge: "Portfolio",
    projectsTitle: "My Projects",
    projectsSubtitle: "Real projects developed with market best practices",
    project1Desc: "Pet Sitter scheduling system with automatic WhatsApp sending, validations, and price calculation.",
    project2Desc: "Corporate website for conduit industry, with modern and organized layout.",
    project3Desc: "Institutional website developed for a real client, with clean design and conversion focus.",
    
    // Skills
    skillsBadge: "Skills",
    skillsTitle: "Technologies & Tools",
    frontendTitle: "Front-End",
    htmlLevel: "Intermediate",
    cssLevel: "Intermediate",
    jsLevel: "Intermediate",
    toolsTitle: "Tools",
    responsividadeText: "Responsiveness",
    languagesTitle: "Languages",
    portuguesText: "Portuguese - Native",
    inglesText: "English - B1 (Pre-intermediate)",
    
    // Contact
    contactBadge: "Contact",
    contactTitle: "Let's Talk?",
    contactSubtitle: "Get in touch for opportunities, projects, or just a chat",
    contactWhatsapp: "Send message",
    contactEmail: "Send email",
    contactLinkedin: "Connect",
    contactGithub: "View repositories",
    formName: "Your name",
    formEmail: "Your email",
    formMessage: "Your message",
    formButton: "Send message",
    
    // Footer
    footerText: "Developed with",
    footerBy: "by Emerson Campos",
    
    // WhatsApp
    whatsappTooltip: "Talk to me"
  }
};

let currentLang = localStorage.getItem('portfolio_lang') || 'pt';

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('portfolio_lang', lang);
  
  // Atualiza texto do botão
  if (langToggleText) {
    langToggleText.textContent = lang.toUpperCase();
  }
  
  // Atualiza lang do HTML
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  
  const t = translations[lang];
  
  // Navegação
  document.querySelectorAll('.nav-link').forEach((link, index) => {
    const texts = [t.navHome, t.navSobre, t.navProjetos, t.navSkills, t.navContato];
    if (texts[index]) link.textContent = texts[index];
  });
  
  // Hero
  const heroTag = document.querySelector('.hero-tag span:last-child');
  if (heroTag) heroTag.textContent = t.heroTag;
  
  const heroTitleLines = document.querySelectorAll('.hero-title span');
  if (heroTitleLines[0]) heroTitleLines[0].textContent = t.heroTitle1;
  if (heroTitleLines[1]) heroTitleLines[1].textContent = t.heroTitle2;
  
  const heroDesc = document.querySelector('.hero-desc');
  if (heroDesc) heroDesc.innerHTML = t.heroDesc;
  
  const btnProject = document.querySelector('.hero-buttons .btn-primary span');
  if (btnProject) btnProject.textContent = t.btnProjects;
  
  const btnContact = document.querySelector('.hero-buttons .btn-secondary span');
  if (btnContact) btnContact.textContent = t.btnContact;
  
  const stats = document.querySelectorAll('.stat-label');
  if (stats[0]) stats[0].textContent = t.stat1;
  if (stats[1]) stats[1].textContent = t.stat2;
  if (stats[2]) stats[2].textContent = t.stat3;
  
  const scrollSpan = document.querySelector('.scroll-indicator span');
  if (scrollSpan) scrollSpan.textContent = t.scroll;
  
  // Sobre
  const aboutBadge = document.querySelector('#sobre .section-badge');
  if (aboutBadge) aboutBadge.textContent = t.aboutBadge;
  
  const aboutTitle = document.querySelector('#sobre .section-title');
  if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
  
  const aboutTexts = document.querySelectorAll('.about-text p');
  if (aboutTexts[0]) aboutTexts[0].innerHTML = t.aboutText1;
  if (aboutTexts[1]) aboutTexts[1].innerHTML = t.aboutText2;
  if (aboutTexts[2]) aboutTexts[2].innerHTML = t.aboutText3;
  
  const aboutInfoLabels = document.querySelectorAll('.info-item strong');
  if (aboutInfoLabels[0]) aboutInfoLabels[0].textContent = t.aboutLocation;
  if (aboutInfoLabels[1]) aboutInfoLabels[1].textContent = t.aboutEmail;
  if (aboutInfoLabels[2]) aboutInfoLabels[2].textContent = t.aboutEducation;
  
  const aboutInfoValues = document.querySelectorAll('.info-item p');
  if (aboutInfoValues[2]) aboutInfoValues[2].textContent = t.aboutEducationValue;
  
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
  
  const projectDescs = document.querySelectorAll('.project-info p');
  if (projectDescs[0]) projectDescs[0].textContent = t.project1Desc;
  if (projectDescs[1]) projectDescs[1].textContent = t.project2Desc;
  if (projectDescs[2]) projectDescs[2].textContent = t.project3Desc;
  
  // Skills
  const skillsBadge = document.querySelector('#habilidades .section-badge');
  if (skillsBadge) skillsBadge.textContent = t.skillsBadge;
  
  const skillsTitle = document.querySelector('#habilidades .section-title');
  if (skillsTitle) skillsTitle.textContent = t.skillsTitle;
  
  const frontendTitle = document.getElementById('frontendTitle');
  if (frontendTitle) frontendTitle.textContent = t.frontendTitle;
  
  const htmlLevel = document.getElementById('htmlLevel');
  if (htmlLevel) htmlLevel.textContent = t.htmlLevel;
  
  const cssLevel = document.getElementById('cssLevel');
  if (cssLevel) cssLevel.textContent = t.cssLevel;
  
  const jsLevel = document.getElementById('jsLevel');
  if (jsLevel) jsLevel.textContent = t.jsLevel;
  
  const toolsTitle = document.getElementById('toolsTitle');
  if (toolsTitle) toolsTitle.textContent = t.toolsTitle;
  
  const responsividadeText = document.getElementById('responsividadeText');
  if (responsividadeText) responsividadeText.textContent = t.responsividadeText;
  
  const languagesTitle = document.getElementById('languagesTitle');
  if (languagesTitle) languagesTitle.textContent = t.languagesTitle;
  
  const portuguesText = document.getElementById('portuguesText');
  if (portuguesText) portuguesText.textContent = t.portuguesText;
  
  const inglesText = document.getElementById('inglesText');
  if (inglesText) inglesText.textContent = t.inglesText;

  
  
  // Contato
  const contactBadge = document.querySelector('#contato .section-badge');
  if (contactBadge) contactBadge.textContent = t.contactBadge;
  
  const contactTitle = document.querySelector('#contato .section-title');
  if (contactTitle) contactTitle.textContent = t.contactTitle;
  
  const contactSubtitle = document.querySelector('#contato .section-subtitle');
  if (contactSubtitle) contactSubtitle.textContent = t.contactSubtitle;
  
  const contactLinks = document.querySelectorAll('.contact-card-item a span');
  if (contactLinks[0]) contactLinks[0].textContent = t.contactWhatsapp;
  if (contactLinks[1]) contactLinks[1].textContent = t.contactEmail;
  if (contactLinks[2]) contactLinks[2].textContent = t.contactLinkedin;
  if (contactLinks[3]) contactLinks[3].textContent = t.contactGithub;
  
  // Formulário
  const nameInput = document.querySelector('.contact-form input[type="text"]');
  const emailInput = document.querySelector('.contact-form input[type="email"]');
  const textarea = document.querySelector('.contact-form textarea');
  const formButton = document.querySelector('.contact-form .btn span');
  
  if (nameInput) nameInput.placeholder = t.formName;
  if (emailInput) emailInput.placeholder = t.formEmail;
  if (textarea) textarea.placeholder = t.formMessage;
  if (formButton) formButton.textContent = t.formButton;
  
  // Footer
  const footerText = document.querySelector('.footer-copy span:first-child');
  if (footerText) footerText.textContent = t.footerText;
  
  const footerBy = document.querySelector('.footer-copy span:last-child');
  if (footerBy) footerBy.textContent = t.footerBy;
  
  // WhatsApp Tooltip
  const whatsappTooltip = document.querySelector('.whatsapp-tooltip');
  if (whatsappTooltip) whatsappTooltip.textContent = t.whatsappTooltip;
}

// Evento do botão de idioma
if (langToggle) {
  langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    switchLanguage(newLang);
  });
}

// Inicializa com o idioma salvo
switchLanguage(currentLang);
