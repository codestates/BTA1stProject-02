

const bip39 = require("bip39");
const { hdkey } = require("ethereumjs-wallet");

const mnemonic = bip39.generateMnemonic();
console.log(`mnemonic is : "${mnemonic}"`);

(async () => {

    const password = 'abcd'
    const seed = await bip39.mnemonicToSeed(mnemonic); // seed === entropy
    const rootKey = hdkey.fromMasterSeed(seed)
    const hardenedKey = rootKey.derivePath("m/44'/60'/0'/0");
    console.log(`seed is ${seed.toString('hex')}`)

    console.log(`rootKey`)
    console.log(rootKey)

    const childKey = hardenedKey.deriveChild(password); // 값조정 가능
    const wallet = childKey.getWallet();
    const address = wallet.getAddress();
    const privateKey = wallet.getPrivateKey();

    console.log(`<CHILDKEY>`)
    console.log(childKey)

    console.log(`<WALLET IS>`)
    console.log(wallet)

    console.log(`[address] ${address.toString("hex")}`);
    console.log(`[privateKey] ${privateKey.toString("hex")}`);
    console.log('==============================================================================================')

})()


// const {hdkey, Wallet} = require('ethereumjs-wallet')
// const bip39 = require('bip39')
// const Web3 = require('web3')
// const web3 = new Web3()
//
//
//
// let password = '1234'
// let mnemonic = bip39.generateMnemonic()
// console.log(mnemonic)
//
// let seed = bip39.mnemonicToSeedSync(mnemonic)
// console.log(seed)
//
// let wallet = HDWallet.derivePath("m/44'/304'/0'")
//
// let encryptedWallet = web3.eth.accounts.wallet.encrypt(password)
// console.log(encryptedWallet)
// //
// web3.eth.accounts.wallet.clear()
// console.log(web3.eth.accounts.wallet)
//
// web3.eth.accounts.wallet.decrypt(encryptedWallet, "abcd")
// console.log(web3.eth.accounts.wallet)

// 크롬 스토리지에 encrypted 된 지갑 정보 저장

// getEncryptedWallet: 크롬 스토리지에 저장되어 있는 지갑 정보 가져오기
// createMnemonic: 새로운 랜덤 니모닉 생성
// createInitialAccout: 니모닉을 바탕으로 최초 계정 생성
// storeEncryptedWallet: 크롬 스토리지에 encrypted된 지갑정보 저장

// 크롬 스토리지에 encrypted 된 지갑 정보 저장

// getEncryptedWallet: 크롬 스토리지에 저장되어 있는 지갑 정보 가져오기
// createMnemonic: 새로운 랜덤 니모닉 생성
// createInitialAccout: 니모닉을 바탕으로 최초 계정 생성
// storeEncryptedWallet: 크롬 스토리지에 encrypted된 지갑정보 저장