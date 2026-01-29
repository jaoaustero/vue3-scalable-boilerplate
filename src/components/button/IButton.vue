<script setup lang="ts">
import { computed } from "vue";
import type { IButtonProps, IButtonEmits } from './IButton.types';

const emit = defineEmits<IButtonEmits>();

const props = withDefaults(
	defineProps<IButtonProps>(),
	{
		color: 'default',
		href: undefined,
		isCircle: false,
		isDashed: false,
		isDisabled: false,
		isOutline: false,
		isRounded: false,
		isSquare: false,
		isText: false,
		size: undefined,
		label: undefined,
	},
);

const getTagName = computed(() => {
	return props.href ? 'a' : 'button';
});

const getClasses = computed(() => {
	return [
		'i-button',
		props.color && !props.isDashed && !props.isOutline && !props.isText
			? `i-button-${props.color}`
			: '',
		props.isText ? 'i-button-text' : '',
		props.isOutline && !props.isText
			? `i-button-outline i-button-outline-${props.color}`
			: '',
		props.isCircle && !props.isText ? 'i-button-circle' : '',
		props.isRounded && !props.isCircle ? 'i-button-rounded' : '',
		props.isDashed ? 'i-button-dashed' : '',
		props.size ? `i-button-${props.size}` : '',
		props.isSquare ? 'i-button-square' : '',
	];
});

const handleClick = (event: MouseEvent) => {
	emit('click', event);
};
</script>

<template>
	<component
		:is="getTagName"
		:class="getClasses"
		:disabled="props.isDisabled"
		:type="!props.href ? 'button' : null"
		:href="props.href ? props.href : null"
		:aria-label="label"
		:role="props.href ? 'button' : null"
		:title="label"
		@click="handleClick"
	>
		<slot />
	</component>
</template>

<style lang="scss">
@use "./IButton.scss" as *;
</style>
