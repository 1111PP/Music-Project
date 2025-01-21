<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import lpVirtuallist from '@/components/lpUI/lp-virtualList/index.vue'
import lpInfiniteScroll from '@/components/lpUI/lp-infiniteScroll/index.vue'

const drawerSwitch = ref(false)
const openDrawer = () => {
    drawerSwitch.value = !drawerSwitch.value
}

const data1 = {
    title: '社区小助手',
    // avatar: './public/private-letter-avatar.png',
    text: '4月黑胶等级权益-礼品盒可以领取啦,仅限当月111111111111',
    date: '04-02'
}
const mockData1 = (singleData, count) => {
    return new Array(count).fill(null).map((i, index) => {
        const { title, text, date } = singleData
        //🟥渡一前端课程，对于静态资源的安全引入方式,能被vite打包时正确创建此组件对图片的依赖，从而不会出现图片未被打包进dist目录的情况
        let avatar = new URL('@public/private-letter-avatar.png', import.meta.url)
        return {
            id: index,
            title: `${title + (index + 1)}`,
            avatar,
            text,
            date
        }
    })
}
const data4 = {
    // avatar: './public/following-avatar.png',
    username: '111P',
    text: '赞了你的主页背景',
    date: '04-02'
}
const mockData4 = (singleData, count) => {
    return new Array(count).fill(null).map((i, index) => {
        let { username, text, date } = singleData
        //🟥渡一前端，对于静态资源的安全引入方式
        let avatar = new URL('@public/following-avatar.png', import.meta.url)
        return {
            id: index,
            username: username + " " + (index + 1) + '号',
            avatar,
            text,
            date
        }
    })
}
//信息为空时的图片
const emptyInfo = ref(new URL("@public/header-menu-empty.png", import.meta.url))

//菜单对应的数据
const privateLetterData = ref(mockData1(data1, 100))
const commentMenuData = []
const aboutmeMenuData = []
const noticeMenuData = ref(mockData4(data4, 100))

//记录外层容器高度
let drawerBodyHeight = ref(null)
watch(drawerSwitch, () => {
    // 每次打开抽屉时，获取抽屉的高度，并赋值给虚拟列表的height
    if (drawerSwitch.value) {
        nextTick(() => {
            const t = document.querySelector('.el-drawer__body')
            // 创建一个 ResizeObserver 实例
            // 🟥监视该元素的高度，让标签子元素的虚拟列表高度与这个元素的高度保持相同
            const resizeObserver = new ResizeObserver(entries => {
                drawerBodyHeight.value = entries[0].contentRect.height
            });
            // 开始观察目标元素
            resizeObserver.observe(t)
        })
    } else {
        //清除
        currentStatus.value = 0
    }
})

//0:私信 1：评论 2：@我 3：通知
const menuEmun = ref([
    { name: '私信', id: 0 },
    { name: '评论', id: 1 },
    { name: '@我', id: 2 },
    { name: '通知', id: 3 }
])

//抽屉头部菜单点击事件
const currentStatus = ref(0)
const clickMenu = (index) => {
    currentStatus.value = index
}

</script>

<template>
    <div class="mail-header-container">
        <component @click="openDrawer" class="header-iconStyle" is="svgMail" height="18px" width="18px">
        </component>
        <el-drawer size="399px" :lock-scroll="false" class="elDrawer" :show-close="false" v-model="drawerSwitch">
            <template #header>
                <div class="">
                    <ul class="mail-header-menu">
                        <li v-for="i in menuEmun" @click="clickMenu(i.id)"
                            :class="i.id === currentStatus ? 'active' : ''">
                            {{
                                i.name
                            }}</li>
                        <span>
                            <el-icon style="vertical-align: middle">
                                <View />
                            </el-icon>
                            一键全读
                        </span>
                    </ul>
                </div>
            </template>
            <template #default>
                <!-- 每次获取500/80=6个列表数据，可视窗口正好可以完美展示5个，头和尾展示半个的情况下 可视窗口最多展示6个，所以为了保持连贯效果，每次获取6个列表数据-->
                <lp-virtuallist v-if="drawerSwitch && currentStatus === 0 && privateLetterData.length !== 0"
                    :listData="privateLetterData" :outHeight="drawerBodyHeight" :drawerSwitch="drawerSwitch"
                    :count="10">
                    <!-- 作用域插槽 -->
                    <template #default="{ item }">
                        <div class="mail-list-item">
                            <img class="avatar" :src="item.avatar" alt="">
                            <div class="right">
                                <p class="title">
                                    <span>{{ item.title }}</span>
                                    <span class="date">{{ item.date }}</span>
                                </p>
                                <el-text class="w-100px mb-2 text" :truncated="true">
                                    {{ item.text }}
                                </el-text>
                            </div>
                        </div>
                    </template>
                </lp-virtuallist>


                <lp-virtuallist v-else-if="drawerSwitch && currentStatus == 1 && commentMenuData.length !== 0">
                </lp-virtuallist>
                <lp-virtuallist v-else-if="drawerSwitch && currentStatus == 2 && aboutmeMenuData.length !== 0">
                </lp-virtuallist>
                <lpInfiniteScroll v-else-if="drawerSwitch && currentStatus == 3 && noticeMenuData.length !== 0"
                    :listData="noticeMenuData" :outHeight="drawerBodyHeight" :singlePushCount="10">
                    <template #default="{ item }">
                        <div class="mail-list-item-4">
                            <img class="avatar" :src="item.avatar" alt="">
                            <div class="right">
                                <span class="username">
                                    {{ item.username }}
                                </span>
                                <span class="text">
                                    {{ item.text }}
                                </span>
                            </div>
                        </div>
                    </template>
                </lpInfiniteScroll>
                <!-- 无数据时展示内容 -->
                <div v-else style="height: 100%;
                width: 100%;display: flex; justify-content: center;align-items: center;">
                    <img style=" width: 100px;" :src="emptyInfo" alt="">
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<style scoped lang='scss'>
.active {
    color: black;
    border-bottom: 3px solid red;
    margin-top: 5px;
    font-weight: 700;
}

.elDrawer {
    background-color: #F9F7F6;
}

.listStyle:hover,
.listStyle4:hover {
    background-color: rgb(227, 227, 227) !important;
}

//drawer样式修改
.mail-header-container {
    margin-top: 5px;

    .mail-header-menu {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 20px 0 20px 10px;

        li {
            font-size: 18px;
            margin: 0 15px;
        }

        span {
            flex: 2;
            text-align: center;
        }

    }

    .mail-list-item {
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .avatar {
            height: 56px;
            border-radius: 50%;
            margin: 5px 10px 0 20px;
        }

        .right {
            display: flex;
            flex-flow: column;
            justify-content: flex-start;
            margin-top: -5px;

            .title {
                font-size: 15px;
                color: rgb(63, 110, 180);
                display: flex;
                justify-content: space-between;

                .date {
                    font-size: 12px;
                    color: gray
                }
            }

            .text {
                font-size: 12px;
                margin: -10px 0 10px 10px;
                width: 280px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis; //文字超出范围使用省略号显示
            }

            .username {
                color: rgb(46, 133, 234);
                font-size: 14px;
            }
        }
    }

    .mail-list-item-4 {
        padding: 10px 0;
        display: flex;
        align-items: center;

        .avatar {
            height: 56px;
            border-radius: 50%;
            margin: 5px 10px 0 20px;
        }

        .right {
            .username {
                color: rgb(20, 109, 218);
                font-size: 15px;
            }

            .text {
                font-size: 15px;
            }
        }
    }

    //抽屉外层蒙版
    :deep(.el-overlay) {
        background-color: rgba(0, 0, 0, 0); //蒙版透明效果
        width: 100vw;
        height: 120vh; //配合top,让蒙版覆盖上方菜单栏,否则蒙版点击不会收起
        left: 0;
        top: -100px;
        margin-top: 60px;
        // overflow: hidden;
    }

    //蒙版内的抽屉实体
    :deep(.el-drawer) {
        box-shadow: 0 0 10px rgba(134, 131, 131, 0.3);
        margin-top: 100px;
        margin-bottom: 20px;
        height: calc(100% - 39%); //保证底部的阴影展示出来
        width: 500px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        padding: 0;
    }

    :deep(.el-drawer__header) {
        height: 50px;
        margin-bottom: 0px;
        padding: 0;
    }

    :deep(.el-drawer__body) {
        padding: 0px;
        overflow: hidden;
    }
}
</style>