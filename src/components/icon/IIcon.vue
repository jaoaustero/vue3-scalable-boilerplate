<script setup lang="ts">
import { computed } from "vue";

const iconModules = import.meta.glob("@/assets/images/icons/*.svg", {
	eager: true,
	query: "?raw",
	import: "default",
}) as Record<string, string>;

const iconRegistry = Object.fromEntries(
	Object.entries(iconModules).map(([path, svg]) => {
		const filename = path.split("/").pop();
		const iconName = filename ? filename.replace(".svg", "") : path;
		return [iconName, svg];
	}),
) as Record<string, string>;

const props = defineProps<{
	/**
	 * Name of the icon file without the .svg extension.
	 */
	type: string;

	/**
	 * Accessible label for screen readers.
	 */
	label?: string;
}>();

const svgMarkup = computed(() => iconRegistry[props.type] ?? "");
const ariaLabel = computed(() => props.label ?? props.type);
const getClasses = computed(() => ["i-icon"]);
</script>

<template>
	<span
		:class="getClasses"
		:aria-label="ariaLabel"
		role="img"
		v-html="svgMarkup"
	/>
</template>

<style lang="scss">
@use "./IIcon.scss" as *;
</style>
