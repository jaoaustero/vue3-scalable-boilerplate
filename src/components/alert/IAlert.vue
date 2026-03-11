<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import type { IAlertProps, IAlertEmits } from "./IAlert.types";

defineOptions({
	name: "IAlert"
});

const emit = defineEmits<IAlertEmits>();

const props = withDefaults(defineProps<IAlertProps>(), {
	icon: undefined,
	status: undefined,
	isDismissable: false,
	isAutoDismissable: false,
	dismissCountdown: 3000,
	isMobile: false,
	size: undefined,
});

const dismiss = ref(false);
let dismissTimeout: ReturnType<typeof setTimeout> | null = null;

const getClasses = computed(() => {
	return [
		'i-alert',
		props.size ? `i-alert-${props.size}` : '',
		props.status ? `i-alert-${props.status}` : ''
	];
});

const dismissableClass = computed(() => {
	return [
		'i-close i-flex',
		props.isMobile && 'i-isMobile'
	];
});

const onClick = () => {
	dismiss.value = true;
	emit('dismiss');
};

onMounted(() => {
	if (props.isAutoDismissable === true) {
		dismissTimeout = setTimeout(() => {
			dismiss.value = true;
			emit('dismiss');
		}, props.dismissCountdown);
	}
});

onBeforeUnmount(() => {
	if (dismissTimeout) {
		clearTimeout(dismissTimeout);
	}
});
</script>

<template>
	<transition name="alert-fade">
		<div
			v-if="!dismiss"
			:class="getClasses"
			role="alert">
			<div class="i-flex i-flex-middle">
				<div
					v-if="icon"
					class="i-alert-icon">
					<!-- TODO: Replace with IIcon component when available -->
					<!-- <i-icon :type="icon" size="medium" /> -->
					<slot name="icon"></slot>
				</div>

				<div class="i-margin-small-left">
					<p class="i-alert-title">
						{{ title }}
					</p>
					<p class="i-text-regular-2 i-text-grey-2 i-alert-description">
						{{ description }}
					</p>
				</div>
			</div>

			<button
				v-if="isDismissable || isAutoDismissable"
				:class="dismissableClass"
				@click="onClick"
				aria-label="Dismiss Alert">
				<span></span>
			</button>
		</div>
	</transition>
</template>

<style lang="scss">
@use "./IAlert.scss" as *;
</style>
