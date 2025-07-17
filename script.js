document.addEventListener('DOMContentLoaded', function () {
  console.log('Portfolio loaded!');

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Fade-in animation on scroll
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-fade-in-up').forEach(el => {
    fadeObserver.observe(el);
  });

  // Project card animation with delay
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => card.classList.remove('visible'));

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty('--delay', index);
        entry.target.classList.add('visible');
        cardObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  projectCards.forEach(card => cardObserver.observe(card));

  // Cursor follower (optional)
  const cursor = document.querySelector('.cursor-follower');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }

  // Dynamic tech stack insertion
  const techStack = [
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }
  ];

  const container = document.querySelector('.tech-stack-container');
  if (container) {
    techStack.forEach(tech => {
      const techItem = document.createElement('div');
      techItem.className = 'tech-item';
      techItem.innerHTML = `<img src="${tech.icon}" alt="${tech.name}" class="tech-icon" title="${tech.name}">`;
      container.appendChild(techItem);
    });
  }

  // Rotating image fallback
  const rotatingImg = document.getElementById('rotatingImg');
  if (rotatingImg) {
    rotatingImg.onerror = function () {
      this.src = "https://placehold.co/300x300/EEE/31343C?text=Tech+Pattern";
      this.alt = "Fallback decorative image";
    };
    setTimeout(() => {
      rotatingImg.style.animation = 'none';
      void rotatingImg.offsetWidth;
      rotatingImg.style.animation = 'rotate 15s linear infinite';
    }, 100);
  }

  // Dark mode toggle
  const toggle = document.getElementById('dark-toggle');
  const icon = document.getElementById('dark-icon');
  const html = document.documentElement;

  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  toggle?.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });
});
