<script  setup>
import { ref } from 'vue'
const props = defineProps({
    color: {
        type: String,
        default: "#b3adad",
    },
    //svg宽度
    width: {
        type: String,
        default: '18px',
    },
    //svg高度
    height: {
        type: String,
        default: '18px',
    },
})
</script>

<template>
    <svg t="1712667352238" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="54687" :width="width" :height="height">
        <path
            d="M531.185456 943.532317c0 8.899694-6.493901 16.114003-14.503319 16.114003l-9.364275 0c-8.010441 0-14.504342-7.214309-14.504342-16.114003L492.81352 80.46666c0-8.898671 6.493901-16.114003 14.504342-16.114003l9.364275 0c8.009418 0 14.503319 7.215332 14.503319 16.114003L531.185456 943.532317z"
            :fill="color" p-id="54688"></path>
    </svg>
</template>

<style scoped lang='scss'></style>