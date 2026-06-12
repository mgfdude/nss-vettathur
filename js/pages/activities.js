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
    const activeClass = "bg-blue-800 text-white dark:bg-orange-600 shadow-md";
    const inactiveClass = "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-800";
    
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
        b.className = b.className.replace(/bg-blue-800|text-white|dark:bg-orange-600|shadow-md/g, "").trim();
        b.classList.add("bg-slate-50", "text-slate-600", "dark:bg-slate-950", "dark:text-slate-400");
        if (b.getAttribute("data-category") === activeCategory) {
          b.classList.remove("bg-slate-50", "text-slate-600", "dark:bg-slate-950", "dark:text-slate-400");
          b.classList.add("bg-blue-800", "text-white", "dark:bg-orange-600", "shadow-md");
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
    <div class="flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-slide-up">
      <div class="h-48 overflow-hidden relative">
        <img src="${act.image}" alt="${act.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <span class="absolute top-4 left-4 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 dark:bg-slate-950/95 text-blue-800 dark:text-orange-400 shadow-sm">${act.category}</span>
      </div>
      <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span class="text-xs font-semibold text-slate-400 block mb-2">${act.date}</span>
          <h3 class="font-bold text-lg text-slate-900 dark:text-white leading-tight group-hover:text-blue-800 dark:group-hover:text-orange-500 transition-colors">${act.title}</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-4 leading-relaxed">${act.description}</p>
        </div>
        <div class="pt-4 border-t border-slate-50 dark:border-slate-800/60 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400 uppercase font-medium">
          <div>
            <span class="block font-extrabold text-xs text-blue-800 dark:text-orange-400">${act.impact.volunteers}</span>
            <span>Volunteers</span>
          </div>
          <div>
            <span class="block font-extrabold text-xs text-blue-800 dark:text-orange-400">${act.impact.hours}h</span>
            <span>Hours</span>
          </div>
          <div>
            <span class="block font-extrabold text-xs text-blue-800 dark:text-orange-400">${act.impact.beneficiaries}+</span>
            <span>Helped</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}
