<script setup lang="ts">
import type {Task, ID} from '@/types'

const props = defineProps<{
    task: Task
}>()

const emit = defineEmits<{
	(e: 'delete-task', payload: ID): void;
}>()

const focused = ref(false)

onKeyStroke('Backspace', () => {
	if (focused.value) {
		emit('delete-task', props.task.id)
	}
})

</script>

<template>
    <div
        :title="task.createdAt.toLocaleDateString()"
        class="task p-2 my-2 bg-white rounded-lg shadow-sm min-w-[250px] focus:border-blue-400 focus-visible:ring focus-visible:ring-blue-400"
        @focus="focused = true"
        @blur="focused = false"
        tabindex="0"
    >

	    <input
		    type="text"
		    v-model="task.title"
		    class="bg-transparent focus:bg-white rounded px-1 w-4/5 text-md title-input outline-none"
		    @keyup.enter="($event.target as HTMLInputElement).blur()"
	    />
    </div>
</template>

<style>
.sortable-drag .task {
	transform: rotate(5deg);
	transform-origin: center;
}

.sortable-ghost .task {
	position: relative;
	cursor: copy;
}

.sortable-ghost .task:after {
	content: '';
	@apply absolute top-0 left-0 w-full h-full bg-zinc-500 opacity-50 rounded-lg;
}
</style>
