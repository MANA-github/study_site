async function uuidCheck() {
    const cookieName = 'uuid';
    let userId = getCookie(cookieName);

    if (!userId) {
        const data = await getUserData();
        const response = await fetch("https://api.manawork79.workers.dev/api/uuid", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    ip: data.ip,
                    fp: data.visitorId
                }
            )
        }); 

        console.log(response);
    }
    else {
        console.log(`UUID確認登録済み: ${userId}`);
    }
}

async function getUserData() {
    const ipRes = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipRes.json();
    const ip = ipData.ip;

    const fpModule = await import('https://openfpcdn.io/fingerprintjs/v4');
    const fp = await fpModule.default.load();
    const fingerprint = await fp.get();
    const visitorId = fingerprint.visitorId;

    return { ip, visitorId };
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}

window.addEventListener("DOMContentLoaded", uuidCheck);
