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
    <svg t="1712641638144" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="37801" :width="width" :height="height">
        <path
            d="M266.24 409.6h491.52c124.416 0 225.28 100.864 225.28 225.28s-100.864 225.28-225.28 225.28H266.24C141.824 860.16 40.96 759.296 40.96 634.88s100.864-225.28 225.28-225.28z"
            :fill="color" p-id="37802"></path>
        <path d="M512 409.6m-245.76 0a245.76 245.76 0 1 0 491.52 0 245.76 245.76 0 1 0-491.52 0Z" :fill="color"
            p-id="37803"></path>
        <path
            d="M531.53792 392.9088l2.19136 1.98656 115.85536 115.85536a30.72 30.72 0 0 1-41.2672 45.44512l-2.19136-1.98656-63.42656-63.46752L542.72 706.56a30.72 30.72 0 0 1-61.44 0V490.78272l-63.40608 63.42656a30.72 30.72 0 0 1-41.2672 1.98656l-2.19136-1.98656a30.72 30.72 0 0 1-1.98656-41.2672l1.98656-2.19136 115.85536-115.85536a30.72 30.72 0 0 1 41.2672-1.98656z"
            :fill="color" p-id="37804"></path>
    </svg>
</template>

<style scoped lang='scss'>
.icon {
    margin: 0 10px;
}
</style>