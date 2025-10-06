const toggle = document.querySelector('.pc-nav-toggle');
const menu = document.getElementById('pc-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? "✕" : "☰";
    document.body.classList.toggle("menu-open", isOpen);
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', "false");
        toggle.textContent = "☰";
        document.body.classList.remove("menu-open");
      }
    });
  });

  let startX = 0;
  menu.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
  menu.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', "false");
      toggle.textContent = "☰";
      document.body.classList.remove("menu-open");
    }
  });
}

// Footer year
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

// Highlight active nav link
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll("#pc-menu a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// ---------------- CONTACT FORM ----------------
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = submitBtn.querySelector(".btn-text");
const spinner = submitBtn.querySelector(".spinner");
const status = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Show spinner
    btnText.style.display = "none";
    spinner.style.display = "inline-block";
    spinner.innerHTML = "⏳";

    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      type: form.type.value,
      message: form.message.value
    };

    emailjs.send("service_jdflebl", "template_ifnarts", formData)
      .then(() => {
        status.textContent = "✅ Message sent! We'll respond within 24hrs.";
        status.style.color = "limegreen";
        form.reset();
      })
      .catch(() => {
        status.textContent = "❌ Failed to send message. Please try again.";
        status.style.color = "red";
      })
      .finally(() => {
        // Hide spinner and restore button text
        spinner.style.display = "none";
        btnText.style.display = "inline-block";
      });
  });
}
