<script setup>
import {computed, watch} from 'vue'
import {isSetting} from "@/stores/oneStores.js";


const useSetting = isSetting()
// 直接使用 store 中的状态
const inPutTrans = computed({
  get: () => useSetting.inPutTrans,
  set: (value) => useSetting.updateinPutTrans(value)
})

const outPutTrans = computed({
  get: () => useSetting.outPutTrans,
})

// 使用 watch 来侦听 inPutTrans 的变化并转换输出
watch(inPutTrans, async (newValue) => {
  try {
    const result = await transTransform(newValue);
    useSetting.updateoutPutTrans(result);
  } catch (error) {
    console.error('Error in curlTransform:', error);
  }
});

function transTransform(inputText) {
    return new Promise((resolve, reject) => {
        inputText = inputText.trim();
        if (!inputText) {
            return;
        }
        const url =  import.meta.env.VITE_CENTER_API + '/tool/t';
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
                if (data.output && typeof data.output === 'object' && Object.keys(data.output).length === 0) {
                    resolve(''); // 如果data.output是空对象，则返回空字符串
                } else {
                    resolve(data.output); // 否则返回data.output

                }// 将返回的数据放入output元素中
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
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
  inPutTrans.value = ''
  useSetting.updateoutPutTrans(''); // 清空 outPutTrans
}
</script>

<template>
  <div class="input-and-output">
    <el-input
    v-model="inPutTrans"
    style="width: 700px"
    :rows="30"
    type="textarea"
    resize="none"
    placeholder="Please input..."
    class="inPut"
  />

    <el-input
    v-model="outPutTrans"
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
    <el-button type="success" class="copy-class" @click="copyToClipboard(outPutTrans)">复制结果</el-button>
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