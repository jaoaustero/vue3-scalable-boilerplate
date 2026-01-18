<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		count: number;
	}>(),
	{
		count : 0,
	},
);
</script>


<template>
	<div class="i-badge">
		{{ props.count <= 99 ? props.count : '99+' }}
	</div>
</template>

<style lang="scss">
@use "./IBadge.scss" as *;
</style>
