<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

import IEmojiPicker from "@/components/emoji/IEmojiPicker.vue";
import IIcon from "@/components/icon/IIcon.vue";

export interface FileUpload {
	preview: string | boolean;
	iconType: "image" | "video" | "audio" | null;
	file: File;
}

export interface SendMessagePayload {
	message: string;
	attachments: FileUpload[];
}

export interface Features {
	emoji?: boolean;
	rating?: boolean;
	uploads?: boolean;
}

const emit = defineEmits<{
	messageTyping: [event: KeyboardEvent];
	focus: [];
	blur: [];
	sendMessage: [payload: SendMessagePayload];
	ratingClicked: [rating: number];
	filesAdded: [];
	filesRemoved: [];
	emojiPreview: [show: boolean];
	textareaResized: [heightChange: number];
}>();

const props = withDefaults(
	defineProps<{
		placeholder?: string;
		features?: Features;
	}>(),
	{
		placeholder: "",
		features: () => ({
			emoji: true,
			rating: true,
			uploads: true,
		}),
	}
);

// Refs
const chatinput = ref<HTMLTextAreaElement>();
const emojipicker = ref<HTMLDivElement>();
const fileupload = ref<HTMLInputElement>();
const actionbuttons = ref<HTMLDivElement>();
const rating = ref<HTMLDivElement>();
const button = ref<HTMLButtonElement>();
const attachFile = ref<HTMLButtonElement>();

// State
const config = {
	default_height: 16,
	max_height: 150,
};

const hasValue = ref(false);
const showEmoji = ref(false);
const showUpload = ref(false);
const showRatings = ref(false);
const files = ref<FileUpload[]>([]);
const ratings = ref("");
const chatFocused = ref(false);

// Computed
const actionButtonClass = computed(() => {
	return ["i-chatinput-action-buttons", hasValue.value && "active"];
});

// Methods
const onKeydown = (event: KeyboardEvent) => {
	if (event.keyCode === 13) {
		if (!event.shiftKey) {
			event.preventDefault();
			return onSend();
		}
	}

	showEmoji.value = false;
	emit("messageTyping", event);
};

const onFocus = () => {
	chatFocused.value = true;
	showEmoji.value = false;
	emit("focus");
};

const onBlur = () => {
	chatFocused.value = false;
	emit("blur");
};

const onSelect = (emoji: string) => {
	if (!chatinput.value) return;

	const value = chatinput.value.value;
	chatinput.value.value = value + emoji;
	chatinput.value.focus();

	hasValue.value = true;
	showEmoji.value = false;
};

const onFileClick = () => {
	showRatings.value = false;
	showEmoji.value = false;
};

const onFileUpload = () => {
	if (!fileupload.value) return;

	const uploadedFiles = fileupload.value.files;
	showEmoji.value = false;

	if (uploadedFiles && uploadedFiles.length > 0 && files.value.length < 4) {
		for (let i = 0; i < uploadedFiles.length; i++) {
			const file = uploadedFiles[i];

			// TypeScript guard: ensure file exists
			if (!file) continue;

			let preview: string | boolean | null = null;
			let iconType: "image" | "video" | "audio" | null = null;

			if (file.type.match(/(jpg|jpeg|png|gif)$/i)) {
				preview = URL.createObjectURL(file);
				iconType = "image";
			} else if (
				["video/mp4", "video/ogg", "video/webm"].indexOf(file.type) !== -1
			) {
				preview = true;
				iconType = "video";
			} else if (
				["audio/mp3", "audio/ogg", "audio/mpeg", "audio/wav"].indexOf(
					file.type
				) !== -1
			) {
				preview = true;
				iconType = "audio";
			}

			files.value.push({
				preview: preview || false,
				iconType,
				file,
			});

			if (files.value.length === 4) {
				break;
			}
		}

		hasValue.value = true;
		fileupload.value.value = "";
	}

	emit("filesAdded");
};

const handleRating = (event: MouseEvent, rating: number) => {
	event.stopPropagation();
	event.preventDefault();

	emit("ratingClicked", rating);
	showRatings.value = false;
};

const onSend = () => {
	if (!chatinput.value) return;

	if (chatinput.value.value.length > 0 || files.value.length > 0) {
		emit("sendMessage", {
			message: chatinput.value.value,
			attachments: files.value,
		});

		// Reset state
		chatinput.value.value = "";
		files.value = [];
		chatinput.value.click();
	}

	hasValue.value = false;
	showEmoji.value = false;
	showUpload.value = false;
};

const onClose = () => {
	showEmoji.value = false;
};

const openFilSelector = () => {
	showUpload.value = true;
	showEmoji.value = true;
	fileupload.value?.click();
};

const removeFile = (index: number) => {
	if (files.value.length && files.value.length > index) {
		files.value.splice(index, 1);
	}

	if (
		files.value.length === 0 &&
		chatinput.value &&
		chatinput.value.value === ""
	) {
		hasValue.value = false;
		emit("filesRemoved");
	}
};

const onEmojiOpen = () => {
	showEmoji.value = !showEmoji.value;
	showUpload.value = false;
	emit("emojiPreview", showEmoji.value);
	emojipicker.value?.focus();
};

const handleEscapeKey = (event: KeyboardEvent) => {
	if (event.key === "Escape" && showEmoji.value) {
		showEmoji.value = false;
	}
};

// Autogrow directive logic
const resize = () => {
	if (!chatinput.value) return;

	let baseSize = config.default_height;

	if (chatinput.value.parentNode) {
		baseSize = parseFloat(
			getComputedStyle(chatinput.value.parentNode as Element).fontSize
		);
	}

	let emojiHeight = 0;
	let newHeight;
	const currentHeight = chatinput.value.clientHeight;
	const rows = chatinput.value.value.split(/\r\n|\r|\n/).length || 1;
	let height = rows * baseSize;

	if (hasValue.value) {
		if (rows === 1 && chatinput.value.scrollHeight >= chatinput.value.clientHeight) {
			height = chatinput.value.scrollHeight;
		}

		if (height < config.max_height) {
			newHeight = height < baseSize ? baseSize : height;
		} else {
			newHeight = config.max_height;
		}
	} else {
		newHeight = baseSize;
	}

	if (showEmoji.value) {
		emojiHeight = 310;
	}

	chatinput.value.style.height = `${newHeight}px`;
	emit("textareaResized", newHeight - currentHeight + emojiHeight);
};

let timeout: number;
const throttleResize = () => {
	clearTimeout(timeout);

	if (!chatinput.value) return;

	const value = chatinput.value.value.trim();

	if (value.length > 0) {
		hasValue.value = true;
	} else {
		hasValue.value = false;
	}

	timeout = window.setTimeout(resize, 100);
};

// Click outside handler
let handleOutsideClick: ((e: MouseEvent | TouchEvent) => void) | null = null;

const setupClickOutside = () => {
	handleOutsideClick = (e: MouseEvent | TouchEvent) => {
		if (!emojipicker.value || !button.value) return;

		const clickedOnExcludedEl = button.value.contains(e.target as Node);

		if (
			!emojipicker.value.contains(e.target as Node) &&
			!clickedOnExcludedEl
		) {
			onClose();
		}
	};

	document.addEventListener("click", handleOutsideClick);
	document.addEventListener("touchstart", handleOutsideClick);
};

const cleanupClickOutside = () => {
	if (handleOutsideClick) {
		document.removeEventListener("click", handleOutsideClick);
		document.removeEventListener("touchstart", handleOutsideClick);
	}
};

// Lifecycle
onMounted(() => {
	if (chatinput.value) {
		chatinput.value.addEventListener("cut", throttleResize);
		chatinput.value.addEventListener("paste", throttleResize);
		chatinput.value.addEventListener("keyup", throttleResize);
		chatinput.value.addEventListener("click", throttleResize);
		resize();
	}

	setupClickOutside();
});

onUnmounted(() => {
	if (chatinput.value) {
		chatinput.value.removeEventListener("cut", throttleResize);
		chatinput.value.removeEventListener("paste", throttleResize);
		chatinput.value.removeEventListener("keyup", throttleResize);
		chatinput.value.removeEventListener("click", throttleResize);
	}

	cleanupClickOutside();
});
</script>

<template>
	<div class="i-chatinput" v-bind="$attrs">
		<div
			v-if="features.emoji"
			ref="emojipicker"
			class="i-chatinput-emojis"
			@keyup.esc="handleEscapeKey"
		>
			<IEmojiPicker
				v-show="showEmoji"
				:is-show="showEmoji"
				@select="onSelect"
			/>
		</div>

		<div v-show="files.length" class="i-chatinput-fileupload">
			<ul class="i-chatinput-fileupload-list i-flex i-flex-wrap">
				<li
					v-for="(file, index) in files"
					:key="index"
					class="i-chatinput-fileupload-preview i-flex i-flex-middle i-flex-center"
				>
					<img
						v-if="file.preview && file.iconType === 'image'"
						:src="file.preview as string"
					/>
					<IIcon
						v-else-if="file.preview && file.iconType === 'video'"
						type="video-file"
					/>
					<IIcon
						v-else-if="file.preview && file.iconType === 'audio'"
						type="audio-file"
					/>
					<IIcon v-else type="generic-file" />
					<div
						class="i-chatinput-file-remove i-flex i-flex-middle i-flex-center"
						@click="removeFile(index)"
					>
						<IIcon type="x" size="xsmall" />
					</div>
				</li>

				<li
					v-if="files.length > 0 && files.length <= 3"
					@click="openFilSelector"
					class="i-chatinput-fileupload-input i-flex i-flex-middle i-flex-center"
				>
					<IIcon type="plus" />
				</li>
			</ul>
			<input
				ref="fileupload"
				type="file"
				@change="onFileUpload"
				@click="onFileClick"
				multiple
			/>
		</div>

		<div class="i-chatinput-wrap i-flex i-flex-wrap">
			<textarea
				ref="chatinput"
				:placeholder="placeholder"
				class="i-chatinput-editor"
				@keydown="onKeydown"
				@focus="onFocus"
				@blur="onBlur"
				tabindex="0"
			></textarea>

			<div
				ref="actionbuttons"
				:class="actionButtonClass"
				role="group"
				aria-label="Group of buttons"
			>
				<div
					v-if="features.rating"
					v-show="!hasValue"
					role="button"
					tabindex="0"
					type="button"
					ref="rating"
					title="Rate this chat"
					aria-label="Rate this chat"
					class="i-chatinput-button i-tooltip i-outline"
					:class="[
						showRatings ? 'active' : '',
						chatFocused ? 'i-chatinput-focused' : '',
					]"
					@mouseenter="showRatings = true"
					@mouseleave="showRatings = false"
					@click="showRatings = true"
					@keyup.enter="showRatings = true"
					@focusin="showRatings = true"
					@focusout="showRatings = false"
					data-text="Rate this chat"
				>
					<div class="i-chatinput-ratings i-flex i-flex-middle">
						<button
							@click="handleRating($event, -1)"
							title="Rate this conversation with -1"
							class="i-chatinput-rate i-chatinput-ratings-thumbs-down i-margin-xsmall-right i-margin-auto-left i-outline"
							role="button"
							@focusin="showRatings = true"
							:tabindex="showRatings ? 0 : -1"
						>
							<IIcon type="thumbs-down" />
						</button>

						<button
							@click="handleRating($event, 1)"
							title="Rate this conversation with +1"
							class="i-chatinput-rate i-chatinput-ratings-thumbs-up i-margin-xsmall-right i-outline"
							role="button"
							@focusin="showRatings = true"
							:tabindex="showRatings ? 0 : -1"
						>
							<IIcon type="thumbs-up" />
						</button>
					</div>

					<span class="i-chatinput-rating" @click="showRatings = true">
						<IIcon type="thumbs-up" />
					</span>
				</div>

				<button
					v-if="features.uploads"
					v-show="!hasValue || files.length !== 0"
					role="button"
					tabindex="0"
					type="button"
					ref="attachFile"
					title="Upload File"
					aria-title="Upload File"
					aria-hidden="true"
					aria-haspopup="menu"
					aria-expanded="false"
					class="i-chatinput-button i-tooltip i-outline"
					:class="[chatFocused ? 'i-chatinput-focused' : '']"
					@click="openFilSelector"
					data-text="Upload File"
				>
					<IIcon type="attachment" />
				</button>

				<button
					v-if="features.emoji"
					role="button"
					tabindex="0"
					type="button"
					ref="button"
					title="Insert emoji"
					aria-label="Insert emoji"
					aria-hidden="true"
					aria-haspopup="true"
					class="i-chatinput-button i-tooltip i-outline"
					:class="[chatFocused ? 'i-chatinput-focused' : '']"
					@click="onEmojiOpen"
					data-text="Insert emoji"
				>
					<IIcon type="emoji" />
				</button>
			</div>

			<div v-if="hasValue" class="i-chatinput-send-container">
				<button
					class="i-chatinput-send"
					role="button"
					tabindex="0"
					type="button"
					title="Send"
					aria-label="Send"
					@click="onSend"
					data-text="Send"
				>
					<IIcon type="send" />
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@use "./IChatInput.scss" as *;
</style>
