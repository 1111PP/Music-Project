<script setup>
import { ref, onMounted, watch } from 'vue'
import Menu from './menu/index.vue'
import musicLogo from './logo/index.vue'
import musicHeader from './musicHeader/index.vue'
import musicMain from './main/index.vue'
import outMusicFooter from "@/components/musicFooter/out-index.vue"

import { useRoute } from 'vue-router'
const route = useRoute()
watch(() => route.path, () => {
    console.log(route.path);
})
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
                <!-- 路由动画 -->
                <router-view></router-view>
            </div>
        </div>
    </div>
    <!-- 主页的歌词底部组件 -->
    <outMusicFooter />
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

        .top {
            padding: 10px 0;
        }

        .main {
            // ✨主内容区域
            //    需要减去1.main的padding 2.musicHeader：60px的高度 3.musicHeader的padding
            height: calc(100vh - 40px - 60px - 20px);
            // background-color: #F7F9FC;
            padding: 10px 35px 20px 38px;
            overflow: auto;
        }
    }
}
</style>