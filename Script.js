 /* ══════════════════════════════════════
   SATYAM SRIVASTAVA — PORTFOLIO SCRIPTS
   script.js
══════════════════════════════════════ */

/* ── 1. CURSOR GLOW ── */
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursorGlow.style.opacity = '1';
});


/* ── 2. SCROLL PROGRESS BAR ── */
const scrollBar = document.getElementById('scrollBar');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total    = document.body.scrollHeight - window.innerHeight;
  const progress = (scrolled / total) * 100;
  scrollBar.style.width = progress + '%';
});


/* ── 3. NAVBAR — scroll shadow + active link ── */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  /* shadow on scroll */
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }

  /* highlight active nav link */
  let current = '';
  sections.forEach((sec) => {
    const top    = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--accent)';
    }
  });
});


/* ── 4. HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

/* close menu when a link is clicked */
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});


/* ── 5. TYPEWRITER EFFECT ── */
const phrases = [
  'Full Stack Developer',
  'AI & Data Science Enthusiast',
  'Problem Solver',
  'Open Source Contributor',
  'Web Performance Optimizer'
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
const twElement  = document.getElementById('typewriter');

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    /* typing */
    twElement.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1800); /* pause before deleting */
      return;
    }
  } else {
    /* deleting */
    twElement.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting   = false;
      phraseIndex  = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = isDeleting ? 55 : 90;
  setTimeout(typeWriter, speed);
}

typeWriter();


/* ── 6. REVEAL ON SCROLL (IntersectionObserver) ── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => revealObserver.observe(el));


/* ── 7. SMOOTH ANCHOR SCROLL (override default for offset) ── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; /* nav height */
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── 8. SKILL TAGS — staggered entrance ── */
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll('.tag');
        tags.forEach((tag, i) => {
          setTimeout(() => {
            tag.style.opacity    = '1';
            tag.style.transform  = 'translateY(0)';
          }, i * 80);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

/* set initial hidden state for tags */
skillCards.forEach((card) => {
  const tags = card.querySelectorAll('.tag');
  tags.forEach((tag) => {
    tag.style.opacity   = '0';
    tag.style.transform = 'translateY(8px)';
    tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });
  skillObserver.observe(card);
});


/* ── 9. YEAR in footer (auto-update) ── */
const yearEl = document.querySelector('footer span');
if (yearEl) {
  const fullText = yearEl.closest('div').textContent;
  if (fullText.includes('©')) {
    /* find and replace year if needed */
    const currentYear = new Date().getFullYear();
    yearEl.closest('div').innerHTML =
      yearEl.closest('div').innerHTML.replace(/\d{4}/, currentYear);
  }
}