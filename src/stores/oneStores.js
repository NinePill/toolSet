import {defineStore} from "pinia";
import {ref} from "vue";

export const isSetting = defineStore("isSetting", () => {
    let isSelected = ref(false);
    let darkTheme = ref(false);


    let inPutHeaders = ref('');
    let outPutHeaders = ref('');

    const updateinPutHeaders = (inPutValue) => {
      inPutHeaders.value = inPutValue
    }

    const updateoutPutHeaders = (outPutValue) => {
      outPutHeaders.value = outPutValue
    }

    return {
        isSelected,
        darkTheme,

        inPutHeaders,
        outPutHeaders,
        updateinPutHeaders,
        updateoutPutHeaders


    }
},{
    persist: true
})