async function selectMenu() {
    const MenuId = sessionStorage.getItem("selectedMenuId");

    if (!MenuId) {
        console.log("ストレージにデータが存在しません");
        alert("メニューを選択してください");
        window.location.href = "menu.html";
        return;
    }

    console.log(MenuId);

    const response = await fetch(`https://database.manawork79.workers.dev/api/menu/?id=${MenuId}`);
    const data = await response.json();

    const item = document.querySelector(".menu");

     if (!data.Available) {
        const text = "提供不可";
     }
     else {
        const text = `${data.price}円`;
     }

    contents.innerHTML = `
        <img src="${data.ImgUrl}" alt="${data.MenuName}" style="width: 100px; height: 100px;">
        <p>${data.MenuName}</p>
        <p>残り${data.Remaining}個　${text}</p>
    `;

    item.appendChild(contents);
}

window.addEventListener("DOMContentLoaded", selectMenu);