<script setup lang="ts">
import type {Column} from '@/types'
import {nanoid} from "nanoid";
import draggable from 'vuedraggable'
import type {Task} from "~/types";
const columns = useLocalStorage<Column[]>('trello-board', [
		{
			id: nanoid(),
			title: 'Backlog',
			tasks: [
				{
					id: nanoid(), title: 'Task 1', createdAt: new Date()
				},
				{
					id: nanoid(), title: 'Task 2', createdAt: new Date()
				}
			],
		},
		{
			id: nanoid(),
			title: 'In Progress',
			tasks: [
				{
					id: nanoid(), title: 'Task 3', createdAt: new Date()
				},
				{
					id: nanoid(), title: 'Task 4', createdAt: new Date()
				}
			],
		},
		{
			id: nanoid(),
			title: 'Done',
			tasks: [
				{
					id: nanoid(), title: 'Task 5', createdAt: new Date()
				},
				{
					id: nanoid(), title: 'Task 6', createdAt: new Date()
				}
			],
		}
	], {
		serializer: {
			read: (value) => {
				return JSON.parse(value).map((column: Column) => {
					column.tasks = column.tasks.map((task: Task) => {
						task.createdAt = new Date(task.createdAt)
						return task
					})
					return column
				})
			},
			write: (value) => JSON.stringify(value)
		}
	}
)

const createColumn = () => {
	const column: Column = {
		id: nanoid(),
		title: 'New Column',
		tasks: []
	}

	columns.value.push(column);

	nextTick(() => {
		(document.querySelector('.column:last-of-type .title-input') as HTMLInputElement).focus()
	})
}

const deleteColumn = (columnId: string) => {
	if (window.confirm('Are you sure you want to delete this column?')) {
		columns.value = columns.value.filter(c => c.id !== columnId);
	}
}
</script>

<template>
	<div class="flex items-start overflow-x-auto gap-6 h-full">
		<draggable
			v-model="columns"
			group="columns"
			item-key="id"
			tag="div"
			class="flex gap-6 items-start"
			animation="150"
			handle=".handle-column"
		>
			<template #item="{element: column}: {element: Column}">
				<div class="p-4 bg-gray-200 rounded-md shadow-md min-w-[250px] column">
					<header class="flex mb-4 justify-between items-center">
						<input
							type="text"
							v-model="column.title"
							class="bg-transparent focus:bg-white rounded px-1 w-4/5 text-md font-semibold title-input"
							@keyup.enter="($event.target as HTMLInputElement).blur()"
						/>

						<button @click="deleteColumn(column.id)">
							<Icon
								name="heroicons:trash-16-solid" width="16" height="16"
								class="hover:text-red-500 transition-colors duration-200 ease-in-out"
							/>
						</button>

						<DragHandle
							handle="handle-column"
						/>
					</header>
					<draggable
						v-model="column.tasks"
						:group="{name: 'tasks'}"
						item-key="id"
						animation="150"
					>
						<template #item="{element: task}: {element: Task}">
							<Task
								ref="htmlRefHook"
								:task="task"
								@delete-task="column.tasks = column.tasks.filter(t => t.id !==  $event)"
							/>
						</template>
					</draggable>

					<footer class="mt-4 text-center">
						<NewTask
							@add="task => column.tasks.push(task)"
						/>
					</footer>
				</div>
			</template>
		</draggable>

		<button
			@click="createColumn"
			class="bg-gray-200 whitespace-nowrap p-2 rounded opacity-50 min-w-[250px] hover:opacity-100 transition-opacity"
		>
			+ Add Column
		</button>
	</div>
</template>
