<script setup lang="ts">
import { computed } from "vue";

import type { IIconProps, IIconName } from "./IIcon.types";

defineOptions({
	name: "IIcon",
});

const props = withDefaults(
	defineProps<IIconProps>(),
	{
		size: undefined,
		label: undefined,
	},
);

const iconModules = import.meta.glob("@/assets/images/icons/*.svg", {
	eager: true,
	query: "?raw",
	import: "default",
}) as Record<string, string>;

const iconMap = Object.fromEntries(
	Object.entries(iconModules).map(([path, rawSvg]) => {
		const fileName = path.split("/").pop() ?? "";
		const iconName = fileName.replace(".svg", "");
		return [iconName, rawSvg];
	}),
) as Record<IIconName, string>;

const iconSvg = computed(() => iconMap[props.type]);

const getClasses = computed(() => {
	return [
		"i-icon",
		`i-icon-${props.type}`,
		props.size ? `i-icon-${props.size}` : "",
	];
});

const isDecorative = computed(() => !props.label);

const iconViewBox = computed(() => {
	const svg = iconSvg.value;

	if (!svg) {
		return "0 0 24 24";
	}

	const viewBoxMatch = svg.match(/viewBox="([^"]+)"/i);

	return viewBoxMatch?.[1] ?? "0 0 24 24";
});

const iconContent = computed(() => {
	const svg = iconSvg.value;

	if (!svg) {
		return "";
	}

	return svg.replace(/^[\s\S]*?<svg[^>]*>/i, "").replace(/<\/svg>\s*$/i, "");
});
</script>

<template>
	<svg
		v-if="iconContent"
		:class="getClasses"
		:viewBox="iconViewBox"
		:aria-label="label"
		:aria-hidden="isDecorative ? 'true' : undefined"
		role="img"
		focusable="false"
		v-html="iconContent" />
</template>

<style lang="scss">
@use "./IIcon.scss" as *;
</style>
