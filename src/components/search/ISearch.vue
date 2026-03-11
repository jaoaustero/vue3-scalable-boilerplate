<script setup lang="ts">
import { ref, computed, watch } from "vue";
import IButton from "@/components/button/IButton.vue";
import IIcon from "@/components/icon/IIcon.vue";
import ISearchDropdown from "./ISearchDropdown.vue";
import ISearchList from "./ISearchList.vue";
import { useClickOutside } from "@/composables/useClickOutside";
import type { ISearchProps, ISearchEmits, ISearchOption } from "./ISearch.types";

defineOptions({
	name: "ISearch",
	inheritAttrs: false,
});

const emit = defineEmits<ISearchEmits>();

const props = withDefaults(defineProps<ISearchProps>(), {
	hasIcon: true,
	iconFlip: false,
	isLoading: false,
	isOpen: false,
	options: () => [],
	optionsLimit: 10,
	searchDelay: 1000,
	modelValue: "",
	placeholderText: "Search Here",
	totalResults: 0,
	btnClass: "",
	tabindex: 0,
});

const wrapperRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const hasValue = ref(false);
const highlightItem = ref(-1);
const highlightShowAll = ref(false);
let typingTimeout: ReturnType<typeof setTimeout> | null = null;

useClickOutside(wrapperRef, () => {
	closeDropdown();
});

const reducedOptions = computed(() =>
	props.options.slice(0, props.optionsLimit)
);

const iconClasses = computed(() => [
	"i-search-icon",
	props.iconFlip && "i-search-icon-flip",
]);

const inputPaddingClass = computed(() =>
	props.iconFlip ? "i-search-left-padding" : "i-search-right-padding"
);

const clearButtonClass = computed(() =>
	props.iconFlip ? "i-search-left-button" : "i-search-right-button"
);

const searchButtonClass = computed(() =>
	props.iconFlip ? "i-search-right-button" : "i-search-left-button"
);

watch(
	() => props.options,
	() => {
		highlightItem.value = -1;
	}
);

function closeDropdown() {
	emit("update:isOpen", false);
	highlightItem.value = -1;
	highlightShowAll.value = false;
}

function handleClearInput() {
	if (!inputRef.value?.value.length) return;
	handleClearValue();
	closeDropdown();
	emit("clearInput");
}

function handleClearValue() {
	if (inputRef.value) {
		inputRef.value.value = "";
	}
	hasValue.value = false;
	emit("update:modelValue", "");
}

function handleFocus() {
	emit("update:isOpen", true);
	inputRef.value?.focus();
}

function handleFocusOut() {
	closeDropdown();
	inputRef.value?.blur();
}

function handleHighlightItem(index: number) {
	const lastIndex = props.options.length
		? reducedOptions.value.length - 1
		: -1;

	if (index > lastIndex) {
		if (
			props.options.length &&
			props.options.length > props.optionsLimit
		) {
			highlightShowAll.value = true;
			highlightItem.value = -1;
		} else {
			highlightShowAll.value = false;
			highlightItem.value = 0;
		}
	} else if (index < 0) {
		if (
			props.options.length &&
			!highlightShowAll.value &&
			props.options.length > props.optionsLimit
		) {
			highlightShowAll.value = true;
			highlightItem.value = -1;
		} else {
			highlightShowAll.value = false;
			highlightItem.value = lastIndex;
		}
	} else if (index <= lastIndex) {
		if (
			index === 0 &&
			highlightItem.value === -1 &&
			!highlightShowAll.value &&
			props.options.length > props.optionsLimit
		) {
			highlightShowAll.value = true;
			highlightItem.value = -1;
		} else {
			highlightShowAll.value = false;
			highlightItem.value = index;
		}
	}
}

function handleEnterSelectItem() {
	if (highlightShowAll.value || highlightItem.value === -1) {
		handleShowAll();
		handleFocusOut();
	} else {
		const raw = reducedOptions.value[highlightItem.value];
		const item: ISearchOption = raw ?? {
			id: "",
			title: "",
			subtitle: "",
		};
		handleSelectItem(item);
	}
}

function handleInput(event: Event) {
	const target = event.target as HTMLInputElement;
	emit("update:modelValue", target.value);
	handleTyping(event);
}

function handleSelectItem(data: ISearchOption) {
	if (typingTimeout) clearTimeout(typingTimeout);
	emit("selectOption", data);
	handleClearValue();
}

function handleShowAll() {
	if (typingTimeout) clearTimeout(typingTimeout);
	emit("showAll");
	handleClearValue();
	closeDropdown();
}

function handleTyping(event: Event) {
	const isInputEvent = event.type === "input";
	if (!isInputEvent && "key" in event) {
		const key = (event as KeyboardEvent).key;
		const isAlphabetic = /^[a-zA-Z0-9]$/.test(key);
		const isControlKey = ["Backspace", "Delete"].includes(key);
		if (!isAlphabetic && !isControlKey) return;
	}

	if (typingTimeout) clearTimeout(typingTimeout);

	if (!inputRef.value) return;

	hasValue.value = inputRef.value.value.length > 1;

	typingTimeout = setTimeout(() => {
		emit("submitSearch");
	}, props.searchDelay);
}

function focusInput() {
	inputRef.value?.focus();
	if (hasValue.value) {
		emit("showAll");
	}
}
</script>

<template>
	<div
		ref="wrapperRef"
		v-bind="$attrs"
		class="i-search-wrapper"
	>
		<input
			ref="inputRef"
			type="text"
			class="i-input i-search"
			:class="inputPaddingClass"
			:value="modelValue"
			:placeholder="placeholderText"
			:title="placeholderText"
			:tabindex="tabindex"
			@focus="handleFocus"
			@input="handleInput"
			@keyup="handleTyping"
			@keydown.delete="handleTyping"
			@keydown.down.stop="handleHighlightItem(highlightItem + 1)"
			@keydown.up.stop="handleHighlightItem(highlightItem - 1)"
			@keydown.enter="handleEnterSelectItem"
			@keydown.esc="handleFocusOut"
		/>

		<IButton
			v-if="hasValue"
			:is-rounded="true"
			:label="'Clear Search'"
			:tabindex="tabindex"
			:class="['i-search-button-close', clearButtonClass]"
			@click="handleClearInput"
		>
			<IIcon type="x" />
		</IButton>

		<IButton
			:is-text="true"
			:label="'Submit Search'"
			:tabindex="tabindex"
			:class="['i-search-button i-button-hover', searchButtonClass, btnClass]"
			@click="focusInput"
		>
			<IIcon
				v-if="hasIcon"
				:type="'search'"
				:class="iconClasses"
			/>
		</IButton>

		<transition name="slide-fade">
			<ISearchDropdown v-if="isOpen" :is-open="isOpen">
				<ISearchList
					:is-loading="isLoading"
					:options="options"
					:options-limit="optionsLimit"
					:reduced-options="reducedOptions"
					:highlight-item="highlightItem"
					:highlight-show-all="highlightShowAll"
					:total-results="totalResults"
					:text-align="iconFlip"
					@handle-select-item="handleSelectItem"
					@handle-show-all="handleShowAll"
				/>
			</ISearchDropdown>
		</transition>
	</div>
</template>

<style lang="scss">
@use "./ISearch.scss" as *;
</style>
