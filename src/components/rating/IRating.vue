<script setup lang="ts">
import IButton from "@/components/button/IButton.vue";
import IImage from "@/components/image/IImage.vue";
import type { IRatingProps } from "./IRating.types";

const props = withDefaults(defineProps<IRatingProps>(), {
	isText: false,
	type: "thumb",
	isLikeDisabled: false,
	isDislikeDisabled: false,
	assetPath: "",
	upVoteText: "Yes",
	downVoteText: "No",
	upVoteLabel: "Positive",
	downVoteLabel: "Negative",
});

const emit = defineEmits<{
	like: [];
	dislike: [];
}>();

const handleLike = () => {
	emit("like");
};

const handleDislike = () => {
	emit("dislike");
};
</script>

<template>
	<div class="i-rating" aria-label="article rating">
		<i-button
			class="i-rating-button"
			:is-disabled="isLikeDisabled"
			@click="handleLike"
			role="option"
			aria-posinset="1"
			aria-setsize="2"
			:label="upVoteLabel">
			<span v-if="isText">
				{{ upVoteText }}
			</span>

			<i-image
				v-else
				:alt="`like ${isText ? 'text' : 'icon'}`"
				:src="`${assetPath}/images/rating/${type}-upvote-1.svg`" />
		</i-button>

		<i-button
			class="i-rating-button"
			:is-disabled="isDislikeDisabled"
			@click="handleDislike"
			role="option"
			aria-posinset="2"
			aria-setsize="2"
			:label="downVoteLabel">
			<span v-if="isText">
				{{ downVoteText }}
			</span>

			<i-image
				v-else
				:alt="`dislike ${isText ? 'text' : 'icon'}`"
				:src="`${assetPath}/images/rating/${type}-downvote-1.svg`" />
		</i-button>
	</div>
</template>

<style lang="scss">
@use "./IRating.scss" as *;
</style>
