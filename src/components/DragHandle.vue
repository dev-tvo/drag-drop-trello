<script setup lang="ts">
defineProps<{
	handle: String
}>()
</script>

<template>
<span
	class="cursor-move"
	:class="handle"
>
    <Icon
	    name="fluent:re-order-dots-horizontal-16-filled"
	    width="16"
	    height="16"
    />
</span>
</template>
