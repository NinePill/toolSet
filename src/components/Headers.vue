<script setup>
import {computed, watch} from 'vue'
import {isSetting} from "@/stores/oneStores.js";


const useSetting = isSetting()
// 直接使用 store 中的状态
const inPutHeaders = computed({
  get: () => useSetting.inPutHeaders,
  set: (value) => useSetting.updateinPutHeaders(value)
})

const outPutHeaders = computed({
  get: () => useSetting.outPutHeaders,
})

// 使用 watch 来侦听 inPutHeaders 的变化并转换输出
watch(inPutHeaders, (newValue) => {
  useSetting.updateoutPutHeaders(headersTransform(newValue))
})

function headersTransform(inputText) {
    if (!inputText.trim()) {
        return '';
    }
    let headerDict = {};
    let lastKey = null;
    let splitStrList = inputText.split("\n");
    for (let index = 0; index < splitStrList.length; index++) {
        if (splitStrList[index].endsWith(":")) {
            splitStrList[index] = splitStrList[index] + splitStrList[index + 1];
            splitStrList[index + 1] = "";
        }
    }
    let formatList = splitStrList.filter(x => x);
    for (let line of formatList) {
        if (line.trim() === "") {
            continue;
        }
        if (/[A-Za-z0-9\-]+:/.test(line)) {
            let colonIndex = line.indexOf(':')
            lastKey = line.substring(0, colonIndex).trim();
            headerDict[lastKey] = line.substring(colonIndex + 1).trim();
        } else if (lastKey != null) {
            headerDict[lastKey] += line.trim();
        }
    }
    return JSON.stringify(headerDict, null, 4)
}

// 点击复制按钮时调用的函数
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      // 复制成功时的处理
      ElNotification({
          title: 'Success',
          message: '结果已复制到剪贴板',
          type: 'success',
          duration: 1000,

        });
    })
    .catch((error) => {
      // 复制失败时的处理
      console.error('无法访问剪贴板:', error);
    });
}

const clearall = () => {
  inPutHeaders.value = ''
  useSetting.updateoutPutHeaders(''); // 清空 outPutHeaders
}
</script>

<template>
  <div class="input-and-output">
    <el-input
    v-model="inPutHeaders"
    style="width: 700px"
    :rows="30"
    type="textarea"
    resize="none"
    placeholder="Please input..."
    class="inPut"
  />

    <el-input
    v-model="outPutHeaders"
    style="width: 700px"
    :rows="30"
    type="textarea"
    resize="none"
    placeholder=""
    class="outPut"
  />
  </div>

  <div class="input-and-output-option">
    <el-button type="primary" class="del-class" @click="clearall">清空所有</el-button>
    <el-button type="success" class="copy-class" @click="copyToClipboard(outPutHeaders)">复制结果</el-button>
  </div>

</template>

<style scoped>
.del-class {
  margin-right: 20px;
}
.copy-class {
  margin-left: 20px;
}
.input-and-output{
  display: flex;
  justify-content: center;
}
.inPut{
  margin-right: 20px;
}
.outPut{
  margin-left: 20px;
}
.input-and-output-option {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>