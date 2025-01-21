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
    <svg t="1712641496785" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="34776" :width="width" :height="height">
        <path
            d="M981.3312 938.6688H42.6688a42.6688 42.6688 0 0 0 0 85.3312h938.6624a42.6688 42.6688 0 0 0 0-85.3312zM897.7088 363.52h-215.04V45.2288A45.2288 45.2288 0 0 0 637.44 0h-256a45.2288 45.2288 0 0 0-40.1088 45.2288V363.52h-215.04A40.1088 40.1088 0 0 0 97.28 432.64L482.9888 819.2a42.6688 42.6688 0 0 0 58.0224 0L926.72 432.64a40.1088 40.1088 0 0 0-29.0112-69.12z"
            :fill="color" p-id="34777"></path>
    </svg>
</template>

<style scoped lang='scss'>
.icon {
    margin: 0 10px;
}
</style>