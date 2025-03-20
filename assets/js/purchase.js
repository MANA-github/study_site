async function selectMenu() {
    const MenuId = sessionStorage.getItem("selectedMenuId");

    if (!MenuId) {
        console.log("ストレージにデータが存在しません");
        alert("メニューを選択してください");
        window.location.href = "menu.html";
        return;
    }

    console.log("選択されたMenuId:", MenuId);

    try {
        const response = await fetch(`https://database.manawork79.workers.dev/api/menu?id=${MenuId}`);
        const data = await response.json();

        if (!data || data.length === 0) {
            console.error("データが取得できませんでした");
            alert("メニューが見つかりません");
            window.location.href = "menu.html";
            return;
        }

        const menuData = Array.isArray(data) ? data[0] : data;

        let text;
        if (!menuData.Available) {
            text = "提供不可";
        } else {
            text = `${menuData.price}円`;
        }

        const item = document.querySelector(".menu");
        if (!item) return;

        const contents = document.createElement("div");
        contents.innerHTML = `
            <img src="${menuData.ImgUrl}" alt="${menuData.MenuName}" style="width: 100px; height: 100px;">
            <p>${menuData.MenuName}</p>
            <p>残り${menuData.Remaining}個　${text}</p>
        `;

        item.appendChild(contents);
    } catch (error) {
        console.error("メニューの取得に失敗しました:", error);
        alert("データの取得に失敗しました");
    }
}

window.addEventListener("DOMContentLoaded", selectMenu);
