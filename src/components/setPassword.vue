<template>
  <div class="set-password">
    <div class="description">
      계정에 접근하기 위해 사용될 고유한 비밀번호를 설정하세요.
    </div>
    <div class="sub">비밀번호 입력</div>
    <a-input-password v-model:value="password1" placeholder="비밀번호를 입력하세요"/>
    <div class="sub">비밀번호 확인</div>
    <a-input-password v-model:value="password2" placeholder="비밀번호를 입력하세요"/>
    <div class="confirm-button">
      <a-button type="primary" shape="round" @click="setPassword" style="width:100%">
        확인
      </a-button>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "setPassword",
  setup(props, context) {
    let password1 = ref("")
    let password2 = ref("")
    let setPassword = () => {
      if (password1.value === password2.value) {
        let port = window.chrome.runtime.connect({
          name: "setPassword channel"
        });
        port.onMessage.addListener(function (res) {
          res = JSON.parse(res)
          if (res.sig === "setPassword") {
            context.emit("set-password-event");
          }
        });
        port.postMessage({sig: "setPassword", password: password1});

      }
    }
    return {
      password1,
      password2,
      setPassword
    }
  }
}
</script>

<style scoped>
.set-password {
  padding: 20px;
}

.sub {
  padding: 10px;
}

.description {
  padding-top: 100px;
  padding-bottom: 50px;
}

.confirm-button {
  padding-top: 150px;
}
</style>
