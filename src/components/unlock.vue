<template>
  <div class="main_app">
    <div class="title"><b>HIOTEX가 잠김 상태입니다.</b></div>
    <div class="sub">비밀번호 입력</div>
    <a-input-password v-model:value="password" placeholder="비밀번호를 입력하세요" v-if="err === false"/>
    <a-input-password v-model:value="password" placeholder="비밀번호를 입력하세요" v-else-if="err === true"
                      style="border-color: red"/>
    <a-button type="primary" shape="round" @click="submitPassword" style="width:100%">
      잠금해제
    </a-button>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "unlockComponent",
  setup(props, context) {
    console.log(context)
    let password = ref("")
    let submitPassword = () => {
      console.log(password.value)
      let port = window.chrome.runtime.connect({
        name: "submit password"
      });
      port.onMessage.addListener((res) => {
        let result = JSON.parse(res).result;
        if (result) {
          context.emit('unlock-event', true);
        } else {
          console.log("fail")
          err.value = true;
        }
      })
      port.postMessage({sig: "submitPassword", password: password.value})

    }
    let err = ref(false);
    return {
      password,
      submitPassword,
      err
    }
  }
}
</script>

<style scoped>
.main_app {
  padding: 53px;
}

.title {
  font-size: 1.3em;
  margin-bottom: 100px;
  margin-top: 100px;
}

.ant-btn {
  margin-top: 200px;
  font-size: 1.1em;
}

.err {
  color: red;
  margin-top: 10px;
}
</style>
