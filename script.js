/* =============================================
   Simplified — Main JavaScript
   ============================================= */

// ─── Page Loader ───────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 400);
  }
});

// ─── Navbar scroll effect ───────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ─── Mobile nav ─────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

function closeMenu() {
  if (mobileNav) mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close on background click
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeMenu();
  });
}

// ─── Intersection Observer for scroll animations ─
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── Contact form handler ────────────────────────
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const btn = form.querySelector('button[type="submit"]');
  const status = document.getElementById('formStatus');

  // Simulate sending (replace with your actual form endpoint / EmailJS / Formspree)
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#30d158';
    if (status) {
      status.textContent = "Thanks! We'll be in touch within 1 business day.";
      status.style.color = '#1a7a34';
    }
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message ✦';
      btn.style.background = '';
      btn.disabled = false;
      if (status) status.textContent = '';
    }, 4000);
  }, 1200);
}

// ─── Smooth scroll for anchor links ─────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 60;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Counter animation for stats ────────────────
function animateCounter(el) {
  const target = el.dataset.target;
  const isRupee = target.startsWith('₹');
  const isCr = target.endsWith('Cr+');
  const isPct = target.endsWith('%');
  const isPlus = target.endsWith('+') && !isCr;

  let numeric;
  if (isRupee && isCr) {
    numeric = parseFloat(target.replace('₹','').replace('Cr+',''));
  } else {
    numeric = parseInt(target.replace(/[^0-9]/g, ''), 10);
  }

  const duration = 1400;
  const step = 16;
  const steps = duration / step;
  let current = 0;
  const increment = numeric / steps;

  const interval = setInterval(() => {
    current += increment;
    if (current >= numeric) {
      current = numeric;
      clearInterval(interval);
    }
    if (isRupee && isCr) {
      el.textContent = `₹${current.toFixed(current >= 10 ? 0 : 1)}Cr+`;
    } else if (isPct) {
      el.textContent = `${Math.round(current)}%`;
    } else if (isPlus) {
      el.textContent = `${Math.round(current)}+`;
    } else {
      el.textContent = Math.round(current);
    }
  }, step);
}

// Wire up counters when they enter viewport
const statEls = document.querySelectorAll('.stat-number');
statEls.forEach(el => {
  // Store original text as data-target
  el.dataset.target = el.textContent.trim();
  el.textContent = '0';

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(el);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statObserver.observe(el);
});

// ─── Careers page: check if Google Form is configured ─
const careerForm = document.getElementById('careerGoogleForm');
const formFallback = document.getElementById('formFallback');

if (careerForm && formFallback) {
  if (careerForm.src.includes('YOUR_FORM_ID')) {
    careerForm.style.display = 'none';
    formFallback.style.display = 'block';
  }
}
