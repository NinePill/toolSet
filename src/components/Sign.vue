<script setup>
import {computed, watch} from 'vue'
import {isSetting} from "@/stores/oneStores.js";


const useSetting = isSetting()
// 直接使用 store 中的状态
const inPutTime = computed({
  get: () => useSetting.inPutTime,
  set: (value) => useSetting.updateinPutTime(value)
})

const outPutTime = computed({
  get: () => useSetting.outPutTime,
})

// 使用 watch 来侦听 inPutTime 的变化并转换输出
watch(inPutTime, (newValue) => {
  useSetting.updateoutPutTime(signTransform(newValue))
})

function signTransform(inputText) {
    inputText = inputText.replace(/\s/g, '');

    // 如果输入为空，将输出清空并返回
    if (!inputText.trim()) {
        return '';
    }

    const regex = /^(\d{1,2})[:：](\d{1,2})$/;
    const match = inputText.match(regex);

    if (!match) {
        return '输入格式有误，请输入正确的时间格式（HH:MM）';
    }

    const input_time = inputText.replace(/[：:]/g, ':');
    const [HH, MM] = input_time.split(':').map(Number);

    if (HH < 0 || HH > 24 || MM >= 60) {
        ElMessage({
        message: '非预期的时间(你这输入的是三体时间吗？)',
        type: 'error',
        duration: 2000,
        offset: 20,
        center: true
      })
        return '';

    }

    if (HH < 8 || (HH === 8 && MM < 30)) {
        return '正常打卡时间在 8:30 之后';
    }

    let four_offset_minutes = 0;
    let eight_offset_minutes = 0;

    if ((HH === 8 && MM >= 30) || (HH > 8 && HH < 12) || (HH === 12 && MM < 15)) {
        four_offset_minutes = 5 * 60 + 15;
        eight_offset_minutes = 9 * 60 + 15;
    } else if ((HH === 12 && MM >= 15) || (HH > 12 && HH < 13) || (HH === 13 && MM < 30)) {
        four_offset_minutes = (13 * 60 + 30 - HH * 60 - MM + 4 * 60) % (24 * 60);
        eight_offset_minutes = (13 * 60 + 30 - HH * 60 - MM + 8 * 60) % (24 * 60);
    } else if ((HH === 13 && MM >= 30) || (HH > 13)) {
        four_offset_minutes = 4 * 60;
        eight_offset_minutes = 8 * 60;
    } else {
        return '输入时间范围有误，请输入正确的时间格式（HH:MM）';
    }

    let total_minutes = HH * 60 + MM;

    let new_total_minutes = (total_minutes + four_offset_minutes) % (24 * 60);
    let new_HH = Math.floor(new_total_minutes / 60);
    let new_MM = new_total_minutes % 60;
    let four_s = `4工时打卡时间为：${new_HH.toString().padStart(2, '0')}:${new_MM.toString().padStart(2, '0')}`;

    new_total_minutes = (total_minutes + eight_offset_minutes) % (24 * 60);
    new_HH = Math.floor(new_total_minutes / 60);
    new_MM = new_total_minutes % 60;
    return four_s + `\n8工时打卡时间为：${new_HH.toString().padStart(2, '0')}:${new_MM.toString().padStart(2, '0')}`;

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
  inPutTime.value = ''
  useSetting.updateoutPutTime(''); // 清空 outPutTime
}
</script>

<template>
  <div class="input-and-output">
    <el-input
    v-model="inPutTime"
    style="width: 700px"
    :rows="30"
    type="textarea"
    resize="none"
    placeholder="时间格式示例： 8：30"
    class="inPut"
  />

    <el-input
    v-model="outPutTime"
    style="width: 700px"
    :rows="30"
    type="textarea"
    resize="none"
    placeholder=""
    class="outPut"
  />
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