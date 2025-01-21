<script  setup>
import { ref } from 'vue'
const isFullScreen = ref(false)
const maxSreen = () => {
    if (isFullScreen.value) {
        isFullScreen.value = false
        document.exitFullscreen()

    } else {
        isFullScreen.value = true
        //屏幕最大化
        document.documentElement.requestFullscreen()
    }

}
</script>

<template>
    <component @click="maxSreen" class="header-iconStyle" is="svgMax" height="18px" width="18px">
    </component>
</template>

<style scoped lang='scss'></style>