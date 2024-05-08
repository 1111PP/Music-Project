<script  setup>
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import downDialog from './downDialog/index.vue'
import headerMail from './headermail/index.vue'
import headerSetting from './headerSetting/index.vue'
import headerPersonal from './headerPersonal/index.vue'
import headerMinimodel from './headerMinimodel/index.vue'
import headerMini from './headerMini/index.vue'
import headerMax from './headerMax/index.vue'
import headerClose from './headerClose/index.vue'

// const headerMenu = ref([
//     {
//         id: 1,
//         icon: 'svgDown',
//     },
//     {
//         id: 2,
//         icon: 'svgMail',
//     },
//     {
//         id: 3,
//         icon: 'svgSetting',
//     },
//     {
//         id: 4,
//         icon: 'svgPersonal',
//     },
//     {
//         id: 5,
//         icon: 'svgLine',
//     },
//     {
//         id: 6,
//         icon: 'svgMiniModel',
//     },
//     {
//         id: 7,
//         icon: 'svgMini',
//     },
//     {
//         id: 8,
//         icon: 'svgMax',
//     },
//     {
//         id: 9,
//         icon: 'svgClose',
//     },
// ])

const hovermenu = (e) => {
    try {
        const t = e.target
        if (t.classList[0] === 'headermenu') {
            return
        }
        const pId = t.getAttribute('p-id')
        //pId用于标识headerMenu中每一个svg图标，防止影响菜单内深层次的svg也被修改颜色
        if (Number(pId) <= 8 && Number(pId) >= 1) {
            t.setAttribute('fill', 'black') || t.children[0].setAttribute('fill', 'black')
        }
    } catch (e) {
        return
    }
}
const clearIconStyle = () => {
    //选中菜单字体，恢复默认字体颜色
    let arr = Array.from(document.getElementsByClassName('header-iconStyle'))
    arr.map(i => i.children[0]).forEach(i => i.setAttribute('fill', 'gray'))
}



</script>

<template>
    <div class="header-container">
        <div class="left">
            <div class="back">
                <el-button class="btn">
                    <svgBack style="margin-right: 10px;" />
                </el-button>
            </div>
            <el-input class="search" placeholder="Justin Bieber">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <search />
                    </el-icon>
                </template>
            </el-input>
            <el-button class="voice">
                <svgVoice style="margin-right: 10px;" />
            </el-button>
        </div>
        <div class="right">
            <!-- avatar -->
            <img class="avatar" src="../../../../public/avatar.jpg" alt="">
            <span class="username">111P</span>
            <img class="vipLevel" src="../../../../public/vip.png" alt="">
            <div class="headermenu" @mouseover="hovermenu" @mouseout="clearIconStyle">
                <downDialog />
                <header-mail></header-mail>
                <header-setting></header-setting>
                <header-personal></header-personal>
                <component style="margin:2px" is="svgLine" height="18px" width="18px">
                </component>
                <header-minimodel></header-minimodel>
                <header-mini></header-mini>
                <header-max></header-max>
                <header-close></header-close>
            </div>
        </div>
    </div>
</template>

<style scoped  lang='scss'>
.header-container {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    height: 50px;
    width: 97%;
    // background-color: #F7F9FC;

    .left {
        flex: 5;
        height: 100%;
        display: flex;
        align-items: center;

        .back {
            margin: 0 10px 0 50px;

            .btn {
                width: 20px;
                height: 40px;
                border-radius: 10px;
                font-size: 20px;
                background-color: #F7F9FC;
                border: 1px solid rgb(212, 212, 212)
            }

            .btn:hover {
                background-color: rgb(219, 216, 216);
            }
        }


        .search {
            width: 240px;
            height: 40px
        }

        .voice {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            font-size: 20px;
            background: linear-gradient(to right, #F6EFF9, #F8EEF7) !important;
            margin-left: 10px;
        }
    }

    .right {
        flex: 5;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: end;

        .avatar {
            width: 30px;
            border-radius: 50%;
            margin-left: 10px;
            //图片在img中的位置调整,1.水平偏移 2.垂直偏移
            // object-position: -10px 0;
        }

        .username {
            margin: 0 8px;
            color: rgb(107, 104, 104)
        }

        .vipLevel {
            width: 50px;
        }

        .headermenu {
            margin-left: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .header-iconStyle {
            width: 20px;
            margin: 5px;
        }

        .header-iconStyle:hover {
            color: red;
        }
    }
}
</style>