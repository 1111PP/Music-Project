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
    <svg t="1715435770632" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="38387" :width="width" :height="height">
        <path
            d="M512 149.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h426.666667a21.333333 21.333333 0 0 1 0 42.666667H533.333333a21.333333 21.333333 0 0 1-21.333333-21.333334z m448 362.666667H533.333333a21.333333 21.333333 0 0 0 0 42.666667h426.666667a21.333333 21.333333 0 0 0 0-42.666667z m0 384H64a21.333333 21.333333 0 0 0 0 42.666667h896a21.333333 21.333333 0 0 0 0-42.666667zM42.666667 543.94V138.726667a53.333333 53.333333 0 0 1 84.793333-43.06l277.333333 202.6a53.333333 53.333333 0 0 1 0 86.133333l-277.333333 202.6A53.333333 53.333333 0 0 1 42.666667 543.94z m42.666666 0a10.666667 10.666667 0 0 0 16.96 8.613333l277.333334-202.606666a10.666667 10.666667 0 0 0 0-17.226667l-277.333334-202.606667a10.293333 10.293333 0 0 0-6.18-2.1 11.18 11.18 0 0 0-4.94 1.2 10.413333 10.413333 0 0 0-5.84 9.513334z"
            :fill="color" p-id="38388"></path>
    </svg>
</template>

<style scoped lang='scss'></style>