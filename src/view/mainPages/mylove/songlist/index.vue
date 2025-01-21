<script setup>
import { ref, onMounted } from 'vue';
import API from '@/api/music/songLryic/index.js'
import { useAudioStore } from '@/store/audio/index.js'
import { formatTime } from '@/utils/formatTime.js'
import { storeToRefs } from 'pinia';
import imgAPI from '@/api/music/imgdata/index.js'
const audioStore = useAudioStore()
const { currSongId } = storeToRefs(audioStore)
const props = defineProps(['handlesongCount'])
const allSongList = ref([])
onMounted(async () => {
    //获取所有音乐数据渲染播放列表，同时先获取到所有音乐的总时长
    const { data: r } = await API.getSongInfo()
    allSongList.value = r.map((i, idx) => {
        return {
            info: {
                singer: i.author,
                songName: i.songName,
            },
            id: i.id,
            time: i.time,
            coverUrl: getRandomImg() // 在这里分配随机图片
        }
    })
    // console.log(allSongList.value);
    //传递给一级路由歌曲数量
    props.handlesongCount(allSongList.value.length)
})
const changeSongByList = ({ id }) => {
    if (currSongId.value == id) return
    audioStore.changeSong('', id)
}
const getRandomImg = () => {
    const randomIndex = Math.floor(Math.random() * 8) + 1
    return new URL(imgAPI.getRadarPicture(`main-radarList-img${randomIndex}.jpg`), import.meta.url);
}
const indexMethod = (index) => {
    index++
    return index < 10 ? `0` + index : index
}

</script>

<template>
    <div>
        <el-table @current-change="changeSongByList" :data="allSongList">
            <el-table-column type="index" width="50" :index="indexMethod" label="#" />
            <el-table-column property="info" label="标题" sortable>
                <template #default="{ row: { coverUrl, info } }">
                    <div class="list-item">
                        <div class="cover">
                            <img style="width: 39px;
                                    height: 39px; border-radius: 10px;" :src="coverUrl" alt="">
                        </div>
                        <div class="song-info">
                            <div class="songName"> {{ info.songName }}</div>
                            <div class="singer"> {{ info.singer }}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="info" label="专辑" width="200">
                <template #default="{ row: { info } }">
                    <div class="album">
                        {{ info.singer }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="love" label="喜欢" width="60">
                <template #default>
                    <div class="item-love" style="padding-left: 3px;">
                        <svgLove style="margin:10px 0 0 0" color="red"></svgLove>
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="time" label="时长" width="80" sortable>
                <template #default="{ row: { time } }">
                    <div>
                        {{ formatTime(time) }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div style="height: 100px; color:gray; margin-top: 10px;">标有☁的音乐是我的云盘文件，其他用户无法查看
        </div>
    </div>
</template>

<style scoped lang='scss'>
//🟥🟥🟥重写tablehover,设置鼠标经过tr的效果
:deep(.el-table) tbody tr:hover {
    background-color: rgb(255, 255, 255) !important;
    cursor: pointer;
    border-radius: 20px;
}


// 🟥🟥🟥99-110 设置表格:表头、行、标题等各处的背景为透明
:deep(.el-table) {
    //清除tablehover
    background: transparent;
}

:deep(.el-table tr) {
    background: transparent !important;
}

:deep(.el-table th) {
    background: transparent !important;

    //表头hover样式
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }
}



.list-item {
    display: flex;
    align-items: center;

    .cover {
        width: 39px;
        height: 39px;
        border-radius: 10px;
        background-color: green;
    }

    .song-info {
        display: flex;
        flex-flow: column;
        margin-left: 10px;
        // margin-top: 5px;

        .songName {
            font-size: 12px;
            color: black;
        }

        .singer {
            margin-top: -3px;
            font-size: 12px;
            color: gray;
        }
    }

    .control {
        display: flex;
        align-items: center;
        margin-left: auto;

        .play {
            width: 20px;
            height: 20px;
            border-radius: 10px;
            background-color: #dfe7f1;
            line-height: 20px;
            text-align: center;
            font-weight: 700;
        }

        .more {
            margin-left: 10px;
            width: 20px;
            height: 20px;
            border-radius: 10px;
        }
    }
}
</style>