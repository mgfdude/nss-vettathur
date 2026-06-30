let volunteers = [];
let selectedBatch = "All";


fetch("volunteer.json")
  .then(response => response.json())
  .then(async data => {

    volunteers = data;

    await loadAttendanceData();

    init();

})
  .catch(error => {
    console.error("Failed to load volunteer data:", error);
  });

function maskPhone(phone) {
  if (!phone) return "";
  return phone.slice(0, 4) + "XXXX" + phone.slice(-2);
}

function maskEmail(email) {
  if (!email) return "";

  const parts = email.split("@");

  if (parts.length !== 2) return email;

  return parts[0].slice(0, 2) + "***@" + parts[1];
}

function maskAadhaar(aadhaar) {
  if (!aadhaar) return "";

  return "XXXX XXXX " + aadhaar.slice(-4);
}

function getInitials(name) {
  if (!name || typeof name !== "string") return "?";

  const words = name
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/[^a-zA-Z]/g, ""))
    .filter((word) => word.length > 0);

  if (words.length === 0) return "?";

  if (words.length === 1) {
    const word = words[0];
    return word.length >= 2
      ? (word[0] + word[1]).toUpperCase()
      : word[0].toUpperCase();
  }

  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function getVolunteerPhoto(
    volunteerId
){

    const parts =
        volunteerId.split("-");

    const year =
        parts[1];

    const number =
        parts[2];

    return `
../assets/images/volunteer/${year}/${number}.jpg
`;
}

function renderInitialsAvatar(
    volunteer
){

    const photo =
        volunteer.photo;

    return `
        <div class="volunteer-avatar-wrapper">

            ${
                photo
                ?
                `
                <img
                    src="${photo}"
                    class="volunteer-photo"
                    onerror="
                        this.style.display='none';
                        this.nextElementSibling.style.display='flex';
                    "
                >
                `
                :
                ""
            }

            <div
                class="volunteer-fallback-avatar"
                style="
                    ${
                        photo
                        ? "display:none;"
                        : "display:flex;"
                    }
                "
            >
                ${getInitials(
                    volunteer.name
                )}
            </div>

        </div>
    `;
}

function renderIdCardAvatar(name) {
  return `
    <div class="volunteer-id-avatar" aria-hidden="true">
      ${getInitials(name)}
    </div>
  `;
}

function renderIdRow(label, value) {
  return `
    <div class="volunteer-id-row">
      <span class="volunteer-id-label">${label}</span>
      <span class="volunteer-id-value">${value ?? "—"}</span>
    </div>
  `;
}

function isSpecialRole(pos) {
  return Boolean(pos && pos !== "Volunteer");
}

function getPosRoleClass(pos) {
  const roleMap = {
    Leader: "leader",
    "Media Wing": "media",
    Treasurer: "navy",
    Secretary: "navy",
    "Joint Secretary": "navy",
  };

  return roleMap[pos] || "leader";
}


function renderPosBadge(pos, variant = "card") {

  if (!isSpecialRole(pos)) return "";

  const roleClass = getPosRoleClass(pos);

  const baseClass =
    variant === "modal"
      ? "volunteer-id-pos"
      : "volunteer-pos-badge";

  return `
    <span class="${baseClass} ${baseClass}--${roleClass}">
      ${pos}
    </span>
  `;
}

function renderAttendanceBadge(id) {

    const percentage =
        getAttendancePercentage(id);

    const status =
        getAttendanceStatus(
            percentage
        );

    return `
        <div
            class="
                volunteer-attendance-badge
                volunteer-attendance-${status.color}
            "
        >
            ${percentage}%
        </div>
    `;
}

const VOLUNTEER_MODAL_DURATION = 350;

function openVolunteerModal() {
  const modal = document.getElementById("volunteer-modal");
  if (!modal) return;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      document.getElementById("modal-close")?.focus();
    });
  });
}

function closeVolunteerModal() {
  const modal = document.getElementById("volunteer-modal");
  if (!modal || modal.classList.contains("hidden") || !modal.classList.contains("is-open")) {
    return;
  }

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");

  window.setTimeout(() => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }, VOLUNTEER_MODAL_DURATION);
}

function setupVolunteerModal() {
  document
    .getElementById("modal-close")
    ?.addEventListener("click", closeVolunteerModal);

  document
    .getElementById("volunteer-modal-backdrop")
    ?.addEventListener("click", closeVolunteerModal);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const modal = document.getElementById("volunteer-modal");
    if (modal && modal.classList.contains("is-open")) {
      closeVolunteerModal();
    }
  });
}

function init() {
  populateBatchSelector();
  renderStats();
  populateBloodGroups();
  populateDistricts();
  populateDoy();
  renderCards();
  handleVolunteerDeepLink();

  document
    .getElementById("volunteer-search")
    .addEventListener("input", renderCards);

  document
    .getElementById("gender-filter")
    .addEventListener("change", renderCards);

  document
    .getElementById("blood-filter")
    .addEventListener("change", renderCards);

  document
    .getElementById("district-filter")
    .addEventListener("change", renderCards);
  
  document
    .getElementById("doy-filter")
    .addEventListener("change", renderCards);

  setupVolunteerModal();
}

function handleVolunteerDeepLink() {
  const params = new URLSearchParams(window.location.search);
  const volunteerId = params.get("id");
  const posFilter = params.get("pos");
  const batch = params.get("batch");

  if (posFilter) {
    const searchInput = document.getElementById("volunteer-search");
    if (searchInput) {
      searchInput.value = posFilter;
      renderCards();
    }
  }

  if (batch) {

  selectedBatch = batch;

  populateBatchSelector();

  renderStats();

  renderCards();

}

  if (volunteerId) {
    window.setTimeout(() => {

  const card =
    document.querySelector(
      `[data-volunteer-id="${volunteerId}"]`
    );

  if (!card) return;

  card.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  card.classList.add(
    "volunteer-card-highlight"
  );

}, 400);
  }
}

function highlightVolunteerCard(volunteerId) {
  const card = document.querySelector(`[data-volunteer-id="${volunteerId}"]`);
  if (!card) return;

  card.scrollIntoView({ behavior: "smooth", block: "center" });
  card.classList.add("volunteer-card-highlight");

  window.setTimeout(() => {
    card.classList.remove("volunteer-card-highlight");
  }, 2800);
}

function renderStats() {

  const currentBatch =
  volunteers.filter(
    v => v.batch === selectedBatch
  );

  document.getElementById("stat-total").textContent =
    currentBatch.length;

  document.getElementById("stat-male").textContent =
    currentBatch.filter(v => v.gender === "Male").length;

  document.getElementById("stat-female").textContent =
    currentBatch.filter(v => v.gender === "Female").length;

  document.getElementById("stat-blood").textContent =
    new Set(
      currentBatch.map(v => v.bloodGroup)
    ).size;

  const statLeader = document.getElementById("stat-leader");
  const statMedia = document.getElementById("stat-media");

  if (statLeader) {
    statLeader.textContent =
      currentBatch.filter(v => v.pos === "Leader").length;
  }

  if (statMedia) {
    statMedia.textContent =
      currentBatch.filter(v => v.pos === "Media Wing").length;
  }
}

function populateBloodGroups() {

  const bloodFilter =
    document.getElementById("blood-filter");

  const groups =
    [...new Set(
      volunteers.map(v => v.bloodGroup)
    )];

  groups.sort();

  groups.forEach(group => {

    const option =
      document.createElement("option");

    option.value = group;
    option.textContent = group;

    bloodFilter.appendChild(option);

  });

}

function populateDistricts() {

  const districtFilter =
    document.getElementById("district-filter");

  const districts =
    [...new Set(
      volunteers.map(v => v.district)
    )];

  districts.sort();

  districts.forEach(district => {

    const option =
      document.createElement("option");

    option.value = district;
    option.textContent = district;

    districtFilter.appendChild(option);

  });

}

function populateDoy() {

  const doyFilter =
    document.getElementById("doy-filter");

  const doys =
    [...new Set(
      volunteers.map(v => v.doy)
    )];

  doys.sort();

  doys.forEach(doy => {

    const option =
      document.createElement("option");

    option.value = doy;
    option.textContent = doy;

    doyFilter.appendChild(option);

  });

}

function populateBatchSelector() {

  const container =
    document.getElementById(
      "batch-selector"
    );

  container.innerHTML = "";

  const batches = [
    ...new Set(
      volunteers
        .map(v => v.batch)
        .filter(Boolean)
    )
  ];

  // Oldest → Newest
  batches.sort((a, b) => {

    const yearA =
      parseInt(a.split("-")[0]);

    const yearB =
      parseInt(b.split("-")[0]);

    return yearA - yearB;

  });

  if (batches.length <= 1) {

  container.style.display =
    "none";

  selectedBatch =
    batches[0] || "All";

  renderStats();
renderCards();
return;

}

container.style.display =
  "flex";

  // Auto-select first batch
  if (
    selectedBatch === "All" &&
    batches.length
  ) {

    selectedBatch =
      batches[0];

  }

  batches.forEach(batch => {

    const button =
      document.createElement(
        "button"
      );

    button.className =
      "batch-pill";

    if (
      batch === selectedBatch
    ) {

      button.classList.add(
        "active"
      );

    }

    button.textContent =
      batch;

    button.addEventListener(
      "click",
      () => {

        selectedBatch =
          batch;

        populateBatchSelector();

        renderStats();

        renderCards();

      }
    );

    container.appendChild(
      button
    );

  });

}

function updateBatchHeading() {

  document.getElementById(
  "batch-title"
).textContent =
  "NSS Volunteers";

}

function renderCards() {

  const search =
    document.getElementById("volunteer-search")
      .value
      .toLowerCase()
      .trim();

  const gender =
    document.getElementById("gender-filter")
      .value;

  const blood =
    document.getElementById("blood-filter")
      .value;
  const district =
    document.getElementById("district-filter")
      .value;
  const doy =
    document.getElementById("doy-filter")
      .value;

  const filtered =
    volunteers.filter(v => {

      if (
      v.batch !== selectedBatch
    ) return false;

      const matchesSearch =
        v.name.toLowerCase().includes(search) ||
        v.id.toLowerCase().includes(search) ||
        (v.pos || "").toLowerCase().includes(search);

      const matchesGender =
        gender === "All" ||
        v.gender === gender;

      const matchesBlood =
        blood === "All" ||
        v.bloodGroup === blood;

      const matchesDistrict =
        district === "All" ||
        v.district === district;
        
      const matchesDoy =
        doy === "All" ||
        v.doy === doy;
      

      return (
        matchesSearch &&
        matchesGender &&
        matchesBlood &&
        matchesDistrict &&
        matchesDoy
      );

    });

  const grid =
    document.getElementById("volunteer-grid");

  const noResults =
    document.getElementById("no-volunteers");

  if (filtered.length === 0) {

    grid.innerHTML = "";

    noResults.classList.remove("hidden");

    return;
  }

  noResults.classList.add("hidden");

  document.getElementById("result-count").textContent =
`${filtered.length} Volunteer${filtered.length !== 1 ? "s" : ""}`;

  grid.innerHTML = filtered.map(v => `
    <div data-volunteer-id="${v.id}" class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col">

      <div class="volunteer-card-header">
        ${renderInitialsAvatar(v)}
        ${isSpecialRole(v.pos) ? renderPosBadge(v.pos) : ""}
      </div>

      <h3 class="mt-4 font-bold text-xl text-slate-900">
        ${v.name}
      </h3>

      <div class="flex items-center justify-between mt-1">
  <p class="text-sm text-slate-500">
    ${v.id}
  </p>

  ${renderAttendanceBadge(v.id)}
</div>

      <div class="mt-4 space-y-1">

        <p class="text-sm">
          <span class="font-semibold">
            Blood:
          </span>
          ${v.bloodGroup}
        </p>

        <p class="text-sm">
          <span class="font-semibold">
            Gender:
          </span>
          ${v.gender}
        </p>

        <p class="text-sm">
          <span class="font-semibold">
            Batch:
          </span>
          ${v.batch}
        </p>

        <p class="text-sm">
  <span class="font-semibold">
    District:
  </span>
  ${v.district}
</p>
        <p class="text-sm">
  <span class="font-semibold">
    DOY:
  </span>
  ${v.doy}
</p>

      </div>

      <button
        onclick="showVolunteer('${v.id}')"
        class="mt-5 w-full bg-primary text-white py-2.5 rounded-xl font-semibold hover:bg-blue-900 transition-colors"
      >
        View Profile
      </button>

    </div>
  `).join("");

}

function showVolunteer(id) {

  const volunteer =
    volunteers.find(v => v.id === id);

  if (!volunteer) return;

  document.getElementById("volunteer-details").innerHTML = `
    <div class="volunteer-id-brand">
      <span class="volunteer-id-brand-title">NSS Vettathur</span>
      <span class="volunteer-id-brand-sub">Volunteer Identity Card</span>
    </div>
<div class="volunteer-id-header">

   <div class="volunteer-id-top">
   

    <div></div>

    <div class="volunteer-id-avatar-wrapper">

    ${
    volunteer.photo
    ?
    `
    <img
        src="../${volunteer.photo}"
        class="volunteer-id-photo"
        onerror="
            this.style.display='none';
            this.nextElementSibling.style.display='flex';
        "
    >
    `
    :
    ""
}

<div
    class="volunteer-id-avatar"
    style="
        ${
            volunteer.photo
            ? "display:none;"
            : "display:flex;"
        }
    "
>
    ${getInitials(
        volunteer.name
    )}
</div>

        class="
            volunteer-id-photo
        "

        onerror="
            this.style.display='none';
            this.nextElementSibling.style.display='flex';
        "
    >

    <div
        class="
            volunteer-id-avatar
        "

        style="
            display:none;
        "
    >
        ${getInitials(
            volunteer.name
        )}
    </div>

</div>

    <div class="volunteer-id-attendance-panel">

        <div class="
            volunteer-attendance-score
            volunteer-attendance-${getAttendanceStatus(
                getAttendancePercentage(
                    volunteer.id
                )
            ).color}
        ">
            ${getAttendanceStatus(
                getAttendancePercentage(
                    volunteer.id
                )
            ).icon}

            ${getAttendancePercentage(
                volunteer.id
            )}%
        </div>

        <button
            class="attendance-open-btn"
            onclick="
                openAttendancePopup(
                    '${volunteer.id}'
                )
            "
        >
            Show More
        </button>

    </div>

</div>

<h2
    class="volunteer-id-name"
>
    ${volunteer.name}
</h2>

 <div class="volunteer-id-pos-wrapper">
  ${renderPosBadge(
    volunteer.pos,
    "modal"
  )}
</div>
</div>

    <div class="volunteer-id-body">
      ${renderIdRow("ID", volunteer.id)}
      ${renderIdRow("Blood Group", volunteer.bloodGroup)}
      ${renderIdRow("Gender", volunteer.gender)}
      ${renderIdRow("District", volunteer.district)}
      ${renderIdRow("DOB", volunteer.dob)}
      ${renderIdRow("DOY", volunteer.doy)}
      ${renderIdRow("Batch", volunteer.batch)}
    </div>

    <div class="volunteer-id-private">
      <p class="volunteer-id-private-title">Private Information</p>
      ${renderIdRow("Phone", maskPhone(volunteer.phone))}
      ${renderIdRow("Email", maskEmail(volunteer.email))}
      ${renderIdRow("Aadhaar", maskAadhaar(volunteer.aadhaar))}
    </div>
  `;

  openVolunteerModal();
}

function renderAttendancePopupButton(
    volunteerId
){

    const percentage =
        getAttendancePercentage(
            volunteerId
        );

    const status =
        getAttendanceStatus(
            percentage
        );

    return `
        <button
            class="
                volunteer-attendance-popup-btn
                volunteer-attendance-${status.color}
            "
            onclick="
                openAttendancePopup(
                    '${volunteerId}'
                )
            "
        >
            ${status.icon}
            ${percentage}%
        </button>
    `;
}

function openAttendancePopup(
    volunteerId
){

    const percentage =
        getAttendancePercentage(
            volunteerId
        );

    const present =
        getAttendancePresentCount(
            volunteerId
        );

    const status =
        getAttendanceStatus(
            percentage
        );

    const message =
        percentage >= 90
        ? "Outstanding participation."
        : percentage >= 75
        ? "Good participation level."
        : percentage >= 50
        ? "Participation is average."
        : "Attendance improvement recommended.";

    document.getElementById(
        "attendance-popup-content"
    ).innerHTML = `
        <div class="attendance-popup-card">

            <h3>
                ${status.icon}
                ${status.label}
            </h3>

            <p>
                Present:
                ${present}/${totalActivities}
            </p>

            <p>
                Attendance:
                ${percentage}%
            </p>

            <p>
                ${message}
            </p>

            <button
                onclick="
                    closeAttendancePopup()
                "
            >
                Close
            </button>

        </div>
    `;

    document
        .getElementById(
            "attendance-popup"
        )
        .classList
        .remove("hidden");
}

function closeAttendancePopup(){

    document
        .getElementById(
            "attendance-popup"
        )
        .classList
        .add("hidden");
}