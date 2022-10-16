<template>
  <div class="main_app" v-if="!haveWallet">
    <div v-if="!setPassword">
      <set-password @set-password-event="setPasswordFunc"/>
    </div>
    <div v-else>
      <create-mnemonic @generate-mnemonic-event="generatedMnemonic"/>
    </div>
  </div>
  <div class="main_app" v-else>

    <div v-if="locked === true">
      <unlock @unlock-event="unlock"/>
    </div>
    <div v-else-if="locked===false">
        <account-view/>
    </div>
  </div>
</template>

<script>
import accountView from "@/components/account";
import unlock from "@/components/unlock";
import setPassword from "@/components/setPassword";
import {ref} from "vue";
import CreateMnemonic from "@/components/createMnemonic";

export default {
  name: 'popupView',
  setup() {
    let port = window.chrome.runtime.connect({
      name: "popup channel"
    });
    port.onMessage.addListener(function (res) {
      res = JSON.parse(res)
      console.log(res)
      console.log("received")
      if (res.sig === "haveWallet") {
        haveWallet.value = res.haveWallet
        console.log("haveWallet", haveWallet)
        if (haveWallet.value) {
          port.postMessage({sig: "getStatus"});
        }
      } else if (res.sig === "getStatus") {
        console.log("status", res)
        locked.value = res.status.locked
      } else if (res.sig === "setPassword") {
        console.log(setPassword)
        setPassword.value = res.setPassword
      }
    })
    port.postMessage({sig: "haveWallet"});

    let locked = ref(true);
    let haveWallet = ref(false);
    let setPassword = ref(false);
    let unlock = () => {
      console.log("unlocked")
      locked.value = false;
    }
    let setPasswordFunc = () => {
      console.log("password set")
      setPassword.value = true;
    }
    let generatedMnemonic = () => {
      haveWallet.value = true;
      locked.value = false;
    }
    return {
      locked,
      unlock,
      haveWallet,
      setPassword,
      setPasswordFunc,
      generatedMnemonic
    }
  },
  components: {
    CreateMnemonic,
    accountView,
    unlock,
    setPassword,

  }
}

</script>

<style scoped>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*margin-top: 60px;*/
  width: 357px;
  height: 600px;
}

.ant-layout-header {
  background-color: white;
  padding: 0;
  height: 46px;
}

.ant-divider-horizontal {
  margin: 0;
}

</style>
