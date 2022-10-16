<template>
  <div class="main_app">
    <div v-if="locked === true">
      <unlock @unlock-event="unlock"/>
    </div>
    <a-layout v-else-if="locked===false">
      <a-layout-header>
        <headerComponent/>
      </a-layout-header>
      <a-divider/>
      <a-layout-content style="background-color: white">
        <account-view/>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import accountView from "@/components/account";
import headerComponent from "@/components/header"
import unlock from "@/components/unlock";
import {ref} from "vue";

export default {
  name: 'popupView',
  setup() {
    let port = window.chrome.runtime.connect({
      name: "get status"
    });
    port.onMessage.addListener(function (status) {
      console.log("status: ", status)
      locked.value = Boolean(JSON.parse(status).locked)
      console.log("locked: ", locked.value)
    })
    port.postMessage({sig: "getStatus"});

    let locked = ref(true)

    let unlock = () => {
      console.log("unlocked")
      locked.value = false;
    }
    return {
      locked,
      unlock
    }
  },
  components: {
    accountView,
    headerComponent,
    unlock
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
