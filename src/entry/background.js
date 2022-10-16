import "@/scripts/window"
import web3Instance from "@/scripts/web3Instance"
import wallet from "@/scripts/wallet"

web3Instance.init("mainnet");
wallet.init();

chrome.runtime.onInstalled.addListener(() => {
        console.log("installed")
    }
)
chrome.runtime.onStartup.addListener(() => {
        console.log("startup")
        web3Instance.init("mainnet")
    }
)

chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        console.log(msg)
        if (msg.sig === "getStatus") {
            console.log("!!!!!!!!!!!!", web3Instance.status);
            port.postMessage(JSON.stringify({sig: "getStatus", status: web3Instance.status}));
        } else if (msg.sig === "submitPassword") {
            try {
                web3Instance.deserializeWallet(msg.password, wallet.encryptedWeb3Wallet)
                port.postMessage(JSON.stringify({sig: "submitPassword", result: true}));
            } catch (e) {
                port.postMessage(JSON.stringify({sig: "submitPassword", result: false}));
            }
        } else if (msg.sig === "haveWallet") {
            wallet.getEncryptedWeb3Wallet().then(() => {
                wallet.getEncryptedMnemonic().then(() => {
                    let haveWallet;
                    console.log(wallet.encryptedWeb3Wallet, wallet.encryptedMnemonic)
                    haveWallet = wallet.encryptedMnemonic !== undefined && wallet.encryptedWeb3Wallet !== undefined;
                    port.postMessage(JSON.stringify({sig: "haveWallet", haveWallet}));
                })
            })

        } else if (msg.sig === "setPassword") {
            wallet.setPassword(msg.password);
            port.postMessage(JSON.stringify({sig: "setPassword", setPassword: true}))
        } else if (msg.sig === "mnemonicConfirm") {
            try {
                wallet.saveMnemonic()
                let privateKey = wallet.createAccount();
                web3Instance.initWallet(privateKey);
                let password = wallet.getPassword();
                console.log(password);
                let encryptedWeb3Wallet = web3Instance.serializeWallet(wallet.getPassword());
                wallet.storeEncryptedWeb3Wallet(encryptedWeb3Wallet)
                console.log("wallet save");
                port.postMessage(JSON.stringify({sig: "mnemonicConfirm", result: true}))
            } catch (e) {
                console.log(e)
                port.postMessage(JSON.stringify({sig: "mnemonicConfirm", result: false}))
            }
        } else if (msg.sig === "generateMnemonic") {
            console.log("generate mnemonic")
            let mnemonic = wallet.createMnemonic();
            console.log(mnemonic)
            port.postMessage(JSON.stringify({
                sig: "generateMnemonic",
                mnemonic: mnemonic
            }))
        } else if (msg.sig === "getSelectedAccount") {
            web3Instance.getSelectedAccount().then((data) => {
                port.postMessage(JSON.stringify({sig: "getSelectedAccount", info: data}))
            })
        } else if (msg.sig === "currentNet") {
            port.postMessage(JSON.stringify({sig: "currentNet", net: web3Instance.currentNet}))
        } else if (msg.sig === "changeNet") {
            web3Instance.changeNet(msg.net)
            console.log("net changed");
            port.postMessage(JSON.stringify({sig: "changeNet", result: true}))
        } else if (msg.sig === "estimateGas") {
            web3Instance.estimateGas(msg.from, msg.to, msg.amount).then(estimatedGas => {
                    port.postMessage(JSON.stringify({
                        sig: "estimateGas",
                        estimatedGas
                    }))
                }
            )
        } else if (msg.sig === "sendTransaction") {
            web3Instance.sendTransaction(msg.from, msg.to, msg.amount).then(() => {
                port.postMessage(JSON.stringify({
                    sig: "sendTransaction",
                    result: true
                }))
            })
        }
        console.log(x, msg);
        x += 1;
    });
})

let x = 0;
