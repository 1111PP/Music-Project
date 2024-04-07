<script  setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { addCommentAPI, getAllCommentAPI } from '@/api/user/index.js'

//引入深拷贝方法
import cloneDeep from 'lodash/cloneDeep'
import md5 from 'md5'
const router = useRouter()
//弹幕池,保存所有用户数据的评论当前播放弹幕从此取出,避免污染
const deflistaultList = ref([
])
//控制弹幕的播放,通过push可以及时将弹幕播放到屏幕上,达到循环播放效果
//🟥list数据是不断变化的.播放什么弹幕,它就会是什么值,所以我每隔1s往list.value.push一个数据,即给当前屏幕上的添加一个弹幕
const list = ref([])
let timer = null
const add = () => {
    timer = setInterval(() => {
        list.value.push(
            deflistaultList.value[(Math.floor(Math.random() * deflistaultList.value.length))]
        )
    }, 1500)
}
onBeforeMount(() => {
    clearInterval(timer)
})

const reqStatus = ref(true)
const comment = ref('')
const addComment = async () => {
    if (comment.value.trim() === '') {
        alert('评论不能为空')
        return
    }
    reqStatus.value = false
    const r = await addCommentAPI({
        id: deflistaultList.value.length + 1,
        comment: comment.value
    })
    if (r?.code === 200) {
        // //后续循环播放此弹幕
        deflistaultList.value.push(r.data)
        // //list.push及时可以将该条弹幕立即滚动到屏幕中
        list.value.push(r.data)
        comment.value = ''
    } else {
        alert(r.msg)
    }
    reqStatus.value = true

}
onMounted(async () => {
    let r = await getAllCommentAPI()
    if (r && r?.code === 200) {
        if (r.data.legnth !== 0) {
            deflistaultList.value = r.data.map((item) => {
                return {
                    "id": item.id,
                    "text": item.comment
                }
            })
            //弹幕开始播放
            add()
        }
    }
})
</script>

<template>
    <div class="container">
        <van-watermark content="111P" :gap-x="30" :gap-y="10" opacity="0.3">
        </van-watermark>
        <van-notice-bar scrollable left-icon="volume-o" text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。" />
        <!-- <van-config-provider theme="dark"> -->
        <van-barrage duration="3000" :auto-play="true" v-model="list">
            <div class="video" style="width: 100%; height: 150px"></div>
        </van-barrage>
        <el-form class="form">
            <el-form-item label="添加弹幕">
                <el-input v-model=comment style="width:100px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="!reqStatus" type="primary" @click="addComment">添加</el-button>
            </el-form-item>
        </el-form>
        <!-- </van-config-provider> -->
    </div>
</template>

<style scoped lang='scss'>
.container {
    height: 100%;
    flex: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;

    .form {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
}



// .van-button--primary {
// color: var(--van-button-primary-color);
// color: var(--van-button-primary-color);
// background-color: $xtxColor;
// }
</style>