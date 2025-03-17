async function loadMenu() {
    try {
        const response = await fetch("https://database.manawork79.workers.dev/api/menu");
        const data = await response.json();

        console.log(data);

        const gridContainer = document.querySelector(".grid-container");

        gridContainer.innerHTML = "";
        console.log(Array.isArray(data));

        data.forEach(item => {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");    
            gridItem.innerHTML = `
                <img src="${item.ImgUrl}" alt="${item.MenuName}" style="width: 100px; height: 100px;">
                <p>${item.MenuName}</p>
                <p>${item.price}円</p>
            `;
            gridContainer.appendChild(gridItem);
        });
    } catch (error) {
        console.error("メニューの取得に失敗しました:", error);
    }
}

window.addEventListener("DOMContentLoaded", loadMenu);
