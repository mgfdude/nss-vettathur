// activities.js - Page features for activities.html

import { ACTIVITIES } from '../data.js';

let activeCategory = 'All';
let searchQuery = '';

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryTabs();
  renderActivities();
  setupSearchListener();
});

function renderCategoryTabs() {
  const container = document.getElementById("filter-tabs-container");
  if (!container) return;

  const categories = ['All', ...new Set(ACTIVITIES.map(act => act.category))];

  container.innerHTML = categories.map(cat => {
    const isSelected = cat === activeCategory;
    const activeClass = "bg-primary text-white shadow-md";
    const inactiveClass = "bg-slate-50 text-slate-600 hover:bg-slate-100";
    
    return `
      <button data-category="${cat}" class="px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${isSelected ? activeClass : inactiveClass}">
        ${cat}
      </button>
    `;
  }).join('');

  container.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      activeCategory = e.currentTarget.getAttribute("data-category");
      
      container.querySelectorAll("button").forEach(b => {
        const cat = b.getAttribute("data-category");
        if (cat === activeCategory) {
          b.className = "px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer bg-primary text-white shadow-md";
        } else {
          b.className = "px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer bg-slate-50 text-slate-600 hover:bg-slate-100";
        }
      });

      renderActivities();
    });
  });
}

function setupSearchListener() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderActivities();
  });
}

function renderActivities() {
  const grid = document.getElementById("activities-grid");
  const noResults = document.getElementById("no-results");
  if (!grid) return;

  const filtered = ACTIVITIES.filter(act => {
    const matchesCategory = activeCategory === 'All' || act.category === activeCategory;
    const matchesSearch = act.title.toLowerCase().includes(searchQuery) || 
                          act.description.toLowerCase().includes(searchQuery) ||
                          act.category.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");

  grid.innerHTML = filtered.map(act => `
    <div class="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-slide-up">
      <div class="h-48 overflow-hidden relative">
        <img src="${act.image}" alt="${act.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <span class="absolute top-4 left-4 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 text-secondary shadow-sm">${act.category}</span>
      </div>
      <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span class="text-xs font-semibold text-slate-400 block mb-2">${act.date}</span>
          <h3 class="font-bold text-lg text-slate-900 leading-tight group-hover:text-secondary transition-colors">${act.title}</h3>
          <p class="text-slate-500 text-sm mt-2 line-clamp-4 leading-relaxed">${act.description}</p>
        </div>
        <div class="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400 uppercase font-medium">
          <div>
            <span class="block font-extrabold text-xs text-secondary">${act.impact.volunteers}</span>
            <span>Volunteers</span>
          </div>
          <div>
            <span class="block font-extrabold text-xs text-secondary">${act.impact.hours}h</span>
            <span>Hours</span>
          </div>
          <div>
            <span class="block font-extrabold text-xs text-secondary">${act.impact.beneficiaries}+</span>
            <span>Helped</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}
