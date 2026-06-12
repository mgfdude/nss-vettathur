// theme.js - Global Theme & Accessibility controller for NSS Vettathur
// Load this in the head of each page to prevent layout/theme flashes

(function() {
  // Apply theme immediately
  const isDark = localStorage.getItem("color-theme") === "dark" || 
                 (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Apply text size immediately
  const savedSize = localStorage.getItem("nss-text-size") || "text-md";
  document.documentElement.classList.add(savedSize);
})();

// Attach event listeners once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggler();
  setupTextResizer();
  setupMobileMenu();
});

function setupThemeToggler() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const darkIcon = document.getElementById("theme-toggle-dark-icon");
  const lightIcon = document.getElementById("theme-toggle-light-icon");

  // Initial icon states
  const updateIcons = () => {
    if (document.documentElement.classList.contains("dark")) {
      lightIcon?.classList.remove("hidden");
      darkIcon?.classList.add("hidden");
    } else {
      darkIcon?.classList.remove("hidden");
      lightIcon?.classList.add("hidden");
    }
  };
  updateIcons();

  toggleBtn.addEventListener("click", () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
    updateIcons();
  });
}

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
