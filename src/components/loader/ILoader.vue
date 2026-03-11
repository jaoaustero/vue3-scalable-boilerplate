<script setup lang="ts">
import { computed, useAttrs } from "vue";
import type { ILoaderProps } from "./ILoader.types";

defineOptions({
	name: "ILoader"
});

const attrs = useAttrs();

const props = withDefaults(
	defineProps<ILoaderProps>(), {
		isShimmering: true,
		size: undefined,
		type: "bar"
	});

const getClasses = computed(() => {
	return [
		"i-loader",
		props.type && `i-loader-${props.type}`,
		props.size && `i-loader-${props.type}-${props.size}`,
		props.isShimmering && "i-loader-animation"
	];
});
</script>

<template>
	<div
		:class="getClasses"
		v-bind="attrs">
	</div>
</template>

<style lang="scss">
@use "./ILoader.scss" as *;
</style>
