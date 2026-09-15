const typedEl = document.getElementById('typed');
const phrases = [
  'B.Tech CSE Student',
  'AI & ML Enthusiast',
  'Full-Stack Developer',
  'Cybersecurity Learner',
  'Web Developer'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex--);
  } else {
    typedEl.textContent = current.slice(0, charIndex++);
  }

  let delay = isDeleting ? 50 : 90;

  if (!isDeleting && charIndex === current.length + 1) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === -1) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
    charIndex = 0;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();


const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));



const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));


const barFills = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const pct = target.getAttribute('data-width');
        target.style.width = pct + '%';
        barObserver.unobserve(target);
      }
    });
  },
  { threshold: 0.4 }
);

barFills.forEach(bar => barObserver.observe(bar));


const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksList.classList.toggle('open');
  document.body.style.overflow = navLinksList.classList.contains('open') ? 'hidden' : '';
});

navLinksList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksList.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (navLinksList.classList.contains('open') &&
      !navLinksList.contains(e.target) &&
      !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinksList.classList.remove('open');
    document.body.style.overflow = '';
  }
});


// ── Back to top button ─────────────────────────
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ── Certificate Modal ──────────────────────────
const certModal = document.getElementById('cert-modal');
const certModalClose = document.getElementById('cert-modal-close');
const certModalImage = document.getElementById('cert-modal-image');
const certModalTitle = document.getElementById('cert-modal-title');
const certModalDate = document.getElementById('cert-modal-date');
const certCards = document.querySelectorAll('.cert-clickable');

// Certificate data mapping
const certData = {
  'infosys-cpp': {
    image: 'assets/certificates/infosys-cpp.png',
    title: 'Programming using C++',
    date: 'August 21, 2025'
  },
  'techveda-cybersecurity': {
    image: 'assets/certificates/techveda-cybersecurity.png',
    title: 'Ethical Hacking & Cybersecurity',
    date: 'March 26, 2025'
  },
  'infosys-dbms': {
    image: 'assets/certificates/infosys-dbms.png',
    title: 'Database Management System Part - 1',
    date: 'July 29, 2026'
  },
  'theedubootcamp-ai-ml': {
    image: 'assets/certificates/theedubootcamp-ai-ml.png',
    title: 'AI & ML Basics to Advanced',
    date: 'June 15 - July 30, 2026'
  },
  'skillera-ethical-hacking': {
    image: 'assets/certificates/skillera-ethical-hacking.png',
    title: 'Ethical Hacking & Technical Analysis',
    date: '2024'
  },
  'time-management': {
    image: 'assets/certificates/time-management.png',
    title: 'Time Management Leadership & Communication',
    date: '2024'
  },
  'java': {
    image: 'assets/certificates/java.png',
    title: 'Java Programming',
    date: '2025'
  },
  'lpu-communication': {
    image: 'assets/certificates/lpu-communication.png',
    title: 'Hone Communication & Public Speaking Skills for a Successful Career',
    date: '05-10-2024 to 29-10-2024'
  }
};

// Open modal when certificate is clicked
certCards.forEach(card => {
  card.addEventListener('click', () => {
    const certId = card.getAttribute('data-cert');
    const cert = certData[certId];
    
    if (cert) {
      certModalImage.src = cert.image;
      certModalTitle.textContent = cert.title;
      certModalDate.textContent = cert.date;
      certModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close modal when close button is clicked
certModalClose.addEventListener('click', () => {
  certModal.classList.remove('open');
  document.body.style.overflow = '';
});

// Close modal when clicking outside the modal content
certModal.addEventListener('click', (e) => {
  if (e.target === certModal) {
    certModal.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal.classList.contains('open')) {
    certModal.classList.remove('open');
    document.body.style.overflow = '';
  }
});


// ── Contact form (demo handler) ─────────────────
const contactForm = document.getElementById('contact-form');
const submitText  = document.getElementById('submit-text');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('form-submit');
  btn.disabled = true;
  submitText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  // Simulate async send (replace with real fetch/EmailJS in production)
  setTimeout(() => {
    submitText.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => { formSuccess.classList.remove('show'); }, 5000);
  }, 1800);
});


// ── Smooth parallax on hero orbs ───────────────
document.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (clientX - cx) / cx;
  const dy = (clientY - cy) / cy;

  document.querySelectorAll('.orb').forEach((orb, i) => {
    const strength = (i + 1) * 12;
    orb.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  });
});
