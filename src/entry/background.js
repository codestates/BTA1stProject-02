import "@/scripts/window"
import web3Instance from "@/scripts/web3Instance"

chrome.runtime.onInstalled.addListener(() => {
        web3Instance.init("mainnet")
        console.log("installed")
    }
)
chrome.runtime.onStartup.addListener(() => {
        console.log("startup")
        web3Instance.init("mainnet")
    }
)

let encryptedWallet = "Abcd"
chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        console.log(msg)
        if (msg.sig === "getStatus") {
            console.log(JSON.stringify(web3Instance.status));
            port.postMessage(JSON.stringify(web3Instance.status));
        } else if (msg.sig === "submitPassword") {
            try {
                web3Instance.decryptWallet(msg.password, encryptedWallet)
                port.postMessage("success");
            } catch (e) {
                port.postMessage("fail");
            }
        }
        console.log(x, msg);
        x += 1;
    });
})

let x = 0;
