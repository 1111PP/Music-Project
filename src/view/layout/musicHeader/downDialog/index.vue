<script  setup>
import { ref, watch, onMounted } from 'vue'
import lpDialog from '@/components/lpUI/lp-dialog/index.vue'
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

//svg图标hover效果
const logoutSvg = ref()
const changeStyle = () => {
    logoutSvg.value.changeStyle()
}
const clearStyle = () => {
    logoutSvg.value.clearStyle()
}
</script>

<template>
    <div class="dialog-container">
        <component @click="showDialog" class="header-iconStyle" is="svgDown" height="12px" width="12px">
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
                <van-cell-group :border="false">
                    <van-cell class="itemStyle" v-for="item in listItem" :border="false" :key="item.id" is-link>
                        <template #title>
                            <!-- <svgSetting fill="black" height="20px" width="20px"
                            style="margin-right: 4px; vertical-align:top;" /> -->
                            <component style="vertical-align:top;" is="svgLove" heght="20px" width="20px" color="black">
                            </component>
                            <span>{{ item.text }}</span>
                        </template>

                    </van-cell>
                </van-cell-group>
            </div>
            <div class="line"></div>
            <div class="logout" @mouseover="changeStyle" @mouseleave="clearStyle">
                <svgLogout height="23px" ref="logoutSvg" width="23px" />
                <p class="textStyle">退出登录</p>
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
        margin: 0;
        height: 36px;
        width: 90%;
        margin-left: 20px;
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

:deep(.van-cell-group) {
    background-color: #F7F9FC;
}
</style>