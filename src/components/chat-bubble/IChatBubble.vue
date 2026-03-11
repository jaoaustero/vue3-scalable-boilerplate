<script setup lang="ts">
import { computed } from "vue";
import type { IChatBubbleProps, IChatBubbleEmits } from "./IChatBubble.types";
import type { VideoSource } from "@/components/video/IVideo.types";

import IIcon from "@/components/icon/IIcon.vue";
import IVideo from "@/components/video/IVideo.vue";

defineOptions({
	name: "IChatBubble"
});

const props = withDefaults(
	defineProps<IChatBubbleProps>(),
	{
		isActive: false,
		attachments: () => ({
			videos: [],
			images: [],
			audios: [],
			files: [],
		}),
	}
);

const emit = defineEmits<IChatBubbleEmits>();

const getChatBubbleClasses = computed(() => {
	return props.isActive ? "i-active" : "";
});

const handleOpenNewTab = (source: string) => {
	window.open(source, "_blank");
};

const beautifyFilename = (fileName: string, fileSize?: string) => {
	const period = fileName.lastIndexOf(".");
	let name = fileName.substring(0, period);
	let fileExtension = `.${fileName.substring(period + 1)}`;

	if (name.length > 7) {
		fileExtension = name.substring(name.length - 3) + fileExtension;
		name = name.substring(0, name.length - 3);
	}

	return `<span class="i-flex-1 i-text-truncate">${name}</span><span class="i-flex-none">${fileExtension}</span><span class="i-flex-none">&nbsp;(${fileSize})</span>`;
};

const detectVideoSource = (url: string): VideoSource => {
	if (/(?:youtu\.be|youtube\.com|youtube-nocookie\.com)/.test(url)) return "youtube";
	if (/(?:dailymotion\.com|dai\.ly)/.test(url)) return "dailymotion";
	if (/vimeo\.com/.test(url)) return "vimeo";
	if (/(?:loom\.com|loomlocal\.com)/.test(url)) return "loom";
	return "selfhosted";
};

const handleImageLoaded = () => {
	emit("imageLoaded");
};
</script>

<template>
	<div class="i-chat-bubble" :class="getChatBubbleClasses">
		<p v-if="$slots.default">
			<slot />
		</p>

		<ul
			v-if="attachments.videos && attachments.videos.length"
			class="i-chat-bubble-videos"
		>
			<li
				v-for="(video, index) in attachments.videos"
				:key="`video-${index}`"
				class="i-margin-xsmall-top"
			>
				<IVideo
					:content="{
						url: video.url,
						source: detectVideoSource(video.url),
						options: video.options,
					}"
				/>
			</li>
		</ul>

		<ul
			v-if="attachments.images && attachments.images.length"
			class="i-chat-bubble-images"
			:class="`i-grid-${attachments.images.length}`"
		>
			<li
				v-for="(image, index) in attachments.images"
				:key="`image-${index}`"
				@click="handleOpenNewTab(image.source)"
			>
				<!-- Simplified image implementation for now -->
				<div>
					<img
						class="i-image"
						:src="image.source"
						:alt="image.name"
						@load="handleImageLoaded"
					/>
				</div>
			</li>
		</ul>

		<ul
			v-if="attachments.audios && attachments.audios.length"
			class="i-chat-bubble-audios"
		>
			<li
				v-for="(audio, index) in attachments.audios"
				:key="`audio-${index}`"
				class="i-margin-xsmall-top"
				style="overflow: hidden"
			>
				<audio controls :src="audio.source">
					<source :src="audio.source" :type="audio.type" />
				</audio>
				<div class="i-flex i-flex-middle i-margin-xsmall-top">
					<IIcon
						type="attachment" />
					<a
						:href="audio.source"
						target="_blank"
						class="i-flex i-flex-middle"
						v-html="beautifyFilename(audio.name, audio.size)"
						style="overflow: hidden"
					>
					</a>
				</div>
			</li>
		</ul>

		<ul
			v-if="attachments.files && attachments.files.length"
			class="i-chat-bubble-files"
		>
			<li
				v-for="(file, index) in attachments.files"
				:key="`file-name-${index}`"
				class="i-flex i-flex-middle"
				style="overflow: hidden"
			>
				<IIcon
					type="attachment" />
				<a
					:href="file.source"
					target="_blank"
					class="i-flex i-flex-middle"
					v-html="beautifyFilename(file.name, file.size)"
					style="overflow: hidden"
				>
				</a>
			</li>
		</ul>
	</div>
</template>

<style lang="scss">
@use "./IChatBubble.scss" as *;
</style>
