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
  const overlay = document.getElementById("mobile-menu-overlay");
  const drawer = document.getElementById("mobile-menu-drawer");
  const desktopNav = document.querySelector('header nav[class*="lg:flex"]');

  if (!btn || !drawer || !overlay) return;

  let overlayTimer;
  let lastFocusedElement = null;
  const navIcons = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.75 10.9 12 4.25l8.25 6.65v8.35a1.5 1.5 0 0 1-1.5 1.5h-4.2v-5.6h-5.1v5.6h-4.2a1.5 1.5 0 0 1-1.5-1.5V10.9Z"/></svg>',
    about: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Zm.1 12.65a.9.9 0 0 1-.9-.9v-4.15a.9.9 0 1 1 1.8 0v4.15a.9.9 0 0 1-.9.9Zm0-6.8a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Z"/></svg>',
    activities: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.4 4.5h13.2A1.9 1.9 0 0 1 20.5 6.4v2.1h-17V6.4A1.9 1.9 0 0 1 5.4 4.5Zm-1.9 5.7h17v7.4a1.9 1.9 0 0 1-1.9 1.9H5.4a1.9 1.9 0 0 1-1.9-1.9v-7.4Zm4 2.4a.85.85 0 0 0 0 1.7h3.2a.85.85 0 0 0 0-1.7H7.5Zm0 3.1a.85.85 0 0 0 0 1.7h6.7a.85.85 0 0 0 0-1.7H7.5Z"/></svg>',
    gallery: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.6 5h12.8A2.6 2.6 0 0 1 21 7.6v8.8a2.6 2.6 0 0 1-2.6 2.6H5.6A2.6 2.6 0 0 1 3 16.4V7.6A2.6 2.6 0 0 1 5.6 5Zm1.2 10.9h10.4l-3.35-4.1-2.55 3.05-1.65-1.95-2.85 3Zm9.3-5.65a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9Z"/></svg>',
    achievements: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5h10v2.8h2.2a.9.9 0 0 1 .9.9v1.45a4.45 4.45 0 0 1-4.1 4.43 4.7 4.7 0 0 1-3.1 2.07v2.15h2.5a.9.9 0 1 1 0 1.8H8.6a.9.9 0 1 1 0-1.8h2.5v-2.15A4.7 4.7 0 0 1 8 14.08a4.45 4.45 0 0 1-4.1-4.43V8.2a.9.9 0 0 1 .9-.9H7V4.5Zm10 4.6v2.88a2.65 2.65 0 0 0 1.3-2.33V9.1H17Zm-11.3 0v.55A2.65 2.65 0 0 0 7 11.98V9.1H5.7Z"/></svg>',
    news: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.4 4.5h11.2A2.4 2.4 0 0 1 19 6.9v11.2a1.4 1.4 0 0 0 1.4-1.4V8.4a.9.9 0 1 1 1.8 0v8.3a3.2 3.2 0 0 1-3.2 3.2H5.4A2.4 2.4 0 0 1 3 17.5V6.9a2.4 2.4 0 0 1 2.4-2.4Zm2.1 4.1a.85.85 0 0 0 0 1.7h6.8a.85.85 0 0 0 0-1.7H7.5Zm0 3.6a.85.85 0 0 0 0 1.7h7.9a.85.85 0 0 0 0-1.7H7.5Zm0 3.6a.85.85 0 0 0 0 1.7h4.9a.85.85 0 0 0 0-1.7H7.5Z"/></svg>',
    blogs: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.2 4.25h11.6a2.45 2.45 0 0 1 2.45 2.45v8.2a2.45 2.45 0 0 1-2.45 2.45H9.25l-3.1 2.2a.9.9 0 0 1-1.42-.73V6.7A2.45 2.45 0 0 1 6.2 4.25Zm2.1 4.15a.85.85 0 0 0 0 1.7h7.4a.85.85 0 0 0 0-1.7H8.3Zm0 3.5a.85.85 0 0 0 0 1.7h5.3a.85.85 0 1 0 0-1.7H8.3Z"/></svg>',
    team: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.9 11.6a3.7 3.7 0 1 1 0-7.4 3.7 3.7 0 0 1 0 7.4Zm6.85.2a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM3.6 18.35c0-3 2.45-5.45 5.3-5.45s5.3 2.45 5.3 5.45a1.4 1.4 0 0 1-1.4 1.4H5a1.4 1.4 0 0 1-1.4-1.4Zm11.7 1.4c.25-.42.4-.9.4-1.4a6.88 6.88 0 0 0-1.2-3.9 4.4 4.4 0 0 1 1.25-.18c2.55 0 4.65 2.06 4.65 4.6a.88.88 0 0 1-.88.88H15.3Z"/></svg>',
    contact: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.8 5.1h12.4a2.5 2.5 0 0 1 2.5 2.5v8.8a2.5 2.5 0 0 1-2.5 2.5H5.8a2.5 2.5 0 0 1-2.5-2.5V7.6a2.5 2.5 0 0 1 2.5-2.5Zm.15 3.05 5.2 4.05a1.38 1.38 0 0 0 1.7 0l5.2-4.05a.85.85 0 1 0-1.05-1.34L12 10.7 7 6.81a.85.85 0 1 0-1.05 1.34Z"/></svg>'
  };

  document.body.append(overlay, drawer);
  drawer.innerHTML = `
    <div class="mobile-menu-surface">
      <div class="mobile-menu-header">
        <div class="mobile-menu-brand">
          <img src="${window.location.pathname.includes('/activities/') ? '../' : ''}assets/images/web/logo.png" alt="NSS Vettathur logo">
          <div>
            <span>NSS Vettathur</span>
            <small>Not Me But You</small>
          </div>
        </div>
        <button id="mobile-menu-close" class="mobile-menu-close" aria-label="Close mobile navigation menu" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.05 7.05a1 1 0 0 1 1.4 0L12 10.6l3.55-3.55a1 1 0 1 1 1.4 1.4L13.4 12l3.55 3.55a1 1 0 1 1-1.4 1.4L12 13.4l-3.55 3.55a1 1 0 0 1-1.4-1.4L10.6 12 7.05 8.45a1 1 0 0 1 0-1.4Z"/></svg>
        </button>
      </div>
      <div class="mobile-menu-motto">Guided by service, empathy, and action.</div>
      <nav class="mobile-menu-nav" aria-label="Mobile navigation"></nav>
      <div class="mobile-menu-footer">
        <div class="mobile-menu-socials" aria-label="Social links">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">
            <img src="${window.location.pathname.includes('/activities/') ? '../' : ''}assets/images/web/logos/fb.jpg" alt="">
          </a>
          <a href="https://www.instagram.com/nss_ghss_vettathur/" target="_blank" rel="noopener" aria-label="Instagram">
            <img src="${window.location.pathname.includes('/activities/') ? '../' : ''}assets/images/web/logos/ig.jpg" alt="">
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="YouTube">
            <img src="${window.location.pathname.includes('/activities/') ? '../' : ''}assets/images/web/logos/yt.jpg" alt="">
          </a>
        </div>
        <p>National Service Scheme Unit<br>Vettathur, Kerala</p>
      </div>
    </div>
  `;
  const closeBtn = drawer.querySelector("#mobile-menu-close");
  const mobileNav = drawer.querySelector("nav");
  btn.type = "button";
  btn.setAttribute("aria-label", "Open mobile navigation menu");
  btn.setAttribute("aria-controls", "mobile-menu-drawer");

  if (desktopNav && mobileNav) {
    mobileNav.innerHTML = "";
    desktopNav.querySelectorAll("a").forEach((link, index) => {
      const clone = link.cloneNode(true);
      const label = link.textContent.trim();
      const key = label.toLowerCase();
      const isActive = link.classList.contains("text-primary") || link.getAttribute("aria-current") === "page";

      clone.className = "mobile-menu-link";
      clone.style.setProperty("--item-index", index);
      clone.innerHTML = `
        <span class="mobile-menu-link-icon">${navIcons[key] || navIcons.home}</span>
        <span class="mobile-menu-link-label">${label}</span>
        <span class="mobile-menu-link-arrow" aria-hidden="true">&rsaquo;</span>
      `;
      if (isActive) {
        clone.classList.add("is-active");
        clone.setAttribute("aria-current", "page");
      }
      mobileNav.appendChild(clone);
    });
  }

  const openDrawer = () => {
    clearTimeout(overlayTimer);
    lastFocusedElement = document.activeElement;
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("opacity-100"));
    drawer.classList.add("is-open");
    drawer.classList.remove("translate-x-full");
    drawer.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close mobile navigation menu");
    document.body.classList.add("mobile-menu-open");
    document.body.style.overflow = "hidden";
    drawer.querySelector("a, button")?.focus();
  };

  const closeDrawer = () => {
    if (!drawer.classList.contains("is-open")) return;

    clearTimeout(overlayTimer);
    overlay.classList.remove("opacity-100");
    drawer.classList.remove("is-open");
    drawer.classList.add("translate-x-full");
    drawer.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open mobile navigation menu");
    document.body.classList.remove("mobile-menu-open");
    document.body.style.overflow = "";
    overlayTimer = setTimeout(() => overlay.classList.add("hidden"), 300);
    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  btn.setAttribute("aria-expanded", "false");
  drawer.setAttribute("aria-hidden", "true");
  drawer.setAttribute("role", "dialog");
  drawer.setAttribute("aria-modal", "true");
  drawer.setAttribute("aria-label", "Mobile navigation menu");

  btn.addEventListener("click", () => {
    if (!drawer.classList.contains("is-open")) {
      openDrawer();
    } else {
      closeDrawer();
    }
  });
  closeBtn?.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);
  drawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (event) => {
    if (!drawer.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeDrawer();
      return;
    }

    if (event.key === "Tab") {
      const focusable = drawer.querySelectorAll('a[href], button:not([disabled])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });
}



