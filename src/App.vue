<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <button @click="getData">clickthis</button> -->
  <van-config-provider style="height:100%" :theme-vars="themeVars">
    <router-view></router-view>
  </van-config-provider>
</template>

<script setup>
import { reactive, } from 'vue';
// themeVars 内的值会被转换成对应 CSS 变量
// 比如 sliderBarHeight 会转换成 `--van-slider-bar-height`
const themeVars = reactive({
  rateIconFullColor: '#07c160',
  sliderBarHeight: '4px',
  sliderButtonWidth: '20px',
  sliderButtonHeight: '20px',
  sliderActiveBackground: '#07c160',
  buttonPrimaryBackground: '#07c160',
  buttonPrimaryBorderColor: '#07c160',
});

</script>

<style lang="scss">
.van-theme-dark body {
  color: #f5f5f5;
  background-color: black;
}
</style>