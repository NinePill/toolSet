<script setup>
import {computed, watch} from 'vue'
import {isSetting} from "@/stores/oneStores.js";


const useSetting = isSetting()
// 直接使用 store 中的状态
const inPutSms = computed({
  get: () => useSetting.inPutSms,
  set: (value) => useSetting.updateinPutSms(value)
})

const outPutSms = computed({
  get: () => useSetting.outPutSms,
})

// 使用 watch 来侦听 inPutSms 的变化并转换输出
watch(inPutSms, async (newValue) => {
  try {
    const result = await smsTransform(newValue);
    useSetting.updateoutPutSms(result);
  } catch (error) {
    console.error('Error in curlTransform:', error);
  }
});

// 刷新输出内容的方法
async function refreshOutput() {
  try {
    const result = await smsTransform(inPutSms.value);
    useSetting.updateoutPutSms(result);
    ElNotification({
          title: 'Success',
          message: '刷新成功',
          type: 'success',
          duration: 1000,

        });
  } catch (error) {
    console.error('Error in refreshOutput:', error);
  }
}


function smsTransform(inputText) {
    return new Promise((resolve, reject) => {
        inputText = inputText.trim();
        if (!inputText) {
            return;
        }
        const url = import.meta.env.VITE_CENTER_API + '/tool/s/';
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
                resolve(JSON.stringify(data.output, null, 2)); // 将返回的数据放入output元素中
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                reject(error);
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
  inPutSms.value = ''
  useSetting.updateoutPutSms(''); // 清空 outPutSms
}
</script>

<template>
  <div class="input-and-output">
    <el-input
    v-model="inPutSms"
    style="width: 700px"
    :rows="30"
    type="textarea"
    resize="none"
    placeholder="Please input..."
    class="inPut"
  />

    <el-input
    v-model="outPutSms"
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
    <el-button type="success" class="copy-class" @click="copyToClipboard(outPutSms)">复制结果</el-button>
    <el-button type="warning" class="refresh-class" @click="refreshOutput">刷新</el-button>
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