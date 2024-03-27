<script setup>
import {ref} from 'vue'
import {isSetting} from "@/stores/oneStores.js";
import {useDark, useToggle} from '@vueuse/core'
import Headers from "@/components/Headers.vue";
import Cookies from "@/components/Cookies.vue";
import CurltoRquests from "@/components/CurltoRquests.vue";
import PwdDecrypt from "@/components/PwdDecrypt.vue";
import Taskid from "@/components/Taskid.vue";
import Sms from "@/components/Sms.vue";
import Translation from "@/components/Translation.vue";
import Sign from "@/components/Sign.vue";

const isDark = useDark()
const toggleDark = useToggle(isDark)

const useSetting = isSetting()
const selectFun = (id_) => {
  useSetting.isSelected = id_
}
const menulList = ref(
    [
      {id: 1001, "name": "headers转换"},
      {id: 1002, "name": "cokies转换"},
      {id: 1003, "name": "curl转requests"},
      {id: 1004, "name": "密码解密"},
      {id: 1005, "name": "taskid提取参数"},
      {id: 1006, "name": "短信验证码"},
      {id: 1007, "name": "英汉互译"},
      {id: 1008, "name": "签到时间计算"},
      {id: 1009, "name": "ocr识别"},
    ]
)
</script>

<template>
  <el-container>
    <el-aside style="width:180px;">

      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
      >
        <el-scrollbar>
          <el-menu-item v-for="value in menulList" :key="value.id" :class="{'selected': value.id === useSetting.isSelected}" @click="selectFun(value.id)">
            <template #title>{{ value.name }}</template>
          </el-menu-item>
        </el-scrollbar>


      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-row justify="space-between">
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6">
            <el-switch
                v-model="useSetting.darkTheme"
                @change="toggleDark"
            />
          </el-col>
        </el-row>

      </el-header>
      <el-main>
        <Headers v-if="useSetting.isSelected === 1001"></Headers>
        <Cookies v-else-if="useSetting.isSelected === 1002"></Cookies>
        <CurltoRquests v-else-if="useSetting.isSelected === 1003"></CurltoRquests>
        <PwdDecrypt v-else-if="useSetting.isSelected === 1004"></PwdDecrypt>
        <Taskid v-else-if="useSetting.isSelected === 1005"></Taskid>
        <Sms v-else-if="useSetting.isSelected === 1006"></Sms>
        <Translation v-else-if="useSetting.isSelected === 1007"></Translation>
        <Sign v-else-if="useSetting.isSelected === 1008"></Sign>
      </el-main>
      <el-footer>版权所有</el-footer>
    </el-container>
  </el-container>
</template>


<style scoped>
::-webkit-scrollbar {
  color: #ececec;
  width: 5px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 15px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(236, 236, 236);
  border-radius: 4px;
}

.selected {
  background-color: #7fb7fa;
}

.el-menu-vertical-demo {
  margin-top: 60px;
}

.el-container {
  height: 100%;
}

.el-header,
.el-footer {

  color: #333;
  text-align: center;
  line-height: 60px;
}


.el-aside {

  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {

  color: #333;
  line-height: 160px;
}

.el-menu {
  border: none;
}
</style>

