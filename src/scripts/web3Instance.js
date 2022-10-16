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
    getSelectedAddress: async function () {
        let address = this.status.selectedAddress
        let balance = this.web3.utils.fromWei(await this.web3.eth.getBalance(address), "ether")
        return {
            ethAddress: address,
            ioAddress: this.addressToIo(address),
            balance: balance,
            transactions: []
        }
    },
    changeNet: function (net) {
        this.web3.setProvider(p.netwokrs[net])
        this.currentNet = net;
    },
    getAccountList: function () {
        let accounts = this.web3.eth.getAccounts()
        let accountsBalance = []
        const array1 = ['a', 'b']
        array1.forEach(function(address) {
            console.log(address)
            // let balance = this.web3.eth.getBalance(address)
            // accountsBalance.push(balance)
        });
        return {
            accountList: accounts,
            accountBalance: accountsBalance
            // dummy: "123"
        }
    }
}
export default web3Instance;
