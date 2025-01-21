<script setup>
import { ref, onMounted } from 'vue'
import { loginAPI } from '@/api/user';
import useUserData from '@/store/user/index.js'
import { storeToRefs } from 'pinia';
const speechImg = new URL('@public/header/speech.png', import.meta.url)

const userData = useUserData()
const { searchContext } = storeToRefs(userData)
let recognition
const isRecognizing = ref(false)
//  于是通过js动态class实现动画效果
const startRecognize = () => {
    isRecognizing.value = !isRecognizing.value
    if (isRecognizing.value) {
        recognition.start();
    } else {
        recognition.stop();

    }
}
onMounted(() => {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.continuous = true; // 持续录音
    recognition.lang = 'zh-CN'; // 识别语言为中文
    recognition.interimResults = true; // 中间结果
    // 处理识别结果
    recognition.onresult = (event) => {
        let result = '';
        for (let i = 0; i < event.results.length; i++) {
            result += event.results[i][0].transcript; // 获取识别的文本
        }
        searchContext.value = result
    };
    // 处理错误
    recognition.onerror = (err) => {
        console.error('Error:', err);
    };
})       
</script>

<template>
    <div class="speech-container">
        <div class="title">
            <div class="left">听歌识曲</div>
            <div class="right">创建桌面快捷方式</div>
        </div>
        <div class="cover">
            <img class="img" :src="speechImg" alt="" />
            <div class="lightCircle"></div>
            <!-- ✨开始识别和未开始识别的样式区分-->
            <!-- ❌通过动态style，同时设置animation和animationDelay无法实现动画效果，❌这样也不行： animation: `small 3s linear ${index + 's'} infinite`
                🈯于是通过动态class的方式达到效果 -->
            <div ref="style-outline" :class="[isRecognizing ? 'changeStyle' : '', 'style-outline']"
                v-for="(i, index) in 3" :key="index" :style="{
                    width: isRecognizing ? '350px' : 200 + index * 63 + 'px',
                    height: isRecognizing ? '350px' : 200 + index * 63 + 'px',
                    border: isRecognizing ? '' : '1px solid rgba(217, 217, 217, 0.52)',
                    animationDelay: index + 's'
                }"></div>
        </div>
        <div class="start">
            <div class="top">识别电脑正在播放的音乐</div>
            <div class="bottom" @click="startRecognize">{{ isRecognizing ? '停止识别' : '开始识别' }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.changeStyle {
    animation: small 3s linear infinite
}

@keyframes small {
    0% {
        transform: scale(1);
        background-color: rgba(255, 0, 0, 0.1);
    }

    100% {
        transform: scale(0);
        background-color: rgba(255, 0, 0, 0.5);
    }
}

.speech-container {
    width: 100%;
    height: 100%;

    .title {
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
            font-weight: 700;
            font-size: 24px;
        }

        .right {
            color: gray;
            font-size: 15px;
        }
    }

    .cover {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 369px;
        width: 100%;

        .img {
            //裁剪掉图片的部分，因为是p图所以存在白边，因此要裁剪掉圆形的外围一点点，但因为是正方形图片，裁剪的百分比要很大，这和border-radius是类似的，裁剪42%实际才裁剪掉图片中圆形部分的外圈
            clip-path: circle(42%);
            z-index: 2;
        }

        .lightCircle {
            position: absolute;
            width: 120px;
            height: 120px;
            border-radius: 100%;
            box-shadow: 0 0 60px rgba(255, 0, 0);
        }



        .style-outline {
            position: absolute;
            border-radius: 100%;
        }
    }

    .start {
        display: flex;
        flex-flow: column;
        align-items: center;

        .top {
            color: gray;
            font-size: 15px;
        }

        .bottom {
            margin-top: 10px;
            width: 120px;
            height: 39px;
            border: 1px solid rgb(217, 217, 217);
            border-radius: 25px;
            text-align: center;
            line-height: 39px;
            font-size: 15px;

            &:hover {
                background-color: rgba(217, 217, 217, 0.42);
                border: 1px solid rgb(167, 167, 167);
            }
        }
    }
}
</style>
