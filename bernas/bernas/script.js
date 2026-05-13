// ---- SMOOTH SCROLL TO SECTION ----
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- HAMBURGER / MOBILE MENU ----
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks   = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobLinks.forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ---- PHOTO FRAME UPLOAD ----
const photoMappings = [
  { inputId: 'heroUpload',  imgId: 'heroImg'  },
  { inputId: 'aboutUpload', imgId: 'aboutImg' },
  { inputId: 'expUpload',   imgId: 'expImg'   },
];

photoMappings.forEach(({ inputId, imgId }) => {
  const input = document.getElementById(inputId);
  const img   = document.getElementById(imgId);

  if (!input || !img) return;

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      img.src = ev.target.result;
      img.style.minHeight = 'unset';
      img.classList.add('loaded');

      // Save to localStorage for persistence within session
      try { localStorage.setItem(`photo_${imgId}`, ev.target.result); } catch {}
    };
    reader.readAsDataURL(file);
  });

  // Restore from localStorage
  try {
    const saved = localStorage.getItem(`photo_${imgId}`);
    if (saved) {
      img.src = saved;
      img.classList.add('loaded');
    }
  } catch {}
});

// ---- PLACEHOLDER STYLING FOR EMPTY FRAMES ----
function applyPlaceholders() {
  document.querySelectorAll('.frame-inner img').forEach(img => {
    if (!img.src || img.src === window.location.href) {
      img.style.minHeight = '200px';
      img.style.background = 'linear-gradient(135deg,#151821,#0e1018)';
      img.alt = img.alt || 'Click "Edit Photo" to upload';
    }
  });
}
applyPlaceholders();

// ---- ANIMATE ON SCROLL ----
const animItems = document.querySelectorAll(
  '.skill-card, .achievement-item, .interest-card, .about-bio, .contact-chips'
);

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animItems.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity .55s ease, transform .55s ease';
  animObserver.observe(el);
});

// ---- SKILL CARD STAGGER ----
document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

// ---- NAV LINK SMOOTH SCROLL (anchor) ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ---- FLOATING BACK-TO-TOP (visible in non-home sections) ----
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  const homeSection = document.getElementById('home');
  const toTopObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      backToTop.style.display = entry.isIntersecting ? 'none' : 'inline-flex';
    });
  }, { threshold: 0.3 });
  if (homeSection) toTopObserver.observe(homeSection);
}

console.log('%c IAN BERNAS JR – Portfolio Loaded ', 'color:#c9a84c;font-size:14px;font-weight:bold;');