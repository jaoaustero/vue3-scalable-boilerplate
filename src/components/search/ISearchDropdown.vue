<script setup lang="ts">
import { computed } from "vue";

defineOptions({
	name: "ISearchDropdown",
});

const props = withDefaults(
	defineProps<{
		isOpen?: boolean;
	}>(),
	{ isOpen: false }
);

const dropdownClass = computed(() => [
	"i-search-dropdown",
	props.isOpen && "i-open",
]);
</script>

<template>
	<div :class="dropdownClass">
		<slot />
	</div>
</template>
