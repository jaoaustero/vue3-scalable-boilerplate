<script setup lang="ts">
import { computed } from "vue";
import type { IVideoProps } from "./IVideo.types";

defineOptions({
	name: "IVideo",
	inheritAttrs: false,
});

const props = withDefaults(defineProps<IVideoProps>(), {
	isMobile: false,
});

const videoLink = computed(() => {
	let videoUrl = props.content.url;
	const queryString: string[] = [];
	const config = props.content.options;
	const source = props.content.source;

	if (typeof source === "undefined") {
		return videoUrl;
	}

	if (source === "selfhosted") {
		if (config?.startTime && config?.endTime) {
			videoUrl += `#t=${config.startTime},${config.endTime}`;
		}
		if (!config?.startTime && config?.endTime) {
			videoUrl += `#t=0,${config.endTime}`;
		}
		if (config?.startTime && !config?.endTime) {
			videoUrl += `#t=${config.startTime}`;
		}
		return videoUrl;
	}

	// Embed sources (youtube, dailymotion, vimeo, loom)
	if (config) {
		queryString.push(config.loop ? "loop=1" : "loop=0");
		if (source === "vimeo") {
			queryString.push("controls=1");
		} else {
			queryString.push(config.controls ? "controls=1" : "controls=0");
		}
		if (props.isMobile && !config.mobile) {
			queryString.push("autoplay=0");
		} else {
			queryString.push(config.autoplay ? "autoplay=1" : "autoplay=0");
		}
	}

	if (source === "youtube") {
		const videoId = matchYoutubeUrl(videoUrl);
		if (videoId) {
			videoUrl = config?.privacy
				? `https://www.youtube-nocookie.com/embed/${videoId}`
				: `https://www.youtube.com/embed/${videoId}`;
		}
		if (config) {
			if (config.branding) {
				queryString.push("modestbranding=1");
			}
			if (config.startTime !== undefined) {
				queryString.push(`start=${config.startTime}`);
			}
			if (config.endTime !== undefined) {
				queryString.push(`end=${config.endTime}`);
			}
			queryString.push(config.mute ? "mute=1" : "mute=0");
		}
	} else if (source === "dailymotion") {
		const videoId = matchDailyMotion(videoUrl);
		videoUrl = `https://www.dailymotion.com/embed/video/${videoId}`;
		if (config) {
			if (config.startTime !== undefined) {
				queryString.push(`start=${config.startTime}`);
			}
			if (config.controlsColor) {
				queryString.push(`ui-highlight=${config.controlsColor}`);
			}
			queryString.push(config.logo ? "ui-logo=1" : "ui-logo=0");
			queryString.push(config.info ? "ui-start-screen-info=1" : "ui-start-screen-info=0");
			queryString.push(config.mute ? "mute=1" : "mute=0");
		}
	} else if (source === "vimeo") {
		const url = new URL(videoUrl);
		const searchParams = url.searchParams;
		const videoId = matchVimeo(videoUrl);
		videoUrl = `https://player.vimeo.com/video/${videoId}`;
		if (searchParams.get("h")) {
			queryString.push(`h=${searchParams.get("h")}`);
		}
		if (searchParams.get("app_id")) {
			queryString.push(`app_id=${searchParams.get("app_id")}`);
		}
		if (config) {
			queryString.push(config.mute ? "muted=1" : "muted=0");
			if (config.controlsColor) {
				queryString.push(`color=${config.controlsColor}`);
			}
			queryString.push(config.introTitle ? "title=1" : "title=0");
			queryString.push(config.introPortrait ? "portrait=1" : "portrait=0");
			queryString.push(config.introByline ? "byline=1" : "byline=0");
			if (config.startTime !== undefined) {
				queryString.push(`#t=${config.startTime}s`);
			}
		}
	} else if (source === "loom") {
		const videoId = matchLoomUrl(videoUrl);
		videoUrl = `https://www.loom.com/embed/${videoId}`;
		if (config?.startTime !== undefined) {
			queryString.push(`t=${config.startTime}`);
		}
	}

	return queryString.length > 0 ? `${videoUrl}?${queryString.join("&")}` : videoUrl;
});

const isSelfhosted = computed(() => props.content.source === "selfhosted");

const autoplay = computed(() => {
	const opts = props.content.options;
	if (!opts?.autoplay) return false;
	if (!props.isMobile) return true;
	return Boolean(opts.mobile);
});

function matchYoutubeUrl(url: string): string | false {
	const p =
		/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
	const match = url.match(p);
	return (match && match[1]) ? match[1] : false;
}

function matchDailyMotion(url: string): string | false {
	const p =
		/^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/;
	const match = url.match(p);
	return (match && match[1]) ? match[1] : false;
}

function matchVimeo(url: string): string | false {
	const p =
		/^https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)(?:[?]?.*)$/;
	const match = url.match(p);
	return (match && match.length >= 4 && match[3]) ? match[3] : false;
}

function matchLoomUrl(url: string): string | false {
	const p =
		/(?:https?:\/\/)?(?:stage\.loom\.com|loom\.com|www\.loom.com|loomlocal\.com:4444)\/(share|embed)\/([a-f0-9]+)/;
	const match = url.match(p);
	const last = match && match.length > 0 ? match[match.length - 1] : undefined;
	return last ?? false;
}
</script>

<template>
	<div>
		<video
			v-if="isSelfhosted"
			v-bind="$attrs"
			:src="videoLink"
			:data-src="videoLink"
			:controls="content.options?.controls"
			:muted="content.options?.mute"
			:loop="content.options?.loop"
			:autoplay="autoplay"
			class="i-video-el"
		/>
		<div v-else class="i-video-iframe-container">
			<iframe
				v-bind="$attrs"
				:src="videoLink"
				:data-src="videoLink"
				frameborder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				class="i-video-iframe i-video-el"
			/>
		</div>
	</div>
</template>

<style lang="scss">
@use "./IVideo.scss" as *;
</style>
