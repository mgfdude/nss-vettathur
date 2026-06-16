let volunteers = [];

fetch("volunteer.json")
  .then(response => response.json())
  .then(data => {
    volunteers = data;
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

function init() {
  renderStats();
  populateBloodGroups();
  populateDistricts();
  populateDoy();
  renderCards();

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
     
  document
    .getElementById("modal-close")
    .addEventListener("click", () => {
      document
        .getElementById("volunteer-modal")
        .classList.add("hidden");
    });

  document
    .getElementById("volunteer-modal")
    .addEventListener("click", (e) => {

      if (e.target.id === "volunteer-modal") {
        document
          .getElementById("volunteer-modal")
          .classList.add("hidden");
      }

    });
}

function renderStats() {
  document.getElementById("stat-total").textContent =
    volunteers.length;

  document.getElementById("stat-male").textContent =
    volunteers.filter(v => v.gender === "Male").length;

  document.getElementById("stat-female").textContent =
    volunteers.filter(v => v.gender === "Female").length;

  document.getElementById("stat-blood").textContent =
    new Set(
      volunteers.map(v => v.bloodGroup)
    ).size;
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

      const matchesSearch =
        v.name.toLowerCase().includes(search) ||
        v.id.toLowerCase().includes(search);

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
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">

      <div class="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
        👤
      </div>

      <h3 class="mt-4 font-bold text-xl text-slate-900">
        ${v.name}
      </h3>

      <p class="text-sm text-slate-500 mt-1">
        ${v.id}
      </p>

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

  document.getElementById(
    "volunteer-details"
  ).innerHTML = `
    <h2 class="text-2xl font-bold mb-4">
      ${volunteer.name}
    </h2>

    <div class="space-y-2">

      <p>
        <strong>ID:</strong>
        ${volunteer.id}
      </p>

      <p>
        <strong>Gender:</strong>
        ${volunteer.gender}
      </p>

      <p>
        <strong>Blood Group:</strong>
        ${volunteer.bloodGroup}
      </p>

      <p>
        <strong>Batch:</strong>
        ${volunteer.batch}
      </p>

        <p>
        <strong>DOB:</strong>
      ${volunteer.dob}
      </p>

    <p>
      <strong>District:</strong>
      ${volunteer.district}
    </p>

    <p>
      <strong>DOY:</strong>
      ${volunteer.doy}
    </p>

    <hr class="my-4">

      
      <p>
        <strong>Phone:</strong>
        ${maskPhone(volunteer.phone)}
      </p>

      <p>
        <strong>Email:</strong>
        ${maskEmail(volunteer.email)}
      </p>

      <p>
        <strong>Aadhaar:</strong>
        ${maskAadhaar(volunteer.aadhaar)}
      </p>

    </div>
  `;

  document
    .getElementById("volunteer-modal")
    .classList.remove("hidden");

}