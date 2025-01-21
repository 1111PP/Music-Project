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
    <svg t="1712665846111" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8"
        :width="width" :height="height">
        <path
            d="M958.564173 123.453706 570.060859 511.958044l383.885134 383.894344-59.095933 59.095933L510.964926 571.053977 122.460588 959.567525l-59.725266-59.716057 388.512525-388.511501L67.353502 127.454834l59.108213-59.095933L510.346849 452.240965 898.850164 63.739696 958.564173 123.453706z"
            :fill="color" p-id="8"></path>
    </svg>
</template>

<style scoped lang='scss'></style>