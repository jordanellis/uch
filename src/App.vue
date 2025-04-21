<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useGameBoardStore } from './stores/game'

const { undo } = useGameBoardStore()
</script>

<template>
  <div
    class="bg-gradient-to-b from-indigo-100 from-10% via-sky-100 via-53% to-indigo-100 to-100% min-h-screen"
  >
    <header class="w-full p-4 bg-gradient-to-b from-indigo-100 via-cyan-100 to-indigo-100">
      <span class="wrapper flex gap-4">
        <button @click="undo" class="hover:bg-[#574e883d] rounded-full p-2">
          <Icon width="40" icon="solar:undo-left-round-square-bold" color="#095ad4" /></button
        ><span class="p-2 text-indigo-900 m-auto text-3xl font-bold">UCH</span>
      </span>
    </header>

    <RouterView />
  </div>
</template>

<style scoped></style>
