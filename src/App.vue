<template>
  <globalAudio />
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import globalAudio from '@/components/globalAudio/index.vue'
import { useAudioStore } from '@/store/audio'
import { initShortcutSystem } from '@/utils/shortcutKey'
const audioStore = useAudioStore()
onMounted(() => {
  initShortcutSystem(audioStore)
})
</script>
