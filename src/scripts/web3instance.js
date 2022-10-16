import Web3 from 'web3'
import p from "@/settings.json"
// getBalance: address에 대한 balance 가져오기
// transferToken: 토큰 전송
//

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

// 니모닉 가져오기, 지갑 생성
