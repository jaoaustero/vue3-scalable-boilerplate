<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { IDropdownProps, IDropdownEmits } from './IDropdown.types';

defineOptions({
	name: "IDropdown"
});

const emit = defineEmits<IDropdownEmits>();

const dropdownRef = ref<HTMLElement | null>(null);
const props = withDefaults(defineProps<IDropdownProps>(), {
	isOpen: false,
	position: undefined
});


const menuClasses = computed(() => {
	return [
		"i-dropdown-menu",
		props.isOpen && "i-open",
		props.position && `i-dropdown-menu-${props.position}`
	];
});

const close = (event: MouseEvent) => {
	if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
		emit("update:isOpen", false);
	}
};

const handleEscapeKey = (event: KeyboardEvent) => {
	if (event.key === "Escape" && props.isOpen) {
		emit("update:isOpen", false);
	}
};

onMounted(() => {
	window.addEventListener("click", close);
	window.addEventListener("keyup", handleEscapeKey);
});

onUnmounted(() => {
	window.removeEventListener("click", close);
	window.removeEventListener("keyup", handleEscapeKey);
});
</script>

<template>
	<div ref="dropdownRef"
		class="i-dropdown">
		<slot />

		<transition name="i-dropdown-slide-fade">
			<div v-if="isOpen"
				:class="menuClasses">
				<slot name="menu" />
			</div>
		</transition>
	</div>
</template>

<style lang="scss">
@use './IDropdown.scss' as *;
</style>
