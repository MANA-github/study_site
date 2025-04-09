window.addEventListener("DOMContentLoaded", uuidCheck);

async function uuidCheck() {
    const dataName = 'uuid';
    const cookieData = getCookie(dataName);
    const LSData = localStorage.getItem(dataName);
    const idbData = await iDB("get", { dataName });

    console.log("Cookie:", cookieData);
    console.log("LocalStorage:", LSData);
    console.log("IndexedDB:", idbData);

    const userId = cookieData || LSData || idbData?.name;

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
            })
        });

        const uuid = await response.text();

        setCookie(dataName, uuid);
        localStorage.setItem(dataName, uuid);
        await iDB("put", { dataName, keyData: uuid });

        console.log("UUIDを新規登録しました:", uuid);
    } else {
        console.log(`UUID確認登録済み: ${userId}`);
    }
}

async function getUserData() {
    const ipRes = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipRes.json();

    const fpModule = await import('https://openfpcdn.io/fingerprintjs/v4');
    const fp = await fpModule.default.load();
    const fingerprint = await fp.get();

    return { ip: ipData.ip, visitorId: fingerprint.visitorId };
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/; max-age=126144000`;
}

function iDB(property, { dataName = null, keyData = null }) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('myDB', 1);

        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('store')) {
                db.createObjectStore('store', { keyPath: 'id' });
            }
        };

        request.onsuccess = event => {
            const db = event.target.result;
            const tx = db.transaction('store', 'readwrite');
            const store = tx.objectStore('store');

            if (property === "put") {
                store.put({ id: dataName, name: keyData });
                tx.oncomplete = () => {
                    db.close();
                    resolve();
                };
            } else if (property === "get") {
                const getRequest = store.get(dataName);
                getRequest.onsuccess = () => {
                    db.close();
                    resolve(getRequest.result);
                };
                getRequest.onerror = () => {
                    db.close();
                    reject(getRequest.error);
                };
            }
        };

        request.onerror = () => reject(request.error);
    });
}
