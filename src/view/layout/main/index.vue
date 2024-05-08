<script  setup>
import { ref, onMounted } from 'vue'
import lpLoopPicture from '@/components/lpUI/lp-loopPicture/index.vue'
import recommentSongList from './recommentSongList/index.vue'
import radarSongList from './radarSongList/index.vue'
import bannerGreet from './banner-greet/index.vue'
import choicenessList from './choicenessList/index.vue'
import littleCard from './littleCard/index.vue'
import { useSongsStore } from '@/store/songs/index.js';
const songsStore = useSongsStore()
const loopPictureData = ref(songsStore.loopPictureData1)

//✨测试数据 ->  根据 [茉莉雨] 为你推荐模块
const testData1 = ref(null)
const testData2 = ref(null)
onMounted(async () => {
    //异步数据，因为需要提取主题色
    const r = await songsStore.radarSongListData1()
    const r1 = await songsStore.songListData1()
    testData1.value = r1
    testData2.value = r
})
</script>

<template>
    <div class="container">
        <!-- 1.顶部banner模块 -->
        <div class="main-banner">
            <!-- 顶部banner左侧-轮播图模块 -->
            <div class="banner-looppicture">
                <lpLoopPicture :totalData="loopPictureData" :width="431" :height="158"
                    @change="(i) => { console.log(i) }" />
            </div>
            <!-- 顶部banner右侧-打招呼模块 -->
            <bannerGreet v-if="testData1" :totalData="testData1" />
        </div>
        <!-- 2.推荐歌单 -->
        <div class="recommentList">
            <div class="title">
                <div>推荐歌单</div>
                <svgDown color="black" style="transform:rotate(-90deg);margin-left: 5px;" />
            </div>
            <!-- ✨ -->
            <recommentSongList v-if="testData1" :totalData="testData1" />
        </div>

        <!-- 3.榜单精选 -->
        <div class="choicenessList">
            <div class="title">
                <div>榜单精选</div>
                <svgDown color="black" style="transform:rotate(-90deg);margin-left: 5px;" />
            </div>
            <!-- ✨ -->
            <div class="songsList">
                <!-- v-if是为了确保异步数据choicenessListData获取成功后再渲染 -->
                <choicenessList v-if="testData2" title="飙升榜" :imgsData="testData2.slice(0, 3)" />
                <choicenessList v-if="testData2" title="新歌榜" :imgsData="testData2.slice(1, 4)" />
                <choicenessList v-if="testData2" title="热歌榜" :imgsData="testData2.slice(2, 5)" />
                <choicenessList v-if="testData2" title="原创榜" :imgsData="testData2.slice(3, 6)" />
            </div>
        </div>
        <!-- 4.雷达歌单 -->
        <div class="radarSongList">
            <div class="title">
                <div>111P的雷达歌单</div>
                <svgDown color="black" style="transform:rotate(-90deg);margin-left: 5px;" />
            </div>
            <!-- ✨ -->
            <radarSongList v-if="testData2" :totalData="testData2" />
        </div>
        <!-- VIP专享 -->
        <div class="VIPexclusive">
            <div class="title">
                <div>黑胶VIP专享，听歌放松一下</div>
                <svgDown color="black" style="transform:rotate(-90deg);margin-left: 5px;" />
            </div>
            <div class="vip-container">
                <littleCard v-if="testData2" v-for="i in testData2" singer="The Weekend" songName="Start Boy"
                    :imgUrl="i.url" class="little-card" />
            </div>
        </div>
        <!-- 根据 [茉莉雨] 为你推荐 -->
        <div class="VIPexclusive">
            <div class="title">
                <div>根据 [茉莉雨] 为你推荐</div>
                <svgDown color="black" style="transform:rotate(-90deg);margin-left: 5px;" />
            </div>
            <div class="vip-container">
                <littleCard v-if="testData1" v-for="i in testData1" singer="The Weekend" songName="Start Boy"
                    :imgUrl="i.url" class="little-card" />
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



.container {
    .main-banner {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;

        //轮播图
        .banner-looppicture {
            // margin-right: 20px;
        }

        //轮播图右侧推荐内容

    }

    .recommentList {
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

    .choicenessList {
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
            display: flex;
            /* 元素换行 */
            flex-wrap: wrap;
            justify-content: space-between;
            overflow: hidden;
            margin-top: 20px;
        }
    }

    .radarSongList {
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



    .VIPexclusive {
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
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }


        .little-card {}
    }
}
</style>