<script setup lang="ts">
import type { Task } from '@/types'
import {nanoid} from "nanoid";

const emit = defineEmits<{
	(e: 'add', payload: Task): void;
}>()

const focused = ref(false)
const title = ref('')

const createTask = (e: Event) => {
	if (title.value.trim()) {
		e.preventDefault()

		emit('add', {
			id: nanoid(),
			title: title.value,
			createdAt: new Date()
		} as Task)
	}

	title.value = ''
}
</script>
<template>
   <textarea
	   v-model="title"
	   @keydown.tab="createTask"
	   @keyup.enter="createTask"
	   class="focus:bg-white focus:shadow resize-none rounded w-full border-none bg-transparent p-2 cursor-pointer overflow-hidden hover:bg-gray-100 transition-colors duration-200 ease-in-out"
	   :class="{
        'h-10 text-center': !focused,
        '': focused,
      }"
	   style="outline: none !important"
	   @focus="focused = true"
	   @blur="focused = false"
	   :placeholder="!focused ? '+ Add A Card' : 'Enter a title for this card'"
   />
</template>

<style lang="scss" scoped>

</style>
