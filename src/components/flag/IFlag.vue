<script setup lang="ts">
import { computed, ref, watch } from "vue";

import type { IFlagProps } from "./IFlag.types";

defineOptions({
	name: "IFlag",
});

const props = withDefaults(
	defineProps<IFlagProps>(),
	{
		assetPath: "",
		size: undefined,
		alt: undefined,
	},
);

const hasError = ref(false);

watch(
	() => props.type,
	() => {
		hasError.value = false;
	},
);

const flagSrc = computed(() => {
	const base = props.assetPath;
	const code = hasError.value ? "un" : props.type;
	return `${base}/images/flags-square/${code}.svg`;
});

const altText = computed(() => props.alt ?? `${props.type} flag`);

const getClasses = computed(() => [
	"i-flag",
	props.size ? `i-flag-${props.size}` : "",
]);

const handleError = () => {
	hasError.value = true;
};
</script>

<template>
	<div :class="getClasses">
		<img
			:src="flagSrc"
			:alt="altText"
			@error="handleError"
		/>
	</div>
</template>

<style lang="scss">
@use "./IFlag.scss" as *;
</style>
