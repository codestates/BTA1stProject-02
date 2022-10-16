<template>
  <div class="create-mnemonic">
    <div class="description">비밀 백업 구문을 이용하면 계정을 쉽게 백업하고 복구할 수 있습니다.</div>
    <div class="alert"> 경고: 비밀 복구 구문은 절대로 공개하지 마세요. 이 구문이 있는 사람은 귀하의 IOTX를 영원히 소유할 수 있습니다.</div>
    <div class="mnemonic">
      {{ mnemonic }}
    </div>
    <div class="confirm-button">
      <a-button type="primary" shape="round" @click="confirm" style="width:100%">
        안전한 곳에 보관했습니다.
      </a-button>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "createMnemonic",
  setup(props, context) {
    let port = window.chrome.runtime.connect({
      name: "mnemonic channel"
    });
    port.onMessage.addListener(function (res) {
      res = JSON.parse(res);
      if (res.sig === "mnemonicConfirm") {
        if(res.result){
          console.log("success")
          context.emit("generate-mnemonic-event")
        }
      } else if (res.sig === "generateMnemonic") {
        mnemonic.value = res.mnemonic;
      }
    })
    port.postMessage({sig: "generateMnemonic"})
    let mnemonic = ref("")
    let confirm = () => {
      port.postMessage({sig: "mnemonicConfirm"});
    }
    return {
      confirm,
      mnemonic
    }
  }
}
</script>

<style scoped>
.create-mnemonic {
  padding: 20px;
  margin: auto;
}

.description {
  padding-top: 130px;
}

.alert {
  padding-top: 30px;
  padding-bottom: 30px;
}

.mnemonic {
  border-radius: 10px;
  border: 1px solid lightgray;
  width: 70%;
  margin: auto;
  padding: 10px;
}

.confirm-button {
  padding-top: 104px;
}
</style>
