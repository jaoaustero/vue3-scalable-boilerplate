<script setup lang="ts">
import { computed } from 'vue';

/**
 * @component IAvatar
 * @description Avatar component for displaying user images or initials
 */
const props = withDefaults(
	defineProps<{
		/**
		 * The color for the avatar background
		 * @values primary, secondary
		 */
		color?: string;

		/**
		 * Text for the avatar, at least 1 or 2 characters mostly used
		 * for user Initials
		 */
		label: string;

		/**
		 * Specific size or dimension
		 * @values xsmall, small, medium, large, xlarge
		 */
		size?: string | null;

		/**
		 * Image source or path
		 */
		src?: string | null;
	}>(),
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