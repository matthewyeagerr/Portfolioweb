document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  const buttons = document.querySelectorAll('.tab-button');
  const tabs = document.querySelectorAll('.tab-content');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');

      // Update active button styling
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show only the selected tab
      tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.id === tabId) tab.classList.add('active');
      });

      // Reset project view when switching to projects tab
      if (tabId === 'projects') {
        const projectsTab = document.getElementById('projects');
        const projectList = projectsTab.querySelector('.project-list');
        const projectDetails = projectsTab.querySelectorAll('.project-detail');

        if (projectList) projectList.style.display = 'flex';
        projectDetails.forEach(detail => {
          detail.style.display = 'none';
        });

        // Re-observe any fade-in elements inside the projects tab
        const projectFaders = projectsTab.querySelectorAll('.fade-in:not(.visible)');
        projectFaders.forEach(el => observer.observe(el));
      }
    });
  });

  // Project detail view logic
  const projectList = document.querySelector('.project-list');
  const projectDetails = document.querySelectorAll('.project-detail');

  if (projectList) {
    projectList.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if (!card) return;

      const href = card.getAttribute('href');
      if (href && href !== '#') return; // Let real links work normally

      e.preventDefault();
      const projectId = card.dataset.project;
      if (!projectId) return;

      // Hide main list
      projectList.style.display = 'none';

      // Hide all detail sections
      projectDetails.forEach(section => section.style.display = 'none');

      // Show selected detail
      const target = document.getElementById(projectId);
      if (target) target.style.display = 'block';
    });
  }

  // Back buttons inside project details
  projectDetails.forEach(section => {
    const backBtn = section.querySelector('.back-button');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        projectDetails.forEach(s => s.style.display = 'none');
        if (projectList) projectList.style.display = 'flex';
      });
    }
  });

  // Fade-in effect using IntersectionObserver
  const faders = document.querySelectorAll('.fade-in');
  let delayCounter = 0;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Optional: stagger animation
        el.style.transitionDelay = `${delayCounter * 150}ms`;
        delayCounter++;

        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1
  });

  faders.forEach(el => observer.observe(el));
});
