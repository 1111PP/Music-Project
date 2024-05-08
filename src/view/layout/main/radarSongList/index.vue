<script  setup>
import lpCard from '@/components/lpUI/lp-card/index.vue'
defineProps({
    totalData: {
        typeof: Array,
        default: () => []
    }
})
</script>

<template>
    <!-- 推荐歌单模块 -->
    <div class="main-recommentSongList">
        <lpCard class="single-song-playist" :boxShadow="true" v-for="   i  in  totalData.slice(4, totalData.length)"
            :key="i.id" bgColor="white" :width="206" :height="259" :responseSize="false">
            <template #default>
                <div class="song-list-item">
                    <div class="topText">
                        <div class="left">
                        </div>
                        <div class="right">
                            <svgTriangle style="margin:0 3px" height="15px" width="15px" />
                            999.99万
                        </div>
                    </div>
                    <div class="bgImg" :style="{
                        background: `url(${i.url}) no-repeat`,
                        backgroundSize: '100% 100%'
                    }">
                    </div>
                    <div class="cover-bottom " :style="{ backgroundColor: `rgba(${i.themeColor})` }">
                        <div class="main-play">
                            <svgPlay color="white" height="39px" width="39px" />
                        </div>
                        <div class="text" ref="maskingText">
                            <div class="title">
                                每日推荐 | 从 [ 你 ] 听起
                            </div>
                            <div class="songsName">
                                <p>1 晴天</p>
                                <p>2 狂恋你</p>
                                <p>3 透明轨迹</p>
                            </div>
                        </div>
                        <!-- 🟥style设置鼠标移入歌单卡片后✨背景渐变色 -->
                        <div ref="maskingBgc" class="maskingBgc"
                            :style="{ background: `linear-gradient(to top,rgba(${i.themeColor}, 1) 0%,rgba(${i.themeColor}, 1) 40%,rgba(${i.themeColor}, 0) 100%)` }">
                        </div>
                    </div>
                </div>
            </template>
        </lpCard>
    </div>
</template>

<style scoped lang='scss'>
.main-recommentSongList {
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    margin-bottom: 40px;



    .single-song-playist {

        //🟥1.hover歌单卡片后的文字向上偏移效果
        .song-list-item:hover .text {
            transform: translateY(-70%);
        }

        //  2.背景向上偏移效果
        .song-list-item:hover .maskingBgc {
            transform: translateY(-80%);
        }

        //  3.播放按钮显现效果
        .song-list-item:hover .main-play {
            z-index: 5;
            opacity: 1;
        }

        .song-list-item {
            position: relative;
            height: 100%;
            width: 100%;
            overflow: hidden;

            .main-play {
                position: absolute;
                right: 5%;
                bottom: 25%;
                opacity: 0;
                transition: all 0.2s;
            }

            .main-play:hover {
                transform: scale(1.1);
            }


            .topText {
                position: absolute;
                display: flex;
                justify-content: space-between;
                margin-left: 10px;
                margin-top: 10px;
                width: 90%;

                .left {
                    font-size: 18px;
                    color: white;
                    font-weight: 700;

                }

                .right {
                    display: flex;
                    align-items: center;
                    font-size: 15px;
                    font-weight: 700;
                    color: white;

                }
            }

            .bgImg {
                height: 80%;
                width: 100%;
            }


            .cover-bottom {
                position: relative;
                height: 21%;
                width: 100%;
                top: -1px;

                //歌单卡片的文字向上偏移的过渡效果
                .text {
                    position: absolute;
                    z-index: 2;
                    transition: all .3s;

                    .title {
                        color: white;
                        font-size: 15px;
                        height: 46px;
                        text-align: left;
                        line-height: 46px;
                        margin-left: 10px;
                    }

                    .songsName {
                        margin-left: 10px;
                        color: white;
                        font-size: 12px;
                        margin-top: -8px;
                    }
                }

                //歌单卡片的背景向上偏移的过渡效果
                .maskingBgc {
                    height: 230px;
                    width: 100%;
                    transition: all .3s;
                }
            }


        }

    }

}
</style>