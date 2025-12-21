// MOBILE NAV TOGGLE
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  // Close on link click (mobile)
  mainNav.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

// YEAR IN FOOTER
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// SIMPLE FORM HANDLERS (offline demo: store in localStorage)
function handleFormSubmit(formId, statusId, storageKey) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);

  if (!form || !status) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((v, k) => (data[k] = v));

    // Save to localStorage as offline demo
    const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
    existing.push({ ...data, createdAt: new Date().toISOString() });
    localStorage.setItem(storageKey, JSON.stringify(existing));

    status.textContent = "Thank you! Your submission has been received.";
    status.style.color = "green";

    form.reset();

    setTimeout(() => {
      status.textContent = "";
    }, 4000);
  });
}

handleFormSubmit("contactForm", "contactStatus", "contactSubmissions");
handleFormSubmit("quoteForm", "quoteStatus", "quoteSubmissions");

// LANGUAGE SWITCH (hook – you can extend with real translations)
const langButtons = document.querySelectorAll(".lang-btn");
let currentLang = "en";

langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    if (lang === currentLang) return;

    currentLang = lang;

    langButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // TODO: Implement real translation by mapping data-i18n keys
    // For now, just log selected language
    console.log("Language switched to:", currentLang);
  });
});
