<script  setup>
import { ref } from 'vue'
const props = defineProps({
    color: {
        type: String,
        default: 'gray',
    },
    //svg宽度
    width: {
        type: String,
        default: '15px',
    },
    //svg高度
    height: {
        type: String,
        default: '15px',
    },
})
</script>

<template>
    <svg t="1712665174190" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1"
        :width="width" :height="height">
        <path
            d="M115.266 190.82H10.83c-9.052 0-14.05 10.402-8.511 17.428l475.702 609.05c17.294 22.157 50.664 22.157 67.958 0l475.702-609.05c5.54-7.16 0.54-17.429-8.511-17.429H908.734c-6.62 0-12.97 3.108-17.023 8.242L512.068 685.436 132.289 199.061c-4.053-5.134-10.403-8.242-17.023-8.242z"
            :fill="color" p-id="1"></path>
    </svg>
</template>

<style scoped lang='scss'></style>