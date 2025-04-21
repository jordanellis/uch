<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useGameBoardStore } from '@/stores/game'
import { Position } from '@/types'

const { index, isDisabled, setHidden, showTrash, trashContent } = defineProps<{
  index: number
  isDisabled: boolean
  setHidden: VoidFunction
  showTrash: boolean
  trashContent: VoidFunction
}>()

const { gameBoard, setWall } = useGameBoardStore()

function onClick(position: Position) {
  setWall(index, position, !gameBoard.boardSquares[index][position])
}

const btnStyles = 'cursor-pointer absolute bg-transparent hover:bg-indigo-900 opacity-25'
</script>

<template>
  <div
    class="w-20 h-20 outline-dotted outline-2 border-indigo-700 outline-indigo-700 -outline-offset-1 relative flex items-center justify-center"
    :class="{
      'border-t-4 pb-1': gameBoard.boardSquares[index].up,
      'border-b-4 pt-1': gameBoard.boardSquares[index].down,
      'border-l-4 pr-1': gameBoard.boardSquares[index].left,
      'border-r-4 pl-1': gameBoard.boardSquares[index].right,
    }"
    @dblclick="setHidden"
  >
    <template v-if="!isDisabled">
      <button
        :class="btnStyles + ' top-0 w-full h-3 rounded-b-full'"
        @click="() => onClick(Position.Up)"
      />
      <button
        :class="btnStyles + ' bottom-0 w-full h-3 rounded-t-full'"
        @click="() => onClick(Position.Down)"
      />
      <button
        :class="btnStyles + ' left-0 w-3 h-full rounded-r-full'"
        @click="() => onClick(Position.Left)"
      />
      <button
        :class="btnStyles + ' right-0 w-3 h-full rounded-l-full'"
        @click="() => onClick(Position.Right)"
      />
      <button
        v-if="showTrash"
        @click="trashContent()"
        class="absolute top-1 right-1 rounded-full hover:bg-indigo-200 p-1"
      >
        <Icon width="15" icon="famicons:trash-outline" />
      </button>
    </template>
    <slot />
  </div>
</template>
