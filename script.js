/*=============================================================================
  AHOSAN HABIB LIKHON — PORTFOLIO V7 JAVASCRIPT
  Biotechnology & Genetic Engineering Theme
  Interactive Features and Scientific Animations
=============================================================================*/

'use strict';

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initCursor();
  initScrollEffects();
  initTypingAnimation();
  initScientificBackground();
  initGitHubProjects();
  initPhotoGallery();
  initContactForm();
  initLoadingScreen();
  initBackToTop();
});

// ============= THEME TOGGLE =============
function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// ============= NAVIGATION =============
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  let lastScroll = 0;

  // Scroll effects
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;

    // Active link highlighting
    let current = '';
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
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

  // Mobile menu toggle
  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle?.classList.remove('active');
      navMenu?.classList.remove('active');
    });
  });

  // Smooth scrolling
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============= CUSTOM CURSOR - DNA THEMED =============
function initCursor() {
  // Skip on mobile/tablet
  if (window.innerWidth <= 768) return;

  const cursorContainer = document.querySelector('.cursor-container');
  if (!cursorContainer) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursorContainer.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorContainer.style.opacity = '1';
  });

  // Smooth animation loop
  function animate() {
    // Smooth easing with interpolation
    const speed = 0.15;
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;

    cursorContainer.style.left = `${currentX}px`;
    cursorContainer.style.top = `${currentY}px`;

    requestAnimationFrame(animate);
  }
  animate();

  // Hover effects on interactive elements
  const interactiveElements = 'a, button, .photo-item, .project-card, .filter-btn, .nav-link, .btn, .contact-item, .research-card, .skill-category';

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(interactiveElements);
    if (target) {
      cursorContainer.classList.add('hovering');

      // Special text mode for inputs
      if (e.target.matches('input[type="text"], input[type="email"], textarea')) {
        cursorContainer.classList.add('text-mode');
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(interactiveElements);
    if (target) {
      cursorContainer.classList.remove('hovering');
      cursorContainer.classList.remove('text-mode');
    }
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    cursorContainer.classList.add('clicking');
  });

  document.addEventListener('mouseup', () => {
    cursorContainer.classList.remove('clicking');
  });
}

// ============= SCROLL EFFECTS =============
function initScrollEffects() {
  // Scroll progress bar
  const progressBar = document.querySelector('.scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// ============= TYPING ANIMATION =============
function initTypingAnimation() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;

  const texts = [
    'Biotechnology Student',
    'Aspiring Developer',
    'Research Enthusiast',
    'AI Learner',
    'Bioinformatics Explorer',
    'Creative Photographer'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// ============= SCIENTIFIC BACKGROUND =============
function initScientificBackground() {
  const canvas = document.getElementById('dna-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // DNA Helix particles
  class DNAParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.baseY = this.y;
      this.amplitude = Math.random() * 100 + 50;
      this.wavelength = Math.random() * 0.02 + 0.01;
      this.speed = Math.random() * 0.5 + 0.2;
      this.radius = Math.random() * 3 + 1;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.hue = Math.random() * 60 + 140; // Green-cyan range
    }

    update() {
      this.x -= this.speed;
      this.y = this.baseY + Math.sin(this.x * this.wavelength) * this.amplitude;

      if (this.x < -50) {
        this.x = canvas.width + 50;
        this.baseY = Math.random() * canvas.height;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 70%, 50%, ${this.opacity})`;
      ctx.fill();

      // Glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsla(${this.hue}, 70%, 50%, ${this.opacity})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Create particles
  const particles = [];
  const particleCount = Math.min(50, Math.floor(canvas.width / 30));

  for (let i = 0; i < particleCount; i++) {
    particles.push(new DNAParticle());
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Connect nearby particles
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 * (1 - distance / 150)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Add cell decorations
  createCells();
}

function createCells() {
  const container = document.querySelector('.cell-container');
  if (!container) return;

  const cellCount = 10;

  // Create unique keyframes for each cell
  const style = document.createElement('style');
  let keyframesCSS = '';

  for (let i = 0; i < cellCount; i++) {
    // Generate unique animation for each cell
    keyframesCSS += `
      @keyframes cellMove${i} {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 0.1;
        }
        25% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${0.8 + Math.random() * 0.4});
          opacity: ${0.08 + Math.random() * 0.04};
        }
        50% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${0.9 + Math.random() * 0.3});
          opacity: ${0.06 + Math.random() * 0.06};
        }
        75% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${0.85 + Math.random() * 0.35});
          opacity: ${0.09 + Math.random() * 0.03};
        }
        100% {
          transform: translate(0, 0) scale(1);
          opacity: 0.1;
        }
      }
    `;

    const cell = document.createElement('div');
    const size = Math.random() * 120 + 60;
    cell.className = `floating-cell floating-cell-${i}`;
    cell.style.position = 'absolute';
    cell.style.width = `${size}px`;
    cell.style.height = `${size}px`;
    cell.style.borderRadius = '50%';
    cell.style.border = `2px solid rgba(16, 185, 129, 0.12)`;
    cell.style.left = `${Math.random() * 100}%`;
    cell.style.top = `${Math.random() * 100}%`;
    cell.style.pointerEvents = 'none';
    cell.style.willChange = 'transform, opacity';
    cell.style.animation = `cellMove${i} ${20 + Math.random() * 20}s ease-in-out infinite`;
    cell.style.animationDelay = `${Math.random() * -10}s`; // Negative delay for staggered start
    container.appendChild(cell);
  }

  style.textContent = keyframesCSS;
  document.head.appendChild(style);
}

// ============= GITHUB PROJECTS =============
async function initGitHubProjects() {
  const projectsGrid = document.getElementById('github-projects');
  if (!projectsGrid) return;

  try {
    const response = await fetch('https://api.github.com/users/ahosanhabiblikhon/repos?sort=updated&per_page=6');
    const repos = await response.json();

    if (repos.message) {
      throw new Error(repos.message);
    }

    projectsGrid.innerHTML = '';

    repos.forEach(repo => {
      const card = createProjectCard(repo);
      projectsGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    projectsGrid.innerHTML = `
      <div class="project-loading">
        <p style="color: var(--text-secondary);">Unable to load repositories. Please visit <a href="https://github.com/ahosanhabiblikhon" target="_blank" style="color: var(--accent);">GitHub</a> directly.</p>
      </div>
    `;
  }
}

function createProjectCard(repo) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';

  // Animate in
  setTimeout(() => {
    card.style.transition = 'all 0.5s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 100);

  const languageColors = {
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    TypeScript: '#2b7489',
    C: '#555555',
    'C++': '#f34b7d',
    PHP: '#4F5D95'
  };

  card.innerHTML = `
    <div class="project-header">
      <div class="project-icon">📁</div>
      <div class="project-stats">
        ${repo.stargazers_count > 0 ? `<span>⭐ ${repo.stargazers_count}</span>` : ''}
        ${repo.forks_count > 0 ? `<span>🔗 ${repo.forks_count}</span>` : ''}
      </div>
    </div>
    <h3>${repo.name}</h3>
    <p>${repo.description || 'No description available'}</p>
    <div class="project-footer">
      ${repo.language ? `
        <div class="project-language">
          <span class="language-dot" style="background: ${languageColors[repo.language] || '#10b981'}"></span>
          ${repo.language}
        </div>
      ` : '<div></div>'}
      <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link">View Code</a>
    </div>
  `;

  return card;
}

// ============= PHOTO GALLERY =============
function initPhotoGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const photoItems = document.querySelectorAll('.photo-item');

  // Initialize all photos as visible
  photoItems.forEach(item => {
    item.style.display = 'block';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
    item.style.transition = 'all 0.3s ease';
  });

  // Filter button functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter photos with animation
      photoItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          // Show matching photos
          setTimeout(() => {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          }, index * 30); // Stagger animation
        } else {
          // Hide non-matching photos
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Lightbox functionality
  photoItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        createLightbox(img.src, img.alt);
      });
    }
  });
}

function createLightbox(src, alt = 'Photo') {
  // Remove any existing lightbox
  const existingLightbox = document.querySelector('.lightbox-overlay');
  if (existingLightbox) {
    existingLightbox.remove();
  }

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox-overlay';
  lightbox.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 40px 20px;
    cursor: zoom-out;
    animation: fadeIn 0.3s ease;
    backdrop-filter: blur(10px);
  `;

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    background: rgba(16, 185, 129, 0.2);
    color: white;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10001;
  `;

  closeBtn.addEventListener('mouseenter', () => {
    closeBtn.style.background = 'rgba(16, 185, 129, 0.8)';
    closeBtn.style.transform = 'rotate(90deg)';
  });

  closeBtn.addEventListener('mouseleave', () => {
    closeBtn.style.background = 'rgba(16, 185, 129, 0.2)';
    closeBtn.style.transform = 'rotate(0deg)';
  });

  const imgContainer = document.createElement('div');
  imgContainer.style.cssText = `
    max-width: 90%;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: default;
  `;

  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.style.cssText = `
    max-width: 100%;
    max-height: 80vh;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(16, 185, 129, 0.4);
    animation: scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
  `;

  const caption = document.createElement('div');
  caption.textContent = alt;
  caption.style.cssText = `
    margin-top: 20px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    max-width: 600px;
  `;

  imgContainer.appendChild(img);
  imgContainer.appendChild(caption);
  lightbox.appendChild(closeBtn);
  lightbox.appendChild(imgContainer);
  document.body.appendChild(lightbox);

  // Prevent scrolling
  document.body.style.overflow = 'hidden';

  // Close on click outside or close button
  const closeLightbox = () => {
    lightbox.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      lightbox.remove();
      document.body.style.overflow = '';
    }, 300);
  };

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === closeBtn) {
      closeLightbox();
    }
  });

  closeBtn.addEventListener('click', closeLightbox);

  // Close on Escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);

  // Prevent clicks on image from closing
  imgContainer.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Add animations if not already added
  if (!document.querySelector('#lightbox-animations')) {
    const style = document.createElement('style');
    style.id = 'lightbox-animations';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
      @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ============= CONTACT FORM =============
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Real-time validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const showError = (input, message) => {
    const formGroup = input.closest('.form-group');
    let errorDiv = formGroup.querySelector('.error-message');

    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      formGroup.appendChild(errorDiv);
    }

    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--danger)';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '4px';
    input.style.borderColor = 'var(--danger)';
  };

  const clearError = (input) => {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
    input.style.borderColor = 'var(--border)';
  };

  // Validation on blur
  nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, 'Name must be at least 2 characters');
    } else {
      clearError(nameInput);
    }
  });

  emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
    } else {
      clearError(emailInput);
    }
  });

  messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message must be at least 10 characters');
    } else {
      clearError(messageInput);
    }
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous errors
    clearError(nameInput);
    clearError(emailInput);
    clearError(messageInput);

    // Validate all fields
    let isValid = true;

    if (nameInput.value.trim().length < 2) {
      showError(nameInput, 'Name must be at least 2 characters');
      isValid = false;
    }

    if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message must be at least 10 characters');
      isValid = false;
    }

    if (!isValid) {
      showNotification('Please fix the errors above', 'error');
      return;
    }

    // Get form data
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
      timestamp: new Date().toISOString()
    };

    const originalHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg style="width: 20px; height: 20px; animation: spin 1s linear infinite;" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.3"/>
        <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
      </svg>
      <span>Sending...</span>
    `;

    try {
      // Method 1: FormSubmit (free, no backend required)
      // Uncomment and add your FormSubmit endpoint
      // const response = await fetch('https://formsubmit.co/your-email@example.com', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Method 2: Email simulation (logs to console)
      console.log('📧 Contact Form Submission:', formData);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      submitBtn.innerHTML = `
        <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 6L9 17l-5-5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Message Sent Successfully!</span>
      `;
      submitBtn.style.background = 'var(--success)';

      showNotification(`Thank you, ${formData.name}! Your message has been received. I'll get back to you soon!`, 'success');

      // Reset form after delay
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
      }, 4000);

    } catch (error) {
      console.error('Form submission error:', error);

      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;

      showNotification('Sorry, there was an error sending your message. Please try again or email me directly.', 'error');
    }
  });

  // Add CSS for spinner animation
  if (!document.querySelector('#form-animations')) {
    const style = document.createElement('style');
    style.id = 'form-animations';
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  const colors = {
    success: 'var(--success)',
    error: 'var(--danger)',
    info: 'var(--accent)'
  };

  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 24px;
    max-width: 400px;
    padding: 16px 24px;
    background: ${colors[type] || colors.info};
    color: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-size: 15px;
    font-weight: 500;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 5000);

  // Add animations
  if (!document.querySelector('#notification-animations')) {
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ============= LOADING SCREEN =============
function initLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1500);
  });
}

// ============= BACK TO TOP =============
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============= UTILITY FUNCTIONS =============

// Smooth reveal on scroll
const revealElements = () => {
  const elements = document.querySelectorAll('[data-reveal]');

  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      el.classList.add('revealed');
    }
  });
};

window.addEventListener('scroll', revealElements);

// Performance optimization
const throttle = (func, delay) => {
  let timeoutId;
  let lastRan;

  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (Date.now() - lastRan >= delay) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
};

// Console signature
console.log('%c🧬 Ahosan Habib Likhon Portfolio', 'color: #10b981; font-size: 20px; font-weight: bold;');
console.log('%cBiotechnology & Genetic Engineering Student', 'color: #14b8a6; font-size: 14px;');
console.log('%cDesigned & Developed with 💚', 'color: #10b981; font-size: 12px;');
