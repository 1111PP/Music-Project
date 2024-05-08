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
    <svg t="1712665814721" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7"
        :width="width" :height="height">
        <path
            d="M770.9 923.3H253.1c-83.8 0-151.9-68.2-151.9-151.9V253.6c0-83.8 68.2-151.9 151.9-151.9h517.8c83.8 0 151.9 68.2 151.9 151.9v517.8c0 83.8-68.1 151.9-151.9 151.9zM253.1 181.7c-39.7 0-71.9 32.3-71.9 71.9v517.8c0 39.7 32.3 71.9 71.9 71.9h517.8c39.7 0 71.9-32.3 71.9-71.9V253.6c0-39.7-32.3-71.9-71.9-71.9H253.1z"
            :fill="color" p-id="7"></path>
    </svg>
</template>

<style scoped lang='scss'></style>