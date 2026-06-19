// gallery.js - Lightbox and album management for gallery.html



let activeYear = 'All';
let activeCategory = 'All';

let activeImages = [];
let currentImageIndex = 0;

let currentZoom = 1;
let startDistance = 0;

let translateX = 0;
let translateY = 0;

let isDragging = false;

let dragStartX = 0;
let dragStartY = 0;

let isClosingGesture = false;


document.addEventListener("DOMContentLoaded", () => {
  renderCategoryFilters();
  renderAlbums();
  setupYearFilterListeners();
  setupLightboxListeners();
  handleAlbumHash();
});

function handleAlbumHash() {
  const albumId = window.location.hash.replace("#", "").trim();
  if (!albumId || typeof GALLERY_ALBUMS === "undefined") return;
  if (!GALLERY_ALBUMS.some((album) => album.id === albumId)) return;
  window.setTimeout(() => openLightbox(albumId), 350);
}

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
  }).sort((a, b) => new Date(b.date || b.year) - new Date(a.date || a.year));

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
  modal.style.transform = "";
modal.style.opacity = "";

dragCloseStartY = 0;
modal.classList.remove("lightbox-exit");
modal.classList.add("lightbox-enter");
  document.body.style.overflow = "hidden";

  renderThumbnails();
  showActiveImage();
}

function showActiveImage() {
  const imgFrame = document.getElementById("lightbox-img");
  const counter = document.getElementById("lightbox-counter");
  const previews = document.getElementById("lightbox-previews");

  imgFrame.style.opacity = "0";

setTimeout(() => {

  currentZoom = 1;

  translateX = 0;
  translateY = 0;

  updateZoom();

  imgFrame.onload = () => {

    imgFrame.classList.remove(
      "portrait",
      "landscape"
    );

    if (
      imgFrame.naturalHeight >
      imgFrame.naturalWidth
    ) {
      imgFrame.classList.add("portrait");
    } else {
      imgFrame.classList.add("landscape");
    }

  };

  imgFrame.src =
    activeImages[currentImageIndex];

  imgFrame.style.opacity = "1";

}, 120);
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

function updateZoom() {

  const img = document.getElementById("lightbox-img");
  if (!img) return;

  if (currentZoom <= 1) {
    translateX = 0;
    translateY = 0;
  }

  const maxX =
    ((img.clientWidth * currentZoom) - img.clientWidth) / 2;

  const maxY =
    ((img.clientHeight * currentZoom) - img.clientHeight) / 2;

  translateX = Math.max(
    -maxX,
    Math.min(translateX, maxX)
  );

  translateY = Math.max(
    -maxY,
    Math.min(translateY, maxY)
  );

  img.style.transform =
    `translate3d(${translateX}px, ${translateY}px, 0) scale(${currentZoom})`;
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
  const img = document.getElementById("lightbox-img");

  img.addEventListener("mousedown", (e) => {

  if (currentZoom <= 1) return;

  isDragging = true;

  dragStartX = e.clientX - translateX;
  dragStartY = e.clientY - translateY;

  img.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {

  if (!isDragging) return;

  translateX = e.clientX - dragStartX;
  translateY = e.clientY - dragStartY;

  updateZoom();
});

document.addEventListener("mouseup", () => {

  isDragging = false;

  img.style.cursor = "grab";
});

  if (!modal) return;

  const close = () => {

  modal.style.transform = "";
  modal.style.opacity = "";

  dragCloseStartY = 0;

  modal.classList.remove("lightbox-enter");
  modal.classList.add("lightbox-exit");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("lightbox-exit");
    document.body.style.overflow = "";
  }, 280);

};

  const prev = () => {
    currentImageIndex = (currentImageIndex - 1 + activeImages.length) % activeImages.length;
    showActiveImage();
  };

  const next = () => {
    currentImageIndex = (currentImageIndex + 1) % activeImages.length;
    showActiveImage();
  };

  //////////////////////////////////////
 // Swipe Support!@#$%^&*(*&^%$#!@#) //
//////////////////////////////////////
let touchStartX = 0;
let touchEndX = 0;

let touchStartY = 0;
let touchEndY = 0;

let dragCloseStartY = 0;

modal.addEventListener("touchstart", (e) => {

  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;

  if (currentZoom !== 1) return;

  dragCloseStartY =
    e.touches[0].clientY;

});

modal.addEventListener("touchend", (e) => {

  if (currentZoom !== 1) return;

  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;

  const swipeX =
    touchStartX - touchEndX;

  const swipeY =
    touchStartY - touchEndY;

    
  // Swipe Down = Close
  

  const moved =
  parseFloat(
    modal.style.transform.match(/-?\d+/)?.[0]
  ) || 0;

  if (moved > 180){

    close();

  } else {

    modal.style.transform = "";
    modal.style.opacity = "";

  }

  // Left / Right Navigation
  if (Math.abs(swipeX) > 50) {

    if (swipeX > 0) {
      next();
    } else {
      prev();
    }

  }

});

modal.addEventListener("touchmove", (e) => {

  if (currentZoom !== 1) return;

  const dragY =
    e.touches[0].clientY - dragCloseStartY;

  // Ignore tiny accidental movements
  if (dragY < 20) return;

  modal.style.transform =
    `translateY(${dragY}px)`;

  modal.style.opacity =
    Math.max(0.3, 1 - dragY / 500);

});

// Desktop Double Click Zoom
img.addEventListener("dblclick", () => {

  if (currentZoom === 1) {
    currentZoom = 2.5;
  } else {
    currentZoom = 1;

    translateX = 0;
    translateY = 0;
  }

  updateZoom();
});

// Mobile Double Tap Zoom
let lastTap = 0;

// Pinch Zoom
img.addEventListener("touchstart", (e) => {
  if (e.touches.length === 2) {

    const dx =
      e.touches[0].clientX -
      e.touches[1].clientX;

    const dy =
      e.touches[0].clientY -
      e.touches[1].clientY;

    startDistance = Math.sqrt(
      dx * dx + dy * dy
    );
  }
});

let touchDragX = 0;
let touchDragY = 0;

img.addEventListener("touchstart", (e) => {

  if (currentZoom <= 1) return;

  if (e.touches.length !== 1) return;

  touchDragX =
    e.touches[0].clientX - translateX;

  touchDragY =
    e.touches[0].clientY - translateY;
});

img.addEventListener("touchmove", (e) => {

  if (currentZoom <= 1) return;

  if (e.touches.length !== 1) return;

  e.preventDefault();

  translateX =
    e.touches[0].clientX - touchDragX;

  translateY =
    e.touches[0].clientY - touchDragY;

  updateZoom();

}, { passive: false });

img.addEventListener("touchmove", (e) => {

  if (e.touches.length !== 2) return;

  e.preventDefault();

  const dx =
    e.touches[0].clientX -
    e.touches[1].clientX;

  const dy =
    e.touches[0].clientY -
    e.touches[1].clientY;

  const currentDistance = Math.sqrt(
    dx * dx + dy * dy
  );

  const scaleFactor =
    currentDistance / startDistance;

  const newZoom = currentZoom * scaleFactor;

currentZoom = Math.max(
  1,
  Math.min(newZoom, 5)
);

  currentZoom = Math.max(
    1,
    Math.min(currentZoom, 5)
  );

  if (currentZoom <= 1.05) {
  currentZoom = 1;

  translateX = 0;
  translateY = 0;
}

  startDistance = currentDistance;

  updateZoom();

}, { passive: false });

// Ctrl + Mouse Wheel Zoom
img.addEventListener("wheel", (e) => {

  if (!e.ctrlKey) return;

  e.preventDefault();

  if (e.deltaY < 0) {
    currentZoom += 0.2;
  } else {
    currentZoom -= 0.2;
  }

  currentZoom = Math.max(
    1,
    Math.min(currentZoom, 5)
  );

  updateZoom();

}, { passive: false });

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