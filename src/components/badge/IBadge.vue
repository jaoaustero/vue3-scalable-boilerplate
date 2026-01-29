<script setup lang="ts">
import type { IBadgeProps } from './IBadge.types';

const props = withDefaults(
	defineProps<IBadgeProps>(),
	{
		count: 0,
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
