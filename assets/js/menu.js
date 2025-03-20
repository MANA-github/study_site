async function loadMenu() {
    try {
        const response = await fetch("https://database.manawork79.workers.dev/api/menu");
        const data = await response.json();

        console.log(data);

        const gridContainer = document.querySelector(".grid-container");

        gridContainer.innerHTML = "";
        console.log(Array.isArray(data));

        data.forEach(item => {
            // if (!item.Available) return;
            // 実験中は非表示メニューも表示
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");    
            gridItem.innerHTML = `
                <a href="./purchase.html" data-id="${item.MenuId}" class="menuLink">
                    <img src="${item.ImgUrl}" alt="${item.MenuName}" style="width: 100px; height: 100px;">
                    <p>${item.MenuName}</p>
                    <p>残り${item.Remaining}個　${item.price}円</p>
                </a>
            `;

            // 実験用
            if (!item.Available) gridItem.innerHTML = "<p>提供不可</p>";

            gridContainer.appendChild(gridItem);
        });

    } catch (error) {
        console.error("メニューの取得に失敗しました:", error);
    }
}

document.querySelector(".grid-container").addEventListener("click", function(event) {
    const target = event.target.closest(".menuLink");
    if (target) {
        event.preventDefault();
        const MenuId = target.dataset.id;
        sessionStorage.setItem("selectedMenuId", MenuId);
        window.location.href = target.href;
    }
});

window.addEventListener("DOMContentLoaded", loadMenu);
