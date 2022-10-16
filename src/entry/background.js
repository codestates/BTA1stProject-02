import "@/scripts/window"
import web3Instance from "@/scripts/web3Instance"
import wallet from "@/scripts/wallet"

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
            port.postMessage(JSON.stringify({sig: "getStatus", status: web3Instance.status}));
        } else if (msg.sig === "submitPassword") {
            try {
                web3Instance.decryptWallet(msg.password, encryptedWallet)
                port.postMessage(JSON.stringify({sig: "submitPassword", result: true}));
            } catch (e) {
                port.postMessage(JSON.stringify({sig: "submitPassword", result: false}));
            }
        } else if (msg.sig === "haveWallet") {
            let haveWallet = false;
            console.log(wallet);
            port.postMessage(JSON.stringify({sig: "haveWallet", haveWallet}));

        } else if (msg.sig === "setPassword") {
            port.postMessage(JSON.stringify({sig: "setPassword", setPassword: true}))
        } else if (msg.sig === "mnemonicConfirm") {
            try {
                // Wallet Save
                console.log("wallet save")
                port.postMessage(JSON.stringify({sig: "mnemonicConfirm", result: true}))
            } catch (e) {
                port.postMessage(JSON.stringify({sig: "mnemonicConfirm", result: false}))
            }
        } else if (msg.sig === "generateMnemonic") {
            console.log("generate mnemonic")
            port.postMessage(JSON.stringify({
                sig: "generateMnemonic",
                mnemonic: "useless ride under royal power oblige enrich naive arch street banner reform"
            }))
        }
        console.log(x, msg);
        x += 1;
    });
})

let x = 0;
