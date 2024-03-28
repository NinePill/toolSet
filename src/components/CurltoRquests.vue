<script setup>
import {computed, watch} from 'vue'
import {isSetting} from "@/stores/oneStores.js";


const useSetting = isSetting()
// 直接使用 store 中的状态
const inPutCtoR = computed({
  get: () => useSetting.inPutCtoR,
  set: (value) => useSetting.updateinPutCtoR(value)
})

const outPutCtoR = computed({
  get: () => useSetting.outPutCtoR,
})

watch(inPutCtoR, async (newValue) => {
  try {
    const result = await curlTransform(newValue);
    useSetting.updateoutPutCtoR(result);
  } catch (error) {
    console.error('Error in curlTransform:', error);
  }
});

function curlTransform(inputText) {
    return new Promise((resolve, reject) => {
        const url = import.meta.env.VITE_CENTER_API + 'c';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({input_str: inputText})
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // 将response对象转换为JSON格式
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                console.log(data); // 输出JSON格式的数据
                resolve(data.output.replace(/\\n/g, "\n")); // 将返回的数据作为Promise的解析值
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                reject(error); // 如果发生错误，则将Promise标记为拒绝状态，并传递错误信息
            });
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
  inPutCtoR.value = ''
  useSetting.updateoutPutCtoR(''); // 清空 outPutCtoR
}
</script>

<template>
  <div class="input-and-output">
    <el-input
    v-model="inPutCtoR"
    style="width: 700px"
    :rows="30"
    type="textarea"
    resize="none"
    placeholder="Please input..."
    class="inPut"
  />

    <el-input
    v-model="outPutCtoR"
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
    <el-button type="success" class="copy-class" @click="copyToClipboard(outPutCtoR)">复制结果</el-button>
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