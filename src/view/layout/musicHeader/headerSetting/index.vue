<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSetting = () => {
    router.push('/setting')
}
</script>

<template>
    <component class="header-iconStyle" is="svgSetting" height="18px" width="18px" @click="goToSetting">
    </component>
</template>

<style scoped lang='scss'></style>