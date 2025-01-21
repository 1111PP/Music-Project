<!-- 
子窗口中点击事件无法触发的问题，通常与 -webkit-app-region: drag 属性的使用有关。这个属性会将整个区域变为可拖拽的区域，但也会阻止区域内的点击、悬停等事件的触发，影响元素的交互性。
  在你的代码中，由于父级元素（.lyrics-container）应用了 -webkit-app-region: drag，这使得子元素无法接收点击事件，即使在子元素上设置了 -webkit-app-region: no-drag，也会出现问题。
解决方法：
    将 -webkit-app-region: drag 仅应用于不需要交互的部分：
    例如，你可以将拖拽功能限制在窗口的空白区域，避免影响到需要点击的按钮。
    为可交互的部分使用 -webkit-app-region: no-drag：
    确保点击的按钮所在区域没有 drag 属性。 -->
<script setup>
import { onMounted, ref } from 'vue';
const { ipcRenderer } = require('electron');
const lyricword = ref({})
const songInfo = ref({})
onMounted(() => {
    ipcRenderer.on('lyric-switch-state', (event, state) => {
        console.log('子窗口触发', state);
        audioSwitch.value = state
    })

    ipcRenderer.on('song-info-updated', (event, currSongTextInfo) => {
        console.log(currSongTextInfo);
        songInfo.value = currSongTextInfo
    });

    ipcRenderer.on('song-word-updated', (event, lyricData) => {
        lyricword.value = lyricData
    });
});
const closeWin = () => {
    console.log('close');
    ipcRenderer.send('close-lyric-dialog')
}
const handleSwitch = () => {
    ipcRenderer.send('lyric-handle-switch')
}
const changeSong = (flag) => {
    ipcRenderer.send('lyric-change-song', flag)
}
const audioSwitch = ref(false)


</script>

<template>
    <div class="lyrics-container">
        <div class="control">
            <div class="item">
                <svgPrevSong @click="() => changeSong(1)" class="prevSong" height="30px" width='30px' color="white" />
                <div class="switch" @click="handleSwitch">
                    <svgTriangle v-show="!audioSwitch" color="white" height="30px" width="30px" />
                    <svgContinue v-show="audioSwitch" color="white" height="25px" width="25px" />
                </div>
                <svgNextSong @click="() => changeSong(2)" class="prevSong" height="30px" width='30px' color="white" />
            </div>
        </div>
        <div class="lyrics-text">{{ lyricword.words || '' }}</div>
        <svgClose @click="closeWin" class="close" height="20px" width='20px' color="white" />
    </div>
</template>

<style scoped lang="scss">
.lyrics-container {
    position: relative;

    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    // backdrop-filter: blur(10px);
    /* 🟥🟥🟥使整个歌词弹窗容器可拖拽 */
    -webkit-app-region: drag;
    padding: 30px 0;
    overflow: hidden;

    .close {
        position: absolute;
        /* 用于按钮的点击区域，🟥若不设置no-drag，则继承父元素。即整个容器可拖拽的特性，
        
        🔴由于拖拽会导致其余事件取消默认行为，导致无法触发点击事件控制事件行为*/
        -webkit-app-region: no-drag;
        right: 20px;
        top: 20px;
        cursor: pointer;
    }
}

.control {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    padding: 0 20px;
    height: 30px;
    // width: 100%;


    .item {
        display: flex;
        align-items: center;
        -webkit-app-region: no-drag;

        .switch {
            width: 50px;
        }
    }

}

.lyrics-text {
    font-size: 30px;
    color: #40ff60;
    text-align: center;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.8);
    /* 文本内容也可以拖拽*/
    -webkit-app-region: drag;
}
</style>
