let allIssues = [];

const loadIssues = (status = "all") => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      allIssues = data.data;
      filterAndDisplay(status);
    });
};

const filterAndDisplay = (status) => {
  if (status === "all") {
    displayIssues(allIssues);
  } else {
    const filtered = allIssues.filter((issue) => issue.status === status);
    displayIssues(filtered);
  }
};

const resetActiveNavigation = () => {
  const navigationBtns = document.querySelectorAll(".navigation-btn");
  navigationBtns.forEach((btn) => btn.classList.remove("active"));
};

const displayIssues = (data) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.forEach((issue, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "bg-white", "shadow-sm", "rounded-lg");
    if (issue.status === "open") {
      card.classList.add("status-open");
    } else {
      card.classList.add("status-closed");
    }
    card.innerHTML = `
    <button onclick="showDetails(${index})" class="block w-full text-left p-4 rounded-lg shadow hover:shadow-md transition">
  
  <!-- Header -->
  <div class="flex justify-between items-center mb-2">
    <img class="w-6 h-6" src="./assets/Open-Status.png" alt="Open Status" />
    <a class="text-[#EF4444] bg-red-100 py-1 px-4 rounded-full font-medium">
      ${issue.priority || "High"}
    </a>
  </div>

  <!-- Title & Description -->
  <h2 class="text-lg font-semibold text-[#1F2937] mb-1">
    ${issue.title}
  </h2>
  <p class="text-[#64748B] mb-3">
    ${issue.description}
  </p>

  <!-- Labels -->
  <div class="flex justify-between items-center mb-3">
    <a class="text-red-500 bg-red-100 py-1 px-4 rounded-full flex items-center gap-2">
      <i class="fa-solid fa-bug"></i>
      <span>BUG</span>
    </a>
    <a class="text-[#D97706] bg-[#D97706]/20 py-1 px-4 rounded-full flex items-center gap-2">
      <i class="fa-regular fa-life-ring"></i>
      <span>HELP WANTED</span>
    </a>
  </div>

  <hr class="my-4 opacity-30" />

  <!-- Footer -->
  <div class="space-y-2 text-sm">
    <p>
      Added By:
      <span class="font-semibold text-[#1F2937] text-[16px]">${issue.author}</span>
    </p>
    <p>
      Date:
      <span class="font-semibold text-[#1F2937] text-[16px]">${issue.createdAt}</span>
    </p>
  </div>

</button>
  `;
    cardContainer.append(card);
  });
};

const handleAllBtn = () => {
  const allBtn = document.getElementById("all-btn");
  allBtn.addEventListener("click", () => {
    resetActiveNavigation();
    allBtn.classList.add("active");
    filterAndDisplay("all");
  });
};

const handleOpenBtn = () => {
  const openBtn = document.getElementById("open-btn");
  openBtn.addEventListener("click", () => {
    resetActiveNavigation();
    openBtn.classList.add("active");
    filterAndDisplay("open");
  });
};

const handleClosedBtn = () => {
  const closedBtn = document.getElementById("closed-btn");
  closedBtn.addEventListener("click", () => {
    resetActiveNavigation();
    closedBtn.classList.add("active");
    filterAndDisplay("closed");
  });
};

const showDetails = (index) => {
  const data = allIssues[index];
  displayDetails(data);
};

const displayDetails = (data) => {
  const modal = document.getElementById("issue_modal");
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <div class="card-body">
    <h2 class="text-lg font-semibold text-[#1F2937]">
      ${data.title}
    </h2>
    <p class="text-[#64748B]">
      ${data.description}
    </p>
    <div class="flex justify-between items-center">
      <button
        class="text-red-500 bg-red-100 py-1 px-4 rounded-full font-medium"
      >
        <i class="fa-solid fa-bug"></i>
        <span>BUG</span>
      </button>
      <button
        class="text-[#D97706] bg-[#D97706]/20 py-1 px-4 rounded-full font-medium"
      >
        <i class="fa-regular fa-life-ring"></i>
        <span>HELP WANTED</span>
      </button>
    </div>
    <hr class="my-4 opacity-30" />
    <div class="space-y-2">
      <p>
        Added By:
        <span class="font-semibold text-[#1F2937] text-[16px]"
          >${data.author}</span
        >
      </p>
      <p>
        Date:
        <span class="font-semibold text-[#1F2937] text-[16px]"
          >${data.createdAt}</span
        >
      </p>
    </div>
  </div>
  <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  `;
  modal.showModal();
};

handleAllBtn();
handleOpenBtn();
handleClosedBtn();

loadIssues();
