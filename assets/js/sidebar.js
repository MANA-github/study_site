document.addEventListener("DOMContentLoaded", function () {
    document.body.insertAdjacentHTML("afterbegin", `
        <button class="toggle-button">☰ メニューを開く</button>
        <div class="sidebar">
            <h2>メニュー</h2>
            <a href="#" class="home-link">ホーム</a>
            <a href="./public/menu.html">メニュー</a>
            <a href="#">設定</a>
            <a href="#">ログアウト</a>
        </div>
    `);

    let homeLink = document.querySelector(".home-link");

    if (homeLink) {
        homeLink.href = location.pathname.includes("/public/") ? "../index.html" : "index.html";
    }

    const sidebar = document.querySelector(".sidebar");
    const toggleButton = document.querySelector(".toggle-button");

    let isSidebarOpen = false;

    toggleButton.addEventListener("click", (event) => {
        event.stopPropagation();
        isSidebarOpen = !isSidebarOpen;

        if (isSidebarOpen) {
            sidebar.classList.add("active");
            toggleButton.textContent = "× メニューを閉じる";
        } else {
            sidebar.classList.remove("active");
            toggleButton.textContent = "☰ メニューを開く";
        }
    });

    document.addEventListener("click", (event) => {
        if (isSidebarOpen && !sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
            sidebar.classList.remove("active");
            toggleButton.textContent = "☰ メニューを開く";
            isSidebarOpen = false;
        }
    });
});
