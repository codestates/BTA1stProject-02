<template>
  <a-layout>
    <a-layout-header>
      <a-row>
        <a-col :span="16"><b>account</b></a-col>
        <a-col :span="8">{{ addressEllipsis(selectedAddress) }}</a-col>
      </a-row>
    </a-layout-header>
    <a-divider/>
    <a-layout-content>
      <div id="explorer">Explorer에서 계정 보기</div>
      <b id="balance">{{ selectedBalance }} {{ selectedToken }}</b>
      <div id="send-button">
        <a-button type="primary" shape="round">
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
  <a-button @click="test1">1</a-button>
  <a-button @click="test2">2</a-button>
  <a-button @click="test3">3</a-button>
</template>

<script>
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name:"accountComponent",
  setup() {
    let selectedAddress = ref("0x123454566778899");
    let selectedToken = ref("IOTX");
    let selectedBalance = ref("1000.1010101");
    let addressEllipsis = (address) => {
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }
    let test1 = () => {
      let sources = []
      let items = {key1: 1, key2: 2}
      sources.push(items)
      window.chrome.storage.local.set({"sources": sources}, function () {
        //콜백
        console.log("저장 되었습니다.")
      });
    }
    let test2 = () => {
      window.chrome.storage.local.get("sources", function (res) {
        let value1 = res.sources[0].key1
        let value2 = res.sources[0].key2
        console.log(value1, value2)
      });
    }
    let test3 = ()=>{
      let port = window.chrome.runtime.connect({
        name: "Sample Communication"
      });
      port.postMessage("Hi BackGround");
    }
    return {
      selectedAddress,
      addressEllipsis,
      selectedToken,
      selectedBalance,
      test1,
      test2,
      test3
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
