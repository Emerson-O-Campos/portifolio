// Cursor custom (apenas desktop)
const cursor = document.querySelector('.cursor');

if (cursor && window.innerWidth > 768) {
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
    nav.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    // Animação do botão menu
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
    if (menuBtn) menuBtn.classList.remove('active');
    const spans = menuBtn?.querySelectorAll('span');
    if (spans) {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
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

// Form submit (simulação)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada! Entrarei em contato em breve.');
    contactForm.reset();
  });
}

// Ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

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

// Reveal animation on scroll
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