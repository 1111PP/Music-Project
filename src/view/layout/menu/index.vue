<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const menuItemTop = ref(
    [
        {
            text: "为我推荐",
            icon: 'svgHome',
            id: 1
        },
        {
            text: "云音乐精选",
            icon: 'svgChoiceness',
            id: 2
        },
        {
            text: "博客",
            icon: 'svgBoKe',
            id: 3
        },
        {
            text: "私人漫游",
            icon: 'svgSYJ',
            id: 4
        },
        {
            text: "社区",
            icon: "svgShequ",
            id: 5
        },
    ]
)
const menuItemBottom = ref([
    {
        text: "我喜欢的音乐",
        icon: 'svgLove',
        id: 6
    },
    {
        text: "最近播放",
        icon: 'svgZuiJin',
        id: 7
    },
    {
        icon: 'svgMyBoKe',
        text: "我的博客",
        id: 8
    },
    {
        icon: 'svgCollect',
        text: "我的收藏",
        id: 9
    },
    {
        icon: 'svgDownload',
        text: "下载管理",
        id: 10
    },
    {
        icon: 'svgLocal',
        text: "本地音乐",
        id: 11
    },
    {
        icon: 'svgCloud',
        text: "我的音乐云盘",
        id: 12
    },
])
//默认激活第1个menu菜单栏
const active = ref(1)
const currItem = (id) => {
    active.value = id
    //😂纪念一下刚写这个项目时写的屎山代码
    // const prev = document.getElementsByClassName('menuItem-active')
    // if (prev.length !== 0) {
    //     prev[0].classList.remove('menuItem-active')
    // }
    // document.getElementsByClassName('menuItem')[active.value - 1].classList.add('menuItem-active')
}
onMounted(() => {
    document.querySelector('.menuItem')?.classList.add('menuItem-active')
})
</script>

<template>
    <div class="menu-container">
        <div class="topline"></div>
        <el-menu class="el-menu-vertical-demo">
            <!-- 上菜单 -->
            <el-menu-item style="height:41px" :index="String(item.id)" v-for="item in menuItemTop" :key="item.id">
                <template #title>
                    <div class="menuItem" :class="active === item.id ? 'menuItem-active' : ''" @click="currItem(item.id)">
                        <component :color="active == item.id ? 'white' : 'gray'" :is="item.icon"></component>
                        <span class="menutext">
                            {{ item.text }}
                        </span>
                    </div>
                </template>
            </el-menu-item>
            <!-- 分割线 -->
            <el-menu-item style="height:0px ;margin:12px">
                <div style="height:1px ; margin:0 auto;width:100px;border-top: 1px #E4E8EC solid;"></div>
            </el-menu-item>
            <!-- 下菜单 -->
            <el-menu-item style="height:40px" :index="String(item.id)" v-for="item in menuItemBottom" :key="item.id">
                <div class="menuItem" :class="active === item.id ? 'menuItem-active' : ''" @click="currItem(item.id)">
                    <component :color="active == item.id ? 'white' : 'gray'" :is="item.icon"></component>
                    <span class="menutext">
                        {{ item.text }}
                    </span>
                </div>
            </el-menu-item>
            <!-- 分割线 -->
            <el-menu-item style="height:0px ;margin:12px">
                <div style="height:1px ; margin:0 auto;width:100px;border-top: 1px #E4E8EC solid;"></div>
            </el-menu-item>

            <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>

        </el-menu>
    </div>
</template>

<style lang="scss" >
.menu-container {

    .topline {
        margin-left: 20px;
        width: 30px;
        height: 1px;
        border-top: 1px #E4E8EC solid;
        margin-bottom: 20px;
    }

    .menuItem {
        height: 37px;
        width: 200px;
        border-radius: 10px;
        display: flex;
        align-items: center;
    }
}

.menuItem-active {
    background-color: #FC3D49;
    color: white;
}

//鼠标悬停效果not不作用于包含menuItem-active样式的标签
//即已经激活的标签不受hover样式影响
.menuItem:hover:not(.menuItem-active) {
    background-color: #E4E8EC;
}

//清除el-plus默认样式
:root {
    --el-menu-hover-bg-color: #F0F3F6;
    --el-menu-border-color: white;
}

.tac {
    width: 100%;
    background-color: #F0F3F6;
}

.is-active {
    background-color: #F0F3F6;
}

.el-menu-item.is-active {
    color: black
}

.el-menu-vertical-demo {
    background-color: #F0F3F6;
}
</style>