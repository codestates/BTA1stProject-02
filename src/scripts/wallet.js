// storeEncryptedWallet 크롬 스토리지에 encrypted된 지갑정보 저장
// getEncryptedWallet 크롬 스토리지에 저장되어 있는 지갑정보 가져오기
// createMnemonic 새로운 랜덤 니모닉 생성
// createInitialAccount 니모닉을 바탕으로 최초 계정 생성
// hasWallet 이미 생성된 지갑이 있는지 확인
import {generateMnemonic, mnemonicToSeedSync} from "bip39"
import {hdkey} from "ethereumjs-wallet";
import CryptoJS from "crypto-js";

const wallet = {
    init: function () {
        let self = this;
        chrome.storage.local.get(['encryptedWeb3Wallet'], (data) => {
            self.encryptedWeb3Wallet = data.encryptedWeb3Wallet
        })

        chrome.storage.local.get(['encryptedMnemonic'], (data) => {
            self.encryptedMnemonic = data.encryptedMnemonic;
        })

        chrome.storage.local.get(['hdPath'], (data) => {
            self.hdPath = data.hdPath || "m/44'/304'/0'/0";
        })
    },
    setPassword: function (password) {
        this.password = password;
    },
    decryptMnemonic: function () {
        this.mnemonic = CryptoJS.AES.decrypt(this.encryptedMnemonic, this.password);
    },
    storeEncryptedWeb3Wallet: function (encryptedWeb3Wallet) {
        chrome.storage.local.set({encryptedWeb3Wallet})
    },
    createMnemonic: function () {
        this.mnemonic = generateMnemonic();
        console.log(this.mnemonic);
        return this.mnemonic;
    },
    saveMnemonic: function () {
        this.encryptedMnemonic = CryptoJS.AES.encrypt(this.mnemonic, this.password);
        chrome.storage.local.set({encryptedMnemonic: this.encryptedMnemonic})
    },
    createAccount: function () {
        let HDWallet = hdkey.fromMasterSeed(mnemonicToSeedSync(this.mnemonic))
        let path = this.hdPath.split('/')
        path[path.length - 1] = (parseInt(path[path.length - 1]) + 1).toString();
        this.hdPath = path.join('/')
        chrome.storage.local.set({hdPath: this.hdPath})
        return HDWallet.derivePath(this.hdPath).getWallet().getPrivateKeyString();
    },
    getPassword: function () {
        return this.password
    },
    getEncryptedMnemonic: function () {
        let self = this;
        return new Promise((resolve,) => {
            chrome.storage.local.get(['encryptedMnemonic'], (data) => {
                self.encryptedMnemonic = data.encryptedMnemonic;
                resolve()
            })
        })
    },
    getEncryptedWeb3Wallet: function () {
        let self = this;
        return new Promise((resolve,) => {
            chrome.storage.local.get(['encryptedWeb3Wallet'], (data) => {
                self.encryptedWeb3Wallet = data.encryptedWeb3Wallet;
                resolve()
            })
        })
    }
}
export default wallet;
