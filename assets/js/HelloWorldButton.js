async function catchMessage(type) {
    try {
        const response = await fetch(`https://test.manawork79.workers.dev?type=${type}`);
        const text = await response.text();
        document.getElementById("message").innerText = text;
    }
    catch (error) {
        console.log("エラーが発生しました", error);
        document.getElementById("message").innerText = "取得に失敗しました";
    }
} 

