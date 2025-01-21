<script setup>
import { ref, onMounted } from 'vue'
import lpCard from '@/components/lpUI/lp-card/index.vue'
const props = defineProps({
    imgUrl: {
        typeof: String,
        default: ''
    },
    songName: {
        typeof: String,
        default: ''
    },
    singer: {
        typeof: String,
        default: ''
    },
})
</script>

<template>
    <div class="little-card-box">
        <lpCard :width="420" :height="86" bgColor="none" :responseSize="false" :boxShadow="false">
            <template #default>
                <div class="little-card-container">
                    <div class="imgBox">
                        <img class="imgss" v-show="imgUrl" :src="imgUrl" alt="" title="暂停">
                        <svgTriangle class="icon" height="30px" width="30px"></svgTriangle>
                    </div>
                    <div class="little-card-text">
                        <div class="songName">{{ songName }}</div>
                        <div class="decorate">
                            <div class="visibleItem">
                                <div class="comment">1w+评论</div>
                                <div class="mv">MV</div>
                                <div class="singer">
                                    {{ singer }}
                                </div>
                            </div>
                            <div class="hiddenIcon">
                                <svgDownload color="gray" />
                                <svgLove color="gray" />
                                <span class="more">
                                    ···
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </template>
        </lpCard>
    </div>
</template>

<style lang='scss' scoped>
.little-card-box {
    margin-bottom: 8px;
}

.little-card-container {
    display: flex;
    height: 100%;
    align-items: center;

    &:hover {
        background-color: #ffffff;
    }

    /* 图片半透明黑色蒙版 */
    &:hover .imgBox::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(31, 31, 31, 0.189);
        border-radius: 10px;
        z-index: 2;
    }

    &:hover .imgBox .icon {
        opacity: 1;
    }

    &:hover .little-card-text .decorate .hiddenIcon {
        opacity: 1;
    }

    .imgBox {
        display: flex;
        align-items: center;
        margin-left: 10px;
        position: relative;
        height: 70px;
        width: 70px;

        .icon {
            position: absolute;
            left: 10px;
            opacity: 0;
        }

        .imgss {
            height: 70px;
            width: 70px;
            border-radius: 10px;
        }
    }

    .little-card-text {
        margin-left: 10px;
        width: 100%;

        .songName {
            margin-bottom: 8px;
            font-size: 15px;
        }

        .decorate {
            display: flex;
            align-items: center;
            width: 95%;

            .visibleItem {
                display: flex;
                align-items: center;
                // justify-content: space-between;
                width: 100%;

                .comment {
                    padding: 2px;
                    font-size: 10px;
                    border-radius: 5px;
                    color: red;
                    background-color: #ffdadd;
                }

                .mv {
                    margin: 0 5px;
                    padding: 3px 3px 2px 3px;
                    border-radius: 5px;
                    font-size: 10px;
                    font-weight: 700;
                    color: red;
                    border: 1px solid rgb(251, 91, 91);
                }

                .singer {
                    font-size: 12px;
                    color: gray;
                    margin-top: 2px;
                }
            }

            .hiddenIcon {
                display: flex;
                align-items: center;
                margin-top: -20px;
                opacity: 0;

                .more {
                    font-size: 20px;
                    margin-left: 5px;
                    color: gray;
                }
            }

        }
    }
}
</style>