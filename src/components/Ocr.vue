<script setup>
import {nextTick, ref} from 'vue';
import {ElNotification} from 'element-plus';

// API endpoint for OCR
const API_ENDPOINT = import.meta.env.VITE_CENTER_API + '/tool/o';

// Data properties
const inputImg = ref('');
const debounceTimer = ref('')
const inPutOcr = ref('')
const outPutOcr = ref('')
const handlePaste = (event) => {
  const items = (event.clipboardData || event.originalEvent.clipboardData).items;
  for (const item of items) {
    if (item.type.indexOf('image') === 0) {
      const blob = item.getAsFile();
      const reader = new FileReader();
      reader.onload = (e) => {
        inputImg.value = `<img src="${e.target.result}" alt="">`
        nextTick(() => {
          handleDebouncedChange(inputImg.value);
        });
      };
      reader.readAsDataURL(blob);
    }
  }
}

function ocrTransform(input) {
  return new Promise((resolve, reject) => {
    let inputText;
    const imgRegex = /<img.*?src=["'](.*?)["'].*?>/i;
    const match = imgRegex.exec(input);
    if (match && match[1]) {
      inputText = match[1];
    }
    if (!inputText) {
      return
    }
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: JSON.stringify({image: inputText})
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
          resolve(data.output) // 将返回的数据放入output元素中
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
  });
}

const handleDebouncedChange = (newValue) => {
  clearTimeout(debounceTimer.value);
  debounceTimer.value = setTimeout(async () => {
    try {
      outPutOcr.value = await ocrTransform(newValue);


    } catch (error) {
      console.error('执行失败:', error);
    }
  }, 100);
}


// Clear all input and output fields
function clearAll() {
  inputImg.value = ``;
  outPutOcr.value = '';
}

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
      .then(() => {
        ElNotification({
          title: 'Success',
          message: '结果已复制到剪贴板',
          type: 'success',
          duration: 1000,
        });
      })
      .catch((error) => {
        console.error('无法访问剪贴板:', error);
      });
}


</script>

<template>
  <div class="input-and-output">
    <div>
      <div v-html="inputImg" class="input" contenteditable="true" id="image-container" @paste="handlePaste"></div>
    </div>


    <el-input
        v-model="outPutOcr"
        style="width: 700px"
        :rows="30"
        type="textarea"
        resize="none"
        placeholder="识别结果"
        class="outPut"
    />

  </div>

  <div class="input-and-output-option">
    <el-button type="primary" class="del-class" @click="clearAll">清空所有</el-button>
    <el-button type="success" class="copy-class" @click="copyToClipboard(outPutOcr)">复制结果</el-button>
  </div>
</template>



<style scoped>
.input-and-output {
  display: flex;
  justify-content: center;
}

.input {
  width: 700px;
  height: 300px;
  border: 1px solid #409eff;
  outline: none;
  font: 14px 微软雅黑;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  border-radius: 4px;
  margin-right: 20px;
  overflow: hidden;


}

.input img {
  width: 100% !important; /* 设置图片宽度为父容器的宽度 */
  height: auto; /* 保持图片的宽高比 */
}


.outPut {
  height: 100%; /* Make sure the textarea takes up the full height of its container */
  margin-left: 20px;
}

.input-and-output-option {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.del-class {
  margin-right: 20px;
}

.copy-class {
  margin-left: 20px;
}
</style>
