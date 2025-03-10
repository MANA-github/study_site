async function getMenuJson() {
    const response = await fetch("https://test.manawork79.workers.dev/api/menu");
    const data = await response.json();

    console.log(data);
    document.getElementById("response").innerText = "Check the console log !";

    const menuList = document.getElementById("menuList");

    data.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} : ${item.price}円`;
        menuList.appendChild(listItem);
    });

}