<script  setup>
import { ref } from 'vue'
import Menu from './menu/index.vue'
import musicLogo from './logo/index.vue'
import musicHeader from './musicHeader/index.vue'
import musicMain from './main/index.vue'

</script>

<template>
    <div class="music-container">
        <div class="total-left">
            <div class="logo">
                <music-logo />
            </div>
            <div class="menu">
                <!-- 左侧菜单滚动组件 -->
                <el-scrollbar class="scrollbar">
                    <Menu></Menu>
                </el-scrollbar>
            </div>
        </div>
        <div class="total-right">
            <div class="top">
                <music-header />
            </div>
            <div class="main">
                <!-- <musicMain /> -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.music-container {
    display: flex;

    .total-left {
        //🟥右侧背景颜色,❗menu菜单bgColor需要到组件中单独调整，因为时elPlus组件控制的
        background-color: #F0F3F6;
        height: 100vh;
        width: $menuWidth;
        min-width: 200px;

        .scrollbar {
            widows: 100%;
            height: calc(100vh - 60px);
        }

    }

    .total-right {
        width: calc(100vw - $menuWidth);
        height: 100%;
        //🟥右侧背景颜色
        background-color: #F7F9FC;

        .main {
            // 右侧width，需要减去musicHeader的高度
            height: calc(100vh - 60px - 40px);
            // background-color: #F7F9FC;
            overflow: auto;
            padding: 20px 35px 20px 38px;
        }
    }
}
</style>