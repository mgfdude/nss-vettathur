// theme.js - Accessibility controller for NSS Vettathur
// Handles WCAG text scaling and mobile menu drawer navigation

(function() {
  // Apply text size immediately
  const savedSize = localStorage.getItem("nss-text-size") || "text-md";
  document.documentElement.classList.add(savedSize);
})();

// Attach event listeners once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setupTextResizer();
  setupMobileMenu();
});

function setupTextResizer() {
  const root = document.documentElement;
  const sizeDec = document.getElementById("btn-text-dec");
  const sizeRst = document.getElementById("btn-text-rst");
  const sizeInc = document.getElementById("btn-text-inc");

  if (!sizeDec || !sizeRst || !sizeInc) return;

  const changeSize = (newSize) => {
    root.classList.remove("text-sm", "text-md", "text-lg");
    root.classList.add(newSize);
    localStorage.setItem("nss-text-size", newSize);
  };

  sizeDec.addEventListener("click", () => changeSize("text-sm"));
  sizeRst.addEventListener("click", () => changeSize("text-md"));
  sizeInc.addEventListener("click", () => changeSize("text-lg"));
}

function setupMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-menu-close");
  const overlay = document.getElementById("mobile-menu-overlay");
  const drawer = document.getElementById("mobile-menu-drawer");

  if (!btn || !drawer || !overlay) return;

  const openDrawer = () => {
    overlay.classList.remove("hidden");
    setTimeout(() => overlay.classList.add("opacity-100"), 10);
    drawer.classList.remove("translate-x-full");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    overlay.classList.remove("opacity-100");
    setTimeout(() => overlay.classList.add("hidden"), 300);
    drawer.classList.add("translate-x-full");
    document.body.style.overflow = "";
  };

  btn.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);
}
