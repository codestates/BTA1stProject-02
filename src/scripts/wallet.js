import Web3 from 'web3'
import p from "@/settings.json"

const web3Instance = {
    init: function (currentNet) {
        this.web3 = new Web3();
        this.status = {
            locked: true
        }
        this.web3.setProvider(p.netwokrs[currentNet])
        console.log(p.netwokrs[currentNet])
    },
    decryptWallet: function(password, encryptedWallet){
        console.log(password, encryptedWallet)
    }
}
export default web3Instance;
