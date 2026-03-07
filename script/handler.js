const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayIssues(data.data));
};

displayIssues = (data) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.forEach((issue) => {
    const card = document.createElement("div");
    card.classList.add("card", "bg-white", "shadow-lg", "rounded-lg");
    card.innerHTML = `
    <div class="card-body">
      <div class="flex justify-between items-center">
        <img class="block" src="./assets/Open-Status.png" alt="" />
        <button
          class="text-[#EF4444] bg-red-100 py-1 px-4 rounded-full font-medium"
        >
          High
        </button>
      </div>
      <h2 class="text-lg font-semibold text-[#1F2937]">
        ${issue.title}
      </h2>
      <p class="text-[#64748B]">
        ${issue.description}
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
            >${issue.addedBy}</span
          >
        </p>
        <p>
          Date:
          <span class="font-semibold text-[#1F2937] text-[16px]"
            >${issue.date}</span
          >
        </p>
      </div>
    </div>
  `;
    cardContainer.append(card);
  });
};

loadIssues();
