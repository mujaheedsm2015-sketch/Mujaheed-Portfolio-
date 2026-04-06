// ==================== SMOOTH NAVIGATION ==================== //
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  // Set active navigation link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Smooth scroll for navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// ==================== LAZY LOAD IMAGES ==================== //
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ==================== FORM HANDLING ==================== //
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email');
      return;
    }
    
    // Show success message (in real use, this would send to a backend)
    alert(`Thank you ${name}! I'll get back to you soon at ${email}`);
    contactForm.reset();
  });
}

// ==================== GALLERY MODAL ==================== //
function openGalleryModal(imageSrc, imageTitle) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <img src="${imageSrc}" alt="${imageTitle}" class="modal-image">
      <p class="modal-title">${imageTitle}</p>
    </div>
  `;

  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => modal.remove());

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  // Add some CSS for the modal if not already present
  if (!document.getElementById('modalStyles')) {
    const style = document.createElement('style');
    style.id = 'modalStyles';
    style.textContent = `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
      }

      .modal-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
      }

      .modal-image {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 12px;
      }

      .modal-close {
        position: absolute;
        top: -30px;
        right: 0;
        font-size: 2rem;
        cursor: pointer;
        color: #00d4d4;
        transition: color 0.3s ease;
      }

      .modal-close:hover {
        color: #00f0ff;
      }

      .modal-title {
        color: #b0b8d4;
        margin-top: 1rem;
        text-align: center;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ==================== SCROLL ANIMATIONS ==================== //
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all project cards and gallery items
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.project-card, .gallery-item, .skill-item').forEach(el => {
    el.style.opacity = '0';
    scrollObserver.observe(el);
  });
});

// ==================== SMOOTH SCROLL POLYFILL ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==================== VIEWPORT HEIGHT FIX FOR MOBILE ==================== //
function setViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
