
function updateClock() {
  const now = new Date();

  // Format time as HH:MM:SS
  let hours = String(now.getHours()).padStart(2, '0');
  let minutes = String(now.getMinutes()).padStart(2, '0');
  let seconds = String(now.getSeconds()).padStart(2, '0');

  const timeString = `${hours}:${minutes}:${seconds}`;

  // Update the clock element
  document.getElementById("clock").textContent = timeString;
}

// Run once immediately
updateClock();

// Then run every 1000ms (1 second)
setInterval(updateClock, 1000);

function toggle(id){

  const el = document.getElementById(id);
  if (el.style.display === "none" || el.style.display === "") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}
window.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 150); // stagger animation by 150ms per card
  });
});

