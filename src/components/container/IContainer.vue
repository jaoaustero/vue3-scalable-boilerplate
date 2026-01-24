<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
	defineProps<{
		/**
		 * The size of the container
		 * @values small, medium, large
		 */
		size?: string;
	}>(),
	{
		size: undefined,
	}
);

const getClasses = computed(() => {
	return [
		'i-container',
		props.size ? `i-container-${props.size}` : '',
	];
});
</script>

<template>
	<div :class="getClasses">
		<slot />
	</div>
</template>

<style lang="scss">
@use "./IContainer.scss" as *;
</style>
