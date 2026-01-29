<script setup lang="ts">
import { computed } from 'vue';
import type { IAvatarProps } from './IAvatar.types';

/**
 * @component IAvatar
 * @description Avatar component for displaying user images or initials
 */
const props = withDefaults(
	defineProps<IAvatarProps>(),
	{
		color: 'default',
		size: null,
		src: null,
	},
);

const getClasses = computed(() => {
	return [
		'i-avatar',
		!props.src && !props.color
			? ''
			: `i-avatar-${props.color}`,
		props.size ? `i-avatar-${props.size}` : '',
		props.src ? 'i-avatar-image' : ''
	];
});
</script>

<template>
	<div :class="getClasses">
		<img v-if="props.src"
			:src="props.src"
			:alt="props.label" />

		<span v-else>
			{{ props.label }}
		</span>
	</div>
</template>

<style lang="scss">
@use "./IAvatar.scss" as *;
</style>
