document.addEventListener('DOMContentLoaded', () => {

  // Theme Toggle Logic
  const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
  const themeIcons = document.querySelectorAll('#theme-icon, #theme-icon-mobile');

  // Check for saved theme preference or OS default
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    themeIcons.forEach(icon => {
      if (theme === 'dark') {
        icon.classList.replace('bi-moon', 'bi-sun');
      } else {
        icon.classList.replace('bi-sun', 'bi-moon');
      }
    });

    // Specific fix for Dashboard spans if they exist
    const themeSpans = document.querySelectorAll('#theme-toggle span');
    themeSpans.forEach(span => {
      span.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    });
  };

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setTheme('dark');
  }

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      let currentTheme = document.documentElement.getAttribute('data-theme');
      let targetTheme = (currentTheme === "dark") ? "light" : "dark";
      setTheme(targetTheme);
    });
  });

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    let windowHeight = window.innerHeight;
    let revealPoint = 150;

    revealElements.forEach((el) => {
      let revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // Navbar blur effect on scroll
  const navbar = document.querySelector('.navbar-glass');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
      navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(15, 23, 42, 0.9)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Counter Animations
  const counters = document.querySelectorAll('.counter');
  let hasCounted = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / 200;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(countUp, 10);
      } else {
        counter.innerText = target;
      }
    });
  };

  // Run counter when scrolled into view
  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    window.addEventListener('scroll', () => {
      let top = statsSection.getBoundingClientRect().top;
      if (top < window.innerHeight && !hasCounted) {
        hasCounted = true;
        countUp();
      }
    });
  }

  // Form Validation (Bootstrap native)
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // File upload preview logic (if on upload page)
  const fileInput = document.getElementById('audio-upload');
  const fileList = document.getElementById('file-list');
  if (fileInput && fileList) {
    fileInput.addEventListener('change', function () {
      fileList.innerHTML = '';
      Array.from(this.files).forEach(file => {
        const li = document.createElement('div');
        li.className = 'glass-card text-start p-3 mb-2 d-flex justify-content-between align-items-center';
        li.innerHTML = `<span><i class="bi bi-file-earmark-music text-secondary me-2"></i> ${file.name}</span> <span class="badge bg-secondary">${(file.size / 1024 / 1024).toFixed(2)} MB</span>`;
        fileList.appendChild(li);
      });
    });
  }

  // RTL Toggle Logic
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  rtlToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      document.documentElement.setAttribute('dir', isRtl ? 'ltr' : 'rtl');

      // Update all toggle icons rotation
      rtlToggles.forEach(t => t.style.transform = isRtl ? 'rotate(0deg)' : 'rotate(180deg)');
    });
  });

    // Password Visibility Toggle
    document.addEventListener('click', (e) => {
        if (e.target.closest('.password-toggle')) {
            const btn = e.target.closest('.password-toggle');
            const input = btn.parentElement.querySelector('input');
            const icon = btn.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bi-eye', 'bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('bi-eye-slash', 'bi-eye');
            }
        }
    });

    // Back to Top Logic
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});

