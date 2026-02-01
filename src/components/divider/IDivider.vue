<script setup lang="ts">
import { computed } from 'vue';
import type { IDividerProps } from './IDivider.types';

const props = withDefaults(
	defineProps<IDividerProps>(),
	{
		title : undefined,
		isDashed : false,
		isDotted : false,
	}
);

const getClasses = computed(() => {
	return [
		'i-divider',
		props.isDashed ? 'i-divider-dashed' : '',
		props.isDotted ? 'i-divider-dotted' : '',
	];
});
</script>

<template>
	<component
		:is="props.title ? 'div' : 'hr'"
		:class="getClasses">
		{{ title }}
	</component>
</template>

<style lang="scss">
@use "./IDivider.scss" as *;
</style>
