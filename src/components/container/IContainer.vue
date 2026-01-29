<script setup lang="ts">
import { computed } from 'vue';
import type { IContainerProps } from './IContainer.types';

const props = withDefaults(
	defineProps<IContainerProps>(),
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
