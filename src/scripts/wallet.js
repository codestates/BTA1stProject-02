import Web3 from 'web3'
import p from "@/settings.json"


// 크롬 스토리지에 encrypted 된 지갑 정보 저장

// getEncryptedWallet: 크롬 스토리지에 저장되어 있는 지갑 정보 가져오기
// createMnemonic: 새로운 랜덤 니모닉 생성
// createInitialAccout: 니모닉을 바탕으로 최초 계정 생성
// storeEncryptedWallet: 크롬 스토리지에 encrypted된 지갑정보 저장

/*

# 비밀번호생성
# 니모닉 생성 후 알려줌
# 니모닉을 가지고 이더리움 JS월렛

# 000
# 니모닉 생성, 키페어 생성은 하나로

# 키페어 생성
# Web3 월렛에 등록
# 패스워드로 인크립트하고
# 크롬 스토리지에 저장
 */



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
