document.addEventListener("DOMContentLoaded", function () {
    document.body.insertAdjacentHTML("afterbegin", `
        <button class="toggle-button">☰ メニューを開く</button>
        <div class="sidebar">
            <h2>メニュー</h2>
            <a href="home.html" class="linkCheck">ホーム</a>
            <a href="menu.html" class="linkCheck">メニュー</a>
            <a href="settings.html">設定</a>
            <a href="logout.html">ログアウト</a>
        </div>
    `);

    let linkCheck = document.querySelectorAll(".linkCheck");
    let currentPage = window.location.pathname.split("/").pop();

    linkCheck.forEach(link => {
        let linkText = link.textContent.trim();

        if (link.href.endsWith(currentPage) || currentPage === "study_site") {
            window.location.href = link.href;
        }
    });

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
