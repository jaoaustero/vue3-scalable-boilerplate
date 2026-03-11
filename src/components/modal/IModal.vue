<script setup lang="ts">
import { computed } from "vue";
import type { IModalProps } from "./IModal.types";

defineOptions({
	name: "IModal"
});

const props = defineProps<IModalProps>();

const modalClasses = computed(() => {
	return [
		"i-modal",
		props.isOpen ? "i-open" : "",
	];
});
</script>

<template>
	<div :class="modalClasses">
		<div class="i-modal-content">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
@use "./IModal.scss" as *;
</style>
