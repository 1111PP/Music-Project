<script setup>
import { ref } from 'vue'
const { ipcRenderer } = require('electron')
const closeApp = () => {
    ipcRenderer.send('close-mainWindow')
}
</script>

<template>
    <component @click="closeApp" class="header-iconStyle" is="svgClose" height="16px" width="16px">
    </component>
</template>

<style scoped lang='scss'></style>