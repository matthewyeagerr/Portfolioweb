


// Tab switching with project detail reset
const buttons = document.querySelectorAll('.tab-button');
const tabs = document.querySelectorAll('.tab-content');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');

    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Show active tab, hide others
    tabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.id === tabId) tab.classList.add('active');
    });

    // Reset project view when switching to projects tab
    if (tabId === 'projects') {
      const projectsTab = document.getElementById('projects');
      const projectList = projectsTab.querySelector('.project-list');
      const projectDetails = projectsTab.querySelectorAll('.project-detail');

      if (projectList) projectList.style.display = 'flex'; // or 'block' depending on CSS
      projectDetails.forEach(detail => {
        detail.style.display = 'none';
      });
    }
  });
});

// Project cards and details logic
document.addEventListener('DOMContentLoaded', () => {
  const projectList = document.querySelector('.project-list');
  const projectDetails = document.querySelectorAll('.project-detail');

  // Show project detail on card click
  projectList.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;

    const href = card.getAttribute('href');
    if (href && href !== '#') {
      // Let browser handle navigation for real links
      return;
    }

    e.preventDefault();
    const projectId = card.dataset.project;
    if (!projectId) return;

    // Hide project list
    projectList.style.display = 'none';

    // Hide all project details
    projectDetails.forEach(section => section.style.display = 'none');

    // Show selected project detail
    const target = document.getElementById(projectId);
    if (target) target.style.display = 'block';
  });

  // Back buttons in project details
  projectDetails.forEach(section => {
    const backBtn = section.querySelector('.back-button');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Hide all project details
        projectDetails.forEach(s => s.style.display = 'none');

        // Show project list again
        projectList.style.display = 'flex'; // or 'block'
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');
  let delayCounter = 0;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Use and increment the counter for staggered delay
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

