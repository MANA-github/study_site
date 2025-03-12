const response = fetch("https://test.manawork79.workers.dev/api/menu");
const data = response.json();

console.log(data);

const gridContainer = document.querySelector(".grid-container");
    
gridContainer.innerHTML = "";

data.forEach(item => {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");    
    gridItem.innerHTML = `
        <img src="${item.image_url}" alt="${item.name}" style="width: 100px; height: 100px;">
        <p>${item.name}</p>
        <p>${item.price}円</p>
    `;
    gridContainer.appendChild(gridItem);
});