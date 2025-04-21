<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { DraggableIcon } from '../types'

const { icon } = defineProps<{ icon: DraggableIcon }>()
const rotate = ref(0)

function handleDrag(e: DragEvent) {
  e.dataTransfer?.setData('icon', JSON.stringify({ ...icon, rotate: rotate.value }))
}

function handleClick(e: MouseEvent) {
  if (e.metaKey) rotate.value += 45
}
</script>

<template>
  <div
    class="h-20 w-20 flex items-center justify-center border-4 border-indigo-900 select-all"
    draggable="true"
    @dragstart="handleDrag($event)"
    @dragend="rotate = 0"
    @click="handleClick($event)"
  >
    <Icon width="40" v-bind="icon" :rotate />
  </div>
</template>
