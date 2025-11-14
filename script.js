const grid = document.getElementById("grid");
const filterButtons = document.querySelectorAll(".filters button");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    render(button.dataset.filter);
  });
});

function render(filter) {
  grid.innerHTML = ""; 

 
  for (const year in data) {
    
    let yearItems = [];
    for (const type in data[year]) {
      data[year][type].forEach(item => {
        yearItems.push({ ...item, type });
      });
    }

   
    const filtered = (filter === "all")
      ? yearItems
      : yearItems.filter(item => item.type === filter);

    if (filtered.length === 0) continue; 

    filtered.sort(() => Math.random() - 0.5);

   
    grid.innerHTML += `<h2 class="year-title">${year}</h2>`;


    const cardsHtml = filtered.map(item => `
      <div class="card">
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        ${item.creator ? `<p class="creator">${item.creator}</p>` : ""}
        ${item.note ? `<p class="note">${item.note}</p>` : ""}
      </div>
    `).join("");

    grid.innerHTML += `<div class="year-grid">${cardsHtml}</div>`;
  }
}
