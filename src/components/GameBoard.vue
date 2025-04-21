<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BoxItem from './BoxItem.vue'
import DraggablePiece from './DraggablePiece.vue'
import { BoxIcon } from '../types'
import { useGameBoardStore } from '@/stores/game'

const { gameBoard, addItemToBoard, deleteItemFromBoard, unhideItemFromSpace } = useGameBoardStore()

const currentPlayer = 'Jordan'

const half = Math.floor(gameBoard.draggableIcons.length / 2)
const leftIcons = gameBoard.draggableIcons.slice(0, half)
const rightIcons = gameBoard.draggableIcons.slice(half, gameBoard.draggableIcons.length)

function onEnter(e: DragEvent) {
  e.preventDefault()
}

function onDrop(e: DragEvent, i: number) {
  if (!!gameBoard.boardSquares[i].icon) {
    console.log('icon already present')
    return
  }

  const iconData = e.dataTransfer?.getData('icon')
  if (!iconData) return

  const icon = JSON.parse(iconData) as BoxIcon
  addItemToBoard(icon, currentPlayer, i)
}

function setHidden(i: number) {
  unhideItemFromSpace(i)
}

function trashContent(i: number) {
  deleteItemFromBoard(i)
}
</script>

<template>
  <div class="flex gap-4 p-4 justify-around">
    <div class="flex flex-col justify-between">
      <DraggablePiece v-for="icon in leftIcons" :key="icon.icon" :icon />
    </div>
    <div class="grid grid-cols-10 w-fit h-fit outline-4 -outline-offset-1 outline-indigo-900">
      <BoxItem
        v-for="(item, i) in gameBoard.boardSquares"
        :key="i"
        :index="i"
        :isDisabled="gameBoard.disabledIndexes.includes(i)"
        :setHidden="() => setHidden(i)"
        :showTrash="!!item.icon && !gameBoard.disabledIndexes.includes(i)"
        :trashContent="() => trashContent(i)"
      >
        <div
          @drop="onDrop($event, i)"
          @dragover="gameBoard.disabledIndexes.includes(i) ? null : onEnter($event)"
          @dragenter="gameBoard.disabledIndexes.includes(i) ? null : onEnter($event)"
          class="w-full h-full flex justify-center items-center"
        >
          <div v-if="!item.hidden" class="absolute -mb-12 text-xs">
            {{ item.playerName }}
          </div>
          <Icon
            v-if="!item.hidden"
            width="40"
            :icon="item.icon"
            :rotate="item.rotate"
            :color="item.color"
          />
          <Icon v-else-if="item.icon" width="40" :icon="'akar-icons:question'" />
        </div>
      </BoxItem>
    </div>
    <div class="flex flex-col justify-between">
      <DraggablePiece v-for="icon in rightIcons" :key="icon.icon" :icon />
    </div>
  </div>
</template>
