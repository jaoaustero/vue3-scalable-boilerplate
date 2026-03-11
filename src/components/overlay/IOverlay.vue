<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { IOverlayProps, IOverlayEmits } from "./IOverlay.types";

import IButton from "@/components/button/IButton.vue";
import IIcon from "@/components/icon/IIcon.vue";

defineOptions({
	name: "IOverlay"
});

const emit = defineEmits<IOverlayEmits>();

const props = withDefaults(
	defineProps<IOverlayProps>(),
	{
		title: "",
		backTooltipText: "Back",
		headerClass: "",
		options: undefined,
	}
);

const leftHeaderRef = ref<HTMLElement | null>(null);

const overlayClasses = computed(() => {
	return [
		"i-overlay",
		props.isOpen ? "i-open" : "",
	];
});

const headerLeftClasses = computed(() => {
	return [
		"i-overlay-header-left",
		props.options?.alignAllButtons === "left" ? "" : "i-flex-1",
	];
});

const optionsWrapperClasses = computed(() => {
	return props.options?.alignAllButtons === "left"
		? "i-margin-auto-right"
		: "i-margin-auto-left";
});

const handleBack = () => {
	emit("goBack");
};

watch(
	() => props.isOpen,
	(newValue) => {
		if (newValue === true) {
			leftHeaderRef.value?.focus();
		}
	}
);
</script>

<template>
	<div :class="overlayClasses">
		<div
			class="i-overlay-header"
			:class="headerClass">
			<div
				ref="leftHeaderRef"
				:tabindex="isOpen ? 0 : -1"
				:class="headerLeftClasses">
				<IButton
					size="small"
					:tabindex="isOpen ? 0 : -1"
					:label="backTooltipText"
					@click="handleBack">
					<IIcon type="arrow-left" />
				</IButton>

				<p class="i-overlay-title">
					{{ title }}
				</p>
			</div>

			<div :class="optionsWrapperClasses">
				<slot name="options" />
			</div>
		</div>

		<div class="i-overlay-body">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
@use "./IOverlay.scss" as *;
</style>
