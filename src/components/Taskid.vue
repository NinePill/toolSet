<script setup>
import {computed, watch} from 'vue'
import {isSetting} from "@/stores/oneStores.js";


const useSetting = isSetting()
// 直接使用 store 中的状态
const inPutTaskid = computed({
  get: () => useSetting.inPutTaskid,
  set: (value) => useSetting.updateinPutTaskid(value)
})

const outPutTaskid = computed({
  get: () => useSetting.outPutTaskid,
})

// 使用 watch 来侦听 inPutTaskid 的变化并转换输出
watch(inPutTaskid, async (newValue) => {
  try {
    const result = await dataTransform(newValue);
    useSetting.updateoutPutTaskid(result);
  } catch (error) {
    console.error('Error in curlTransform:', error);
  }
});

function dataTransform(inputText) {
    return new Promise((resolve, reject) => {
        inputText = inputText.trim();
        if (!inputText) {
            return;
        }
        const url = import.meta.env.VITE_CENTER_API + '/tool/d/';
        fetch(url + inputText)
            .then(response => {
                if (response.ok) {
                    return response.json(); // 将response对象转换为JSON格式
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                console.log(data); // 输出JSON格式的数据
                resolve(JSON.stringify(JSON.parse(data.output), null, 2)); // 将返回的数据放入output元素中
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                reject(error);
            });

        localStorage.setItem('taskid', inputText);
    });
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
  inPutTaskid.value = ''
  useSetting.updateoutPutTaskid(''); // 清空 outPutTaskid
}
</script>

<template>
  <div class="input-and-output">
    <el-input
    v-model="inPutTaskid"
    style="width: 700px"
    :rows="30"
    type="textarea"
    resize="none"
    placeholder="Please input..."
    class="inPut"
  />

    <el-input
    v-model="outPutTaskid"
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
    <el-button type="success" class="copy-class" @click="copyToClipboard(outPutTaskid)">复制结果</el-button>
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