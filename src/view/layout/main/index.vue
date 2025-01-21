<script setup>
import { ref, onMounted } from 'vue'
import lpLoopPicture from '@/components/lpUI/lp-loopPicture/index.vue'
import recommentSongList from './recommentSongList/index.vue'
import radarSongList from './radarSongList/index.vue'
import bannerGreet from './banner-greet/index.vue'
import choicenessList from './choicenessList/index.vue'
import littleCard from './littleCard/index.vue'
import { useSongsStore } from '@/store/songs/index.js';
import API from '@/api/music/imgdata/index.js'
import getThemeColor from '@/utils/vividColor'

const songsStore = useSongsStore()
// const loopPictureData = ref(songsStore.loopPictureData1)
const loopPictureData = ref(null)

//✨测试数据 ->  根据 [茉莉雨] 为你推荐模块
const testData1 = ref(null)
const testData2 = ref(null)
onMounted(async () => {
    const r = await songsStore.loopPictureData1()
    loopPictureData.value = r


    //异步数据，因为需要提取主题色
    testData1.value = await songsStore.songListData1()
    testData2.value = await songsStore.radarSongListData1()
})
</script>

<template>
    <div class="main-layout-container">
        <!-- 1.顶部banner模块 -->
        <div class="main-banner">
            <!-- 顶部banner左侧-轮播图模块 -->
            <div class="banner-loop-picture">
                <lpLoopPicture v-if="loopPictureData" :totalData="loopPictureData" :width="431" :height="158"
                    :initWidth="1153" @change="(i) => { console.log(i) }" />
            </div>
            <!-- 顶部banner右侧-打招呼模块 -->
            <bannerGreet :totalData="testData1" />
        </div>
        <!-- 2.推荐歌单 -->
        <div class="main-recommend-list">
            <div class="title">
                <div>推荐歌单</div>
                <svgDown color="black" style="transform:rotate(-90deg);margin-left: 5px;" />
            </div>
            <!-- ✨ -->
            <recommentSongList :totalData="testData1" />
        </div>

        <!-- 3.榜单精选 -->
        <div class="main-choiceness-list">
            <div class="title">
                <div>榜单精选</div>
                <svgDown color="black" style="transform:rotate(-90deg);margin-left: 5px;" />
            </div>
            <!-- ✨ -->
            <div class="songsList">
                <!-- v-if是为了确保异步数据choicenessListData获取成功后再渲染 -->
                <choicenessList title="飙升榜" :start="0" :imgsData="testData2" />
                <choicenessList title="新歌榜" :start="1" :imgsData="testData2" />
                <choicenessList title="热歌榜" :start="2" :imgsData="testData2" />
                <choicenessList title="原创榜" :start="3" :imgsData="testData2" />
            </div>
        </div>
        <!-- 4.雷达歌单 -->
        <div class="main-radar-list">
            <div class="title">
                <div>111P的雷达歌单</div>
                <svgDown color="black" style="transform:rotate(-90deg);margin-left: 5px;" />
            </div>
            <!-- ✨ -->
            <radarSongList :totalData="testData2" />
        </div>
        <!-- VIP专享 -->
        <div class="main-vip-exclusive">
            <div class="title">
                <div>黑胶VIP专享，听歌放松一下</div>
                <svgDown color="black" style="transform:rotate(-90deg);margin-left: 5px;" />
            </div>
            <div class="vip-container">
                <littleCard v-if="testData2" v-for="i in testData2" singer="The Weeknd" songName="Start Boy"
                    :imgUrl="i.url" class="little-card" />
                <littleCard v-else v-for="i in 8" class="little-card" />
            </div>
        </div>
        <!-- 根据 [茉莉雨] 为你推荐 -->
        <div class="main-vip-exclusive" style="margin-bottom:66px;">
            <div class="title">
                <div>根据 [茉莉雨] 为你推荐</div>
                <svgDown color="black" style="transform:rotate(-90deg);margin-left: 5px;" />
            </div>
            <div class="vip-container">
                <littleCard v-if="testData2" v-for="i in testData1" singer="The Weeknd" songName="Start Boy"
                    :imgUrl="i.url" class="little-card" />
                <littleCard v-else v-for="i in 8" class="little-card" />
            </div>
        </div>
    </div>
</template>

<style scoped lang='scss'>
/* 半透明黑色蒙版 */
.banner-childSongs:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(92, 92, 92, 0.397);
}

.main-layout-container {
    overflow: auto;

    .main-banner {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
        overflow: hidden;

        //轮播图
        .banner-loop-picture {
            // margin-right: 20px;
        }

        //轮播图右侧推荐内容

    }

    .main-recommend-list {
        .title {
            height: 15px;
            line-height: 15px;
            display: flex;
            font-size: 20px;
            margin-bottom: 20px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 700;
        }
    }

    .main-choiceness-list {
        margin-bottom: 40px;

        .title {
            height: 15px;
            line-height: 15px;
            display: flex;
            font-size: 20px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 700;

        }

        .songsList {
            gap: 10px;
            display: flex;
            /* 元素换行 */
            flex-wrap: wrap;
            justify-content: space-between;
            overflow: hidden;
            margin-top: 20px;
        }
    }

    .main-radar-list {
        margin-bottom: 40px;

        .title {
            height: 15px;
            line-height: 15px;
            display: flex;
            font-size: 20px;
            margin-bottom: 20px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 700;
        }

    }



    .main-vip-exclusive {
        margin-bottom: 30px;

        .title {
            height: 15px;
            line-height: 15px;
            display: flex;
            font-size: 20px;
            margin-bottom: 20px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 700;
        }

        .vip-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
            // grid-gap: 20px;
            // display: flex;
            // flex-wrap: wrap;
            // justify-content: space-between;
        }


        .little-card {}
    }
}
</style>