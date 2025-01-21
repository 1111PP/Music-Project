<script setup>
import { ref, onMounted, watch } from 'vue'
import ShortcutIndex from './shortcut/index.vue'
import AccountManage from './accountManage/index.vue'
import CommonSetting from './commonSetting/index.vue'
import SystemSetting from './systemSetting/index.vue'
const activeTab = ref('setting-account')
const handleClick = (tab) => {
    console.log(tab)
    document.querySelector(tab).scrollIntoView({ behavior: 'smooth' })
}
</script>
<template>
    <div class="setting-container">
        <div class="setting-header ">
            <div class="setting-title">设置</div>
            <ul class="tab-container">
                <li @click="handleClick('.setting-shortcut')">
                    快捷键
                </li>
                <li @click="handleClick('.setting-account')">
                    账号
                </li>
                <li @click="handleClick('.setting-normal')">
                    常规
                </li>
                <li @click="handleClick('.setting-system')">
                    系统
                </li>
            </ul>
        </div>
        <div class="setting-content">
            <div class=" setting-shortcut">
                <ShortcutIndex />
            </div>
            <div class=" setting-account">
                <AccountManage />
            </div>
            <div class=" setting-normal">
                <CommonSetting />
            </div>
            <div class=" setting-system">
                <SystemSetting />
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.setting-container {
    width: 100%;
    height: calc(100% - 30px);
    display: flex;
    flex-direction: column;

    // z-index: 1000;
    :deep(.el-anchor__link) {
        font-size: 20px;
        font-weight: 700;
        color: black;
    }

    .setting-header {
        // sticky top-0 w-full  bg-white border-b border-gray-200
        top: 0;
        width: 100%;
        border-bottom: 1px solid #e0e0e0;
        height: 100px;
        flex-shrink: 0;

        .setting-title {
            // text-[25px] font-bold text-black my-[15px]
            font-size: 25px;
            font-weight: 700;
            color: black;
            margin: 15px 0;
        }

        .tab-container {
            display: flex;
            align-items: center;
            gap: 20px;
            background-color: transparent !important;
            font-size: 18px;
            font-weight: 700;

            li {
                cursor: pointer;
            }
        }
    }

    .setting-content {
        // h-full w-full overflow-auto
        width: 100%;
        overflow: auto;
        height: 100%;
        flex: 1;

    }
}
</style>