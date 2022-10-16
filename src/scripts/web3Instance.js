import Web3 from 'web3'
import p from "@/settings.json"
import {bech32} from 'bech32'
// getBalance address 에 대한 balance 가져오기
// transferToken 토큰 전송하기

const web3Instance = {
    init: function (currentNet) {
        console.log("web3 init!")
        this.web3 = new Web3();
        this.status = {
            locked: true
        }
        this.currentNet = currentNet
        this.web3.setProvider(p.netwokrs[currentNet])
        console.log(p.netwokrs[currentNet])
    },
    deserializeWallet: function (password, encryptedWeb3Wallet) {
        console.log("ppp", password, encryptedWeb3Wallet)
        this.status.locked = false;
        this.web3.eth.accounts.wallet.decrypt(encryptedWeb3Wallet, password);
        this.status.selectedAddress = this.web3.eth.accounts.wallet[0].address
    },
    initWallet: function (privateKey) {
        this.web3.eth.accounts.wallet.create(0);
        this.web3.eth.accounts.wallet.add(privateKey)
        this.status.locked = false;
    },
    serializeWallet: function (password) {
        return this.web3.eth.accounts.wallet.encrypt(password);
    },
    addressToIo: function (address) {
        let words = bech32.toWords(Buffer.from(address.substring(2), "hex"))
        return bech32.encode("io", words)
    },
    getSelectedAccount: async function () {
        let address = this.status.selectedAddress
        let balance = this.web3.utils.fromWei(await this.web3.eth.getBalance(address), "ether")
        let self = this;
        return new Promise((resolve,) => {
            chrome.storage.local.get(address, function (data) {
                resolve({
                        ethAddress: address,
                        ioAddress: self.addressToIo(address),
                        balance: balance,
                        transactions: data[address] || {}
                    }
                )
            })
        })

    },
    changeNet: function (net) {
        this.web3.setProvider(p.netwokrs[net])
        this.currentNet = net;
    }
    ,
    estimateGas: async function (from, to, amount) {
        console.log(from)
        if (to.startsWith("io")) {
            to = bech32.fromWords(bech32.decode(to).words)
        }
        console.log(from)
        console.log("estimateGas")
        let estimatedGas = await this.web3.eth.estimateGas({
            from,
            to,
            value: this.web3.utils.toWei(amount, "ether")
        })
        let gasPrice = await this.web3.eth.getGasPrice()
        console.log(estimatedGas, gasPrice)
        estimatedGas = this.web3.utils.toBN(estimatedGas)
        gasPrice = this.web3.utils.toBN(gasPrice)
        let fee = estimatedGas.mul(gasPrice)
        return this.web3.utils.fromWei(fee, "ether")
    }
    ,
    sendTransaction: async function (from, to, amount) {
        console.log(from)
        if (to.startsWith("io")) {
            to = bech32.fromWords(bech32.decode(to).words)
        }
        console.log(from)
        console.log("sendTransaction")
        let receipt = await this.web3.eth.sendTransaction({
            from,
            to,
            value: this.web3.utils.toWei(amount, "ether"),
            gas: 21000
        });
        await this.saveTransaction(receipt)
        return receipt
    }
    ,
    saveTransaction: async function (receipt) {
        let value = (await this.web3.eth.getTransaction(receipt.transactionHash)).value
        let tx = {
            txHash: receipt.transactionHash,
            blockNumber: receipt.blockNumber,
            from: receipt.from,
            to: receipt.to,
            value: this.web3.utils.fromWei(value, "ether")
        }
        let self = this
        return new Promise((resolve,) => {
            this.getSelectedAccount().then((account) => {
                chrome.storage.local.get([account.ethAddress], function (data) {
                    let transactions = data[account.ethAddress].mainnet === undefined ? {
                        mainnet: [],
                        testnet: []
                    } : data[account.ethAddress]
                    console.log(transactions)
                    transactions[self.currentNet].push(tx)
                    let d = {}
                    d[account.ethAddress] = transactions
                    chrome.storage.local.set(d, function () {
                        resolve()
                    })
                })
            })
        })
    }
}
export default web3Instance;
