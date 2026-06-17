(function () {
  const ICONS = {
      volunteer: "👤",
      gallery: "📸",
      activity: "🏕️",
      team: "👥",
      page: "📄",
      role: "👑",
      achievement: "🏆",
      news: "📰",
      blog: "📝",
      partner: "💻",
      instagram: "📸",
      youtube: "📺",
      facebook: "📘"
  };

  const TYPE_LABELS = {
  volunteer: "Volunteer",
  gallery: "Gallery",
  activity: "Activity",
  team: "Team",
  page: "Page",
  role: "Role",
  achievement: "Achievement",
  news: "News",
  blog: "Blog",
  partner: "Partner",
  instagram: "Instagram",
  youtube: "YouTube",
  facebook: "Facebook"
};

  const MAX_RESULTS = 8;
  const DEBOUNCE_MS = 120;

  let searchIndex = [];
  let activeIndex = -1;
  let debounceTimer = null;

  const root = document.getElementById("nss-search");
  if (!root) return;

  const input = document.getElementById("nss-search-input");
  const dropdown = document.getElementById("nss-search-dropdown");

  function normalizeQuery(value) {
    return (value || "").toLowerCase().trim().replace(/\s+/g, " ");
  }

  function buildVolunteerEntry(volunteer) {
    const keywords = [
      volunteer.name,
      volunteer.id,
      volunteer.pos,
      volunteer.bloodGroup,
      volunteer.district,
      volunteer.gender,
      volunteer.doy,
      volunteer.batch,
    ]
      .filter(Boolean)
      .join(" ");

    const descriptionParts = [
      volunteer.id,
      volunteer.bloodGroup,
      volunteer.gender,
      volunteer.district,
      volunteer.pos !== "Volunteer" ? volunteer.pos : null,
    ].filter(Boolean);

    return {
      title: volunteer.name,
      description: descriptionParts.join(" · "),
      type: "volunteer",
      keywords,
      url: `volanteer/volunteer.html?id=${encodeURIComponent(volunteer.id)}`,
      meta: volunteer.pos !== "Volunteer" ? volunteer.pos : volunteer.district,
    };
  }

  function normalizeSearchItem(item) {
    return {
      title: item.title || "",
      description: item.description || item.meta || "",
      type: item.type || "page",
      keywords: item.keywords || "",
      url: item.url || "#",
      thumbnail: item.thumbnail || null,
      meta: item.meta || null,
      external: Boolean(item.external),
    };
  }

  async function loadSearchIndex() {
    try {
      const [dataResponse, volunteerResponse] = await Promise.all([
        fetch("search-data.json"),
        fetch("volanteer/volunteer.json"),
      ]);

      const staticItems = (await dataResponse.json()).map(normalizeSearchItem);
      const volunteers = await volunteerResponse.json();

      searchIndex = [
        ...staticItems,
        ...volunteers.map(buildVolunteerEntry),
      ];
    } catch (error) {
      console.error("Failed to load search index:", error);
      searchIndex = [];
    }
  }

  function textMatchesQuery(text, query) {
    const normalizedText = normalizeQuery(text);
    if (!normalizedText) return false;
    if (normalizedText.includes(query)) return true;

    const words = query.split(" ").filter(Boolean);
    return words.length > 0 && words.every((word) => normalizedText.includes(word));
  }

  function scoreItem(item, query) {
    const title = normalizeQuery(item.title);
    const keywords = normalizeQuery(item.keywords || "");
    const description = normalizeQuery(item.description || "");
    const meta = normalizeQuery(item.meta || "");

    const searchable = `${title} ${keywords} ${description} ${meta}`;
    if (!textMatchesQuery(searchable, query)) {
      return 0;
    }

    let score = 10;
    const words = query.split(" ").filter(Boolean);

    if (title === query) score += 200;
    else if (title.startsWith(query)) score += 130;
    else if (title.includes(query)) score += 90;
    else if (words.every((word) => title.includes(word))) score += 70;

    if (keywords === query) score += 110;
    else if (keywords.includes(query)) score += 55;
    else if (words.every((word) => keywords.includes(word))) score += 40;

    if (description.includes(query)) score += 30;
    else if (words.every((word) => description.includes(word))) score += 18;

    if (meta.includes(query)) score += 22;

    if (item.type === "partner" && query.includes("techora")) score += 80;
    if (item.type === "role" && query.includes("leader")) score += 25;
    if (item.type === "role" && query.includes("media")) score += 25;

    return score;
  }

  function search(query) {
    const normalized = normalizeQuery(query);
    if (!normalized) return [];

    return searchIndex
      .map((item) => ({ item, score: scoreItem(item, normalized) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map((entry) => entry.item);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderResultThumb(item) {
    if (item.thumbnail) {
      return `<img src="${escapeHtml(item.thumbnail)}" alt="" class="nss-search-thumb${item.type === "partner" ? " nss-search-thumb--logo" : ""}" loading="lazy">`;
    }

    const TYPE_IMAGES = {
  instagram: "assets/images/web/logos/ig.jpg",
  youtube: "assets/images/web/logos/yt.jpg",
  facebook: "assets/images/web/logos/fb.jpg",
  partner: "assets/images/partners/techora.png"
};

    if (TYPE_IMAGES[item.type]) {
  return `
    <img
      src="${TYPE_IMAGES[item.type]}"
      alt="${item.type}"
      class="nss-search-thumb nss-search-thumb--logo"
      loading="lazy"
    >
  `;
}

const icon = ICONS[item.type] || "📄";

return `
  <span
    class="nss-search-thumb nss-search-thumb--icon"
    aria-hidden="true"
  >
    ${icon}
  </span>
`;
  }

  function renderResults(results) {
    if (!results.length) {
      dropdown.innerHTML = `<div class="nss-search-empty">No results found</div>`;
      activeIndex = -1;
      openDropdown();
      return;
    }

    dropdown.innerHTML = results
      .map((item, index) => {
        const typeLabel = TYPE_LABELS[item.type] || "Result";
        const externalAttrs = item.external
          ? ' target="_blank" rel="noopener noreferrer"'
          : "";
        const description = item.description
          ? `<span class="nss-search-description">${escapeHtml(item.description)}</span>`
          : "";

        return `
          <a
            href="${escapeHtml(item.url)}"
            class="nss-search-result${index === activeIndex ? " is-active" : ""}"
            role="option"
            data-index="${index}"
            aria-selected="${index === activeIndex}"
            ${externalAttrs}
          >
            ${renderResultThumb(item)}
            <span class="nss-search-result-text">
              <span class="nss-search-result-top">
                <span class="nss-search-result-title">${escapeHtml(item.title)}</span>
                <span class="nss-search-type-badge nss-search-type-badge--${escapeHtml(item.type)}">${escapeHtml(typeLabel)}</span>
              </span>
              ${description}
            </span>
          </a>
        `;
      })
      .join("");

    openDropdown();
  }

  function openDropdown() {
    dropdown.classList.remove("hidden");
    input.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => dropdown.classList.add("is-open"));
  }

  function closeDropdown() {
    dropdown.classList.remove("is-open");
    input.setAttribute("aria-expanded", "false");
    window.setTimeout(() => {
      if (!dropdown.classList.contains("is-open")) {
        dropdown.classList.add("hidden");
      }
    }, 220);
    activeIndex = -1;
  }

  function navigateToActive() {
    const links = dropdown.querySelectorAll(".nss-search-result");
    if (activeIndex < 0 || !links[activeIndex]) return;
    links[activeIndex].click();
  }

  function updateActiveHighlight() {
    dropdown.querySelectorAll(".nss-search-result").forEach((link, index) => {
      link.classList.toggle("is-active", index === activeIndex);
      link.setAttribute("aria-selected", index === activeIndex ? "true" : "false");
    });
  }

  function handleInput() {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      const results = search(input.value);
      if (!normalizeQuery(input.value)) {
        closeDropdown();
        dropdown.innerHTML = "";
        return;
      }
      activeIndex = -1;
      renderResults(results);
    }, DEBOUNCE_MS);
  }

  input.addEventListener("input", handleInput);

  input.addEventListener("focus", () => {
    if (normalizeQuery(input.value)) {
      handleInput();
    }
  });

  input.addEventListener("keydown", (event) => {
    const links = dropdown.querySelectorAll(".nss-search-result");
    if (!links.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = (activeIndex + 1) % links.length;
      updateActiveHighlight();
      links[activeIndex].scrollIntoView({ block: "nearest" });
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = activeIndex <= 0 ? links.length - 1 : activeIndex - 1;
      updateActiveHighlight();
      links[activeIndex].scrollIntoView({ block: "nearest" });
    } else if (event.key === "Enter") {
      if (activeIndex >= 0) {
        event.preventDefault();
        navigateToActive();
      }
    } else if (event.key === "Escape") {
      closeDropdown();
      input.blur();
    }
  });

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      closeDropdown();
    }
  });

  loadSearchIndex();
})();
