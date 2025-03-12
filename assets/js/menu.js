async function loadMenu() {
    try {
        const response = await fetch("https://test.manawork79.workers.dev/api/menu");
        const data = await response.json();

        console.log(data); // 確認用

        const gridContainer = document.querySelector(".grid-container");

        gridContainer.innerHTML = ""; // 初期化

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
    } catch (error) {
        console.error("メニューの取得に失敗しました:", error);
    }
}

// ページがロードされたらメニューを読み込む
window.addEventListener("DOMContentLoaded", loadMenu);
