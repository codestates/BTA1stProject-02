<template>
  <a-row>
    <a-col :span="8">
      <a-select
          ref="select"
          v-model:value="currentNet"
          style="width: 100px;"
          @focus="focus"
          @change="handleChange"
      >
        <a-select-option value="mainnet">메인넷</a-select-option>
        <a-select-option value="testnet">테스트넷</a-select-option>
      </a-select>
    </a-col>
    <a-col :span="8">
      <img src="@/assets/hiotex_logo3.png"/>
    </a-col>
    <a-col :span="8">
      <a-button @click="accountView">
        <template #icon>
          <UserSwitchOutlined/>
        </template>
      </a-button>
      <a-button>
        <template #icon>
          <LockOutlined/>
        </template>
      </a-button>
    </a-col>
  </a-row>
  <a-divider/>
  <div class="manage-account" v-if="manageAccount">
    <b>계정 관리</b>
    <div class="accounts">
      <a-list item-layout="horizontal" :data-source="accounts">
        <template #renderItem="{ item }">
          <a-list-item @click="changeAccount(item.ethAddress)">
            <p>{{ addressEllipsis(item.ioAddress) }}</p>
            <p>{{ item.balance }} IOTX</p>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <div class="account-buttons">
      <a-button type="primary" shape="round" style="width: 100%" @click="createAccount">
        생성
      </a-button>
    </div>
  </div>
  <div v-else>
    <a-layout v-if="!transfer && !transferConfirm">
      <a-layout-header>
        <a-row>
          <a-col :span="16"><b>account</b></a-col>
          <a-col :span="8">{{ addressEllipsis(account.ioAddress) }}</a-col>
        </a-row>
      </a-layout-header>
      <a-divider/>
      <a-layout-content>
        <div id="explorer">Explorer에서 계정 보기</div>
        <b id="balance">{{ account.balance }} IOTX</b>
        <div id="send-button">
          <a-button type="primary" shape="round" @click="transferClick">
            전송
          </a-button>
        </div>
        <a-divider/>
        <div id="transaction-list">
          <div class="transaction-list-name">
            <b>트랜잭션 내역</b>
          </div>
          <a-list item-layout="horizontal" :data-source="account.transactions[currentNet]">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-card :title="'#'+item.txHash" style="width:100%">
                  <div>
                    from:{{ addressEllipsis(item.from) }}
                    <br/>
                    to:{{ addressEllipsis(item.to) }}
                    <br/>
                    value:{{ item.value }}
                  </div>
                </a-card>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </a-layout-content>
    </a-layout>
    <a-layout v-else-if="transfer&&!transferConfirm">
      <a-layout-header>
        <a-row :gutter="24">
          <a-col :span="3">
            <a-button :size="size" class="back-button" @click="backToAccount">
              <template #icon>
                <LeftOutlined/>
              </template>
            </a-button>
          </a-col>
          <a-col :span="18">IOTX 전송</a-col>
          <a-col :span="3"></a-col>
        </a-row>
      </a-layout-header>
      <a-divider/>
      <a-layout-content>
        <div class="transfer-form">
          <a-row>
            <a-col :span="7">
              보내는사람
            </a-col>
            <a-col :span="17">
              <a-input v-model:value="from" placeholder="" disabled="true"/>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="7">
              받는사람
            </a-col>
            <a-col :span="17">
              <a-input v-model:value="to" placeholder=""/>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="7">
              수량
            </a-col>
            <a-col :span="17">
              <a-input v-model:value="amount" placeholder=""/>
            </a-col>
          </a-row>
          <div class="transfer-next">
            <a-button type="primary" shape="round" style="width: 100%" @click="transferNext">
              다음
            </a-button>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
    <a-layout v-if="!transfer&&transferConfirm">
      <a-layout-header>
        <a-row :gutter="24">
          <a-col :span="3">
            <a-button :size="size" class="back-button" @click="backToTransfer">
              <template #icon>
                <LeftOutlined/>
              </template>
            </a-button>
          </a-col>
          <a-col :span="18">IOTX 전송</a-col>
          <a-col :span="3"></a-col>
        </a-row>
      </a-layout-header>
      <a-divider/>
      <a-layout-content>
        <div class="transfer-form">
          <a-row>
            <a-col :span="7">
              보내는사람
            </a-col>
            <a-col :span="17">
              <a-input v-model:value="from" placeholder="" disabled="true"/>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="7">
              받는사람
            </a-col>
            <a-col :span="17">
              <a-input v-model:value="to" placeholder="" disabled="true"/>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="7">
              수량
            </a-col>
            <a-col :span="17">
              <a-input v-model:value="amount" placeholder="" disabled="true"/>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="7">
              예상 수수료
            </a-col>
            <a-col :span="17">
              <a-input v-model:value="estimatedGas" placeholder="" disabled="true"/>
            </a-col>
          </a-row>
          <div class="transfer-confirm">
            <a-button type="primary" shape="round" style="width: 100%" @click="sendTransaction">
              전송
            </a-button>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import {LeftOutlined, UserSwitchOutlined, LockOutlined} from '@ant-design/icons-vue';

export default defineComponent({
  name: "accountComponent",
  setup() {

    let port = window.chrome.runtime.connect({
      name: "account channel"
    });
    port.onMessage.addListener((res) => {
      res = JSON.parse(res);
      if (res.sig === "getSelectedAccount") {
        account.ethAddress = res.info.ethAddress
        account.ioAddress = res.info.ioAddress
        account.balance = res.info.balance
        account.transactions = res.info.transactions
        account.transactions.mainnet.reverse()
        account.transactions.testnet.reverse()
        from.value = addressEllipsis(account.ioAddress)
        console.log(res.info.transactions)
      } else if (res.sig === "currentNet") {
        currentNet.value = res.net;
      } else if (res.sig === "changeNet") {
        port.postMessage({sig: "getSelectedAccount"});
        port.postMessage({sig: "currentNet"})
      } else if (res.sig === "estimateGas") {
        estimatedGas.value = res.estimatedGas + " IOTX";
      } else if (res.sig === "sendTransaction") {
        port.postMessage({sig: "getSelectedAccount"});
      } else if (res.sig === "getAccountList") {
        accounts.value = res.accounts
        console.log(accounts)
      } else if (res.sig === "changeAccount") {
        port.postMessage({sig: "getSelectedAccount"});
      } else if (res.sig === "createAccount") {
        port.postMessage({sig: "getSelectedAccount"});
      }
    })
    let accounts = ref([])
    let accountView = () => {
      manageAccount.value = true;
      port.postMessage({sig: "getAccountList"})
    }
    let account = reactive({
      ethAddress: "",
      ioAddress: "",
      balance: "",
      transactions: ""
    })
    port.postMessage({sig: "getSelectedAccount"});
    port.postMessage({sig: "currentNet"})

    let addressEllipsis = (address) => {
      if (address === undefined)
        return "";
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }
    let currentNet = ref("mainnet");
    const handleChange = (value) => {
      port.postMessage({sig: "changeNet", net: value});
    };
    let transfer = ref(false)
    let transferClick = () => {
      transfer.value = true;
    }
    let size = ref("large")
    let backToAccount = () => {
      transfer.value = false;
      to.value = ""
      amount.value = ""
    }
    let transferConfirm = ref(false)
    let to = ref("")
    let amount = ref("")
    let from = ref("")
    let transferNext = () => {
      transfer.value = false
      transferConfirm.value = true
      port.postMessage({sig: "estimateGas", from: account.ethAddress, to: to.value, amount: amount.value})
    }
    let estimatedGas = ref("")
    let backToTransfer = () => {
      transfer.value = true
      transferConfirm.value = false
    }
    let sendTransaction = () => {
      transfer.value = false
      transferConfirm.value = false
      port.postMessage({sig: "sendTransaction", from: account.ethAddress, to: to.value, amount: amount.value})
      to.value = ""
      amount.value = ""
    }
    let manageAccount = ref(false)
    let changeAccount = (address) => {
      manageAccount.value = false;
      port.postMessage({sig: "changeAccount", address: address})
    }
    let createAccount = () => {
      manageAccount.value = false;
      port.postMessage({sig: "createAccount"})
    }
    return {
      createAccount,
      changeAccount,
      accountView,
      addressEllipsis,
      currentNet,
      handleChange,
      account,
      transfer,
      transferClick,
      size,
      backToAccount,
      from,
      to,
      amount,
      transferConfirm,
      transferNext,
      estimatedGas,
      backToTransfer,
      sendTransaction,
      manageAccount,
      accounts
    }
  },
  components: {
    LeftOutlined,
    UserSwitchOutlined,
    LockOutlined
  }
});
</script>

<style scoped>
.ant-layout-header {
  background-color: #f0f2f5;
  padding: 0;
  height: 50px;
}

.ant-layout-content {
  background-color: white;
  padding: 20px;
}

.ant-divider-horizontal {
  margin: 0;
}

.ant-row, .ant-col {
  height: 50px;
  line-height: 50px;
}


.ant-col-16 {
  text-align: left;
  padding-left: 30px;
}

#balance {
  font-size: 2em;
}

#explorer {
  text-align: end;
  margin-bottom: 20px;
}

#send-button {
  margin-top: 20px;
  margin-bottom: 20px;
}

#transaction-list {
  margin-top: 20px;
}

.transaction-list-name {
  text-align: start;
}


.back-button {
  background-color: inherit;
  border: none;
}

.ant-input {
  width: 100%;
  border-radius: 10px;
}

.transfer-next {
  padding-top: 250px;
}

.transfer-confirm {
  padding-top: 220px;
}

.manage-account {
  padding: 20px;
}

.accounts {
  height: 400px;
}

.account-buttons {
  padding-top: 30px;
}
</style>
