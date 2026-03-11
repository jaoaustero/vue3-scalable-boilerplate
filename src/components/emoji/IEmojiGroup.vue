<script setup lang="ts">
import { computed } from "vue";
import type { EmojiFilteredCategory as FilteredCategory } from "./IEmoji.types";

const emit = defineEmits<{
	click: [category: FilteredCategory];
}>();

const props = defineProps<{
	/**
	 * Array of emoji categories to display
	 */
	categories: FilteredCategory[];

	/**
	 * The currently active category
	 */
	activeCategory?: FilteredCategory | { category_name: string; name: string };
}>();

const classes = (categoryName: string) => {
	return [
		'i-emoji-group-tab',
		props.activeCategory?.category_name === categoryName && 'i-emoji-group-tab-active',
		'i-flex-auto',
		'i-text-center',
		'i-outline'
	];
};
</script>

<template>
	<div class="i-emoji-group i-flex i-flex-wrap">
		<span
			v-for="(category, index) in categories"
			:key="index"
			:title="category.category_name"
			:class="classes(category.category_name)"
			@click="$emit('click', category)"
			@keyup.enter="$emit('click', category)"
			tabindex="0">

			<img :src="`https://cdn.jsdelivr.net/emojione/assets/png/${category.emoji}.png?v=2.2.7`" />
		</span>
	</div>
</template>
