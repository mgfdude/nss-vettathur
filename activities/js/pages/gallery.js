// gallery.js - Lightbox and album management for gallery.html



let activeYear = 'All';
let activeCategory = 'All';

let activeImages = [];
let currentImageIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryFilters();
  renderAlbums();
  setupYearFilterListeners();
  setupLightboxListeners();
});

function renderCategoryFilters() {
  const container = document.getElementById("gallery-category-filters");
  if (!container) return;

  const categories = ['All', ...new Set(GALLERY_ALBUMS.map(al => al.category))];

  container.innerHTML = categories.map(cat => {
    const isSelected = cat === activeCategory;
    const activeClass = "bg-primary text-white shadow-md";
    const inactiveClass = "bg-slate-50 text-slate-500 hover:bg-slate-100";
    
    return `
      <button data-cat="${cat}" class="px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${isSelected ? activeClass : inactiveClass}">
        ${cat}
      </button>
    `;
  }).join('');

  container.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      activeCategory = e.currentTarget.getAttribute("data-cat");
      
      container.querySelectorAll("button").forEach(b => {
        const cat = b.getAttribute("data-cat");
        if (cat === activeCategory) {
          b.className = "px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer bg-primary text-white shadow-md";
        } else {
          b.className = "px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer bg-slate-50 text-slate-500 hover:bg-slate-100";
        }
      });
      renderAlbums();
    });
  });
}

function setupYearFilterListeners() {
  const container = document.getElementById("year-filters");
  if (!container) return;

  container.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      activeYear = e.currentTarget.getAttribute("data-year");

      container.querySelectorAll("button").forEach(b => {
        const yr = b.getAttribute("data-year");
        if (yr === activeYear) {
          b.className = "px-4 py-2 text-xs font-semibold rounded-lg bg-white text-primary shadow-sm border border-slate-100 cursor-pointer";
        } else {
          b.className = "px-4 py-2 text-xs font-semibold rounded-lg text-slate-500 hover:text-slate-700 cursor-pointer";
        }
      });
      renderAlbums();
    });
  });
}

function renderAlbums() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  const filtered = GALLERY_ALBUMS.filter(al => {
    const matchesYear = activeYear === 'All' || al.year === activeYear;
    const matchesCat = activeCategory === 'All' || al.category === activeCategory;
    return matchesYear && matchesCat;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-20 text-slate-400">
        No albums found.
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(al => `
    <div data-album-id="${al.id}" class="album-card group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div class="h-56 relative overflow-hidden">
        <img src="${al.cover}" alt="${al.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60"></div>
        <span class="absolute top-4 left-4 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 text-secondary shadow-sm">${al.year}</span>
        <span class="absolute bottom-4 right-4 text-xs font-semibold text-white bg-slate-900/80 px-2 py-1 rounded backdrop-blur">
          ${al.images.length} Photos
        </span>
      </div>
      <div class="p-5">
        <span class="text-[10px] text-accent font-bold uppercase tracking-widest block mb-1.5">${al.category}</span>
        <h3 class="font-bold text-slate-900 group-hover:text-secondary transition-colors leading-tight">${al.title}</h3>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll(".album-card").forEach(card => {
    card.addEventListener("click", () => {
      const albumId = card.getAttribute("data-album-id");
      openLightbox(albumId);
    });
  });
}

function openLightbox(albumId) {
  const album = GALLERY_ALBUMS.find(al => al.id === albumId);
  if (!album) return;

  activeImages = album.images;
  currentImageIndex = 0;

  const modal = document.getElementById("lightbox-modal");
  const albumTitle = document.getElementById("lightbox-album-title");
  
  albumTitle.textContent = album.title;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  renderThumbnails();
  showActiveImage();
}

function showActiveImage() {
  const imgFrame = document.getElementById("lightbox-img");
  const counter = document.getElementById("lightbox-counter");
  const previews = document.getElementById("lightbox-previews");

  imgFrame.src = activeImages[currentImageIndex];
  counter.textContent = `${currentImageIndex + 1} of ${activeImages.length}`;

  if (previews) {
    previews.querySelectorAll("button").forEach((btn, idx) => {
      if (idx === currentImageIndex) {
        btn.classList.add("border-orange-500", "scale-105");
        btn.classList.remove("border-transparent", "opacity-50");
      } else {
        btn.classList.remove("border-orange-500", "scale-105");
        btn.classList.add("border-transparent", "opacity-50");
      }
    });
  }
}

function renderThumbnails() {
  const previews = document.getElementById("lightbox-previews");
  if (!previews) return;

  previews.innerHTML = activeImages.map((img, idx) => `
    <button data-idx="${idx}" class="w-14 h-14 rounded overflow-hidden border-2 border-transparent transition-all opacity-50 hover:opacity-100 flex-shrink-0 cursor-pointer">
      <img src="${img}" class="w-full h-full object-cover">
    </button>
  `).join('');

  previews.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      currentImageIndex = parseInt(btn.getAttribute("data-idx"));
      showActiveImage();
    });
  });
}

function setupLightboxListeners() {
  const modal = document.getElementById("lightbox-modal");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!modal) return;

  const close = () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  const prev = () => {
    currentImageIndex = (currentImageIndex - 1 + activeImages.length) % activeImages.length;
    showActiveImage();
  };

  const next = () => {
    currentImageIndex = (currentImageIndex + 1) % activeImages.length;
    showActiveImage();
  };

    // Mobile Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;

    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        next(); // Swipe Left → Next Image
      } else {
        prev(); // Swipe Right → Previous Image
      }
    }
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("hidden")) return;
    
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
}

