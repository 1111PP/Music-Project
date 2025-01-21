<script setup>
import { ref, onMounted } from 'vue'
import { getShortcut, shortcutLangMap, getCurrShortcut, setShortcut, checkSameShortcut } from '@/utils/shortcutKey'
import { ElMessage } from 'element-plus'
const shortcutList = ref([])
const toArrayKey = (str) => str.split('+')
const toStringKey = (strArr) => strArr.join('+')
onMounted(() => {
    resetShortcutList()
})
const resetShortcutList = () => {
    const shortcutMap = getShortcut()
    const data = Object.keys(shortcutMap).map(key => ({
        name: shortcutLangMap[shortcutMap[key]],
        key: toArrayKey(key)
    }))
    shortcutList.value = data
}
const handleBlur = (row) => {
    if (row.key.length === 0) {
        console.log('快捷键为空');
        resetShortcutList()
        ElMessage.error('快捷键为空')
        return
    }
    if (checkSameShortcut(toStringKey(row.key))) {
        console.log('快捷键已存在');
        resetShortcutList()
        ElMessage.error('快捷键已存在')
        return
    }
    const [englishActionName] = Object.entries(shortcutLangMap).find(item => {
        const [_, CnName] = item
        if (row.name === CnName) {
            return true
        }
    })

    const strKey = toStringKey(row.key)
    //更新localstorage
    setShortcut(englishActionName, strKey)
    resetShortcutList()
    ElMessage.success('快捷键设置成功')
}

const updateShortcutList = (row, newKey) => {
    // 更新视图数据
    const idx = shortcutList.value.findIndex(item =>
        item.name === row.name)
    if (idx === -1) return
    shortcutList.value[idx].key = newKey
}
const handleKeyDown = (e, row) => {
    e.preventDefault()
    if (e.key === 'Backspace') {
        // handleDel(row)
        const newKey = [...row.key]
        newKey.pop()
        updateShortcutList(row, newKey)
        return
    }
    // console.log(getCurrShortcut(e));
    let newKey = toArrayKey(getCurrShortcut(e))
    //直接覆盖
    updateShortcutList(row, newKey)

}
</script>
<template>
    <div class="shortcut-container">
        <div class="title">快捷键</div>
        <div>
            <el-table :data="shortcutList" style="width: 100%" class="shortcut-table">
                <el-table-column prop="name" label="功能说明" width="180">
                    <template #header>
                        <div class="table-header">功能说明</div>
                    </template>
                    <template #default="{ row }">
                        <div class="shortcut-name">{{ row.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="key" label="快捷键" width="180">
                    <template #header>
                        <div class="table-header">快捷键</div>
                    </template>
                    <template #default="{ row }">
                        <el-input class="shortcut-input" :value="toStringKey(row.key)"
                            @keydown="(e) => handleKeyDown(e, row)" @blur="handleBlur(row)" />
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<style scoped lang="scss">
.shortcut-container {
    width: 100%;
    height: 100%;
    display: flex;

    .title {
        width: 150px;
        font-size: 18px;
        font-weight: 700;
        padding-top: 5px;
    }

    .table-header {
        color: black
    }


}

:deep(.el-input__wrapper) {
    border-radius: 16px;
}


// 🟥elPlus table组件去除样式，样式重置
// 设置表格:表头、行、标题等各处的背景为透明
:deep(.el-table) {
    //清除tablehover
    background: transparent;
}



:deep(.el-table th) {
    background: transparent !important;
}

:deep(.el-table tr) {
    background: transparent !important;
}


//单元格border
:deep(td.el-table__cell) {
    border: none
}

//表头border
:deep(th.el-table__cell.is-leaf) {
    border: none
}

//::before 伪元素border去除
:deep(.el-table__inner-wrapper) {
    &::before {
        display: none; // 完全隐藏
    }
}
</style>
