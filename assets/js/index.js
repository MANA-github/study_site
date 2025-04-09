async function uuidCheck() {
    const dataName = 'uuid';
    const cookieData = getCookie(dataName);
    const LSData = localStorage.getItem(dataName);
    const idb = await iDB("get", dataName);

    console.log(cookieData);
    console.log(LSData);
    console.log(idb);

    let userId = 0;


    if (!userId) {
        const data = await getUserData();
        const response = await fetch("https://api.manawork79.workers.dev/api/uuid", {
            method: "POST",
            headsers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    ip: data.ip,
                    fp: data.visitorId
                }
            )
        }); 
        const uuid = await response.text();
        setCookie(cookieName, uuid);
        localStorage.setItem("uuid", uuid);
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

function setCookie(name, key) {
    document.cookie = `${name}=${key}; path=/; max-age=126144000`;
}

function iDB(property, {dataName = null, keyData = null}) {
    let returnData;

    // ① データベースを開く（バージョンを指定）
    const request = indexedDB.open('myDB', 1);

    // ② 初回 or バージョンアップ時に呼ばれる
    request.onupgradeneeded = event => {
        const db = event.target.result;
        db.createObjectStore('store', { keyPath: 'id' }); // 'id'を主キーに
    };

    // ③ 通常オープン時
    request.onsuccess = event => {
        const db = event.target.result;

        // ④ トランザクションを作る
        const tx = db.transaction('store', 'readwrite');
        const store = tx.objectStore('store');

        // ⑤ データ追加
        if (property === "put") {
            store.put({ id: dataName, name: keyData });
        }
        else if (property === "get") {
            store.get(dataName).onsuccess = e => {
                const data = e.target.result;
                returnData = e.target.result;
                if (data) {
                    console.log('ユーザーあり:', data);
                }
                else {
                    console.log('見つかりませんでした');
                }
            };
        }
        tx.oncomplete = () => db.close();
    };

    if (property === "get") {
        return returnData;
    }
 
}

window.addEventListener("DOMContentLoaded", uuidCheck);
