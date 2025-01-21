<script  setup>
import { ref } from 'vue'
let { ipcRenderer } = require('electron')

const minimizeWindow = () => {
    console.log('minimize');
    ipcRenderer.send('minimize-mian-window')
}
</script>

<template>
    <component @click="minimizeWindow" class="header-iconStyle" is="svgMini" height="18px" width="18px">
    </component>
</template>

<style scoped lang='scss'></style>
