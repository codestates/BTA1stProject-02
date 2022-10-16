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
        <a-select-option value="mainNet">메인넷</a-select-option>
        <a-select-option value="testNet">테스트넷</a-select-option>
      </a-select>
    </a-col>
    <a-col :span="8">
      logo
    </a-col>
    <a-col :span="8">
      a
    </a-col>
  </a-row>
</template>

<script>
import {ref} from "vue";

export default {
  name: "headerComponent",
  setup() {
    let currentNet = ref("mainNet");
    const focus = function () {

    }
    const handleChange = (value) => {
      currentNet = value
    };
    return {
      currentNet,
      focus,
      handleChange
    }

  }
}
</script>

<style scoped>
.ant-row, .ant-col {
  line-height: 46px;
  vertical-align: top;
}
</style>
