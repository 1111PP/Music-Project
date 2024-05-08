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
        default: '12px',
    },
    //svg高度
    height: {
        type: String,
        default: '12px',
    },
})

</script>

<template>
    <svg t="1712661113688" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="39793" :width="width" :height="height">
        <path
            d="M833.070894 115.255889V10.82838c0-9.051264-10.402154-14.048858-17.426583-8.510308L206.642828 477.981396c-22.155199 17.292594-22.155199 50.660881 0 67.952475l609.000483 475.664324c7.160418 5.53855 17.427583 0.539956 17.427583-8.511308V908.659378c0-6.619462-3.106747-12.968946-8.24033-17.021616L338.494108 512.025628l486.336456-379.748123c5.133583-4.05267 8.24033-10.402154 8.24033-17.021616z"
            :fill="color" p-id="39794"></path>
    </svg>
</template>

<style scoped lang='scss'></style>