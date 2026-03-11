<script setup lang="ts">
import { computed } from "vue";
import type { ICardProps } from "./ICard.types";

defineOptions({
	name: "ICard"
});

const props = withDefaults(
	defineProps<ICardProps>(),
	{
		color: undefined,
		size: undefined,
	}
);

const getClasses = computed(() => {
	return [
		"i-card",
		props.color ? `i-card-${props.color}` : "",
		props.size ? `i-card-${props.size}` : "",
	];
});
</script>

<template>
	<div :class="getClasses">
		<slot />
	</div>
</template>

<style lang="scss">
@use "./ICard.scss" as *;
</style>
