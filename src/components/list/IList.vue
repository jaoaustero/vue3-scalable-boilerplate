<script setup lang="ts">
import { computed } from "vue";
import type { IListProps } from "./IList.types";

defineOptions({
	name: "IList",
});

const props = withDefaults(defineProps<IListProps>(), {
	isOrdered: false,
	type: undefined,
	size: undefined,
});

const listTag = computed(() => (props.isOrdered ? "ol" : "ul"));

const listClasses = computed(() => [
	"i-list",
	props.type && `i-list-${props.type}`,
	props.size && `i-list-${props.size}`,
]);
</script>

<template>
	<component :is="listTag" :class="listClasses">
		<slot />
	</component>
</template>

<style lang="scss">
@use "./IList.scss" as *;
</style>
