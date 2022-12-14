# BTA1stProject-02

---
# 1. 팀 소개
- 팀 명: 리모트 듀오
- 팀 구성:
  - 팀장: 황인철 (지갑 작동 Flow 설계, 크롬 익스텐션 개발)
  - 팀원: 전종민 (IoTeX 및 백엔드 라이브러리 리서치, 프로젝트 문서 작성)
  - 프로젝트명: HIOTEX


![demo_1](./image/demo_1.png)
|:--:|
| 니모닉 지갑 생성 |
![demo_2](./image/demo_2.png)
| 계정별 잔액조회 및 송금 |

# 2. 선정 코인 소개(IoTex)
## 2.1. 개요
- IoTeX는 블록체인을 이용하여 탈중앙화 사물인터넷(Internet of Things, IoT) 플랫폼을 구축하고자 합니다.
- IoTex는 사물인터넷에 토큰 경제를 도입하여 기여도에 따른 인센티브 지급 및 블록체인을 이용한 자동 확장, 개인정보 보호, 상호작용이 가능한 사물인터넷 생태계를 구축합니다.

## 2.2. 알고리즘 및 특징
### 이더리움 가상 머신(EVM 호환)
- IoTeX 블록체인은 **이더리움 가상 머신(EVM)과 호환되어 개발자가 IoTeX에서 Solidity 기반 스마트 계약을 구축/변환** 할 수 있도록 해줍니다.

### Roll-DPoS 합의 알고리즘
- DPoS(Delegated Proof of Stake)의 변형인 Roll-DPoS 합의 알고리즘을 사용 합니다.
- Roll-DPoS는 DPoS 합의 알고리즘의 모든 장점을 상속 합니다.
- 고정된 수의 대리인을 사용하는 기존 DPoS와 달리 Roll-DPoS는 커뮤니티 상위 36명 중 24명을 **매시간 무작위로 선택하여 채굴하기 때문에 보안이 크게 향상** 됩니다.
- 블록 생성 시간: 5초

### IoT 장비의 탈중앙화 신원 증명(Decentralized Identity, DID)
- 사람만을 위한 DID에 초점을 맞춘 다른 블록체인 플랫폼과 달리 **IoTeX는 사람과 기기 모두를 위한 고유한 DID 시스템**을 개발했습니다.
- 이를 통해 사람과 IoT 장비가 IoTeX를 통해 직접 거래 할 수 있습니다.

## 2.3. IoTeX를 선택한 이유
### 향후 빗썸 상장  가능성
- 2022년 10월 16일 coinmarketcap 기준 **시가총액 약 3,600억원, 110위권**의 핫한 코인 입니다.
    - 2021년 11월에는 시가총액 2.6조원에 1일 거래액 9,000억원 까지 갔었습니다.
### 사물인터넷 시장 확대
- 2025년 까지 750억 개 이상의 스마트 기기가 사물인터넷(IoT)으로 연결될 것으로 기대하고 맥킨지(McKinsey)는 2025년 사물인터넷 시장을 $ 11조 (한화 1,500조원 이상) 이상으로 전망합니다.
    - 출처: [https://www.mckinsey.com/featured-insights/internet-of-things/how-we-help-clients](https://www.mckinsey.com/featured-insights/internet-of-things/how-we-help-clients)
- IoTeX 는 고유한 DID 시스템을 기반으로 성장하는 사물인터넷 시장에서 활용될 수 있는 암호화폐라고 생각합니다.
### 낮은 진입장벽(EVM 호환)과 빠른 블록 생성 속도 (5초)
- EVM과 호환되어 블록체인 개발자들의 진입장벽이 낮고 블록 생성 시간이 짧기(5초) 때문에 향후 여러 곳에서 활용될 것이라고 생각합니다.


# 3. 프로젝트 소개

## 3.1.개요
- HIOTEX 프로젝트는 **크롬 익스텐션 기반 IoTeX 블록체인 지갑**을 제공 합니다.

## 3.2.핵심 기능
- 니모닉 코드 생성
- 신규 지갑 주소 발급
- 로그인 및 지갑 가져오기
- 잔액 조회
- 송금

## 3.3. 차별점
- 보편화 되고 사용하기 편한 사용자 지갑 개발 (크롬 익스텐션)
- 잠금 기능
    
    
# 4. 프로젝트 상세
## 니모닉 코드 생성 및 신규 지갑 주소 발급
- bip39 패키지의 generateMnemonic() 함수로 니모닉 코드 12자리를 생성하고, 사용자 비밀번호로 지갑정보를 암호화해 저장합니다.
![create_mnemonic](./image/demo_1.png)

## 지갑 목록 가져오기 및 잔액 조회
- 계정관리 메뉴 이동 후 생성 버튼을 클릭하여 신규 계정을 생성합니다.
![create_mnemonic](./image/accounts_list.png)

## 송금
- 전송 메뉴로 이동하여 받는사람 주소와 수량을 입력 하여 코인을 전송합니다.
- 트랜잭션 내역을 확인할 수 있습니다.
![create_mnemonic](./image/transaction.png)

## 잠금 화면
![lock](./image/lock.png)

## 기술 스택
![tech_stack](./image/tech_stack.png)
