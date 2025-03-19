async function selectMenu() {
    const MenuId = sessionStorage.getItem("selectedMenuId");

    if (!MenuId) {
        console.log("ストレージにデータが存在しません");
        alert("メニューを選択してください");
        window.location.href = "menu.html";
        return;
    }

    console.log(MenuId);
}

window.addEventListener("DOMContentLoaded", selectMenu);