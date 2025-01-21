<script setup>
import { ref, watch, onMounted } from 'vue';
import { useAudioStore } from '@/store/audio/index.js'
import { formatTime } from '@/utils/formatTime.js'
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router'
import imgAPI from '@/api/music/imgdata/index.js'

const router = useRouter()
const route = useRoute()
const audioStore = useAudioStore()
const topImg = new URL(imgAPI.getMainPicture('main-songList-bg1.jpg'), import.meta.url);

const tabData = ref([
    {
        name: '歌曲',
        id: 0,
        path: '/mylove/songlist',
    },
    {
        name: '评论',
        id: 1,
        path: '/mylove/mylove-comment',
    },
    {
        name: '收藏者',
        id: 2,
        path: '/mylove/collecter',
    },
])

// 用来跟踪当前选中的 tab 索引，默认选中第一个
const activeTab = ref(0);

// 处理 tab 点击事件
const handleTabClick = ({ id, path }) => {
    activeTab.value = id;
    router.push(path)
};
const songCount = ref(0)
const handlesongCount = (count) => {
    songCount.value = count
}
const playAll = () => {
    audioStore.changeSong('', 0)
}
const useAvatar = new URL('@public/avatar.jpg', import.meta.url);

//页面顶部back按钮点击会触发route.back(),这是tab栏的样式却不会跟着变化，原因是 activeTab 没有改变，所以监听路由变化，修改 activeTab ，保证tab样式更新
watch(() => route.path, () => {
    // 根据当前路径或 query 设置 activeTab
    const currentPath = route.path;
    // console.log(currentPath);
    // 遍历 tabData，找到与当前路由匹配的 tab 索引
    const matchedTab = tabData.value.findIndex((tab) => tab.path === currentPath);
    // 如果找到了匹配的索引，更新 activeTab
    if (matchedTab !== -1) {
        activeTab.value = matchedTab;
    }
})
</script>

<template>
    <div class="mylove-container">
        <div class="top">
            <div class="top-left">
                <img class="img" :src="topImg" />
                <svgLove class="love" height="60px" width="60px" color="white" />
            </div>
            <div class="top-right">
                <div class="info">
                    <div class="title">我喜欢的音乐</div>
                    <div class="user">
                        <span class="author">
                            <img style="width: 20px;
                            height: 20px; border-radius: 50%;" :src="useAvatar" alt="">
                            111P</span>
                        <span class="time">2018-01-21创建</span>
                    </div>
                </div>
                <div class="control">
                    <div class="playall" @click="playAll">
                        <svgPlay></svgPlay>
                        播放全部
                    </div>
                    <div class="download">
                        <svgDownload color="black" height="15px" width="15px"></svgDownload>
                        下载
                    </div>
                    <div class="more">···</div>
                </div>
            </div>
        </div>
        <div class="main">
            <ul class="tab">
                <!-- 为选中项动态添加 active 类 -->
                <li v-for="(item, index) in tabData" :key="index" @click="handleTabClick(item)"
                    :data-songCount="songCount" style="list-style: none;">
                    <span :class="{ active: activeTab === index }">{{ item.name }}</span>
                </li>
            </ul>
            <div class="songlist-container">
                <RouterView :handlesongCount=handlesongCount></RouterView>
            </div>
        </div>
    </div>
</template>


<style scoped lang='scss'>
.mylove-container {
    height: calc(100%);
    overflow: auto;
}

.top {
    display: flex;

    .top-left {
        position: relative;
        height: 150px;
        width: 150px;

        .img {
            height: 100%;
            width: 100%;
            border-radius: 20px;
        }

        .love {
            position: absolute;
            left: 42%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

    }

    .top-right {
        display: flex;
        flex-flow: column;
        margin-left: 20px;
        justify-content: space-between;


        .info {
            display: flex;
            flex-flow: column;
            margin-top: 10px;

            .title {
                font-weight: 700;
                font-size: 20px;
            }

            .user {
                margin-top: 10px;
                display: flex;

                .author {
                    display: flex;
                    align-items: center;

                    img {
                        margin-right: 5px;
                    }
                }

                .time {
                    margin-top: 1px;
                    margin-left: 20px;
                    color: gray
                }

            }



        }

        .control {
            display: flex;

            .playall {
                display: flex;
                align-items: center;
                width: 100px;
                height: 36px;
                border-radius: 10px;
                background-color: #fc3b56;
                color: white;
                line-height: 36px;
                text-align: center;

                &:hover {
                    background-color: #e83951;
                }
            }

            .download {
                display: flex;
                align-items: center;
                margin-left: 10px;
                padding-left: 10px;
                width: 80px;
                height: 36px;
                border-radius: 10px;
                background-color: #dfe7f1;
                color: black;
                line-height: 36px;
                text-align: center;
            }

            .more {
                margin-left: 10px;
                width: 36px;
                height: 36px;
                border-radius: 10px;
                background-color: #dfe7f1;
                line-height: 36px;
                text-align: center;
                font-weight: 700;
            }
        }
    }
}

.main {
    margin-top: 20px;

    .tab {
        display: flex;

        li {
            width: 80px;
            height: 30px;
            position: relative;

            &:nth-child(1)::after {
                content: attr(data-songCount);
                position: absolute;
                top: 0;
                font-weight: 700;
            }

            span {
                position: relative;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;

                // 默认样式
                &::after {
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 2px;
                    bottom: -10px;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: transparent;
                    transition: background-color 0.3s ease;
                }

                // 激活时的样式：
                // 选择类名包含 .active 的 &(✨即<span>) 元素。
                // 当当前元素span 同时具有 .active 类时，应用伪元素 ::after 的样式。
                &.active::after {
                    background-color: red;
                }
            }
        }
    }

    .songlist-container {
        width: 100%;
        height: 100%;
    }

}
</style>