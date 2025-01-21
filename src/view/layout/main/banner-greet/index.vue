<script setup>
import lpCard from '@/components/lpUI/lp-card/index.vue'
defineProps({
    totalData: {
        typeof: Array,
        default: () => []
    }
})
</script>

<template>
    <div class="banner-greet">
        <lpCard :boxShadow="true" :height="158" :width="431">
            <template #default>
                <div class="title">
                    <span class="timeText">
                        下午好，
                    </span>
                    <span class="text">猜你最近喜欢听</span>
                </div>
                <div class="recommendSongs">
                    <lpCard class="banner-childSongs" v-if="totalData" v-for="i in totalData.slice(0, 4)" :key="i.id"
                        :boxShadow="true" :responseSize="true" :width="85" :height="85">
                        <template #default>
                            <div :style="{
                                height: '100%',
                                width: '100%',
                                background: `url(${i.url}) no-repeat`,
                                backgroundSize: '100% 100%',
                            }">
                            </div>
                        </template>
                    </lpCard>
                </div>
            </template>
        </lpCard>
    </div>
</template>

<style scoped lang='scss'>
.banner-greet {
    .title {
        margin: 10px 0 0 20px;

        .timeText {
            font-size: 20px;
            font-weight: 700;
        }

        .text {
            font-size: 14px;
            margin-left: -10px;
            font-weight: 700;
            vertical-align: bottom;
        }
    }

    .recommendSongs {
        display: flex;
        justify-content: center;
        margin-top: 5%;

        // ✨为非第1个元素设置间距,配合justify-content保持居中
        .banner-childSongs:nth-child(n+2) {
            margin-left: 15px;
        }

        .banner-childSongs {
            // margin-top: 20px;
            transition: transform 0.3s;

            /* 鼠标悬停时的样式 */
            &:hover {
                transform: scale(1.1);
                cursor: pointer;
            }

            /* 鼠标移出时的样式 */
            &:not(:hover) {
                transform: scale(1);
            }
        }


    }
}
</style>