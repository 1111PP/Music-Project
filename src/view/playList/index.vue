<script setup>
import { ref, onMounted, watch, onBeforeUnmount, onBeforeMount, nextTick } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAudioStore } from '@/store/audio/index.js'
import { useSongsStore } from '@/store/songs/index.js'
import musicPlaying from '@/components/music-playing/index.vue'
import vividColor from '@/utils/vividColor.js'
import headerMini from '../layout/musicHeader/headerMini/index.vue'
import headerMax from '../layout/musicHeader/headerMax/index.vue'
import headerClose from '../layout/musicHeader/headerClose/index.vue'
import emitter from '@/utils/emitter.js'
//获取歌曲数据
import songAPI from '@/api/music/songLryic/index.js'
import imgAPI from '@/api/music/imgdata/index.js'
const router = useRouter()
const audioStore = useAudioStore()
const songsStore = useSongsStore()
//测试图片数据
const testTotalImage = ref(null)
const songCoverImg = ref(new URL(imgAPI.getRadarPicture(`main-radarList-img5.jpg`), import.meta.url))

//开关图片
const switchImg = new URL('@public/switch.png', import.meta.url)
const currSongThemeColor = ref(null)

//记录当前歌曲id，这里实际我用于切换歌曲封面
//音乐开关,🟥从pinia仓库中取出，因为它还需要供很多组件使用
const { currSongTextInfo: songInfo, currTime, currSongId, audioSwitch, lyricData, userFirstPlay, currSongTotalTime, currSongCoverImgID } = storeToRefs(audioStore)


//这里必须等待一下audioStore.changeSong
const changeSong = async (flag) => {
    await audioStore.changeSong(flag)
}

const toMain = () => {
    router.push('/')
}

//歌词切换，说明换歌了，同步变换背景图
watch(lyricData, async () => {
    //切换封面,并计算相关颜色
    songCoverImg.value = new URL(imgAPI.getRadarPicture(`main-radarList-img${currSongCoverImgID.value + 1}.jpg`), import.meta.url)
    //计算相关颜色,😂这是根据currSongCoverImgID对应的图片计算的
    await computedColor(songCoverImg.value)
})
/**
 * 计算播放页面总体背景颜色
 */
const computedColor = async (songCoverImg) => {
    const color = await vividColor(songCoverImg)
    //由于封面颜色不宜过亮，选择将各通道值-80，让文字内容更加明显
    currSongThemeColor.value = color
        .split(',')
        .slice(0, -1)
        .map((i) => Math.max(0, i - 20))
        .join()
}




//  供子组件musicFooter修改子组件musicPlaying的当前播放时间
const controlCurrTime1 = (time) => {
    emitter.emit('controlCurrTime', time)//修改全局播放器时间
}
const init = async () => {
    //计算相关颜色,😂这是根据currSongCoverImgID对应的图片计算的
    await computedColor(songCoverImg.value)
}

const songWordBox = ref()
const songWordBoxHeight = ref(0)
onMounted(async () => {
    // 初始化操作,🟥区分首次还是非首次
    await init()
    //获取假数据
    testTotalImage.value = await songsStore.songListData1()
    //监视歌词盒子的高度变化，实时改变歌词盒子的高度，变成响应式
    const resizeObserver = new ResizeObserver((entries) => {
        songWordBoxHeight.value = entries[0].contentRect.height
    })
    resizeObserver.observe(songWordBox.value)
})

const tabIndex = ref(0)
const tablistData = ref([
    { id: 0, text: '歌词' },
    { id: 1, text: '百科' },
    { id: 2, text: '相似推荐' },
])
const changeTabIndex = (id) => {
    tabIndex.value = id
}
// 磁带图片
const tapeImg = new URL('@public/tape.jpg', import.meta.url)
</script>

<template>
    <div class="playlist-container" :style="{
        background: `linear-gradient(to bottom,rgba(${currSongThemeColor}, 1) 0%,black 100% )`
    }">

        <!-- 顶部 -->
        <div class="playing-top">
            <!-- 左侧按钮 -->
            <div class="btn" @click="toMain">
                <div class="backBtn">
                    <svgDown color="white" />
                </div>
                <div class="backBtn">
                    <svgBig color="white" height="18" widhth="18" />
                </div>
            </div>
            <!-- 右侧控制按钮 -->
            <div class="control">
                <span class="playerMode">
                    <svgDown height="10" width="10" />
                    <span class="text">
                        播放器模式
                    </span>
                </span>
                <header-mini></header-mini>
                <header-max></header-max>
                <header-close></header-close>
            </div>
        </div>
        <!-- 主体区域 -->
        <div class="playing-main">
            <!-- 左侧磁带 -->
            <div class="tape ">
                <img class='music-switch' :src="switchImg" alt=""
                    :style="{ transform: audioSwitch ? 'rotate(35deg)' : 'rotate(0deg)' }">
                <div class="circleBox tape-rotate" :style="{ animationPlayState: audioSwitch ? 'running' : 'paused' }">
                    <img class="blackTrack" :src="tapeImg">
                    <img class="playingImg" :src="songCoverImg" alt="">
                </div>
            </div>
            <!-- 歌词区域 -->
            <div class="songWord">
                <div class="introduce">
                    <!-- {{ songInfo }} -->
                    <div class="songName">{{ songInfo.title }}</div>
                    <div class="otherInfo">
                        <div>{{ songInfo.otherInfo }}</div>
                    </div>
                    <div class="detailInfo">
                        <span>专辑:{{ songInfo.ablum }}</span>
                        <span>歌手:{{ songInfo.author }}</span>
                        <span>来源:{{ songInfo.source }}</span>
                    </div>
                    <div class="tab">
                        <div v-for="i in tablistData" :key="i.id" class="tab-children" @click="changeTabIndex(i.id)"
                            :class="i.id === tabIndex ? 'tab-children-active' : ''">{{ i.text }}</div>
                    </div>
                </div>
                <!-- 歌词 -->
                <div ref="songWordBox" class="songword-main" v-show="tabIndex === 0">
                    <musicPlaying v-if="lyricData" :responseHeight="songWordBoxHeight" ref="musicPlayingInstance"
                        :switch="audioSwitch" :currTime="currTime" :lyricData1="lyricData"
                        @controlCurrTime="controlCurrTime1" />
                </div>
                <!-- 百科 -->
                <div class="tab-encyclopedia" v-show="tabIndex === 1">
                    <div class="titletext">
                        <div class="firstCow"><span>音乐百科</span><span>查看详情</span></div>
                        <div class="otherCow"><span>曲风</span><span>流行-华语流行</span></div>
                        <div class="otherCow"><span>语种</span><span>国语</span></div>
                        <div class="otherCow"><span>发行时间</span><span>2024-04-08</span></div>
                        <div class="otherCow"><span>发行版本</span><span>录音室版</span></div>
                    </div>
                </div>
                <!-- 相似推荐 -->
                <div class="tab-seemRecommend" v-show="tabIndex === 2">
                    <div class="otherSongList">
                        <div class="firstCow"><span>相关歌单</span></div>
                        <div class="box">
                            <div class="imgBox" v-if="testTotalImage" v-for="i in testTotalImage.slice(0, 3)">
                                <img :src="i.url" alt="">
                                <div class="text">
                                    歌曲相关歌单推荐
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="otherSong">
                        <div class="seemSong">
                            <span>相似歌曲</span>
                            <div class="play">
                                <svgTriangle height="15px" width="15px" />
                                <div class="text">播放</div>
                            </div>
                        </div>
                        <div class="songList ">
                            <div class="singleSong" v-if="testTotalImage" v-for="i in testTotalImage.slice(3, 8)">
                                <img :src="i.url" alt="">
                                <div class="right">
                                    <div class="songName">Start Boy</div>
                                    <div class="singer">The Weekend</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <musicFooter v-if="currSongThemeColor" :type="1" :themeColor="currSongThemeColor" :totalTime="currSongTotalTime"
            :currTime="currTime" @controlCurrTime="controlCurrTime1" @nextSong="changeSong(2)"
            @prevSong="changeSong(1)" />
    </div>
</template>

<style scoped lang='scss'>
.playlist-container {
    position: relative;
    width: 100vw;
    height: 100vh;



    .playing-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 45px;
        width: 93%;
        height: 80px;

        .btn {
            display: flex;

            .backBtn {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 15px;
                height: 39px;
                width: 39px;
                border: 0.5px solid rgba(181, 181, 181, 0.26);
                border-radius: 10px;
                cursor: pointer;
            }
        }

        .control {
            display: flex;
            align-items: center;

            .playerMode {
                --height: 30px;
                width: 120px;
                height: var(--height);
                line-height: var(--height);
                margin-right: 10px;
                font-size: 15px;
                border: 1px solid rgba(112, 112, 112, 0.491);
                border-radius: calc(var(--height) / 2);
                color: rgb(173, 173, 173);
            }

            .playerMode:hover {
                background-color: rgba(121, 121, 121, 0.203);
            }
        }

    }

    .playing-main {
        display: flex;
        height: calc(100% - 80px);

        //左侧胶片
        .tape {
            flex: 1;
            display: flex;
            justify-content: center;
            margin-top: 100px;
            position: relative;
            margin-left: 80px;

            .music-switch {
                position: absolute;
                top: -65px;
                left: 48%;
                transition: all 0.5s;
                //确定精确的旋转中心
                transform-origin: 13px 13px;
                //最高层级
                z-index: 4
            }

            .circleBox {
                position: relative;
                height: 345px;
                width: 345px;
                border-radius: 50%;
                background-color: rgba(146, 146, 146, 0.171);
                border: 1px solid rgba(254, 254, 254, 0.053);
                z-index: 1;



                .blackTrack {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    height: 320px;
                    width: 320px;
                    background-size: 90% 90%;
                    border-radius: 50%;
                    background-color: black;
                    z-index: 2;
                }

                .playingImg {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    height: 210px;
                    width: 210px;
                    border-radius: 50%;
                    z-index: 3;
                }
            }
        }

        //右侧歌词
        .songWord {
            display: flex;
            flex-flow: column;
            flex: 1;
            height: calc(100% - 90px);

            .introduce {
                width: 90%;
                height: 150px;
                // background-color: rgba(128, 128, 128, 0.253);

                .songName {
                    font-size: 24px;
                    color: white;
                    margin-bottom: 10px;
                }

                .otherInfo {
                    font-size: 15px;
                    color: #ada8a8;
                    margin-bottom: 5px;
                }

                .detailInfo {
                    font-size: 15px;
                    color: #ada8a8;
                }

                .detailInfo span {
                    margin-right: 15px;
                }

                .tab {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 20px;
                    width: 170px;
                    height: 30px;
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 17.5px;
                    padding: 3px;


                    .tab-children {
                        padding: 0 9px;
                        text-align: center;
                        color: white;
                        font-size: 13px;
                        font-weight: 700;
                        border-radius: 17.5px;
                        height: 100%;
                        line-height: 23px;
                        transition: all 0.2s;
                    }

                    .tab-children-active {
                        background-color: #f7f7f72e;
                    }
                }
            }

            .songword-main {
                width: 90%;
                height: 72%;
                overflow: hidden;
            }

            //百科
            .tab-encyclopedia {
                width: 450px;
                margin-top: 10px;
                background-color: #ffffff11;
                border-radius: 20px;

                .titletext {
                    padding: 20px;

                    .firstCow {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;

                        span {
                            color: gray;
                            font-size: 15px;
                        }

                        span:first-child {
                            color: rgb(255, 255, 255);
                            font-size: 20px;
                            font-weight: 700;
                        }

                    }



                    .otherCow {
                        display: flex;
                        width: 100%;
                        margin-bottom: 15px;
                    }

                    .otherCow span:first-child {
                        display: block;
                        color: gray;
                        font-size: 18px;
                        width: 100px;
                    }

                    .otherCow span:nth-child(2) {
                        font-size: 16px;
                        text-align: left;
                        margin-left: 20px;
                        color: rgb(201, 201, 201);
                    }

                    .otherCow:last-child {}

                }
            }

            .tab-seemRecommend {
                margin-top: 10px;
                overflow: auto;
                height: 450px;

                .otherSongList {
                    padding: 20px;
                    width: 410px;
                    border-radius: 20px;
                    background-color: #ffffff11;

                    .firstCow {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                    }

                    span {
                        color: gray;
                        font-size: 15px;
                    }

                    span:first-child {
                        color: rgb(255, 255, 255);
                        font-size: 20px;
                        font-weight: 700;
                    }


                    .box {
                        display: flex;
                        justify-content: center;

                        .imgBox {
                            margin-right: 20px;

                            img {
                                height: 120px;
                                width: 120px;
                                border-radius: 15px;
                            }

                            .text {
                                font-size: 15px;
                                color: #b0aeae;
                            }
                        }

                        .imgBox:last-child {
                            margin-right: 0px;
                        }
                    }


                }

                .otherSong {
                    margin-top: 15px;
                    width: 450px;
                    border-radius: 20px;
                    background-color: #ffffff11;
                    padding-bottom: 15px;
                    overflow: hidden;

                    .seemSong {
                        padding: 20px 0 0 20px;
                        font-size: 20px;
                        font-weight: 700;
                        color: rgb(201, 201, 201);
                        margin-bottom: 20px;
                        display: flex;
                        align-items: end;

                        .play {
                            display: flex;
                            align-items: center;
                            width: 60px;
                            height: 20px;
                            border-radius: 10px;
                            background-color: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(220, 220, 220, 0.1);
                            margin-bottom: 3px;
                            margin-left: 20px;

                            .text {
                                font-size: 12px;
                                margin-left: -6px;
                                font-weight: 700;
                                color: rgb(201, 201, 201)
                            }
                        }
                    }

                    .songList {

                        .singleSong:hover {
                            background-color: rgba(181, 181, 181, 0.196);
                        }

                        .singleSong {
                            display: flex;
                            align-items: center;
                            padding: 5px 0 5px 20px;

                            img {
                                height: 50px;
                                width: 50px;
                                border-radius: 10px;
                            }

                            .right {
                                display: flex;
                                flex-flow: column;
                                justify-content: center;
                                margin-left: 15px;

                                .songName {
                                    color: #E9E9E9;
                                    margin-bottom: 5px;
                                }

                                .singer {
                                    color: #ACACAC
                                }
                            }
                        }
                    }
                }
            }
        }


    }

    .tape-rotate {
        animation: rotate 30s linear infinite;
        transform-origin: center center;
    }


    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
}
</style>