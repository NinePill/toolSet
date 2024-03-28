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
import Ocr from "@/components/Ocr.vue";

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
const coffee = ref(false)
const activePay = ref('wechat')
const selectPay = (pay) => {
  activePay.value = pay;
}

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
                inline-prompt
                active-text="深色"
                inactive-text="浅色"
            />
            <el-tooltip
                class="box-item"
                effect="dark"
                content="打赏"
                placement="bottom"
            >
            <el-button circle class="coffee-btn" @click="coffee=true"><svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"
                     class="video-coin-icon video-toolbar-item-icon">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M14.045 25.5454C7.69377 25.5454 2.54504 20.3967 2.54504 14.0454C2.54504 7.69413 7.69377 2.54541 14.045 2.54541C20.3963 2.54541 25.545 7.69413 25.545 14.0454C25.545 17.0954 24.3334 20.0205 22.1768 22.1771C20.0201 24.3338 17.095 25.5454 14.045 25.5454ZM9.66202 6.81624H18.2761C18.825 6.81624 19.27 7.22183 19.27 7.72216C19.27 8.22248 18.825 8.62807 18.2761 8.62807H14.95V10.2903C17.989 10.4444 20.3766 12.9487 20.3855 15.9916V17.1995C20.3854 17.6997 19.9799 18.1052 19.4796 18.1052C18.9793 18.1052 18.5738 17.6997 18.5737 17.1995V15.9916C18.5667 13.9478 16.9882 12.2535 14.95 12.1022V20.5574C14.95 21.0577 14.5444 21.4633 14.0441 21.4633C13.5437 21.4633 13.1382 21.0577 13.1382 20.5574V12.1022C11.1 12.2535 9.52148 13.9478 9.51448 15.9916V17.1995C9.5144 17.6997 9.10883 18.1052 8.60856 18.1052C8.1083 18.1052 7.70273 17.6997 7.70265 17.1995V15.9916C7.71158 12.9487 10.0992 10.4444 13.1382 10.2903V8.62807H9.66202C9.11309 8.62807 8.66809 8.22248 8.66809 7.72216C8.66809 7.22183 9.11309 6.81624 9.66202 6.81624Z"
                        fill="currentColor" data-darkreader-inline-fill=""
                        style="--darkreader-inline-fill: currentColor;"></path>
                </svg>
              </el-button></el-tooltip>
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
        <Ocr v-else-if="useSetting.isSelected === 1009"></Ocr>
      </el-main>
      <el-footer>版权所有</el-footer>
    </el-container>
  </el-container>


  <el-dialog v-model="coffee" title="打赏作者" class="coffee-class" :modal="false" :width="600" center>
    <div class="ac">
      <p> 如果对您有价值，不妨支持一下我吧</p>
      <p> 我将专注于持续优化产品体验。 </p>
    </div>

    <div class="ac mt20">
      <el-button
          :style="{ backgroundColor: activePay === 'wechat' ? '#27db70' : 'transparent',color:activePay === 'wechat' ? '#fff' : '#000' }"
          @click="selectPay('wechat')">微信
      </el-button>
      <el-button
          :style="{ backgroundColor: activePay === 'alipay' ? '#006ee8' : 'transparent',color:activePay === 'alipay' ? '#fff' : '#000' }"
          @click="selectPay('alipay')">支付宝
      </el-button>
    </div>
    <div class="ac mt20">
      <img :src="activePay === 'wechat' ? '/paylogo/we-pay.jpg' : '/paylogo/ali-pay.jpg'" class="pay-logo">
    </div>
  </el-dialog>
</template>


<style scoped>
.coffee-class {
  margin-top: 50px;
}
.ac {
  text-align: center;
}

.mt20 {
  margin-top: 20px;
}
.pay-logo {
  width: 300px; /* 设置图片宽度 */
  height: 300px; /* 设置图片高度 */
}
.coffee-btn {
  margin-left: 20px;
}
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

