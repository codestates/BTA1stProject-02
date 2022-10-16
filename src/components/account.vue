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
      logo
    </a-col>
    <a-col :span="8">
      a
    </a-col>
  </a-row>
  <a-divider/>
  <a-layout v-if="!transfer">
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
      </div>
    </a-layout-content>
  </a-layout>
  <a-layout v-else>
    <a-layout-header>
      <a-row>
        <a-col :span="16">
          <a-button type="primary" :size="size">
            <template #icon>
              <DownloadOutlined/>
            </template>
          </a-button>
        </a-col>
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
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: "accountComponent",
  setup() {
    let port = window.chrome.runtime.connect({
      name: "account channel"
    });
    port.onMessage.addListener((res) => {
      res = JSON.parse(res);
      if (res.sig === "getSelectedAccount") {
        account.value = res.info
      } else if (res.sig === "currentNet") {
        currentNet.value = res.net;
      } else if (res.sig === "changeNet") {
        port.postMessage({sig: "getSelectedAccount"});
        port.postMessage({sig: "currentNet"})
      }
    })
    let account = ref({})
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
    let size = ref("small")
    return {
      addressEllipsis,
      currentNet,
      handleChange,
      account,
      transfer,
      transferClick,
      size
    }
  },

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
</style>
