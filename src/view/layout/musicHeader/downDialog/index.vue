<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import lpDialog from '@/components/lpUI/lp-dialog/index.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import useUserData from '@/store/user/index.js'
import { storeToRefs } from 'pinia';
const userData = useUserData()
const { userInfo, promiseArr, clearUserInfo, canLogout } = storeToRefs(userData)
import { useAudioStore } from '@/store/audio'
const audioStore = useAudioStore()
//展示数据
const listItem = ref([
    {
        text: '我的会员',
        id: 1
    },
    {
        text: '等级',
        id: 2
    },
    {
        text: '商城',
        id: 3
    },
    {
        text: '个人信息设置',
        id: 4
    },
    {
        text: '绑定社交帐号',
        id: 5
    },
    {
        text: '我的客服',
        id: 6
    },
])

//监听弹窗状态
const downDialogStatus = ref(false)
//点击下拉按钮处理
const showDialog = () => {
    downDialogStatus.value = !downDialogStatus.value
    // console.log('open');
}
//关闭弹窗的方式,供子组件使用
const closeDialog = () => {
    downDialogStatus.value = false;
}
let timer = null
const logout = () => {
    // ❌问题：当comment组件onBeforeUnmount时会发送保存点赞请求，但是冲突了，因为在comment界面退出登录时，实际上先执行router.push('/login')，随后token、用户信息之类的消息都被清空，请求就会失败
    //✨涉及到Vue底层watch回调执行时机，watch会在监视的值改变后立即将回调推入微队列,所以canLogout改变后，comment组件的watch会立即将回调推入微队列，所以肯定先于Promise.all.then的执行,然后watch回调中保存的异步操作将Promise们收集到promiseArr，等待全部完成,然后再执行Promise.then中的退出逻辑了
    // ❓然而执行后,打印顺序依旧是正常的,但是promiseArr会为空,也就是说一些奇怪的现象( 可能是执行顺序冲突 )导致了watch回调没有及时收集到那些保存操作的Promise,从而出现了请求依旧没有发出的问题
    // 💡解决:强制延缓Promise.all.then操作,确保watch执行完全
    // 打印顺序: logout  ->  watch执行  -> 退出中
    canLogout.value = false
    // console.log('logout');
    setTimeout(async () => {
        const r = await Promise.all(promiseArr.value)
        // console.log('退出中', r);
        userData.clearUserInfo()

        //清除pinia数据
        window.location.reload()

        router.push('/login')
    })
}
onBeforeUnmount(() => {
    console.log('clear !!!!', timer);
    clearInterval(timer)
})

</script>

<template>
    <div class="dialog-container">
        <component class="header-iconStyle" @click="showDialog" style="margin-top: 5px;" is="svgDown" height="15px"
            width="15px" color="gray">
        </component>
    </div>
    <!-- 弹窗单独封装组件 -->
    <!-- 需要传递props：1.控制弹窗状态开关 2.弹窗关闭回调（😂子改父）-->
    <lp-dialog bgColor="#F7F9FC" :visible="downDialogStatus" @closeDialog="closeDialog" :listItem="listItem">
        <template #default>
            <div class="top">
                <div class="box">
                    <div class="number">10</div>
                    <div class="text">动态</div>
                </div>
                <div class="box">
                    <div class="number">1</div>
                    <div class="text">关注</div>
                </div>
                <div class="box">
                    <div class="number">999</div>
                    <div class="text">粉丝</div>
                </div>
            </div>
            <div class="line"></div>
            <div class="bottom">
                <ul class="menu-list">
                    <li v-for="item in listItem" :key="item.id" class="menu-item itemStyle">
                        <div>
                            <component style="vertical-align:top; margin-right: 8px;" is="svgLove" height="20px"
                                width="20px" color="black">
                            </component>
                            <span>{{ item.text }}</span>
                        </div>
                        <span class="arrow">›</span>
                    </li>
                </ul>
            </div>
            <div class="line"></div>
            <div class="logout" @mouseover="changeStyle" @mouseleave="clearStyle">
                <svgLogout height="23px" ref="logoutSvg" width="23px" />
                <p class="textStyle" @click="logout">退出登录</p>
            </div>
        </template>
    </lp-dialog>
</template>

<style scoped lang='scss'>
.top {
    margin: 25px 0 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;


    .box {
        // font-size: 20px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        margin: 0 35px;

        .number {
            font-size: 25px;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .text {
            color: gray;
            font-size: 15px;
        }
    }
}

.line {
    height: 1px;
    width: 80%;
    background-color: rgb(234, 234, 234);
    margin: 0 auto;
}

.bottom {
    margin: 10px 0;

    .itemStyle {
        display: flex;
        justify-content: space-between;
        height: 36px;
        width: 90%;
        margin-left: 20px;
        font-size: 16px;
        // background-color: rgb(234, 234, 234);
    }
}

.logout {
    display: flex;
    align-items: center;
    margin: 5px 0 0 35px;
    line-height: 20px;
    font-size: 20px;
}

.logout:hover .textStyle {
    color: red
}
</style>