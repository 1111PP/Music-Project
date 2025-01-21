
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
        default: '20',
    },
    //svg高度
    height: {
        type: String,
        default: '20',
    },
})
</script>

<template>
    <svg t="1715433354484" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3123"
        :width="width" :height="height">
        <path
            d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z"
            :fill="color" p-id="3124"></path>
    </svg>
</template>

<style scoped lang='scss'></style>