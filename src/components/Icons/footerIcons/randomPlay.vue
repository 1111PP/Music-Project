<script  setup>
import { ref } from 'vue'
const props = defineProps({
    color: {
        type: String,
        default: 'white',
    },
    //svg宽度
    width: {
        type: String,
        default: '20px',
    },
    //svg高度
    height: {
        type: String,
        default: '20px',
    },
})
</script>

<template>
    <svg t="1715435139134" class="icon" viewBox="0 0 1152 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="27816" :width="width" :height="height">
        <path
            d="M336 334.08l58.56 89.92 76.16-117.44-27.2-42.24A324.8 324.8 0 0 0 192 128H0v128h192a201.6 201.6 0 0 1 144 78.08zM864 256h96v128l192-192-192-192v128h-96a324.8 324.8 0 0 0-251.52 136.32l-276.48 425.6A201.6 201.6 0 0 1 192 768H0v128h192a324.8 324.8 0 0 0 251.52-136.32l276.48-425.6A200.32 200.32 0 0 1 864 256z"
            :fill="color" p-id="27817"></path>
        <path
            d="M960 768h-96a200.32 200.32 0 0 1-144-78.08l-58.56-89.92-76.16 117.44 27.2 42.24A324.8 324.8 0 0 0 864 896h96v128l192-192-192-192z"
            :fill="color" p-id="27818"></path>
    </svg>
</template>

<style scoped lang='scss'></style>