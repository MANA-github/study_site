async function getMenuJson() {
    const response = await fetch("https://test.manawork79.workers.dev/api/menu");
    const data = await response.json();

    console.log(data);
    document.getElementById("response").innerText = "Check the console log !";

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
}
