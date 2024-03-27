<script setup>
import {computed, watch} from 'vue'
import {isSetting} from "@/stores/oneStores.js";


const useSetting = isSetting()
// 直接使用 store 中的状态
const inPutCookies = computed({
  get: () => useSetting.inPutCookies,
  set: (value) => useSetting.updateinPutCookies(value)
})

const outPutCookies = computed({
  get: () => useSetting.outPutCookies,
})

// 使用 watch 来侦听 inPutCookies 的变化并转换输出
watch(inPutCookies, (newValue) => {
  useSetting.updateoutPutCookies(cookieTransform(newValue))
})

function cookieTransform(inputText) {

// 如果输入为空，将输出清空并返回
    if (!inputText.trim()) {
        return '';
    }

    const cookies = inputText.split(';').reduce((acc, line) => {
        const [key, value] = line.split('=');
        if (key && value) {
            acc[key.trim()] = value.trim();
        }
        return acc;
    }, {});

    return JSON.stringify(cookies, null, 2);
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
  inPutCookies.value = ''
  useSetting.updateoutPutCookies(''); // 清空 outPutCookies
}
</script>

<template>
  <div class="input-and-output">
    <el-input
    v-model="inPutCookies"
    style="width: 700px"
    :rows="30"
    type="textarea"
    resize="none"
    placeholder="Please input..."
    class="inPut"
  />

    <el-input
    v-model="outPutCookies"
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
    <el-button type="success" class="copy-class" @click="copyToClipboard(outPutCookies)">复制结果</el-button>
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