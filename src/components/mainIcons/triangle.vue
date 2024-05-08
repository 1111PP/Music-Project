
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
    <svg t="1715086164969" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8628"
        :width="width" :height="height">
        <path
            d="M819.498667 584.832L343.168 875.904A85.333333 85.333333 0 0 1 213.333333 803.114667V220.885333a85.333333 85.333333 0 0 1 129.834667-72.789333l476.330667 291.072a85.333333 85.333333 0 0 1 0 145.664z"
            :fill="color" p-id="8629"></path>
    </svg>
</template>

<style scoped lang='scss'>
.icon {
    margin: 0 10px;
}
</style>