<script  setup>
import { ref } from 'vue'

</script>

<template>
    <div class="container">
        <div class="left">
            <svgLogo />
        </div>
        <div class="right">网易云音乐
            <span class="text">Beta</span>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.container {
    height: 60px;
    width: 200px;
    display: flex;
    align-items: center;

    .right {
        font-size: 20px;

        .text {
            padding: 1px;
            border: 1px solid gray;
            border-radius: 5px;
            margin-left: 10px;
            font-size: 10px;
        }
    }
}
</style>