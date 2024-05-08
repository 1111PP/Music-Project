<script  setup>
import lpCard from '@/components/lpUI/lp-card/index.vue'
defineProps({
    title: {
        typeof: String,
        default: ''
    },
    imgsData: {
        typeof: Array,
        default: () => []
    },
    songName: {
        typeof: Array,
        default: () => []
    }
})
</script>

<template>
    <div class="container">
        <lpCard class="card" :boxShadow="false" :height="146" :width="426" bgColor="white" :responseSize="false">
            <template #default>
                <div class="title">
                    <div class="left-text">
                        {{ title }}
                    </div>
                    <div class="right-text">
                        刚刚更新
                    </div>
                </div>
                <div class="item-songs">
                    <div class="songs-imgs">
                        <img class="imgs" v-for="(i, index) in imgsData.slice(0, 3)" :key="i.id" :src="i.url" alt="" :style="{
                            height: `${80 - index * 15}px`,
                            width: `${80 - index * 15}px`,
                            transform: `translateX(${index * 25}px)`,
                            zIndex: 10 - index,
                        }" />
                        <svgTriangle height="39px" width="39px" class="icon" />
                    </div>
                    <div class="songs-name">
                        <div>1 十年 <span class="author"> - 陈奕迅</span></div>
                        <div style="margin:5px 0">2 大城小爱 <span class="author"> - 王力宏</span></div>
                        <div>3 我们的歌 <span class="author"> - 王力宏</span></div>
                    </div>
                </div>
            </template>
        </lpCard>
    </div>
</template>

<style scoped lang='scss'>
.container {
    margin-bottom: 15px;

    //✨增加样式优先级
    .card:hover .item-songs .songs-imgs .icon {
        opacity: 1;
    }


    .title {
        display: flex;
        justify-content: space-between;
        margin: 10px 20px 0 20px;

        .left-text {
            font-size: 20px;
            font-weight: 700;
            color: #3D465A;
        }

        .right-text {
            font-size: 12px;
            color: rgb(183, 183, 183)
        }
    }

    .item-songs {
        display: flex;
        margin: 5px 20px 0 20px;



        .songs-imgs {
            position: relative;

            // .card:hover 


            .imgs {
                border-radius: 8px;
                position: absolute;
                bottom: 0;
            }

            .icon {
                position: absolute;
                transform: translate(25%, -40%);
                top: 50%;
                z-index: 99;
                opacity: 0;
                transition: all 0.2s;
            }


        }



        .songs-name {
            font-size: 15px;
            margin: 8px;
            margin-left: 120px;
            color: #3D465A;

            .author {
                color: rgb(161, 161, 161);
            }
        }
    }
}
</style>