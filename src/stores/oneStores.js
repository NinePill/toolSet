import {defineStore} from "pinia";
import {ref} from "vue";

export const isSetting = defineStore("isSetting", () => {
    let isSelected = ref(1001);
    let darkTheme = ref(false);


    let inPutHeaders = ref('');
    let outPutHeaders = ref('');

    let inPutCookies = ref('');
    let outPutCookies = ref('');

    let inPutCtoR = ref('');
    let outPutCtoR = ref('');

    let inPutPwd = ref('');
    let outPutPwd = ref('');

    let inPutTaskid = ref('');
    let outPutTaskid = ref('');

    let inPutSms = ref('');
    let outPutSms = ref('');

    let inPutTrans = ref('');
    let outPutTrans = ref('');

    let inPutTime = ref('');
    let outPutTime = ref('');

    let inPutOcr = ref('');
    let outPutOcr = ref('');

    const updateinPutHeaders = (inPutValue) => {
      inPutHeaders.value = inPutValue
    }

    const updateoutPutHeaders = (outPutValue) => {
      outPutHeaders.value = outPutValue
    }

    const updateinPutCookies = (inPutValue) => {
      inPutCookies.value = inPutValue
    }

    const updateoutPutCookies = (outPutValue) => {
      outPutCookies.value = outPutValue
    }

    const updateinPutCtoR = (inPutValue) => {
      inPutCtoR.value = inPutValue
    }

    const updateoutPutCtoR = (outPutValue) => {
      outPutCtoR.value = outPutValue
    }

    const updateinPutPwd = (inPutValue) => {
      inPutPwd.value = inPutValue
    }

    const updateoutPutPwd = (outPutValue) => {
      outPutPwd.value = outPutValue
    }

    const updateinPutTaskid = (inPutValue) => {
      inPutTaskid.value = inPutValue
    }

    const updateoutPutTaskid = (outPutValue) => {
      outPutTaskid.value = outPutValue
    }

    const updateinPutSms = (inPutValue) => {
      inPutSms.value = inPutValue
    }

    const updateoutPutSms = (outPutValue) => {
      outPutSms.value = outPutValue
    }

    const updateinPutTrans= (inPutValue) => {
      inPutTrans.value = inPutValue
    }

    const updateoutPutTrans= (outPutValue) => {
      outPutTrans.value = outPutValue
    }

    const updateinPutTime= (inPutValue) => {
      inPutTime.value = inPutValue
    }

    const updateoutPutTime= (outPutValue) => {
      outPutTime.value = outPutValue
    }

     const updateinPutOcr= (inPutValue) => {
      inPutOcr.value = inPutValue
    }

    const updateoutPutOcr= (outPutValue) => {
      outPutOcr.value = outPutValue
    }



    return {
        isSelected,
        darkTheme,

        inPutHeaders,
        outPutHeaders,
        updateinPutHeaders,
        updateoutPutHeaders,

        inPutCookies,
        outPutCookies,
        updateinPutCookies,
        updateoutPutCookies,

        inPutCtoR,
        outPutCtoR,
        updateinPutCtoR,
        updateoutPutCtoR,

        inPutPwd,
        outPutPwd,
        updateinPutPwd,
        updateoutPutPwd,

        inPutTaskid,
        outPutTaskid,
        updateinPutTaskid,
        updateoutPutTaskid,

        inPutSms,
        outPutSms,
        updateinPutSms,
        updateoutPutSms,

        inPutTrans,
        outPutTrans,
        updateinPutTrans,
        updateoutPutTrans,

        inPutTime,
        outPutTime,
        updateinPutTime,
        updateoutPutTime,

        inPutOcr,
        outPutOcr,
        updateinPutOcr,
        updateoutPutOcr,



















    }
},{
    persist: true
})