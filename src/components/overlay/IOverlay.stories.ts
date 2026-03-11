import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";
import { ref } from "vue";

import IOverlay from "./IOverlay.vue";
import IButton from "@/components/button/IButton.vue";

const meta: Meta<typeof IOverlay> = {
	title: "Templates/Overlay",
	component: IOverlay,
	parameters: {
		docs: {
			description: {
				component: "Create an overlay element",
			},
		},
	},
	argTypes: {
		isOpen: {
			control: "boolean",
		},
		title: {
			control: {
				type: "text",
			},
		},
		backTooltipText: {
			control: {
				type: "text",
			},
		},
		headerClass: {
			control: {
				type: "text",
			},
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IOverlay>;

const renderDefault: StoryFn<typeof IOverlay> = (args) => ({
	components: { IOverlay, IButton },
	setup() {
		const isOverlayOpen = ref(false);

		const openOverlay = () => {
			isOverlayOpen.value = true;
		};

		const closeOverlay = () => {
			isOverlayOpen.value = false;
		};

		return { args, isOverlayOpen, openOverlay, closeOverlay };
	},
	template: `
		<div>
			<IOverlay
				v-bind="args"
				:is-open="isOverlayOpen"
				@go-back="closeOverlay">
				<p style="padding: 16px;">All slots will be displayed here</p>
			</IOverlay>
			<IButton @click="openOverlay">
				Open the overlay
			</IButton>
		</div>
	`,
});

const renderWithOptions: StoryFn<typeof IOverlay> = (args) => ({
	components: { IOverlay, IButton },
	setup() {
		const isOverlayOpen = ref(false);

		const openOverlay = () => {
			isOverlayOpen.value = true;
		};

		const closeOverlay = () => {
			isOverlayOpen.value = false;
		};

		return { args, isOverlayOpen, openOverlay, closeOverlay };
	},
	template: `
		<div>
			<IOverlay
				v-bind="args"
				:is-open="isOverlayOpen"
				@go-back="closeOverlay">
				<template #options>
					<span style="color: white;">Options</span>
				</template>
				<p style="padding: 16px;">All slots will be displayed here</p>
			</IOverlay>
			<IButton @click="openOverlay">
				Open the overlay
			</IButton>
		</div>
	`,
});

const renderWithAlignedButtons: StoryFn<typeof IOverlay> = (args) => ({
	components: { IOverlay, IButton },
	setup() {
		const isOverlayOpen = ref(false);

		const openOverlay = () => {
			isOverlayOpen.value = true;
		};

		const closeOverlay = () => {
			isOverlayOpen.value = false;
		};

		return { args, isOverlayOpen, openOverlay, closeOverlay };
	},
	template: `
		<div>
			<IOverlay
				v-bind="args"
				:is-open="isOverlayOpen"
				:options="{ alignAllButtons: 'left' }"
				@go-back="closeOverlay">
				<template #options>
					<IButton size="small">Action</IButton>
				</template>
				<p style="padding: 16px;">All slots will be displayed here</p>
			</IOverlay>
			<IButton @click="openOverlay">
				Open the overlay
			</IButton>
		</div>
	`,
});

export const DefaultStyle: Story = {
	render: renderDefault,
	args: {
		title: "Title",
	},
};

export const WithOptions: Story = {
	name: "With Options Slot",
	render: renderWithOptions,
	args: {
		title: "Title",
	},
};

export const WithAlignedButtons: Story = {
	name: "With Aligned Buttons",
	render: renderWithAlignedButtons,
	args: {
		title: "Title",
	},
};

export const CustomBackTooltip: Story = {
	render: renderDefault,
	args: {
		title: "Settings",
		backTooltipText: "Go Back",
	},
};
