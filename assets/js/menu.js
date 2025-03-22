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
            
            if (item.Available) {
                gridItem.innerHTML = `
                    <img src="${item.ImgUrl}" alt="${item.MenuName}" style="width: 100px; height: 100px;">
                    <p>${item.MenuName}</p>
                    <p>残り${item.Remaining}個　${item.price}円</p>
                    <button onclick="purchase(${item.MenuId})">今すぐ購入</button><button>カゴに追加</button>
                `;
            }
            else {
                gridItem.innerHTML = `
                    <img src="${item.ImgUrl}" alt="${item.MenuName}" style="width: 100px; height: 100px;">
                    <p>${item.MenuName}</p>
                    <p>残り${item.Remaining}個　${item.price}円</p>
                    <button onclick="purchase(${item.MenuId})">今すぐ購入</button><button>カゴに追加</button>
                `;
            }

            gridContainer.appendChild(gridItem);
        });

    } catch (error) {
        console.error("メニューの取得に失敗しました:", error);
    }
}

function purchase(id) {
    sessionStorage.setItem("selectedMenuId", id);
    window.location.href = "./purchase.html";
}

window.addEventListener("DOMContentLoaded", loadMenu);
