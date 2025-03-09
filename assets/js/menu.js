async function getMenuJson() {
    const response = await fetch("https://test.manawork79.workers.dev/api/menu");
    const data = await response.json();

    console.log(data);
}