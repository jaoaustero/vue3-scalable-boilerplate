<template>
	<div
		:class="[
			position && `i-image-${position}`,
		]">
		<div v-if="!loaded" class="i-image-loader"></div>
		<img
			class="i-image"
			v-bind="$attrs"
			:src="src"
			:alt="alt"
			v-show="loaded"
			@load="handleLoad"
			@error="handleError"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
	name: "IImage",
	inheritAttrs: false,
});

export interface IImageProps {
	/**
	 * A source path of the image
	 */
	src: string;
	/**
	 * Alt text for the image
	 */
	alt?: string;
	/**
	 * Align image
	 */
	position?: "left" | "right" | "center";
}

const props = defineProps<IImageProps>();

const emit = defineEmits<{
	imageLoaded: [];
}>();

const loaded = ref(false);

const handleLoad = () => {
	loaded.value = true;
	emit("imageLoaded");
};

const handleError = () => {
	loaded.value = true;
	emit("imageLoaded");
};
</script>

<style lang="scss">
@use "./IImage.scss" as *;
</style>
