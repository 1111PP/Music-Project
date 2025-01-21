<script setup>
import { ref } from 'vue'
let { ipcRenderer } = require('electron')

let open = () => {
    ipcRenderer.send('open-dialog')
}
</script>

<template>
    <div class="logo-container">
        <div class="logo-left">
            <svgLogo />
        </div>
        <div class="logo-right" @click="open">
            网易云音乐
        </div>
    </div>
</template>

<style scoped lang='scss'>
.logo-container {
    height: 60px;
    width: 200px;
    display: flex;
    align-items: center;
    -webkit-app-region: drag;
    justify-content: center;

    .logo-right {
        font-size: 20px;


    }
}
</style>