let allIssues = [];
const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => {
      allIssues = json.data;
      filterAndDisplay(json.data);
      updateIssueCount("all");
    });
};

const filterAndDisplay = (issues) => {
  displayIssues(issues);
};

const resetActiveNavigation = () => {
  const navigationBtns = document.querySelectorAll(".navigation-btn");
  navigationBtns.forEach((btn) => btn.classList.remove("active"));
};

const handleAllBtn = () => {
  const allBtn = document.getElementById("all-btn");
  allBtn.addEventListener("click", () => {
    resetActiveNavigation();
    allBtn.classList.add("active");
    filterAndDisplay(allIssues);
    updateIssueCount("all");
  });
};

const handleOpenBtn = () => {
  const openBtn = document.getElementById("open-btn");
  openBtn.addEventListener("click", () => {
    resetActiveNavigation();
    openBtn.classList.add("active");
    const openIssues = allIssues.filter((issue) => issue.status === "open");
    filterAndDisplay(openIssues);
    updateIssueCount("open");
  });
};

const handleClosedBtn = () => {
  const closedBtn = document.getElementById("closed-btn");
  closedBtn.addEventListener("click", () => {
    resetActiveNavigation();
    closedBtn.classList.add("active");
    const closedIssues = allIssues.filter((issue) => issue.status === "closed");
    filterAndDisplay(closedIssues);
    updateIssueCount("closed");
  });
};

const updateIssueCount = (type) => {
  const issueCount = document.getElementById("issue-count");
  issueCount.innerHTML = "";

  if (type === "all") {
    issueCount.innerHTML = `${allIssues.length} Issues`;
  } else if (type === "open") {
    const openIssues = allIssues.filter((issue) => issue.status === "open");
    issueCount.innerHTML = `${openIssues.length} Issues`;
  } else if (type === "closed") {
    const closedIssues = allIssues.filter((issue) => issue.status === "closed");
    issueCount.innerHTML = `${closedIssues.length} Issues`;
  }
};

const displayIssues = (issues) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  issues.forEach((issue) => {
    const card = document.createElement("div");
    card.classList.add("card", "bg-white", "shadow-sm", "rounded-lg");

    if (issue.status === "open") {
      card.classList.add("status-open");
    } else {
      card.classList.add("status-closed");
    }

    card.innerHTML = `
      <button class="block w-full text-left p-4 rounded-lg shadow hover:shadow-md transition">
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
        <div class="flex gap-2 items-center mb-3 text-xs uppercase">
          <a class="text-red-500 bg-red-100 border border-red-500 py-1 px-4 rounded-full flex items-center gap-2">
            <i class="fa-solid fa-bug"></i>
            <span>${issue.labels[0]}</span>
          </a>
          <a class="text-[#D97706] bg-[#FFF8DB] border border-[#D97706] py-1 px-4 rounded-full flex items-center gap-2">
          
          <span>
            <i class="fa-regular fa-life-ring"></i>
            ${issue.labels?.[1] ?? ""}
          </span>

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
            <span class="font-semibold text-[#1F2937] text-[16px]">${new Date(issue.createdAt).toLocaleDateString()}</span>
          </p>
        </div>
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      showDetails(issue);
    });

    cardContainer.append(card);
  });
};

const showDetails = (issue) => {
  displayDetails(issue);
};

const displayDetails = (data) => {
  const modal = document.getElementById("issue_modal");
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
<div class="card-body">
  <!-- Title -->
  <h2 class="text-2xl font-bold text-gray-800">
    ${data.title}
  </h2>

  <!-- Status + Meta -->
<div class="flex gap-2 items-center mt-2">
  <button
    class="px-2 py-1 rounded-full text-xs 
    ${data.status === "open" ? "bg-green-500 text-white" : "bg-red-500 text-white"}"
  >
    ${data.status === "open" ? "Opened" : "Closed"}
  </button>

  <div class="flex gap-2 text-xs text-gray-500">
    ${
      data.status === "open"
        ? `
        <p class="flex items-center gap-1">
          <i class="fa-solid fa-circle text-[8px]"></i> 
          Opened by ${data.assignee}
        </p>
        <p class="flex items-center gap-1">
          <i class="fa-solid fa-circle text-[8px]"></i> 
          ${new Date(data.updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>`
        : `
        `
    }
  </div>
</div>


  <!-- Labels -->
  <div class="flex gap-2 items-center my-4 text-xs uppercase">
    <a class="text-red-500 bg-red-100 border border-red-500 py-1 px-4 rounded-full flex items-center gap-2">
      <i class="fa-solid fa-bug"></i>
      <span>${data.labels[0]}</span>
    </a>
    <a class="text-[#D97706] bg-[#FFF8DB] border border-[#D97706] py-1 px-4 rounded-full flex items-center gap-2">
      <i class="fa-regular fa-life-ring"></i>
      <span>${data.labels[1]}</span>
    </a>
  </div>

  <!-- Description -->
  <p class="text-gray-500 mb-4">
    ${data.description}
  </p>

  <!-- Assignee + Priority -->
  <div class="flex gap-30 bg-slate-100 p-4 rounded-lg">
    <div class="space-y-1">
      <p class="text-gray-500">Assignee:</p>
      <p class="font-semibold text-gray-800 text-[16px] capitalize">
        ${data.assignee}
      </p>
    </div>
    <div class="space-y-1">
      <p class="text-gray-500">Priority:</p>
      <a class="text-white bg-red-500 py-1 px-4 rounded-full uppercase text-xs">
      ${data.priority || "High"}
      </a>  
    </div>
  </div>

  <!-- Modal Action -->
  <div class="modal-action mt-4">
    <form method="dialog">
      <button class="btn btn-primary">Close</button>
    </form>
  </div>
</div>

  `;
  modal.showModal();
};

const input = document.getElementById("input-search");
const searchBtn = document.getElementById("btn-search");

const handleSearch = () => {
  const searchTerm = input.value.toLowerCase().trim();
  const filteredIssues = allIssues.filter((issue) =>
    issue.title.toLowerCase().includes(searchTerm),
  );
  displayIssues(filteredIssues);
  updateIssueCount("search");
  resetActiveNavigation();
};

searchBtn.addEventListener("click", handleSearch);

handleAllBtn();
handleOpenBtn();
handleClosedBtn();

loadIssues();
