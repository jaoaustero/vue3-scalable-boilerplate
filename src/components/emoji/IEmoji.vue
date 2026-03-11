<script setup lang="ts">
import { ref, onMounted } from "vue";
import "./IEmoji.types";

const props = withDefaults(
	defineProps<{
		/**
		 * The emoji shortcode (e.g., ':smile:') or unicode emoji
		 */
		emoji?: string;

		/**
		 * Whether to enable emoji rendering (if false, shows raw text)
		 */
		enabled?: boolean;
	}>(),
	{
		emoji: "",
		enabled: true,
	}
);

const image = ref<string | null>(null);
const checkTimeout = ref<number | null>(null);
const counter = ref(0);
const show = ref(false);
const isEmojiOnly = ref(false);
const emojione = ref<any>(null);
const imageElement = ref<HTMLSpanElement>();

const checkScriptLoaded = () => {
	if (checkTimeout.value !== null) {
		clearTimeout(checkTimeout.value);
	}

	if (typeof window.emojione === 'undefined') {
		counter.value++;

		if (counter.value === 20) {
			if (checkTimeout.value !== null) {
				clearTimeout(checkTimeout.value);
			}
			counter.value = 0;
			image.value = props.emoji;
			return;
		}

		checkTimeout.value = window.setTimeout(() => {
			checkScriptLoaded();
		}, 20);

		return;
	}

	if (checkTimeout.value !== null) {
		clearTimeout(checkTimeout.value);
	}

	if (!emojione.value) {
		emojione.value = window.emojione;
	}

	counter.value = 0;

	let emoji = emojione.value.unifyUnicode(props.emoji);

	const trimAll = emoji.replace(emojione.value.regUnicode, '').trim();

	if (trimAll.length === 0) {
		isEmojiOnly.value = true;
	}

	/**
	 * We have been modified the original function of emojione
	 * by returning plain text for symbols and only convert when it has
	 * colon before and after of the word
	 */

	let formatEmoji = props.emoji || '';
	formatEmoji = formatEmoji.replace(/©/gm, '&copy;').replace(/®/gm, '&reg;').replace(/™/gm, '&trade;');
	formatEmoji = emojione.value.toImage(formatEmoji);

	image.value = formatEmoji;
};

onMounted(() => {
	if (props.enabled) {
		checkScriptLoaded();
	} else {
		image.value = props.emoji;
	}

	if (imageElement.value) {
		show.value = true;
	}
});
</script>

<template>
	<span
		ref="imageElement"
		v-show="show"
		v-html="image"
		:class="isEmojiOnly ? 'emojionly' : ''"></span>
</template>
