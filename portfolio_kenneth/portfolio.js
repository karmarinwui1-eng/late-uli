// NAVBAR SCROLL 
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// SMOOTH SCROLL 
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ACTIVE NAV 
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function updateActiveNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
  });
}

// REVEAL ON SCROLL
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// SKILL BARS
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      setTimeout(() => { fill.style.width = fill.dataset.w + '%'; }, 200);
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.sk-fill').forEach(el => barObserver.observe(el));

// CONTACT FORM 
function sendMessage() {
  const name  = document.getElementById('formName').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const msg   = document.getElementById('formMsg').value.trim();
  const fb    = document.getElementById('formFeedback');
  const btn   = document.getElementById('sendBtn');

  if (!name || !email || !msg) {
    fb.textContent = '⚠ Please fill in all fields.';
    fb.style.color = '#8b5cf6';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fb.textContent = '⚠ Please enter a valid email.';
    fb.style.color = '#8b5cf6';
    return;
  }
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    fb.textContent = '✓ Message sent! Thanks, ' + name + '.';
    fb.style.color = '#6ee7b7';
    btn.textContent = 'Send Message';
    btn.disabled = false;
    document.getElementById('formName').value = '';
    document.getElementById('formEmail').value = '';
    document.getElementById('formMsg').value = '';
  }, 1400);
}

// HERO TYPING EFFECT 
const pillEl = document.querySelector('.hero-pill');
if (pillEl) {
  const dotEl = pillEl.querySelector('.pill-dot');
  const text = 'Freelance MLBB Player · Competitive';
  // clear text content but keep dot
  pillEl.innerHTML = '';
  pillEl.appendChild(dotEl);
  const textNode = document.createTextNode('');
  pillEl.appendChild(textNode);
  let i = 0;
  const type = () => {
    if (i < text.length) {
      textNode.textContent += text[i++];
      setTimeout(type, 38);
    }
  };
  setTimeout(type, 700);
}

// SUBTLE PARALLAX on hero glows 
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const g1 = document.querySelector('.g1');
  const g2 = document.querySelector('.g2');
  if (g1) g1.style.transform = `translateY(${y * 0.15}px)`;
  if (g2) g2.style.transform = `translateY(${-y * 0.1}px)`;
});

// PAGE FADE IN
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
  });
});