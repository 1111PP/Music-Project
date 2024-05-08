<template>
  <router-view></router-view>
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
//用于覆盖elPlus组件的默认样式(😂丑陋)
.van-theme-dark body {
  color: #f5f5f5;
  background-color: black;
}

.el-input {
  --el-input-focus-border-color: rgb(209, 200, 200) !important;
  --el-input-focus-bg-color: white !important;
}

.is-focus {}

.el-input__wrapper {
  background: linear-gradient(to right, #EAF0FA, #F8EEF7) !important;
  border-radius: 10px !important;
}

.van-cell {
  background-color: #F7F9FC !important;
}
</style>